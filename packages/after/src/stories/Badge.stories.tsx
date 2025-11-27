import type { Meta, StoryObj } from "@storybook/react-vite";
import { Badge } from "@/components/ui/badge";

const meta = {
  title: "UI/Badge",
  component: Badge,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["primary", "secondary", "success", "danger", "warning", "info"],
      description: "뱃지의 시각적 스타일",
    },
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "뱃지의 크기",
    },
    pill: {
      control: "boolean",
      description: "pill 모양 사용 여부",
    },
    children: {
      control: "text",
      description: "뱃지 내용",
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 뱃지
export const Default: Story = {
  args: {
    children: "Badge",
    variant: "primary",
    size: "medium",
  },
};

// Variants
export const Primary: Story = {
  args: {
    children: "Primary",
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    children: "Secondary",
    variant: "secondary",
  },
};

export const Success: Story = {
  args: {
    children: "Success",
    variant: "success",
  },
};

export const Danger: Story = {
  args: {
    children: "Danger",
    variant: "danger",
  },
};

export const Warning: Story = {
  args: {
    children: "Warning",
    variant: "warning",
  },
};

export const Info: Story = {
  args: {
    children: "Info",
    variant: "info",
  },
};

// Sizes
export const Small: Story = {
  args: {
    children: "Small",
    size: "small",
  },
};

export const Medium: Story = {
  args: {
    children: "Medium",
    size: "medium",
  },
};

export const Large: Story = {
  args: {
    children: "Large",
    size: "large",
  },
};

// Pill 모양
export const Pill: Story = {
  args: {
    children: "Pill Badge",
    pill: true,
  },
};

// All Variants 한눈에 보기
export const AllVariants: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="primary">Primary</Badge>
      <Badge variant="secondary">Secondary</Badge>
      <Badge variant="success">Success</Badge>
      <Badge variant="danger">Danger</Badge>
      <Badge variant="warning">Warning</Badge>
      <Badge variant="info">Info</Badge>
    </div>
  ),
};

// All Sizes 한눈에 보기
export const AllSizes: Story = {
  render: () => (
    <div className="flex items-center gap-2">
      <Badge size="small">Small</Badge>
      <Badge size="medium">Medium</Badge>
      <Badge size="large">Large</Badge>
    </div>
  ),
};

// 상태 표시 예시
export const StatusExamples: Story = {
  render: () => (
    <div className="flex flex-wrap gap-2">
      <Badge variant="success">Active</Badge>
      <Badge variant="warning">Pending</Badge>
      <Badge variant="danger">Inactive</Badge>
      <Badge variant="info">Draft</Badge>
      <Badge variant="secondary">Archived</Badge>
    </div>
  ),
};
