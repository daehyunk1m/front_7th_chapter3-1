import type { Meta, StoryObj } from "@storybook/react-vite";
import { Card } from "@/components/card/Card";
import { Button } from "@/components/ui/button";

const meta = {
  title: "Components/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "bordered", "elevated", "flat"],
      description: "카드의 시각적 스타일",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 카드
export const Default: Story = {
  args: {
    title: "Card Title",
    subtitle: "Card subtitle description",
    children: (
      <p className="text-sm text-muted-foreground">
        This is the card content. You can put any content here.
      </p>
    ),
  },
};

// Variants
export const Bordered: Story = {
  args: {
    variant: "bordered",
    title: "Bordered Card",
    children: <p className="text-sm">Card with border only, no shadow.</p>,
  },
};

export const Elevated: Story = {
  args: {
    variant: "elevated",
    title: "Elevated Card",
    children: <p className="text-sm">Card with enhanced shadow for elevation effect.</p>,
  },
};

export const Flat: Story = {
  args: {
    variant: "flat",
    title: "Flat Card",
    children: <p className="text-sm">Card with muted background, no shadow.</p>,
  },
};

// 헤더 액션
export const WithHeaderActions: Story = {
  args: {
    title: "Card with Actions",
    subtitle: "This card has action buttons",
    headerActions: (
      <Button size="sm" variant="outline">
        Action
      </Button>
    ),
    children: <p className="text-sm">Card content goes here.</p>,
  },
};

// 타이틀만
export const TitleOnly: Story = {
  args: {
    title: "Title Only Card",
    children: <p className="text-sm">Card without subtitle.</p>,
  },
};

// 콘텐츠만 (헤더 없음)
export const ContentOnly: Story = {
  args: {
    children: (
      <div className="text-center py-4">
        <p className="text-lg font-semibold">No Header Card</p>
        <p className="text-sm text-muted-foreground mt-2">
          This card has no title or subtitle.
        </p>
      </div>
    ),
  },
};

// All Variants 한눈에 보기
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-4">
      <Card variant="default" title="Default">
        <p className="text-sm">Default card with shadow</p>
      </Card>
      <Card variant="bordered" title="Bordered">
        <p className="text-sm">Border only, no shadow</p>
      </Card>
      <Card variant="elevated" title="Elevated">
        <p className="text-sm">Enhanced shadow</p>
      </Card>
      <Card variant="flat" title="Flat">
        <p className="text-sm">Muted background, no shadow</p>
      </Card>
    </div>
  ),
  decorators: [
    (Story) => (
      <div style={{ width: "500px" }}>
        <Story />
      </div>
    ),
  ],
};

// 실제 사용 예시
export const RealWorldExample: Story = {
  render: () => (
    <Card
      title="User Profile"
      subtitle="Manage your account settings"
      headerActions={<Button size="sm">Edit</Button>}
    >
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Name</span>
          <span className="text-sm font-medium">John Doe</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Email</span>
          <span className="text-sm font-medium">john@example.com</span>
        </div>
        <div className="flex justify-between">
          <span className="text-sm text-muted-foreground">Role</span>
          <span className="text-sm font-medium">Admin</span>
        </div>
      </div>
    </Card>
  ),
};
