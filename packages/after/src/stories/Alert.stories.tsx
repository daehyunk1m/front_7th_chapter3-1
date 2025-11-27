import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Alert } from "@/components/alert/Alert";

const meta = {
  title: "Components/Alert",
  component: Alert,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    variant: {
      control: "select",
      options: ["default", "info", "success", "warning", "error"],
      description: "알림의 시각적 스타일",
    },
    showIcon: {
      control: "boolean",
      description: "아이콘 표시 여부",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "500px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Alert>;

export default meta;
type Story = StoryObj<typeof meta>;

// 기본 알림
export const Default: Story = {
  args: {
    children: "This is a default alert message.",
    variant: "default",
  },
};

// Info
export const Info: Story = {
  args: {
    variant: "info",
    title: "Information",
    children: "This is an informational alert. It provides helpful information to the user.",
  },
};

// Success
export const Success: Story = {
  args: {
    variant: "success",
    title: "Success",
    children: "Your changes have been saved successfully!",
  },
};

// Warning
export const Warning: Story = {
  args: {
    variant: "warning",
    title: "Warning",
    children: "Please review your input before proceeding.",
  },
};

// Error
export const Error: Story = {
  args: {
    variant: "error",
    title: "Error",
    children: "An error occurred while processing your request.",
  },
};

// 타이틀 없음
export const WithoutTitle: Story = {
  args: {
    variant: "info",
    children: "This alert has no title, only content.",
  },
};

// 아이콘 없음
export const WithoutIcon: Story = {
  args: {
    variant: "success",
    title: "Success",
    children: "This alert has no icon.",
    showIcon: false,
  },
};

// 닫기 버튼
export const Closable: Story = {
  render: () => {
    const [isVisible, setIsVisible] = useState(true);

    if (!isVisible) {
      return (
        <button
          onClick={() => setIsVisible(true)}
          className="text-sm text-primary underline"
        >
          Show Alert Again
        </button>
      );
    }

    return (
      <Alert
        variant="info"
        title="Closable Alert"
        onClose={() => setIsVisible(false)}
      >
        Click the X button to close this alert.
      </Alert>
    );
  },
};

// All Variants 한눈에 보기
export const AllVariants: Story = {
  render: () => (
    <div className="space-y-2">
      <Alert variant="default" title="Default">
        Default alert message
      </Alert>
      <Alert variant="info" title="Info">
        Informational alert message
      </Alert>
      <Alert variant="success" title="Success">
        Success alert message
      </Alert>
      <Alert variant="warning" title="Warning">
        Warning alert message
      </Alert>
      <Alert variant="error" title="Error">
        Error alert message
      </Alert>
    </div>
  ),
};

// 실제 사용 예시
export const RealWorldExamples: Story = {
  render: () => (
    <div className="space-y-3">
      <Alert variant="success" title="Payment Successful">
        Your payment of $99.00 has been processed successfully. A receipt has been sent to your email.
      </Alert>

      <Alert variant="warning" title="Session Expiring">
        Your session will expire in 5 minutes. Please save your work to avoid losing changes.
      </Alert>

      <Alert variant="error" title="Upload Failed">
        The file could not be uploaded. Please check your internet connection and try again.
      </Alert>

      <Alert variant="info">
        Tip: You can use keyboard shortcuts to navigate faster. Press <kbd className="px-1 bg-muted rounded">?</kbd> to see all shortcuts.
      </Alert>
    </div>
  ),
};
