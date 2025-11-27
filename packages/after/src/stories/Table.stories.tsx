import type { Meta, StoryObj } from "@storybook/react-vite";
import { Table, type Column } from "@/components/tables/Table";
import { Badge } from "@/components/ui/badge";

const meta = {
  title: "Components/Table",
  component: Table,
  parameters: {
    layout: "padded",
  },
  tags: ["autodocs"],
  argTypes: {
    striped: {
      control: "boolean",
      description: "줄무늬 배경",
    },
    bordered: {
      control: "boolean",
      description: "테두리 표시",
    },
    hover: {
      control: "boolean",
      description: "호버 효과",
    },
    sortable: {
      control: "boolean",
      description: "정렬 기능",
    },
    searchable: {
      control: "boolean",
      description: "검색 기능",
    },
    pageSize: {
      control: "number",
      description: "페이지당 행 수",
    },
  },
} satisfies Meta<typeof Table>;

export default meta;
type Story = StoryObj<typeof meta>;

// 샘플 데이터
const sampleColumns: Column[] = [
  { key: "id", header: "ID", width: "60px" },
  { key: "name", header: "Name" },
  { key: "email", header: "Email" },
  { key: "role", header: "Role" },
  { key: "status", header: "Status" },
];

const sampleData = [
  { id: 1, name: "John Doe", email: "john@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Jane Smith", email: "jane@example.com", role: "User", status: "Active" },
  { id: 3, name: "Bob Johnson", email: "bob@example.com", role: "Moderator", status: "Inactive" },
  { id: 4, name: "Alice Brown", email: "alice@example.com", role: "User", status: "Active" },
  { id: 5, name: "Charlie Wilson", email: "charlie@example.com", role: "User", status: "Suspended" },
];

// 기본 테이블
export const Default: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
  },
};

// Striped
export const Striped: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    striped: true,
  },
};

// Bordered
export const Bordered: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    bordered: true,
  },
};

// Hover
export const WithHover: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    hover: true,
  },
};

// 모든 스타일 조합
export const AllStyles: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    striped: true,
    bordered: true,
    hover: true,
  },
};

// 정렬 가능
export const Sortable: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    sortable: true,
    hover: true,
  },
};

// 검색 가능
export const Searchable: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    searchable: true,
    hover: true,
  },
};

// 커스텀 렌더링
export const CustomRendering: Story = {
  args: {
    columns: [
      { key: "id", header: "ID", width: "60px" },
      { key: "name", header: "Name" },
      { key: "email", header: "Email" },
      {
        key: "role",
        header: "Role",
        render: (value) => {
          const variant =
            value === "Admin" ? "danger" :
            value === "Moderator" ? "warning" : "secondary";
          return <Badge variant={variant}>{value}</Badge>;
        },
      },
      {
        key: "status",
        header: "Status",
        render: (value) => {
          const variant =
            value === "Active" ? "success" :
            value === "Inactive" ? "secondary" : "danger";
          return <Badge variant={variant}>{value}</Badge>;
        },
      },
    ],
    data: sampleData,
    hover: true,
  },
};

// 페이지네이션
const largeData = Array.from({ length: 25 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  role: ["Admin", "User", "Moderator"][i % 3],
  status: ["Active", "Inactive", "Suspended"][i % 3],
}));

export const WithPagination: Story = {
  args: {
    columns: sampleColumns,
    data: largeData,
    pageSize: 5,
    hover: true,
  },
};

// Row 클릭
export const RowClickable: Story = {
  args: {
    columns: sampleColumns,
    data: sampleData,
    hover: true,
    onRowClick: (row) => alert(`Clicked: ${(row as { name: string }).name}`),
  },
};

// 빈 테이블
export const EmptyTable: Story = {
  args: {
    columns: sampleColumns,
    data: [],
  },
};

// 전체 기능
export const FullFeatured: Story = {
  args: {
    columns: [
      { key: "id", header: "ID", width: "60px" },
      { key: "name", header: "Name" },
      { key: "email", header: "Email" },
      {
        key: "role",
        header: "Role",
        render: (value) => {
          const variant =
            value === "Admin" ? "danger" :
            value === "Moderator" ? "warning" : "secondary";
          return <Badge variant={variant}>{value}</Badge>;
        },
      },
      {
        key: "status",
        header: "Status",
        render: (value) => {
          const variant =
            value === "Active" ? "success" :
            value === "Inactive" ? "secondary" : "danger";
          return <Badge variant={variant}>{value}</Badge>;
        },
      },
    ],
    data: largeData,
    striped: true,
    bordered: false,
    hover: true,
    sortable: true,
    searchable: true,
    pageSize: 10,
  },
};
