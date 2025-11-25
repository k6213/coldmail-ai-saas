import os
from dotenv import load_dotenv
import google.generativeai as genai

load_dotenv()
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

print("📡 구글 서버에 사용 가능한 모델 목록을 요청 중입니다...")

try:
    # generateContent(텍스트 생성) 기능을 지원하는 모델만 필터링
    models = [m for m in genai.list_models() if 'generateContent' in m.supported_generation_methods]
    
    if models:
        print(f"\n✅ 사용 가능한 모델 {len(models)}개를 찾았습니다:")
        for m in models:
            print(f" - {m.name}")
    else:
        print("⚠️ 사용 가능한 모델이 없습니다. API 키 권한을 확인하세요.")

except Exception as e:
    print(f"❌ 에러 발생: {e}")