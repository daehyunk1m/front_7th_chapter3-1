import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { FormCheckbox } from "@/components/forms/FormCheckbox";

const meta = {
  title: "Forms/FormCheckbox",
  component: FormCheckbox,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    checked: {
      control: "boolean",
      description: "체크 상태",
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
} satisfies Meta<typeof FormCheckbox>;

export default meta;
type Story = StoryObj<typeof FormCheckbox>;

// 기본 체크박스
export const Default: Story = {
  args: {
    name: "default",
    checked: false,
    onChange: () => {},
    label: "Accept terms and conditions",
  },
};

// 체크된 상태
export const Checked: Story = {
  args: {
    name: "checked",
    checked: true,
    onChange: () => {},
    label: "This is checked",
  },
};

// 에러 상태
export const WithError: Story = {
  args: {
    name: "error",
    checked: false,
    onChange: () => {},
    label: "Accept terms and conditions",
    error: "You must accept the terms to continue",
  },
};

// 힌트 텍스트
export const WithHint: Story = {
  args: {
    name: "hint",
    checked: false,
    onChange: () => {},
    label: "Subscribe to newsletter",
    hint: "We'll send you updates about new features",
  },
};

// 비활성화
export const Disabled: Story = {
  args: {
    name: "disabled",
    checked: false,
    onChange: () => {},
    label: "This option is disabled",
    disabled: true,
  },
};

// 비활성화 + 체크
export const DisabledChecked: Story = {
  args: {
    name: "disabled-checked",
    checked: true,
    onChange: () => {},
    label: "This option is disabled but checked",
    disabled: true,
  },
};

// 여러 체크박스 그룹
export const CheckboxGroup: Story = {
  render: () => {
    const [values, setValues] = useState({
      email: true,
      sms: false,
      push: true,
    });

    return (
      <div className="space-y-3">
        <p className="text-sm font-medium text-foreground mb-2">Notification Preferences</p>
        <FormCheckbox
          name="email"
          checked={values.email}
          onChange={(checked) => setValues({ ...values, email: checked })}
          label="Email notifications"
          hint="Receive updates via email"
        />
        <FormCheckbox
          name="sms"
          checked={values.sms}
          onChange={(checked) => setValues({ ...values, sms: checked })}
          label="SMS notifications"
          hint="Receive updates via text message"
        />
        <FormCheckbox
          name="push"
          checked={values.push}
          onChange={(checked) => setValues({ ...values, push: checked })}
          label="Push notifications"
          hint="Receive updates in your browser"
        />
      </div>
    );
  },
};

// 인터랙티브 예시
export const Interactive: Story = {
  render: () => {
    const [checked, setChecked] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = () => {
      if (!checked) {
        setError("You must accept the terms");
      } else {
        setError("");
        alert("Form submitted!");
      }
    };

    return (
      <div className="space-y-4">
        <FormCheckbox
          name="terms"
          checked={checked}
          onChange={(value) => {
            setChecked(value);
            if (value) setError("");
          }}
          label="I agree to the Terms of Service and Privacy Policy"
          error={error}
        />
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-primary text-primary-foreground rounded"
        >
          Submit
        </button>
      </div>
    );
  },
};
