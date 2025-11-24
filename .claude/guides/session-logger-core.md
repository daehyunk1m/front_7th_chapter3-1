# 학습 세션 로거 (핵심)

> 이 문서는 핵심 원칙만 담고 있습니다.
> 상세 가이드: `.claude/commands/task-manager/session-logger.md`

## 🎯 목적

학습 과정을 자동으로 기록하여 PR/회고 작성 시 활용합니다.

## 🔔 자동 트리거 키워드

```
"오늘은 여기까지"
"학습 마무리"
"세션 종료"
"오늘 작업 끝"
```

## 📊 수집 항목

1. **대화 내용**
   - 질문/답변
   - 학습한 개념
   - 문제 해결 과정

2. **코드 변경**
   - Git 커밋 (`git log --since`)
   - 변경 파일
   - 주요 스니펫 (10-30줄)

3. **진행 상황**
   - 완료 태스크
   - 소요 시간
   - Phase 진행도

## 🔄 처리 흐름

```
트리거 감지
    ↓
사용자 확인
    ↓
데이터 수집 & 분석
    ↓
Notion 마크다운 생성
    ↓
파일 저장 (YYYY-MM-DD-session-N.md)
    ↓
통계 표시
```

## 📝 생성 파일 형식

**위치**: `.claude/tasks/learning-sessions/YYYY-MM-DD-session-N.md`

**포함 섹션**:
1. 세션 정보 (시간, 소요)
2. 질문과 답변
3. 학습한 개념
4. 작성한 코드
5. 문제 해결
6. Git 커밋 테이블
7. 핵심 요약
8. **PR/회고용 메모** ⭐

## 🛡️ 보안

자동 필터링:
```
API_KEY=abc123... → API_KEY=***
token: 'xyz456...' → token: '***
```

## 🔗 관련 파일

- **상세 가이드**: `.claude/commands/task-manager/session-logger.md`
- **템플릿**: `.claude/commands/task-manager/templates/notion-session-template.md`
- **현재 세션**: `.claude/tasks/current-session.json`
- **저장소**: `.claude/tasks/learning-sessions/`

## 💡 사용 팁

1. 2-3시간마다 세션 구분
2. 배운 점 명시적 표현
3. 문제 해결 과정 공유
4. PR/회고 작성 시 참고

---

**핵심: 학습 여정 자동 기록** 📚
