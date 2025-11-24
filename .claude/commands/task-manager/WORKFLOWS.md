# Chapter3-1 과제 워크플로우

이 문서는 Chapter3-1 과제를 효과적으로 진행하기 위한 워크플로우를 정의합니다.

## 📋 전체 워크플로우 개요

```
1. 과제 이해 및 분석
   ↓
2. before 패키지 문제점 파악
   ↓
3. shadcn/ui 설치 및 학습
   ↓
4. 컴포넌트별 마이그레이션
   ↓
5. Storybook 문서화
   ↓
6. 최종 검증 및 제출
```

---

## 워크플로우 1: 과제 시작하기

### 목표
프로젝트 구조와 요구사항을 이해하고 학습 방향을 설정합니다.

### 단계

**Step 1: 문서 읽기**
```markdown
📚 **읽어야 할 문서들:**
1. `.claude/doc/chapter_goal.md` - 과제 목표와 요구사항
2. `CLAUDE.md` - 프로젝트 아키텍처
3. `packages/before/README.md` (있다면)
```

**Step 2: 개발 환경 확인**
```bash
# 의존성 설치 확인
pnpm install

# before 패키지 실행해보기
pnpm dev:before

# after 패키지 구조 확인
ls packages/after/src
```

**Step 3: 학습 목표 명확히 하기**
```markdown
✅ **체크리스트:**
- [ ] Atomic Design의 개념과 실무의 차이점 이해
- [ ] CSS의 문제점과 TailwindCSS의 장점 파악
- [ ] CVA의 variants 패턴 이해
- [ ] shadcn/ui의 설계 철학 학습
- [ ] Storybook의 필요성 인식
```

**🤔 스스로 질문하기:**
- "왜 Atomic Design 폴더 구조를 그대로 따르지 말라고 할까?"
- "CSS에서 TailwindCSS로 마이그레이션하면 어떤 점이 좋을까?"
- "왜 UI 컴포넌트에서 비즈니스 로직을 분리해야 할까?"

---

## 워크플로우 2: Before 패키지 분석

### 목표
레거시 시스템의 문제점을 파악하고 개선 포인트를 찾습니다.

### 단계

**Step 1: 컴포넌트 구조 분석**
```markdown
📁 **분석할 컴포넌트들:**
1. `packages/before/src/components/atoms/Button.tsx`
2. `packages/before/src/components/atoms/Badge.tsx`
3. `packages/before/src/components/molecules/FormInput.tsx`
4. `packages/before/src/components/organisms/Card.tsx`
5. `packages/before/src/pages/ManagementPage.tsx`
```

**Step 2: 문제점 체크리스트**
```markdown
각 컴포넌트를 보면서 다음을 확인하세요:

🔍 **API 일관성:**
- [ ] props 이름이 컴포넌트마다 다른가?
- [ ] 같은 개념이 다른 이름으로 표현되는가? (size vs width)

🔍 **스타일링 방식:**
- [ ] 인라인 스타일이 사용되는가?
- [ ] 하드코딩된 색상 값이 있는가?
- [ ] CSS Modules와 인라인 스타일이 혼재하는가?

🔍 **비즈니스 로직 혼재:**
- [ ] UI 컴포넌트에 권한 체크 로직이 있는가?
- [ ] 상태 관리 로직이 UI 컴포넌트 안에 있는가?

🔍 **타입 안전성:**
- [ ] 타입 정의가 느슨한가?
- [ ] any 타입이 사용되는가?

🔍 **접근성:**
- [ ] ARIA 속성이 부족한가?
- [ ] 키보드 네비게이션이 안 되는가?
```

**Step 3: 개선 포인트 정리**
```markdown
📝 **분석 결과를 `.claude/tasks/before-analysis.md`에 정리:**

## Button 컴포넌트 문제점
1. [문제점 1]
2. [문제점 2]
→ 개선 방향: [어떻게 고칠 것인가]

## FormInput 컴포넌트 문제점
...
```

**💡 코칭 노트:**
> 이 단계는 매우 중요합니다! 문제점을 명확히 파악해야
> after 패키지에서 무엇을 개선할지 알 수 있습니다.

---

## 워크플로우 3: shadcn/ui 설치 및 학습

### 목표
shadcn/ui의 구조와 패턴을 이해합니다.

### 단계

**Step 1: shadcn/ui 초기 설정**
```bash
cd packages/after

# shadcn/ui 설정 확인 (이미 되어있을 수 있음)
# components.json 파일 확인

# Button 컴포넌트 설치
npx shadcn@latest add button
```

**Step 2: 생성된 파일 분석**
```markdown
📝 **분석할 파일:**
`packages/after/src/components/ui/button.tsx`

🤔 **질문하며 읽기:**
1. cva 함수는 어떤 역할을 하는가?
2. buttonVariants의 구조는 어떻게 되어있는가?
3. defaultVariants는 왜 필요한가?
4. forwardRef는 왜 사용하는가?
5. cn 헬퍼 함수는 무엇을 하는가?
```

**Step 3: 추가 컴포넌트 설치**
```bash
# 과제에 필요한 컴포넌트들
npx shadcn@latest add input
npx shadcn@latest add select
npx shadcn@latest add textarea
npx shadcn@latest add card
npx shadcn@latest add table
npx shadcn@latest add badge
```

**Step 4: 패턴 이해하기**
```markdown
💡 **shadcn/ui의 핵심 패턴:**

1. **Radix UI 기반**
   - 접근성이 기본으로 제공됨
   - 키보드 네비게이션 지원

2. **CVA Variants**
   - 선언적으로 스타일 변형 정의
   - 타입 안전성 보장

3. **TailwindCSS**
   - 유틸리티 클래스로 스타일링
   - 커스터마이징 용이

4. **복사 가능한 코드**
   - 소스 코드가 프로젝트에 포함됨
   - 자유롭게 수정 가능
```

---

## 워크플로우 4: 컴포넌트 마이그레이션

### 목표
before의 컴포넌트를 after로 마이그레이션합니다.

### 마이그레이션 순서

**권장 순서:**
```
1. Button (가장 간단)
   ↓
2. Badge
   ↓
3. Input / FormInput
   ↓
4. Select / FormSelect
   ↓
5. Textarea / FormTextarea
   ↓
6. Card
   ↓
7. Table
   ↓
8. ManagementPage (통합)
```

### 컴포넌트별 마이그레이션 체크리스트

#### 단계별 프로세스

**Phase 1: 분석**
```markdown
🔍 **before 컴포넌트 분석:**
- [ ] 컴포넌트의 순수한 UI 책임 식별
- [ ] 비즈니스 로직 추출 목록 작성
- [ ] 필요한 props 목록 정리
- [ ] variants 종류 파악
```

**Phase 2: shadcn/ui 기반 구현**
```markdown
💡 **after 컴포넌트 구현:**
- [ ] shadcn/ui 컴포넌트 설치 (이미 했다면 스킵)
- [ ] CVA variants 정의 (before의 조건부 스타일링 → variants)
- [ ] TailwindCSS로 스타일링
- [ ] TypeScript 타입 정의 (VariantProps 활용)
- [ ] 접근성 속성 추가
```

**Phase 3: 비즈니스 로직 분리**
```markdown
🔧 **로직 분리:**
- [ ] UI 컴포넌트에서 비즈니스 로직 제거
- [ ] 로직을 custom hooks로 추출
- [ ] 페이지 컴포넌트로 로직 이동
```

**Phase 4: 테스트**
```markdown
✅ **검증:**
- [ ] 컴포넌트가 렌더링되는가?
- [ ] 모든 variants가 작동하는가?
- [ ] 타입 에러가 없는가?
- [ ] 접근성이 보장되는가?
```

### 예시: Button 마이그레이션

**🎯 작업 흐름:**

```markdown
**1. before/Button 분석**
```typescript
// packages/before/src/components/atoms/Button.tsx
// 🔍 문제점:
// - 인라인 스타일 하드코딩
// - variant별로 if문 사용
// - 비즈니스 로직 포함 가능성
```

**2. shadcn/ui Button 참고**
```bash
npx shadcn@latest add button
# → packages/after/src/components/ui/button.tsx 생성됨
```

**3. 커스터마이징 (필요시)**
```typescript
// 프로젝트 요구사항에 맞게 variants 추가/수정
const buttonVariants = cva(
  "inline-flex items-center justify-center...",
  {
    variants: {
      variant: {
        // 프로젝트에 필요한 variant 정의
      }
    }
  }
)
```

**4. 비즈니스 로직 분리**
```typescript
// ❌ Button 컴포넌트 안에 (잘못됨)
if (userRole === 'admin') { ... }

// ✅ 페이지 컴포넌트에서 (올바름)
<Button disabled={!isAdmin}>...</Button>
```
```

---

## 워크플로우 5: Storybook 문서화

### 목표
각 컴포넌트의 사용법을 Storybook으로 문서화합니다.

### 단계

**Step 1: Storybook 설정 확인**
```bash
# Storybook 실행
pnpm storybook

# 브라우저에서 http://localhost:6006 열림
```

**Step 2: Story 작성**
```markdown
📝 **각 컴포넌트별 Story 파일 생성:**

`packages/after/src/stories/Button.stories.tsx`
`packages/after/src/stories/Input.stories.tsx`
...
```

**Step 3: Story 작성 체크리스트**
```markdown
✅ **Story 작성 시 포함할 것:**
- [ ] 기본 예시 (Primary)
- [ ] 모든 variant 예시
- [ ] 모든 size 예시
- [ ] disabled 상태
- [ ] 복합 상태 (variant + size 조합)
- [ ] 실제 사용 예시
```

**Step 4: Controls 활용**
```typescript
// 사용자가 Storybook UI에서 props를 변경할 수 있도록
export const Interactive: Story = {
  args: {
    variant: "primary",
    size: "md",
    children: "Button",
  },
}
```

**💡 코칭 노트:**
> Storybook은 단순 문서화를 넘어, 컴포넌트를 개발하고
> 테스트하는 환경으로 활용할 수 있습니다.

---

## 워크플로우 6: 최종 검증 및 제출

### 목표
과제 요구사항을 모두 충족했는지 확인합니다.

### 최종 체크리스트

**✅ 기본 과제**
```markdown
- [ ] after 패키지에 디자인 시스템 구현 완료
  - [ ] 모든 UI 컴포넌트가 components/ui/ 폴더에 있음
  - [ ] TailwindCSS + CVA 사용
  - [ ] 비즈니스 로직 분리됨

- [ ] ManagementPage 마이그레이션 완료
  - [ ] before의 모든 기능이 after에서 작동
  - [ ] UI 컴포넌트는 순수하게 유지
  - [ ] 비즈니스 로직은 페이지/hooks에 있음

- [ ] Storybook 문서화 완료
  - [ ] 주요 컴포넌트 stories 작성
  - [ ] 모든 variants 예시 포함
  - [ ] 빌드 성공 (pnpm build-storybook)

- [ ] README 문서화
  - [ ] before/after 비교 설명
  - [ ] 개선사항 정리
  - [ ] 학습 내용 정리
```

**🏆 심화 과제 (선택)**
```markdown
- [ ] Dark mode 지원
  - [ ] 테마 전환 시스템 구현
  - [ ] 모든 컴포넌트 dark mode 대응

- [ ] Dark mode toggle 버튼
  - [ ] 테마 전환 버튼 컴포넌트
  - [ ] 상태 유지 (localStorage)
```

### 빌드 및 테스트

**Step 1: 모든 패키지 빌드**
```bash
# 루트에서 실행
pnpm build

# 빌드 성공 확인
pnpm build:before
pnpm build:after
```

**Step 2: 테스트 실행**
```bash
pnpm test:run

# 모든 테스트 통과 확인
```

**Step 3: Lint 확인**
```bash
pnpm lint

# 린트 에러 없음 확인
```

**Step 4: Storybook 빌드**
```bash
pnpm build-storybook

# 빌드 성공 확인
```

### 제출 전 최종 확인

```markdown
🔍 **셀프 리뷰:**

1. **코드 품질**
   - [ ] 일관된 코딩 스타일
   - [ ] 의미 있는 변수/함수명
   - [ ] 불필요한 주석 제거
   - [ ] console.log 제거

2. **학습 목표 달성**
   - [ ] Atomic Design의 개념과 실무 차이 이해함
   - [ ] CSS 문제점과 TailwindCSS 장점 체감함
   - [ ] CVA variants 패턴 이해함
   - [ ] shadcn/ui 설계 철학 습득함
   - [ ] Storybook의 가치 이해함

3. **문서화**
   - [ ] README가 프로젝트를 설명함
   - [ ] before/after 비교가 명확함
   - [ ] 개선사항이 구체적으로 기술됨
   - [ ] 학습 내용이 정리됨

4. **동작 확인**
   - [ ] before 패키지 정상 작동
   - [ ] after 패키지 정상 작동
   - [ ] 모든 기능 동일하게 작동
   - [ ] Storybook 정상 표시
```

---

## 막혔을 때 (Troubleshooting)

### 시나리오별 대처 방법

**🚧 "CVA를 어떻게 사용하는지 모르겠어요"**
```markdown
1. shadcn/ui Button 코드 다시 보기
2. variants 구조 한 줄씩 분석
3. 간단한 예제부터 시작 (variant 1개만)
4. 점진적으로 확장
```

**🚧 "비즈니스 로직을 어떻게 분리하나요?"**
```markdown
1. 컴포넌트에서 "판단"하는 코드 찾기
2. 판단 로직을 상위 컴포넌트로 이동
3. UI 컴포넌트는 props만 받아서 렌더링
4. custom hooks 고려
```

**🚧 "Storybook이 잘 안돼요"**
```markdown
1. .storybook/main.ts 설정 확인
2. Story 파일 이름 규칙 확인 (*.stories.tsx)
3. 브라우저 콘솔 에러 확인
4. Storybook 재시작
```

**🚧 "타입 에러가 계속 나요"**
```markdown
1. VariantProps 사용하고 있는지 확인
2. type vs interface 일관성 확인
3. any 타입 사용하지 않기
4. 공식 타입 정의 참고
```

---

## 일일 작업 패턴

### 권장 작업 흐름

**🌅 작업 시작 시:**
```markdown
1. 오늘 할 작업 확인
2. 목표 명확히 하기
3. 관련 문서 다시 읽기
```

**⚙️ 작업 중:**
```markdown
1. 한 번에 하나의 컴포넌트에 집중
2. 막히면 질문하기 (태스크 매니저가 도와줌)
3. 작은 단위로 테스트하며 진행
```

**🌙 작업 종료 시:**
```markdown
1. 진행 상황 정리
2. 내일 할 일 계획
3. 배운 내용 메모
```

---

## 참고 자료

**프로젝트 문서:**
- `.claude/doc/chapter_goal.md`
- `CLAUDE.md`
- `.claude/tasks/breakdown.md`

**외부 문서:**
- [shadcn/ui 공식 문서](https://ui.shadcn.com)
- [TailwindCSS 공식 문서](https://tailwindcss.com)
- [CVA 문서](https://cva.style)
- [Storybook 문서](https://storybook.js.org)

---

**💡 기억하세요:**
이 과제의 핵심은 "왜"를 이해하는 것입니다.
단순히 코드를 작성하는 것이 아니라,
레거시 시스템의 문제점과 현대적 해결책을 체감하는 것이 목표입니다.

막히거나 궁금한 점이 있으면 언제든 질문하세요!
태스크 매니저가 함께 고민하고 가이드해드립니다.
