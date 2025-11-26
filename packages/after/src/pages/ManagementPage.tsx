import React from "react";
import { Button } from "@/components/ui/button";
import { Alert, Modal } from "../_legacy/organisms";
import { FormInput, FormSelect, FormTextarea } from "../_legacy/molecules";
import "../styles/components.css";
import { useManagement } from "../hooks/useManagement";
import type { User } from "../services/userService";
import type { Post } from "../services/postService";
import { PostTable } from "@/components/tables/PostTable";
import { UserTable } from "@/components/tables/UserTable";

export const ManagementPage: React.FC = () => {
  const {
    entityType,
    setEntityType,
    data,
    formData,
    setFormData,
    showSuccessAlert,
    setShowSuccessAlert,
    alertMessage,
    showErrorAlert,
    setShowErrorAlert,
    errorMessage,
    isCreateModalOpen,
    setIsCreateModalOpen,
    isEditModalOpen,
    setIsEditModalOpen,
    selectedItem,
    setSelectedItem,
    handleCreate,
    handleEdit,
    handleUpdate,
    handleDelete,
    handleStatusAction,
  } = useManagement();

  const getStats = () => {
    if (entityType === "user") {
      const users = data as User[];
      return {
        total: users.length,
        stat1: {
          label: "활성",
          value: users.filter((u) => u.status === "active").length,
          color: "#2e7d32",
        },
        stat2: {
          label: "비활성",
          value: users.filter((u) => u.status === "inactive").length,
          color: "#ed6c02",
        },
        stat3: {
          label: "정지",
          value: users.filter((u) => u.status === "suspended").length,
          color: "#d32f2f",
        },
        stat4: {
          label: "관리자",
          value: users.filter((u) => u.role === "admin").length,
          color: "#1976d2",
        },
      };
    } else {
      const posts = data as Post[];
      return {
        total: posts.length,
        stat1: {
          label: "게시됨",
          value: posts.filter((p) => p.status === "published").length,
          color: "#2e7d32",
        },
        stat2: {
          label: "임시저장",
          value: posts.filter((p) => p.status === "draft").length,
          color: "#ed6c02",
        },
        stat3: {
          label: "보관됨",
          value: posts.filter((p) => p.status === "archived").length,
          color: "rgba(0, 0, 0, 0.6)",
        },
        stat4: {
          label: "총 조회수",
          value: posts.reduce((sum, p) => sum + p.views, 0),
          color: "#1976d2",
        },
      };
    }
  };

  const stats = getStats();

  return (
    <div style={{ minHeight: "100vh", background: "#f0f0f0" }}>
      <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "20px" }}>
        <div style={{ marginBottom: "20px" }}>
          <h1
            style={{
              fontSize: "24px",
              fontWeight: "bold",
              marginBottom: "5px",
              color: "#333",
            }}
          >
            관리 시스템
          </h1>
          <p style={{ color: "#666", fontSize: "14px" }}>사용자와 게시글을 관리하세요</p>
        </div>

        <div
          style={{
            background: "white",
            border: "1px solid #ddd",
            padding: "10px",
          }}
        >
          <div
            style={{
              marginBottom: "15px",
              borderBottom: "2px solid #ccc",
              paddingBottom: "5px",
            }}
          >
            <Button
              className='mr-[5px]'
              variant={entityType === "post" ? "primary" : "secondary"}
              onClick={() => setEntityType("post")}
              //@todo 스타일이 before와 매칭되는지 확인 필요
              // style={{
              //   padding: '8px 16px',
              //   marginRight: '5px',
              //   fontSize: '14px',
              //   fontWeight: entityType === 'post' ? 'bold' : 'normal',
              //   border: '1px solid #999',
              //   background: entityType === 'post' ? '#1976d2' : '#f5f5f5',
              //   color: entityType === 'post' ? 'white' : '#333',
              //   cursor: 'pointer',
              //   borderRadius: '3px'
              // }}
            >
              게시글
            </Button>
            <Button
              variant={entityType === "user" ? "primary" : "secondary"}
              onClick={() => setEntityType("user")}
              //@todo 스타일이 before와 매칭되는지 확인 필요
              // style={{
              //   padding: "8px 16px",
              //   fontSize: "14px",
              //   fontWeight: entityType === "user" ? "bold" : "normal",
              //   border: "1px solid #999",
              //   background: entityType === "user" ? "#1976d2" : "#f5f5f5",
              //   color: entityType === "user" ? "white" : "#333",
              //   cursor: "pointer",
              //   borderRadius: "3px",
              // }}
            >
              사용자
            </Button>
          </div>

          <div>
            <div style={{ marginBottom: "15px", textAlign: "right" }}>
              <Button variant='primary' onClick={() => setIsCreateModalOpen(true)}>
                새로 만들기
              </Button>
            </div>

            {showSuccessAlert && (
              <div style={{ marginBottom: "10px" }}>
                <Alert variant='success' title='성공' onClose={() => setShowSuccessAlert(false)}>
                  {alertMessage}
                </Alert>
              </div>
            )}

            {showErrorAlert && (
              <div style={{ marginBottom: "10px" }}>
                <Alert variant='error' title='오류' onClose={() => setShowErrorAlert(false)}>
                  {errorMessage}
                </Alert>
              </div>
            )}

            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
                gap: "10px",
                marginBottom: "15px",
              }}
            >
              <div
                style={{
                  padding: "12px 15px",
                  background: "#e3f2fd",
                  border: "1px solid #90caf9",
                  borderRadius: "3px",
                }}
              >
                <div style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}>전체</div>
                <div style={{ fontSize: "24px", fontWeight: "bold", color: "#1976d2" }}>
                  {stats.total}
                </div>
              </div>

              <div
                style={{
                  padding: "12px 15px",
                  background: "#e8f5e9",
                  border: "1px solid #81c784",
                  borderRadius: "3px",
                }}
              >
                <div style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}>
                  {stats.stat1.label}
                </div>
                <div style={{ fontSize: "24px", fontWeight: "bold", color: "#388e3c" }}>
                  {stats.stat1.value}
                </div>
              </div>

              <div
                style={{
                  padding: "12px 15px",
                  background: "#fff3e0",
                  border: "1px solid #ffb74d",
                  borderRadius: "3px",
                }}
              >
                <div style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}>
                  {stats.stat2.label}
                </div>
                <div style={{ fontSize: "24px", fontWeight: "bold", color: "#f57c00" }}>
                  {stats.stat2.value}
                </div>
              </div>

              <div
                style={{
                  padding: "12px 15px",
                  background: "#ffebee",
                  border: "1px solid #e57373",
                  borderRadius: "3px",
                }}
              >
                <div style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}>
                  {stats.stat3.label}
                </div>
                <div style={{ fontSize: "24px", fontWeight: "bold", color: "#d32f2f" }}>
                  {stats.stat3.value}
                </div>
              </div>

              <div
                style={{
                  padding: "12px 15px",
                  background: "#f5f5f5",
                  border: "1px solid #bdbdbd",
                  borderRadius: "3px",
                }}
              >
                <div style={{ fontSize: "12px", color: "#666", marginBottom: "4px" }}>
                  {stats.stat4.label}
                </div>
                <div style={{ fontSize: "24px", fontWeight: "bold", color: "#424242" }}>
                  {stats.stat4.value}
                </div>
              </div>
            </div>

            <div style={{ border: "1px solid #ddd", background: "white", overflow: "auto" }}>
              {entityType === "user" ? (
                <UserTable
                  data={data as User[]}
                  striped
                  hover
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ) : (
                <PostTable
                  data={data as Post[]}
                  striped
                  hover
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                  onPublish={(id) => handleStatusAction(id, "publish")}
                  onArchive={(id) => handleStatusAction(id, "archive")}
                  onRestore={(id) => handleStatusAction(id, "restore")}
                />
              )}
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setFormData({});
        }}
        title={`새 ${entityType === "user" ? "사용자" : "게시글"} 만들기`}
        size='large'
        showFooter
        footerContent={
          <>
            <Button
              variant='secondary'
              onClick={() => {
                setIsCreateModalOpen(false);
                setFormData({});
              }}
            >
              취소
            </Button>
            <Button variant='primary' onClick={handleCreate}>
              생성
            </Button>
          </>
        }
      >
        <div>
          {entityType === "user" ? (
            <>
              <FormInput
                name='username'
                value={formData.username || ""}
                onChange={(value) => setFormData({ ...formData, username: value })}
                label='사용자명'
                placeholder='사용자명을 입력하세요'
                required
                width='full'
                fieldType='username'
              />
              <FormInput
                name='email'
                value={formData.email || ""}
                onChange={(value) => setFormData({ ...formData, email: value })}
                label='이메일'
                placeholder='이메일을 입력하세요'
                type='email'
                required
                width='full'
                fieldType='email'
              />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <FormSelect
                  name='role'
                  value={formData.role || "user"}
                  onChange={(value) => setFormData({ ...formData, role: value })}
                  options={[
                    { value: "user", label: "사용자" },
                    { value: "moderator", label: "운영자" },
                    { value: "admin", label: "관리자" },
                  ]}
                  label='역할'
                  size='md'
                />
                <FormSelect
                  name='status'
                  value={formData.status || "active"}
                  onChange={(value) => setFormData({ ...formData, status: value })}
                  options={[
                    { value: "active", label: "활성" },
                    { value: "inactive", label: "비활성" },
                    { value: "suspended", label: "정지" },
                  ]}
                  label='상태'
                  size='md'
                />
              </div>
            </>
          ) : (
            <>
              <FormInput
                name='title'
                value={formData.title || ""}
                onChange={(value) => setFormData({ ...formData, title: value })}
                label='제목'
                placeholder='게시글 제목을 입력하세요'
                required
                width='full'
                fieldType='postTitle'
              />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <FormInput
                  name='author'
                  value={formData.author || ""}
                  onChange={(value) => setFormData({ ...formData, author: value })}
                  label='작성자'
                  placeholder='작성자명'
                  required
                  width='full'
                />
                <FormSelect
                  name='category'
                  value={formData.category || ""}
                  onChange={(value) => setFormData({ ...formData, category: value })}
                  options={[
                    { value: "development", label: "Development" },
                    { value: "design", label: "Design" },
                    { value: "accessibility", label: "Accessibility" },
                  ]}
                  label='카테고리'
                  placeholder='카테고리 선택'
                  size='md'
                />
              </div>
              <FormTextarea
                name='content'
                value={formData.content || ""}
                onChange={(value) => setFormData({ ...formData, content: value })}
                label='내용'
                placeholder='게시글 내용을 입력하세요'
                rows={6}
              />
            </>
          )}
        </div>
      </Modal>

      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setFormData({});
          setSelectedItem(null);
        }}
        title={`${entityType === "user" ? "사용자" : "게시글"} 수정`}
        size='large'
        showFooter
        footerContent={
          <>
            <Button
              variant='secondary'
              onClick={() => {
                setIsEditModalOpen(false);
                setFormData({});
                setSelectedItem(null);
              }}
            >
              취소
            </Button>
            <Button variant='primary' onClick={handleUpdate}>
              수정 완료
            </Button>
          </>
        }
      >
        <div>
          {selectedItem && (
            <Alert variant='info'>
              ID: {selectedItem.id} | 생성일: {selectedItem.createdAt}
              {entityType === "post" && ` | 조회수: ${(selectedItem as Post).views}`}
            </Alert>
          )}

          {entityType === "user" ? (
            <>
              <FormInput
                name='username'
                value={formData.username || ""}
                onChange={(value) => setFormData({ ...formData, username: value })}
                label='사용자명'
                placeholder='사용자명을 입력하세요'
                required
                width='full'
                fieldType='username'
              />
              <FormInput
                name='email'
                value={formData.email || ""}
                onChange={(value) => setFormData({ ...formData, email: value })}
                label='이메일'
                placeholder='이메일을 입력하세요'
                type='email'
                required
                width='full'
                fieldType='email'
              />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <FormSelect
                  name='role'
                  value={formData.role || "user"}
                  onChange={(value) => setFormData({ ...formData, role: value })}
                  options={[
                    { value: "user", label: "사용자" },
                    { value: "moderator", label: "운영자" },
                    { value: "admin", label: "관리자" },
                  ]}
                  label='역할'
                  size='md'
                />
                <FormSelect
                  name='status'
                  value={formData.status || "active"}
                  onChange={(value) => setFormData({ ...formData, status: value })}
                  options={[
                    { value: "active", label: "활성" },
                    { value: "inactive", label: "비활성" },
                    { value: "suspended", label: "정지" },
                  ]}
                  label='상태'
                  size='md'
                />
              </div>
            </>
          ) : (
            <>
              <FormInput
                name='title'
                value={formData.title || ""}
                onChange={(value) => setFormData({ ...formData, title: value })}
                label='제목'
                placeholder='게시글 제목을 입력하세요'
                required
                width='full'
                fieldType='postTitle'
              />
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px" }}>
                <FormInput
                  name='author'
                  value={formData.author || ""}
                  onChange={(value) => setFormData({ ...formData, author: value })}
                  label='작성자'
                  placeholder='작성자명'
                  required
                  width='full'
                />
                <FormSelect
                  name='category'
                  value={formData.category || ""}
                  onChange={(value) => setFormData({ ...formData, category: value })}
                  options={[
                    { value: "development", label: "Development" },
                    { value: "design", label: "Design" },
                    { value: "accessibility", label: "Accessibility" },
                  ]}
                  label='카테고리'
                  placeholder='카테고리 선택'
                  size='md'
                />
              </div>
              <FormTextarea
                name='content'
                value={formData.content || ""}
                onChange={(value) => setFormData({ ...formData, content: value })}
                label='내용'
                placeholder='게시글 내용을 입력하세요'
                rows={6}
              />
            </>
          )}
        </div>
      </Modal>
    </div>
  );
};
