import os
import io
import pandas as pd
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, UploadFile, File, Form, Request
from fastapi.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
from supabase import create_client, Client
from pydantic import BaseModel

# main.py 함수 가져오기
from main import get_company_resources, generate_cold_email

load_dotenv()

# Supabase 설정
url = os.getenv("SUPABASE_URL")
key = os.getenv("SUPABASE_SERVICE_KEY") # 중요: service_role key여야 DB 수정 가능
if not url or not key:
    print("❌ 에러: .env 파일에 SUPABASE 관련 키가 없습니다.")

supabase: Client = create_client(url, key)

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class EmailRequest(BaseModel):
    user_id: str
    company_name: str
    my_service: str
    service_description: str
    language: str = "Korean"
    tone: str = "Professional"
    include_hiring: bool = False

@app.post("/generate")
async def generate_email(request: EmailRequest):
    print(f"🔔 주문: {request.company_name} (User: {request.user_id})")
    
    try:
        # 1. 크레딧 차감 로직
        response = supabase.table("profiles").select("credits").eq("id", request.user_id).execute()
        if not response.data:
            raise HTTPException(status_code=400, detail="사용자 정보 없음")
        
        current_credits = response.data[0]['credits']
        if current_credits <= 0:
            raise HTTPException(status_code=402, detail="크레딧 부족")

        supabase.table("profiles").update({"credits": current_credits - 1}).eq("id", request.user_id).execute()

        # 2. 정보 수집 (분리된 데이터)
        resources = get_company_resources(request.company_name, request.include_hiring)
        
        # 3. 메일 생성
        email_content = generate_cold_email(
            request.company_name, resources, request.my_service, 
            request.service_description, request.language, request.tone
        )
        
        return {
            "status": "success",
            "remaining_credits": current_credits - 1,
            "news": resources["news"],     # 뉴스 리스트
            "hiring": resources["hiring"], # 채용 리스트
            "email": email_content         # 메일 본문
        }
        
    except HTTPException as he:
        raise he
    except Exception as e:
        print(f"❌ Server Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/generate_bulk")
async def generate_bulk(
    file: UploadFile = File(...),
    user_id: str = Form(...),
    my_service: str = Form(...),
    service_description: str = Form(...),
    language: str = Form(...),
    tone: str = Form(...),
    include_hiring: bool = Form(...)
):
    # (대량 생성 로직)
    try:
        contents = await file.read()
        if file.filename.endswith('.csv'):
            df = pd.read_csv(io.BytesIO(contents))
        else:
            df = pd.read_excel(io.BytesIO(contents))

        if 'Company' not in df.columns:
            df.rename(columns={df.columns[0]: 'Company'}, inplace=True)

        results = []
        target_companies = df['Company'].head(5).tolist() # 데모용 5개 제한

        for company in target_companies:
            resources = get_company_resources(company, include_hiring)
            email = generate_cold_email(company, resources, my_service, service_description, language, tone)
            results.append({
                "Company": company,
                "News_Found": len(resources["news"]),
                "Generated_Email": email
            })

        result_df = pd.DataFrame(results)
        stream = io.StringIO()
        result_df.to_csv(stream, index=False)
        response = StreamingResponse(iter([stream.getvalue()]), media_type="text/csv")
        response.headers["Content-Disposition"] = "attachment; filename=result.csv"
        return response

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

# --- [NEW] 결제 처리 웹훅 (Webhook) ---
@app.post("/webhook")
async def lemon_squeezy_webhook(request: Request):
    """
    Lemon Squeezy에서 결제 성공 시 호출하는 URL입니다.
    """
    try:
        payload = await request.json()
        event_name = payload.get("meta", {}).get("event_name")
        
        print(f"🔔 Webhook Event Received: {event_name}")

        # 결제 성공 이벤트인 경우 (order_created)
        if event_name == "order_created":
            # 프론트엔드에서 보낸 user_id 확인 (custom_data 안에 있음)
            custom_data = payload.get("meta", {}).get("custom_data", {})
            user_id = custom_data.get("user_id")
            
            if user_id:
                print(f"💰 입금 확인! 유저({user_id})에게 50크레딧 충전 시도...")
                
                # 1. 현재 크레딧 조회
                res = supabase.table("profiles").select("credits").eq("id", user_id).execute()
                
                if res.data:
                    current = res.data[0]['credits']
                    # 2. 크레딧 +50 업데이트
                    supabase.table("profiles").update({"credits": current + 50}).eq("id", user_id).execute()
                    print("✅ 충전 완료!")
                    return {"status": "charged", "user_id": user_id}
                else:
                    print(f"❌ DB에 없는 유저입니다: {user_id}")
            else:
                print("⚠️ 결제 데이터에 user_id가 없습니다.")
        
        return {"status": "ignored"}
        
    except Exception as e:
        print(f"❌ Webhook Error: {e}")
        raise HTTPException(status_code=500, detail=str(e))