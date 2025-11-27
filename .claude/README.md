# .claude 폴더 구조 가이드

이 폴더에는 Claude Code의 동작을 제어하는 설정과 가이드가 있습니다.

## 📚 읽기 전략

```
1. CLAUDE.md (루트) → 프로젝트 개요 + 인덱스
2. .claude/guides/ → 핵심 가이드 (필요시)
3. .claude/commands/ → 상세 문서 (필요시)
4. .claude/reference/ → 예시 및 백업
```

**중요**: 모든 문서를 한번에 읽지 마세요! 필요할 때만 참조하세요.

## 📂 폴더 구조

### `/guides/` - 빠른 참조 (핵심만)

**목적**: 즉시 로드 가능한 압축된 가이드

| 파일 | 용도 | 길이 |
|------|------|------|
| `task-manager-core.md` | 태스크 매니저 핵심 원칙 | ~80줄 |
| `session-logger-core.md` | 세션 로거 핵심 원칙 | ~60줄 |

**언제 읽나요?**
- 태스크 매니저: 과제 관련 질문 감지 시
- 세션 로거: "오늘은 여기까지" 감지 시

### `/commands/task-manager/` - 상세 가이드

**목적**: 깊이 있는 설명과 예시

| 파일 | 용도 | 길이 |
|------|------|------|
| `TASK_MANAGER.md` | 태스크 매니저 상세 가이드 | 415줄 |
| `WORKFLOWS.md` | 6개 워크플로우 설명 | 553줄 |
| `session-logger.md` | 세션 로거 상세 가이드 | 540줄 |
| `templates/` | 템플릿 파일들 | - |

**언제 읽나요?**
- 특정 워크플로우 세부사항 필요 시
- 예시 코드 참고 시
- 트러블슈팅 시

### `/tasks/` - 데이터 및 진행 상황

**목적**: 현재 진행 상황 추적

| 파일/폴더 | 용도 |
|-----------|------|
| `breakdown.md` | 24개 태스크 상세 분해 (609줄) |
| `progress.json` | 전체 진행률 데이터 |
| `current-session.json` | 현재 학습 세션 데이터 |
| `learning-sessions/` | 저장된 학습 기록들 |

**언제 읽나요?**
- 다음 태스크 확인 시
- 진행률 체크 시
- 이전 세션 복기 시

### `/doc/` - 프로젝트 문서

**목적**: 프로젝트별 요구사항

| 파일 | 용도 |
|------|------|
| `chapter_goal.md` | Chapter3-1 과제 목표 (227줄) |

### `/reference/` - 백업 및 예시

**목적**: 원본 보존 및 예시 모음

| 파일 | 용도 |
|------|------|
| `CLAUDE.md.backup` | 원본 CLAUDE.md (523줄) |
| *(향후 추가)* | 예시 모음 |

## 🔄 정보 흐름

### 시나리오 1: 사용자가 과제 질문

```
1. CLAUDE.md 읽기 (Task Manager 섹션)
   ↓
2. 트리거 감지 ("어떻게", "왜")
   ↓
3. .claude/guides/task-manager-core.md 로드
   ↓
4. 코칭 모드 활성화
   ↓
5. (필요시) WORKFLOWS.md 참조
```

**로드되는 총량**:
- CLAUDE.md: 251줄
- task-manager-core.md: 80줄
- **합계: ~330줄** (기존 523줄 대비)

### 시나리오 2: 세션 종료

```
1. CLAUDE.md 읽기 (Session Logger 섹션)
   ↓
2. 트리거 감지 ("여기까지")
   ↓
3. .claude/guides/session-logger-core.md 로드
   ↓
4. session-logger.md 참조 (데이터 수집 로직)
   ↓
5. Notion 마크다운 생성
```

## 📊 파일 크기 비교

### Before (통합 구조)
```
CLAUDE.md: 523줄
→ 모든 정보가 한 파일에
→ 매번 전체 로드
```

### After (모듈 구조)
```
CLAUDE.md: 251줄 (인덱스)
guides/: ~140줄 (핵심 2개)
commands/: ~1,500줄 (상세, 필요시만)
→ 필요한 것만 로드
→ 컨텍스트 70% 절감
```

## 🎯 베스트 프랙티스

### For Claude Code:

1. **Lazy Loading**
   ```
   ✅ CLAUDE.md → guides/ → commands/
   ❌ 모든 파일 동시 로드
   ```

2. **조건부 참조**
   ```
   IF 트리거 감지
   THEN guides/ 로드
   IF 더 필요
   THEN commands/ 참조
   ```

3. **캐싱**
   ```
   한번 읽은 가이드는 세션 동안 재사용
   ```

### For Users:

1. **문서 탐색**
   - CLAUDE.md 먼저
   - guides/ 다음
   - commands/ 필요시

2. **컨텍스트 절약**
   - 한번에 하나의 주제만
   - 상세 문서는 꼭 필요할 때만

## 🔗 주요 링크

**시작점**:
- 📄 `../CLAUDE.md` - 프로젝트 개요

**빠른 참조**:
- 🎓 `guides/task-manager-core.md`
- 📚 `guides/session-logger-core.md`

**상세 문서**:
- 📖 `commands/task-manager/TASK_MANAGER.md`
- 📖 `commands/task-manager/WORKFLOWS.md`
- 📖 `commands/task-manager/session-logger.md`

**데이터**:
- 📋 `tasks/breakdown.md`
- 📊 `tasks/progress.json`
- 📚 `tasks/learning-sessions/`

---

**핵심 원칙: 필요한 것만, 필요할 때만** 🎯
