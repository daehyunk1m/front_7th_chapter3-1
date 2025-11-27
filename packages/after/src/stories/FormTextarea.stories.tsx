import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { FormTextarea } from "@/components/forms/FormTextarea";

const meta = {
  title: "Forms/FormTextarea",
  component: FormTextarea,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    rows: {
      control: "number",
      description: "텍스트 영역의 행 수",
    },
    required: {
      control: "boolean",
      description: "필수 입력 여부",
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
} satisfies Meta<typeof FormTextarea>;

export default meta;
type Story = StoryObj<typeof FormTextarea>;

// 기본 텍스트영역
export const Default: Story = {
  args: {
    name: "default",
    value: "",
    onChange: () => {},
    label: "Description",
    placeholder: "Enter description...",
  },
};

// 라벨과 함께
export const WithLabel: Story = {
  args: {
    name: "content",
    value: "",
    onChange: () => {},
    label: "Content",
    placeholder: "Enter your content here...",
  },
};

// 필수 입력
export const Required: Story = {
  args: {
    name: "required",
    value: "",
    onChange: () => {},
    label: "Required Field",
    placeholder: "This field is required",
    required: true,
  },
};

// 에러 상태
export const WithError: Story = {
  args: {
    name: "error",
    value: "Too short",
    onChange: () => {},
    label: "Content",
    error: "Content must be at least 20 characters",
  },
};

// 도움말 텍스트
export const WithHelpText: Story = {
  args: {
    name: "help",
    value: "",
    onChange: () => {},
    label: "Bio",
    placeholder: "Tell us about yourself...",
    helpText: "Maximum 500 characters",
  },
};

// 비활성화
export const Disabled: Story = {
  args: {
    name: "disabled",
    value: "This content cannot be edited",
    onChange: () => {},
    label: "Disabled Textarea",
    disabled: true,
  },
};

// 다양한 행 수
export const DifferentRows: Story = {
  render: () => {
    const [values, setValues] = useState({
      small: "",
      medium: "",
      large: "",
    });

    return (
      <div className="space-y-4">
        <FormTextarea
          name="small"
          value={values.small}
          onChange={(value) => setValues({ ...values, small: value })}
          label="Small (2 rows)"
          rows={2}
          placeholder="2 rows"
        />
        <FormTextarea
          name="medium"
          value={values.medium}
          onChange={(value) => setValues({ ...values, medium: value })}
          label="Medium (4 rows - default)"
          rows={4}
          placeholder="4 rows"
        />
        <FormTextarea
          name="large"
          value={values.large}
          onChange={(value) => setValues({ ...values, large: value })}
          label="Large (8 rows)"
          rows={8}
          placeholder="8 rows"
        />
      </div>
    );
  },
};

// 인터랙티브 예시
export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState("");
    const maxLength = 200;

    return (
      <div className="space-y-2">
        <FormTextarea
          name="interactive"
          value={value}
          onChange={setValue}
          label="Message"
          placeholder="Type your message..."
          helpText={`${value.length}/${maxLength} characters`}
          error={value.length > maxLength ? "Maximum length exceeded" : undefined}
        />
      </div>
    );
  },
};
