# Migration Folder Tree Structure

## 목적
레거시 디자인 시스템에서 shadcn/ui 기반 모던 디자인 시스템으로 마이그레이션하는 과정에서의 폴더 구조 설계

## 설계 원칙
1. **shadcn/ui 철학 유지**: `components/ui/` 폴더에 순수 UI 컴포넌트 배치
2. **도메인 컴포넌트 그룹화**: 기능별로 컴포넌트를 그룹화 (`tables/`, `forms/`)
3. **점진적 마이그레이션**: 레거시 컴포넌트를 `_legacy/` 폴더로 명확히 구분
4. **확장성**: 새 기능 추가 시 폴더만 추가하면 됨

---

## 📁 전체 폴더 구조

```
packages/after/src/
├── components/
│   ├── ui/                           # shadcn/ui 순수 UI 컴포넌트
│   │   ├── button.tsx               # ✅ 마이그레이션 완료
│   │   ├── badge.tsx                # ✅ 마이그레이션 완료
│   │   ├── table.tsx                # 🚧 진행 중 (순수 UI로 리팩토링)
│   │   ├── input.tsx                # ⏳ 예정
│   │   ├── select.tsx               # ⏳ 예정
│   │   ├── textarea.tsx             # ⏳ 예정
│   │   ├── checkbox.tsx             # ⏳ 예정
│   │   ├── alert.tsx                # ⏳ 예정
│   │   ├── modal.tsx                # ⏳ 예정
│   │   └── card.tsx                 # ⏳ 예정
│   │
│   ├── tables/                       # 도메인별 Table 컴포넌트
│   │   ├── UserTable.tsx            # 🚧 진행 중
│   │   └── PostTable.tsx            # 🚧 진행 중
│   │
│   ├── forms/                        # Form 컴포넌트들 (나중에)
│   │   ├── UserForm.tsx             # ⏳ 예정
│   │   └── PostForm.tsx             # ⏳ 예정
│   │
│   └── _legacy/                      # 마이그레이션 전 컴포넌트 (참고용)
│       ├── atoms/
│       │   ├── Badge.tsx            # → ui/badge.tsx로 마이그레이션됨
│       │   └── Button.tsx           # → ui/button.tsx로 마이그레이션됨
│       ├── molecules/
│       │   ├── FormInput.tsx
│       │   ├── FormSelect.tsx
│       │   ├── FormTextarea.tsx
│       │   └── FormCheckbox.tsx
│       └── organisms/
│           ├── Header.tsx
│           ├── Card.tsx
│           ├── Modal.tsx
│           ├── Table.tsx            # → ui/table.tsx + tables/로 분리 중
│           └── Alert.tsx
│
├── hooks/                            # Custom Hooks
│   ├── useTableCellRenderer.ts      # 🚧 진행 중 (Table 관련 로직)
│   └── useFormValidation.ts         # ⏳ 예정
│
├── lib/                              # 유틸리티 함수
│   └── utils.ts                     # shadcn/ui cn() 헬퍼
│
├── pages/                            # 페이지 컴포넌트
│   └── ManagementPage.tsx           # 🚧 진행 중 (UserTable/PostTable 적용)
│
├── services/                         # 비즈니스 로직 / API
│   ├── userService.ts
│   └── postService.ts
│
├── styles/                           # 글로벌 스타일
│   └── components.css               # TailwindCSS + 디자인 토큰
│
└── types/                            # TypeScript 타입 정의 (선택)
    ├── user.ts
    └── post.ts
```

---

## 📊 마이그레이션 상태

### ✅ 완료
- `components/ui/button.tsx` - Button 컴포넌트
- `components/ui/badge.tsx` - Badge 컴포넌트
- `styles/components.css` - 디자인 토큰 추가 (warning, info)

### 🚧 진행 중
- `components/ui/table.tsx` - Table을 순수 UI로 리팩토링
- `components/tables/UserTable.tsx` - User 도메인 Table
- `components/tables/PostTable.tsx` - Post 도메인 Table
- `pages/ManagementPage.tsx` - UserTable/PostTable 적용

### ⏳ 예정
- Form 컴포넌트들 (Input, Select, Textarea, Checkbox)
- Organism 컴포넌트들 (Alert, Modal, Card, Header)

---

## 🎯 각 폴더의 책임

### `components/ui/`
**역할:** shadcn/ui 스타일의 순수 UI 컴포넌트
**특징:**
- 도메인 로직 없음
- 재사용 가능
- CVA로 variant 관리
- TypeScript 타입 안전성

**예시:**
```tsx
// components/ui/badge.tsx
export function Badge({ variant, size, pill, children }) {
  return <span className={cn(badgeVariants({ variant, size, pill }))}>{children}</span>;
}
```

---

### `components/tables/`
**역할:** 도메인별 Table 컴포넌트
**특징:**
- `components/ui/table.tsx`를 사용
- 도메인 데이터 → UI 매핑 로직 포함
- columns 정의 포함

**예시:**
```tsx
// components/tables/UserTable.tsx
export function UserTable({ data, onEdit, onDelete }) {
  const columns = [
    {
      key: 'role',
      header: '역할',
      render: (role) => <Badge variant={roleVariantMap[role]}>...</Badge>
    },
  ];
  return <Table columns={columns} data={data} />;
}
```

---

### `components/forms/` (예정)
**역할:** Form 관련 컴포넌트
**특징:**
- Form validation 로직 포함
- react-hook-form 연동 (선택)

---

### `components/_legacy/`
**역할:** 마이그레이션 전 레거시 컴포넌트 보관
**특징:**
- 참고용으로 보존
- 마이그레이션 완료 후 삭제 예정
- 언더스코어(`_`)로 시작하여 IDE에서 하단에 표시

---

### `hooks/`
**역할:** Custom Hooks (비즈니스 로직 추상화)
**특징:**
- 상태 관리 로직
- 데이터 변환 로직
- 사이드 이펙트 관리

**예시:**
```tsx
// hooks/useTableCellRenderer.ts
export function useTableBadgeMappings() {
  const getUserRoleBadgeProps = (role: string) => {
    return { variant: roleVariantMap[role], label: roleLabelMap[role] };
  };
  return { getUserRoleBadgeProps };
}
```

---

### `lib/`
**역할:** 유틸리티 함수
**특징:**
- 순수 함수
- 재사용 가능한 헬퍼

---

### `pages/`
**역할:** 페이지 컴포넌트 (라우팅 단위)
**특징:**
- 비즈니스 로직 조합
- 상태 관리
- 레이아웃 구성

---

### `services/`
**역할:** 비즈니스 로직 / API 통신
**특징:**
- localStorage 또는 API 통신
- CRUD 로직
- Validation

---

## 🔄 마이그레이션 워크플로우

### 1단계: UI 컴포넌트 마이그레이션
```
_legacy/atoms/Button.tsx → ui/button.tsx (✅ 완료)
_legacy/atoms/Badge.tsx → ui/badge.tsx (✅ 완료)
_legacy/organisms/Table.tsx → ui/table.tsx (🚧 진행 중)
```

### 2단계: 도메인 컴포넌트 생성
```
ui/table.tsx 기반으로:
  → tables/UserTable.tsx (🚧 진행 중)
  → tables/PostTable.tsx (🚧 진행 중)
```

### 3단계: 페이지 업데이트
```
pages/ManagementPage.tsx에서:
  - _legacy/organisms/Table 제거
  - tables/UserTable, tables/PostTable 사용
```

### 4단계: 레거시 정리
```
마이그레이션 완료 후:
  → _legacy/ 폴더 삭제
```

---

## 📝 네이밍 컨벤션

### 파일명
- **UI 컴포넌트**: `kebab-case.tsx` (shadcn/ui 스타일)
  - 예: `button.tsx`, `badge.tsx`, `table.tsx`
- **도메인 컴포넌트**: `PascalCase.tsx`
  - 예: `UserTable.tsx`, `PostTable.tsx`
- **Hooks**: `camelCase.ts`
  - 예: `useTableCellRenderer.ts`

### Import 경로
```tsx
// UI 컴포넌트
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

// 도메인 컴포넌트
import { UserTable } from "@/components/tables/UserTable";

// Hooks
import { useTableBadgeMappings } from "@/hooks/useTableCellRenderer";

// Services
import { userService } from "@/services/userService";
```

---

## 🎨 디렉토리 컬러 가이드 (IDE)

```
📦 components/
  📁 ui/           (파랑) - 순수 UI
  📁 tables/       (초록) - 도메인 컴포넌트
  📁 forms/        (초록) - 도메인 컴포넌트
  📂 _legacy/      (회색) - 레거시 (마이그레이션 후 삭제)

📁 hooks/          (보라) - Custom Hooks
📁 lib/            (노랑) - 유틸리티
📁 pages/          (빨강) - 페이지
📁 services/       (주황) - 비즈니스 로직
```

---

## ✅ 체크리스트

마이그레이션 시 확인 사항:

- [ ] 새 컴포넌트는 `components/ui/`에 배치
- [ ] 도메인 로직은 `components/tables/` 또는 `components/forms/`에 배치
- [ ] Custom Hooks는 `hooks/`에 배치
- [ ] 레거시 컴포넌트는 `_legacy/`로 이동 (삭제 전까지)
- [ ] Import 경로는 `@/` alias 사용
- [ ] TypeScript 타입 정의 명확히
- [ ] 디자인 토큰 사용 (하드코딩 금지)

---

**작성일**: 2025-11-26
**버전**: 1.0
**상태**: 진행 중 (Badge 마이그레이션 완료, Table 리팩토링 진행 중)
