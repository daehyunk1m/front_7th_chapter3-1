---
description: 학습 세션을 분석하고 Notion 형식의 마크다운 생성
allowed-tools: Read, Write, Bash, Grep, TodoWrite
model: sonnet
---

# 📚 학습 세션 로거

학습 세션을 자동으로 추적하고 Notion 형식의 마크다운으로 정리하는 시스템입니다.

## 🎯 목적

사용자의 학습 여정을 자동으로 기록하여:
- PR 작성 시 참고 자료 제공
- 회고 작성 시 구체적인 근거 제공
- 학습 과정 복기 및 성장 추적
- 개념 정리 및 문제 해결 과정 아카이빙

## 🔔 트리거 (세션 종료 감지)

다음 표현을 감지하면 학습 세션 종료 처리를 시작합니다:

**종료 키워드:**
- "오늘은 여기까지"
- "학습 마무리"
- "세션 종료"
- "오늘 작업 끝"
- "학습 끝"
- "마무리할게요"
- "여기까지 할게요"

**감지 시 동작:**
1. 사용자에게 세션 종료 확인
2. 세션 데이터 수집 및 분석
3. Notion 마크다운 생성
4. 파일 저장 및 확인 메시지

## 📊 수집할 데이터

### 1. 대화 내용 분석

**질문 추출:**
```markdown
기준:
- "어떻게", "왜", "뭔가요", "무엇", "?" 포함
- 사용자의 궁금증이나 요청
- 막힌 부분 표현

저장 형식:
{
  "question": "사용자 질문",
  "summary": "답변 요약",
  "concepts": ["관련 개념들"],
  "codeExample": "코드 예시 (있으면)"
}
```

**학습 개념 추출:**
```markdown
키워드:
- CVA, TailwindCSS, shadcn/ui, Atomic Design
- variants, forwardRef, Radix UI
- TypeScript 타입, VariantProps
- 접근성(a11y), ARIA

추출 기준:
- 태스크 매니저가 설명한 주요 개념
- 코드 예시와 함께 설명된 내용
- "배운 점", "이해했습니다" 등의 표현 주변
```

**문제 해결 추적:**
```markdown
감지 키워드:
- "안돼요", "에러", "문제", "막혔어요"
- "해결했어요", "됐어요"

저장 형식:
{
  "problem": "문제 상황",
  "attempts": ["시도한 방법들"],
  "solution": "최종 해결 방법",
  "lesson": "배운 교훈"
}
```

### 2. 코드 변경 추적

**Git 커밋 로그:**
```bash
# 마지막 세션 이후 커밋 조회
git log --since="<last_session_time>" \
  --format="%h|%ai|%s|%an" \
  --date=iso

# 변경된 파일 목록
git diff --name-status <last_commit>..HEAD
```

**파일 변경 분석:**
```markdown
중요 파일 우선:
- packages/after/src/components/**
- packages/after/src/pages/**
- .claude/**

추출할 정보:
- 파일 경로
- 변경 유형 (생성/수정/삭제)
- 주요 변경 내용 (함수명, 컴포넌트명)
```

### 3. 태스크 진행 상황

**완료/진행 중인 태스크:**
```markdown
확인 위치:
- .claude/tasks/progress.json
- .claude/tasks/breakdown.md
- TodoWrite로 추적된 항목들

추출 정보:
- 완료한 태스크 ID와 제목
- 진행 중인 태스크
- 소요 시간 (예상 vs 실제)
```

### 4. 시간 정보

```markdown
- 세션 시작 시간 (첫 질문 시점)
- 세션 종료 시간 (종료 키워드 감지 시점)
- 총 소요 시간
- 주요 활동별 시간대
```

## 📝 Notion 마크다운 생성 프로세스

### Step 1: 데이터 수집

```markdown
1. current-session.json 읽기 (이전 세션 종료 시점)
2. 현재 시점까지의 대화 분석
3. Git 로그 수집 (git log --since)
4. 파일 변경 확인 (git diff)
5. 태스크 진행 상황 확인 (progress.json)
```

### Step 2: 내용 분류 및 정리

```markdown
질문/답변 섹션:
- 주요 질문 3-5개 선별
- 각 질문의 핵심 답변 요약
- 관련 개념 및 코드 예시 첨부

학습 개념 섹션:
- 새로 배운 개념들 정리
- 각 개념의 핵심 설명
- 실습 내용 요약

작성한 코드 섹션:
- 주요 파일 변경 사항
- 중요 코드 스니펫 (10-20줄)
- 각 코드의 목적과 배운 점

문제 해결 섹션:
- 막혔던 문제들
- 시도한 해결 방법들
- 최종 해결책과 교훈
```

### Step 3: 마크다운 생성

**템플릿 위치:**
`.claude/commands/task-manager/templates/notion-session-template.md`

**변수 치환:**
```markdown
{{SESSION_DATE}}      → 세션 날짜
{{SESSION_NUMBER}}    → 당일 세션 번호
{{START_TIME}}        → 시작 시간
{{END_TIME}}          → 종료 시간
{{DURATION}}          → 소요 시간
{{CURRENT_PHASE}}     → 현재 Phase
{{COMPLETED_TASKS}}   → 완료한 태스크들
{{QUESTIONS}}         → 질문/답변 섹션
{{CONCEPTS}}          → 학습 개념 섹션
{{CODE_CHANGES}}      → 코드 변경 섹션
{{PROBLEMS}}          → 문제 해결 섹션
{{COMMITS}}           → Git 커밋 테이블
{{SUMMARY}}           → 한 줄 요약
{{NEXT_ACTIONS}}      → 다음 할 일
```

### Step 4: 파일 저장

```markdown
저장 위치:
.claude/tasks/learning-sessions/YYYY-MM-DD-session-N.md

파일명 규칙:
- YYYY-MM-DD: 세션 날짜
- session-N: 당일 N번째 세션

예시:
- 2025-11-24-session-1.md (오전 세션)
- 2025-11-24-session-2.md (오후 세션)
```

### Step 5: 확인 및 피드백

```markdown
사용자에게 알림:
"✅ 학습 세션이 기록되었습니다!
📁 파일: .claude/tasks/learning-sessions/2025-11-24-session-1.md
📊 통계:
  - 질문: 5개
  - 학습 개념: 3개
  - 커밋: 2개
  - 소요 시간: 2시간 30분

이 내용은 PR/회고 작성 시 참고하실 수 있습니다!"
```

## 🔄 세션 추적 흐름

### 세션 시작

```markdown
트리거: 사용자의 첫 질문 또는 작업 시작 의사 표현

동작:
1. current-session.json 초기화
   {
     "sessionId": "2025-11-24-session-1",
     "startTime": "2025-11-24T09:00:00Z",
     "endTime": null,
     "status": "active"
   }

2. 조용히 추적 시작 (사용자에게 알리지 않음)
```

### 세션 진행 중

```markdown
추적 내용:
- 모든 질문과 답변
- 파일 생성/수정 (Git 기반)
- 태스크 상태 변경
- 문제 발생 및 해결

저장 방식:
- 메모리에 임시 저장
- current-session.json에 주기적 백업 (선택)
```

### 세션 종료

```markdown
트리거: 종료 키워드 감지

동작:
1. "학습 세션을 마무리할까요?" 확인
2. 사용자 확인 시:
   - 데이터 수집 및 분석
   - Notion 마크다운 생성
   - 파일 저장
   - current-session.json 업데이트
3. 다음 세션을 위한 준비
```

## 📋 자동 분석 알고리즘

### 질문 중요도 판단

```markdown
High Priority (반드시 포함):
- 여러 번 반복된 주제
- 상세한 설명이 필요했던 질문
- 코드 예시를 포함한 답변
- 문제 해결로 이어진 질문

Medium Priority (선택적 포함):
- 간단한 확인 질문
- Yes/No 질문
- 단순 문법 질문

Low Priority (생략 가능):
- 인사, 감사 표현
- 절차적 질문
```

### 개념 추출 로직

```markdown
1. 키워드 매칭
   - 기술 스택 키워드 (CVA, TailwindCSS 등)
   - 디자인 패턴 (Atomic Design, Variants 등)

2. 컨텍스트 분석
   - 설명이 3문장 이상인 경우
   - 코드 예시가 포함된 경우
   - "핵심", "중요", "기억" 키워드 주변

3. 사용자 반응
   - "이해했습니다", "배웠습니다"
   - "이제 알겠어요"
   - 후속 실습으로 이어진 경우
```

### 코드 스니펫 선별

```markdown
포함 기준:
- 새로 작성한 컴포넌트/함수
- 중요한 패턴을 보여주는 코드
- 문제 해결의 핵심이 된 코드
- 10-30줄 내외 (너무 길지 않게)

제외:
- 단순 import 문
- 설정 파일 (너무 길면)
- 자동 생성 코드
- 민감 정보 포함 코드
```

## 🛡️ 보안 및 필터링

### 자동 제거 대상

```markdown
- API 키, 토큰 (pattern: [A-Za-z0-9]{32,})
- 환境 변수 값
- 이메일 주소 (민감한 경우)
- 비밀번호, 시크릿
- 개인 식별 정보
```

### 필터링 패턴

```typescript
const SENSITIVE_PATTERNS = [
  /api[_-]?key\s*[:=]\s*['"][^'"]+['"]/gi,
  /token\s*[:=]\s*['"][^'"]+['"]/gi,
  /password\s*[:=]\s*['"][^'"]+['"]/gi,
  /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
]

// 치환
"API_KEY=abc123..." → "API_KEY=***"
"token: 'xyz456...'" → "token: '***'"
```

## 📊 통계 생성

```markdown
자동 계산:
- 질문 수
- 해결한 문제 수
- 작성한 코드 줄 수 (git diff --stat)
- Git 커밋 횟수
- 완료한 태스크 수
- 소요 시간 (총, Phase별)

통계 위치:
- Notion 마크다운 하단
- progress.json 업데이트
```

## 🔗 통합 포인트

### 태스크 매니저와 연동

```markdown
태스크 완료 시:
- 자동으로 세션 데이터에 기록
- 태스크 ID, 제목, 소요 시간 저장

태스크 시작 시:
- 목표 설정 내용 기록
- 시작 시간 마킹
```

### Git 훅 연동 (선택)

```markdown
커밋 후 자동 기록:
- .git/hooks/post-commit
- 커밋 메시지와 변경 파일 저장
- current-session.json 업데이트
```

### CLAUDE.md 지침

```markdown
세션 종료 감지 시:
1. session-logger.md 참조
2. 자동 분석 프로세스 실행
3. Notion 마크다운 생성
4. 사용자에게 확인 요청
```

## 💡 사용 예시

### 예시 1: 일반적인 세션 종료

**사용자:**
> "오늘은 여기까지!"

**태스크 매니저 응답:**
```markdown
학습 세션을 마무리할까요?

📊 오늘 세션 요약:
- 진행 시간: 2시간 30분
- 질문: 5개
- 완료 태스크: TASK-001, TASK-002
- Git 커밋: 2개

Notion 형식의 학습 기록을 생성하시겠습니까?
[1] 예, 생성해주세요
[2] 아니요, 계속할게요
[3] 내용을 먼저 보여주세요
```

### 예시 2: 내용 미리보기 후 생성

**사용자:**
> "3"

**태스크 매니저:**
```markdown
생성될 내용 미리보기:

## 💬 주요 질문
1. CVA가 뭔가요?
2. forwardRef는 왜 사용하나요?
...

## 💡 학습한 개념
1. CVA Variants 패턴
2. shadcn/ui 설계 철학
...

이대로 생성하시겠습니까? (예/아니요)
```

### 예시 3: 여러 세션

**첫 번째 세션 종료:**
```markdown
✅ 저장 완료: 2025-11-24-session-1.md
```

**두 번째 세션 종료 (같은 날):**
```markdown
✅ 저장 완료: 2025-11-24-session-2.md

💡 팁: 오늘 총 2개의 세션이 기록되었습니다.
전체 목록은 .claude/tasks/learning-sessions/ 에서 확인하세요!
```

## 🎯 베스트 프랙티스

### 사용자에게 권장하는 습관

```markdown
1. 세션 시작 시 목표 언급
   "오늘은 TASK-003까지 완료하는 게 목표야"

2. 배운 점을 명시적으로 표현
   "이제 CVA가 이해됐어요!"

3. 문제 해결 시 과정 공유
   "이 방법으로 해결했어요"

4. 하루에 여러 세션으로 나누기
   - 오전 세션
   - 오후 세션
   - 저녁 세션
```

### 태스크 매니저의 역할

```markdown
1. 자연스럽게 추적
   - 사용자에게 부담 주지 않기
   - 조용히 백그라운드에서 기록

2. 명확한 요약 제공
   - 중요한 내용 우선
   - 읽기 쉬운 형식

3. PR/회고 작성 시 도움
   - "지난 세션 기록을 참고하세요"
   - 구체적인 내용 제시
```

## 🔧 트러블슈팅

### "세션이 너무 길어요"

```markdown
해결:
- 2-3시간마다 세션 구분 권장
- "중간 저장" 기능 제공
- 자동으로 4시간 이상 시 경고
```

### "내용이 너무 많아요"

```markdown
해결:
- 중요도에 따라 필터링
- 요약 레벨 선택 (상세/보통/간단)
- 섹션별 토글 가능한 형식
```

### "이전 세션 내용이 누락됐어요"

```markdown
해결:
- current-session.json 백업 확인
- Git 로그로 복구
- 수동으로 내용 추가 가능
```

## 📚 참고 파일

- `templates/notion-session-template.md` - Notion 마크다운 템플릿
- `.claude/tasks/current-session.json` - 현재 세션 데이터
- `.claude/tasks/learning-sessions/` - 저장된 모든 세션들
- `CLAUDE.md` - 세션 로거 통합 지침

---

**이 시스템은 사용자의 학습 여정을 자동으로 기록하여,**
**성장의 흔적을 남기고 회고의 근거를 제공합니다.** 🚀
