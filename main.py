import os
import sys
from dotenv import load_dotenv
import google.generativeai as genai
from duckduckgo_search import DDGS

load_dotenv()
api_key = os.getenv("GEMINI_API_KEY")

if not api_key:
    print("❌ 에러: .env 파일에 GEMINI_API_KEY가 없습니다.")
    sys.exit(1)

genai.configure(api_key=api_key)
# 속도와 대량 처리를 위해 Flash 모델 사용
model = genai.GenerativeModel('models/gemini-2.5-flash') 

def get_company_resources(company_name, include_hiring=False):
    """
    뉴스 리스트와 채용 정보를 분리해서 반환 (Dictionary 구조)
    """
    print(f"🔍 '{company_name}' 심층 분석 중... (Hiring: {include_hiring})")
    
    data = {
        "news": [],
        "hiring": []
    }

    try:
        with DDGS() as ddgs:
            # 1. 뉴스 검색 (최대 3개)
            news_keywords = f"{company_name} Korea Business latest news"
            search_results = ddgs.text(news_keywords, max_results=3)
            for r in search_results:
                # 제목과 요약만 깔끔하게 저장
                data["news"].append(f"{r['title']} : {r['body']}")
            
            # 2. 채용 정보 검색 (옵션)
            if include_hiring:
                # 전략 A: 링크드인
                linkedin_query = f"site:linkedin.com/jobs {company_name} hiring"
                linkedin_results = ddgs.text(linkedin_query, max_results=2)
                for r in linkedin_results:
                    data["hiring"].append(f"[LinkedIn] {r['title']}")

                # 전략 B: 국내 채용 (원티드, 로켓펀치 등)
                korea_job_query = f"{company_name} 채용 공고 기술 스택"
                job_results = ddgs.text(korea_job_query, max_results=2)
                for r in job_results:
                    data["hiring"].append(f"[Recruit] {r['title']}")
                
    except Exception as e:
        print(f"⚠️ 검색 중 오류: {e}")

    return data

def generate_cold_email(company_name, resources, my_service, my_desc, language="Korean", tone="Professional"):
    """
    분리된 데이터를 AI에게 Context로 제공
    """
    print(f"✍️ 메일 작성 중... (Tone: {tone})")

    # 리스트를 텍스트로 변환
    news_text = "\n".join(resources["news"]) if resources["news"] else "특이 뉴스 없음"
    hiring_text = "\n".join(resources["hiring"]) if resources["hiring"] else "채용 정보 없음"

    # 톤앤매너 프롬프트
    tone_instruction = ""
    if tone == "Friendly": 
        tone_instruction = "😊 친근함: 이모지를 적절히 사용하고, 에너지가 넘치는 스타트업 분위기로 작성하세요."
    elif tone == "Direct": 
        tone_instruction = "⚡ 직설적: 인사말은 최소화하고, 본론과 숫자 위주로 간결하게 작성하세요."
    else: 
        tone_instruction = "👔 전문적: 정중하고 신뢰감 있는 비즈니스 어휘를 사용하세요."

    prompt = f"""
    당신은 B2B 세일즈 카피라이터입니다. 
    아래 [최신 뉴스]와 [채용 정보]를 훅(Hook)으로 사용하여, 내 서비스를 제안하는 콜드메일을 작성하세요.

    [타겟 기업]: {company_name}
    
    [최신 뉴스]:
    {news_text}
    
    [채용/성장 정보]:
    {hiring_text}

    [나의 서비스]: {my_service}
    [서비스 설명]: {my_desc}

    [작성 규칙]:
    1. **언어:** {language}
    2. **톤앤매너:** {tone_instruction}
    3. **전략:** 뉴스나 채용 정보(예: React 개발자 채용)가 있다면 반드시 언급하며 내 서비스와 연결(Bridge)하세요.
    4. **출력:** 제목과 본문만 깔끔하게 작성하세요.
    """

    try:
        response = model.generate_content(prompt)
        return response.text
    except Exception as e:
        return f"❌ AI 생성 실패: {e}"