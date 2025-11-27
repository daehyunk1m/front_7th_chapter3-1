import { useCallback, useEffect, useState } from "react";
import { userService } from "../services/userService";
import { postService } from "../services/postService";
import type { User } from "../services/userService";
import type { Post } from "../services/postService";

export type EntityType = "user" | "post";
export type Entity = User | Post;

export type FormData = Record<string, string | undefined>;

export const useManagement = () => {
  const [entityType, setEntityType] = useState<EntityType>("post");
  const [data, setData] = useState<Entity[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Entity | null>(null);
  const [showSuccessAlert, setShowSuccessAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showErrorAlert, setShowErrorAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState<FormData>({});

  const loadData = useCallback(async () => {
    try {
      let result: Entity[];

      if (entityType === "user") {
        result = await userService.getAll();
      } else {
        result = await postService.getAll();
      }

      setData(result);
    } catch {
      setErrorMessage("데이터를 불러오는데 실패했습니다");
      setShowErrorAlert(true);
    }
  }, [entityType]);

  useEffect(() => {
    loadData();
    setFormData({});
    setIsCreateModalOpen(false);
    setIsEditModalOpen(false);
    setSelectedItem(null);
  }, [loadData]);

  const handleCreate = async () => {
    try {
      if (entityType === "user") {
        await userService.create({
          username: formData.username ?? "",
          email: formData.email ?? "",
          role: (formData.role ?? "user") as User["role"],
          status: (formData.status ?? "active") as User["status"],
        });
      } else {
        await postService.create({
          title: formData.title ?? "",
          content: formData.content ?? "",
          author: formData.author ?? "",
          category: formData.category ?? "",
          status: (formData.status ?? "draft") as Post["status"],
        });
      }

      await loadData();
      setIsCreateModalOpen(false);
      setFormData({});
      setAlertMessage(`${entityType === "user" ? "사용자" : "게시글"}가 생성되었습니다`);
      setShowSuccessAlert(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "생성에 실패했습니다";
      setErrorMessage(message);
      setShowErrorAlert(true);
    }
  };

  const handleEdit = (item: Entity) => {
    setSelectedItem(item);

    if (entityType === "user") {
      const user = item as User;
      setFormData({
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    } else {
      const post = item as Post;
      setFormData({
        title: post.title,
        content: post.content,
        author: post.author,
        category: post.category,
        status: post.status,
      });
    }

    setIsEditModalOpen(true);
  };

  const handleUpdate = async () => {
    if (!selectedItem) return;

    try {
      if (entityType === "user") {
        await userService.update(selectedItem.id, formData as Partial<Omit<User, "id" | "createdAt">>);
      } else {
        await postService.update(selectedItem.id, formData as Partial<Omit<Post, "id" | "createdAt" | "views">>);
      }

      await loadData();
      setIsEditModalOpen(false);
      setFormData({});
      setSelectedItem(null);
      setAlertMessage(`${entityType === "user" ? "사용자" : "게시글"}가 수정되었습니다`);
      setShowSuccessAlert(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "수정에 실패했습니다";
      setErrorMessage(message);
      setShowErrorAlert(true);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("정말 삭제하시겠습니까?")) return;

    try {
      if (entityType === "user") {
        await userService.delete(id);
      } else {
        await postService.delete(id);
      }

      await loadData();
      setAlertMessage("삭제되었습니다");
      setShowSuccessAlert(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "삭제에 실패했습니다";
      setErrorMessage(message);
      setShowErrorAlert(true);
    }
  };

  const handleStatusAction = async (id: number, action: "publish" | "archive" | "restore") => {
    if (entityType !== "post") return;

    try {
      if (action === "publish") {
        await postService.publish(id);
      } else if (action === "archive") {
        await postService.archive(id);
      } else if (action === "restore") {
        await postService.restore(id);
      }

      await loadData();
      const message = action === "publish" ? "게시" : action === "archive" ? "보관" : "복원";
      setAlertMessage(`${message}되었습니다`);
      setShowSuccessAlert(true);
    } catch (err) {
      const message = err instanceof Error ? err.message : "작업에 실패했습니다";
      setErrorMessage(message);
      setShowErrorAlert(true);
    }
  };

  return {
    entityType,
    setEntityType,
    data,
    formData,
    setFormData,
    showSuccessAlert,
    setShowSuccessAlert,
    isCreateModalOpen,
    setIsCreateModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    selectedItem,
    setSelectedItem,

    alertMessage,
    showErrorAlert,
    setShowErrorAlert,
    errorMessage,

    handleCreate,
    handleEdit,
    handleUpdate,
    handleDelete,
    handleStatusAction,
  };
};
