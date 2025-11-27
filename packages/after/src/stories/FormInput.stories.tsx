import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { FormInput } from "@/components/forms/FormInput";

const meta = {
  title: "Forms/FormInput",
  component: FormInput,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    width: {
      control: "select",
      options: ["small", "medium", "large", "full"],
      description: "입력 필드의 너비",
    },
    type: {
      control: "select",
      options: ["text", "email", "password", "number", "url"],
      description: "입력 타입",
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
} satisfies Meta<typeof FormInput>;

export default meta;
type Story = StoryObj<typeof FormInput>;

// 기본 입력 필드
export const Default: Story = {
  args: {
    name: "default",
    value: "",
    onChange: () => {},
    label: "Label",
    placeholder: "Enter text...",
  },
};

// 라벨과 함께
export const WithLabel: Story = {
  args: {
    name: "username",
    value: "",
    onChange: () => {},
    label: "Username",
    placeholder: "Enter your username",
  },
};

// 필수 입력
export const Required: Story = {
  args: {
    name: "email",
    value: "",
    onChange: () => {},
    label: "Email",
    type: "email",
    placeholder: "Enter your email",
    required: true,
  },
};

// 에러 상태
export const WithError: Story = {
  args: {
    name: "email",
    value: "invalid",
    onChange: () => {},
    label: "Email",
    type: "email",
    error: "Please enter a valid email address",
  },
};

// 도움말 텍스트
export const WithHelpText: Story = {
  args: {
    name: "password",
    value: "",
    onChange: () => {},
    label: "Password",
    type: "password",
    placeholder: "Enter password",
    helpText: "Password must be at least 8 characters",
  },
};

// 비활성화
export const Disabled: Story = {
  args: {
    name: "disabled",
    value: "Disabled value",
    onChange: () => {},
    label: "Disabled Input",
    disabled: true,
  },
};

// 너비 옵션
export const Widths: Story = {
  render: () => {
    const [values, setValues] = useState({
      small: "",
      medium: "",
      large: "",
      full: "",
    });

    return (
      <div className="space-y-4">
        <FormInput
          name="small"
          value={values.small}
          onChange={(e) => setValues({ ...values, small: e.target.value })}
          label="Small Width"
          width="small"
          placeholder="200px"
        />
        <FormInput
          name="medium"
          value={values.medium}
          onChange={(e) => setValues({ ...values, medium: e.target.value })}
          label="Medium Width"
          width="medium"
          placeholder="300px"
        />
        <FormInput
          name="large"
          value={values.large}
          onChange={(e) => setValues({ ...values, large: e.target.value })}
          label="Large Width"
          width="large"
          placeholder="400px"
        />
        <FormInput
          name="full"
          value={values.full}
          onChange={(e) => setValues({ ...values, full: e.target.value })}
          label="Full Width"
          width="full"
          placeholder="100%"
        />
      </div>
    );
  },
};

// 인터랙티브 예시
export const Interactive: Story = {
  render: () => {
    const [value, setValue] = useState("");
    const [error, setError] = useState("");

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);

      if (newValue && !newValue.includes("@")) {
        setError("Email must contain @ symbol");
      } else {
        setError("");
      }
    };

    return (
      <FormInput
        name="interactive-email"
        value={value}
        onChange={handleChange}
        label="Email"
        type="email"
        placeholder="Enter your email"
        error={error}
        required
      />
    );
  },
};
