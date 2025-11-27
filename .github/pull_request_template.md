# Chapter3-1. UI 컴포넌트 모듈화와 디자인 시스템

## 배포 페이지

- Web: https://daehyunk1m.github.io/front_7th_chapter3-1/
- Storybook: https://6928ba0a2bd985c8ecf19284-chdnrmlyvu.chromatic.com/

## 과제 목표

**레거시 코드베이스를 현대적인 디자인 시스템으로 개편하는 실무 경험**

1. 정리되지 않은 레거시 코드의 문제점 식별 및 분석
2. TailwindCSS, shadcn/ui, CVA 등의 현대 도구 활용
3. 일관된 디자인 토큰과 컴포넌트 API 구축
4. UI와 비즈니스 로직이 적절한 분리된 리팩토링

---

## Before 패키지 분석 후 After 패키지 개편

### 개편 목표

**디자인 시스템**

- TailwindCSS 기반 일관된 디자인 토큰 정의
- 하드코딩 제거, 재사용 가능한 스타일 시스템 구축
- dark mode, 반응형 등 확장 가능한 구조

**컴포넌트 아키텍처**

- UI 컴포넌트는 순수하게 UI만 담당
- 도메인 로직은 적절히 분리
- 일관된 컴포넌트 API 설계

### 사용할 도구

**TailwindCSS 4.x**

- 디자인 토큰 기반 스타일링
- 유틸리티 클래스 활용
- dark mode, 반응형 내장 지원

**shadcn/ui**

- Radix UI 기반, 접근성 내장
- 복사 가능한 컴포넌트 (라이브러리가 아닌 소스코드)
- 자유로운 커스터마이징

**CVA (Class Variance Authority)**

- 선언적 variants 패턴
- 타입 안전한 스타일 조합
- 조건부 스타일링 처리

**React Hook Form + Zod**

- 선언적 폼 검증
- 타입 안전한 스키마
- 최소 리렌더링 최적화

---

## 필수 과제

### 1. 디자인 시스템 구축

- [x] TailwindCSS 설정 및 디자인 토큰 정의
- [x] shadcn/ui 컴포넌트 설치 (Button, Input, Select, Card, Table 등)
- [x] CVA를 활용한 variants 패턴 적용
- [x] 일관된 스타일 시스템 구축

### 2. Before 패키지 분석

- [x] Before 패키지 실행 및 전체 코드 탐색
- [x] 스타일링, 컴포넌트 설계, 폼 관리 측면에서 문제점 파악
- [x] 개선이 필요한 부분과 그 이유 정리

### 3. 컴포넌트 개편

- [x] UI와 비즈니스 로직 분리
- [x] 순수한 UI 컴포넌트로 재구성
- [x] 일관된 컴포넌트 API 설계
- [x] 적절한 컴포넌트 구조 설계

---

## 심화 과제

- [x] Dark Mode 완전 지원 (CSS Variables + Tailwind)
- [x] Design Token 시스템 고도화 (색상 팔레트, 타이포그래피 스케일)
- [x] 뷰와 비즈니스로직이 분리되도록

---

## 과제 회고

+11-24
디자인 시스템으로 마이그레이션하는데, 체크해야할 내용과 소스코드가 많아 학습 목표를 쉽게 잊어버리지 않을까 하는 생각에
태스크 매니저 에이전트를 만들어 에이전트의 가이드를 토대로 태스크를 풀어나가려고 생각.
클로드 코드로 태스크 매니저 에이전트를 만들면서 학습 과정을 자동으로 기록할 수 있게 프로세스를 짜달라고 함.
소스코드의 현 문제점과 마이그레이션 방향성을 정하는 것과 그 결과를 남기는 것으로 하루의 학습 과정을 마무리

+11-25
shadcn/ui 초기 설정과 Button 마이그레이션을 진행.
CVA 패턴을 처음 적용해보면서 `bg-[var(--primary)]` 대신 `bg-primary`처럼 시맨틱 토큰을 사용해야 한다는 것을 깨달음.
레거시 Button에 있던 비즈니스 로직(권한 체크 등)을 제거하고 순수 UI 컴포넌트로 분리하는 경험.
"디자인 시스템에서 컴포넌트는 레이아웃 책임이 없다"는 원칙을 배움 (margin은 사용하는 쪽에서 className으로 제어).

+11-26
Badge 컴포넌트 마이그레이션 후 Table의 관심사 분리에 집중.
Table 3레이어 아키텍처를 설계: `ManagementPage → UserTable/PostTable → Table`.
커스텀 훅에서 JSX를 반환하면 안 된다는 것을 배우고, 도메인 테이블 컴포넌트로 분리.

+11-27
FormInput, FormSelect 마이그레이션 진행.
`ManagementPage`에 배치한 `useValidation`에서 모든 필드에 동일 에러가 표시되는 버그.
`Record<string, string>` 자료구조로 필드별 에러를 분리하여 해결.
테스트 코드가 `querySelector('select')`를 사용해서 Radix Select 대신 NativeSelect를 선택.
FormTextarea, Modal, Alert, Card 마이그레이션까지 완료하고 레거시 컴포넌트를 완전히 정리.
Storybook 10개 컴포넌트 Stories 작성, ESLint 설정 개선으로 마무리.

> 과제를 진행하면서 느낀 점, 배운 점을 자유롭게 작성해주세요.

### Before 패키지에서 발견한 문제점

**1. 관심사 분리 실패**

- UI 컴포넌트에 비즈니스 로직 혼재 (Button: 권한 체크, FormInput: 예약어/금칙어 검증)
- 도메인 의존성으로 인해 컴포넌트 재사용성 저하

**2. 일관성 없는 API 설계**

- 동일 기능에 다른 prop명 사용 (`width` vs `size`, `helpText` vs `description`)
- 크기 값도 컴포넌트별로 상이 (`small/medium/large` vs `sm/md/lg`)

**3. 스타일링 문제**

- 인라인 스타일 하드코딩 (`style={{ color: '#d32f2f' }}`)
- 반복되는 동적 클래스 생성 로직
- 조건부 스타일링의 가독성 저하

### 개편 과정에서 집중한 부분

**1. UI와 비즈니스 로직 분리**

- UI 컴포넌트는 순수하게 UI만 담당하도록 재설계
- 도메인 로직은 `useManagement`처럼 커스텀 훅으로 분리
- 컴포넌트 props에서 도메인 관련 타입 제거

**2. CVA를 활용한 일관된 variants 패턴**

- 모든 컴포넌트에 `variant`, `size` 등 통일된 API 적용
- `defaultVariants`로 기본값 명시
- 타입 안전성을 위해 `VariantProps` 활용

**3. shadcn/ui 래핑 패턴**

- Radix UI 기반 접근성 내장 컴포넌트 활용
- 원본 유지하면서 프로젝트 요구사항에 맞게 래핑

### 사용한 기술 스택 경험

| 기술               | 소감                                                                  |
| ------------------ | --------------------------------------------------------------------- |
| **TailwindCSS v4** | CSS 파일에서 직접 `@import "tailwindcss"` 사용. v3 대비 설정 간소화됨 |
| **CVA**            | variants 패턴으로 조건부 스타일링을 선언적으로 처리. 타입 추론도 우수 |
| **shadcn/ui**      | 라이브러리가 아닌 소스 복사 방식이라 커스터마이징 자유로움            |
| **Radix UI**       | Dialog, Checkbox 등 접근성이 내장된 primitive 컴포넌트 경험           |
| **Storybook**      | 컴포넌트 문서화와 독립 개발 환경으로 유용. 10개 컴포넌트 Stories 작성 |

### 어려웠던 점과 해결 방법

**1. useValidation 필드별 에러 스코프 문제**

- 문제: 단일 `internalError` 상태로 모든 FormInput에 동일한 에러 메시지가 표시됨
  - 각 필드가 개별 스코프를 갖지 않고 하나의 상태를 공유
- 해결: `Record<string, string>` 자료구조로 변경하여 `{ username: "에러1", email: "에러2" }` 형태로 필드별 관리

**2. shadcn/ui Dialog와 기존 API 호환**

- 문제: Dialog의 compound component 패턴이 기존 `isOpen/onClose` API와 맞지 않음
- 해결: `<Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>` 패턴으로 외부 제어

**3. 테스트 코드와 컴포넌트 선택의 충돌**

- 문제: 기존 테스트가 `querySelector('select')`로 네이티브 select 태그를 찾음
  - Radix Select는 `<button>`, `<div>` 기반 portal 렌더링이라 테스트 실패
- 해결: shadcn/ui NativeSelect를 선택하여 실제 `<select>` 태그 유지

### 리뷰받고 싶거나 질문하고 싶은 내용

Atomic Design 폴더 구조를 제거하고 components/ui, components/forms, components/tables 등으로 재구성했습니다. 그런데 작업 중 "이 컴포넌트는 어느 폴더에 넣어야 하지?"라는 판단이 자주 흔들렸습니다. FSD(Feature-Sliced Design)가 대안으로 자주 언급되는데, 소규모 프로젝트에서는 feature별 폴더 중복이 오버헤드처럼 느껴집니다. 프로젝트 규모에 따라 어떤 폴더 구조를 선택하시는지, 또는 FSD를 미리 연습해두는 게 실무에 도움이 될지 조언 부탁드립니다.
