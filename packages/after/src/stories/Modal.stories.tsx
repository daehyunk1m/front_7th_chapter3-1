import type { Meta, StoryObj } from "@storybook/react-vite";
import { useState } from "react";
import { Modal } from "@/components/modal/Modal";
import { Button } from "@/components/ui/button";
import { FormInput } from "@/components/forms/FormInput";

const meta = {
  title: "Components/Modal",
  component: Modal,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    size: {
      control: "select",
      options: ["small", "medium", "large"],
      description: "모달의 크기",
    },
    isOpen: {
      control: "boolean",
      description: "모달 열림 상태",
    },
    showFooter: {
      control: "boolean",
      description: "푸터 표시 여부",
    },
  },
} satisfies Meta<typeof Modal>;

export default meta;
type Story = StoryObj<typeof Modal>;

// 기본 모달
export const Default: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Modal Title">
          <p className="text-sm">This is the modal content.</p>
        </Modal>
      </>
    );
  },
};

// Small 사이즈
export const Small: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Small Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Small Modal"
          size="small"
        >
          <p className="text-sm">This is a small modal (400px max-width).</p>
        </Modal>
      </>
    );
  },
};

// Large 사이즈
export const Large: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Large Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Large Modal"
          size="large"
        >
          <p className="text-sm">This is a large modal (900px max-width).</p>
          <p className="text-sm mt-2">
            It can contain more content and is suitable for complex forms or detailed information.
          </p>
        </Modal>
      </>
    );
  },
};

// 푸터 포함
export const WithFooter: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Modal with Footer</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Confirm Action"
          showFooter
          footerContent={
            <>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setIsOpen(false)}>
                Confirm
              </Button>
            </>
          }
        >
          <p className="text-sm">Are you sure you want to perform this action?</p>
        </Modal>
      </>
    );
  },
};

// 폼 모달
export const FormModal: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);
    const [formData, setFormData] = useState({ name: "", email: "" });

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open Form Modal</Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Edit User"
          showFooter
          footerContent={
            <>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => {
                  console.log("Form data:", formData);
                  setIsOpen(false);
                }}
              >
                Save
              </Button>
            </>
          }
        >
          <div className="space-y-4">
            <FormInput
              name="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              label="Name"
              placeholder="Enter name"
            />
            <FormInput
              name="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              label="Email"
              type="email"
              placeholder="Enter email"
            />
          </div>
        </Modal>
      </>
    );
  },
};

// 삭제 확인 모달
export const DeleteConfirmation: Story = {
  render: () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <Button variant="danger" onClick={() => setIsOpen(true)}>
          Delete Item
        </Button>
        <Modal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          title="Delete Item"
          size="small"
          showFooter
          footerContent={
            <>
              <Button variant="secondary" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button variant="danger" onClick={() => setIsOpen(false)}>
                Delete
              </Button>
            </>
          }
        >
          <p className="text-sm">
            Are you sure you want to delete this item? This action cannot be undone.
          </p>
        </Modal>
      </>
    );
  },
};

// 모든 사이즈 비교
export const AllSizes: Story = {
  render: () => {
    const [openModal, setOpenModal] = useState<"small" | "medium" | "large" | null>(null);

    return (
      <div className="flex gap-2">
        <Button onClick={() => setOpenModal("small")}>Small</Button>
        <Button onClick={() => setOpenModal("medium")}>Medium</Button>
        <Button onClick={() => setOpenModal("large")}>Large</Button>

        <Modal
          isOpen={openModal === "small"}
          onClose={() => setOpenModal(null)}
          title="Small Modal"
          size="small"
        >
          <p>max-width: 400px</p>
        </Modal>

        <Modal
          isOpen={openModal === "medium"}
          onClose={() => setOpenModal(null)}
          title="Medium Modal"
          size="medium"
        >
          <p>max-width: 600px</p>
        </Modal>

        <Modal
          isOpen={openModal === "large"}
          onClose={() => setOpenModal(null)}
          title="Large Modal"
          size="large"
        >
          <p>max-width: 900px</p>
        </Modal>
      </div>
    );
  },
};
