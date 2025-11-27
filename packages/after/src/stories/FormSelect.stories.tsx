import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { FormSelect } from "@/components/forms/FormSelect";

const meta = {
  title: "Forms/FormSelect",
  component: FormSelect,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    required: {
      control: "boolean",
      description: "필수 선택 여부",
    },
    disabled: {
      control: "boolean",
      description: "비활성화 상태",
    },
  },
  decorators: [
    (Story) => (
      <div style={{ width: "400px" }}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof FormSelect>;

export default meta;
type Story = StoryObj<typeof FormSelect>;

const defaultOptions = [
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const roleOptions = [
  { value: "admin", label: "Admin" },
  { value: "moderator", label: "Moderator" },
  { value: "user", label: "User" },
];

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "suspended", label: "Suspended" },
];

// 기본 셀렉트
export const Default: Story = {
  args: {
    name: "default",
    value: "",
    onChange: () => {},
    options: defaultOptions,
    label: "Select Option",
  },
};

// 라벨과 함께
export const WithLabel: Story = {
  args: {
    name: "role",
    value: "",
    onChange: () => {},
    options: roleOptions,
    label: "User Role",
    placeholder: "Select a role...",
  },
};

// 필수 선택
export const Required: Story = {
  args: {
    name: "status",
    value: "",
    onChange: () => {},
    options: statusOptions,
    label: "Status",
    required: true,
  },
};

// 에러 상태
export const WithError: Story = {
  args: {
    name: "error",
    value: "",
    onChange: () => {},
    options: defaultOptions,
    label: "Select Option",
    error: "Please select an option",
  },
};

// 도움말 텍스트
export const WithHelpText: Story = {
  args: {
    name: "help",
    value: "",
    onChange: () => {},
    options: roleOptions,
    label: "User Role",
    helpText: "Select the user's permission level",
  },
};

// 비활성화
export const Disabled: Story = {
  args: {
    name: "disabled",
    value: "admin",
    onChange: () => {},
    options: roleOptions,
    label: "User Role",
    disabled: true,
  },
};

// 인터랙티브 예시
export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState("");

    return (
      <div className="space-y-4">
        <FormSelect
          name="interactive"
          value={value}
          onChange={setValue}
          options={roleOptions}
          label="Select Role"
          placeholder="Choose a role..."
        />
        <p className="text-sm text-muted-foreground">
          Selected: {value || "None"}
        </p>
      </div>
    );
  },
};
