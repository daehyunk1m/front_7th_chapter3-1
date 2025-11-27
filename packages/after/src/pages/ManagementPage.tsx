import React from "react";
import { Button } from "@/components/ui/button";
import { Alert, Modal } from "../_legacy/organisms";
import { FormTextarea } from "../_legacy/molecules";
import "../styles/components.css";
import { useManagement } from "../hooks/useManagement";
import { useValidation, type FieldType } from "@/hooks/useValidation";
import type { User } from "../services/userService";
import type { Post } from "../services/postService";
import { PostTable } from "@/components/tables/PostTable";
import { UserTable } from "@/components/tables/UserTable";
import { FormInput } from "@/components/forms/FormInput";
import { FormSelect } from "@/components/forms/FormSelect";

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
  const { validationError, validateField } = useValidation(entityType);

  const getStats = () => {
    if (entityType === "user") {
      const users = data as User[];
      return {
        total: users.length,
        stat1: {
          label: "활성",
          value: users.filter((u) => u.status === "active").length,
        },
        stat2: {
          label: "비활성",
          value: users.filter((u) => u.status === "inactive").length,
        },
        stat3: {
          label: "정지",
          value: users.filter((u) => u.status === "suspended").length,
        },
        stat4: {
          label: "관리자",
          value: users.filter((u) => u.role === "admin").length,
        },
      };
    } else {
      const posts = data as Post[];
      return {
        total: posts.length,
        stat1: {
          label: "게시됨",
          value: posts.filter((p) => p.status === "published").length,
        },
        stat2: {
          label: "임시저장",
          value: posts.filter((p) => p.status === "draft").length,
        },
        stat3: {
          label: "보관됨",
          value: posts.filter((p) => p.status === "archived").length,
        },
        stat4: {
          label: "총 조회수",
          value: posts.reduce((sum, p) => sum + p.views, 0),
        },
      };
    }
  };

  const stats = getStats();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (!e.target.name) throw new Error("Name is required");

    const name = e.target.name;
    setFormData({ ...formData, [name]: newValue });

    let fieldType: FieldType;

    switch (name) {
      case "username":
        fieldType = "username";
        break;
      case "email":
        fieldType = "email";
        break;
      case "title":
        fieldType = "postTitle";
        break;
      case "author":
        fieldType = "normal";
        break;
      default:
        fieldType = "normal";
        break;
    }

    validateField(newValue, name, fieldType);
  };

  return (
    <div className='min-h-screen bg-surface'>
      <div className='max-w-[1200px] mx-auto p-5'>
        <div className='mb-5'>
          <h1 className='text-2xl font-bold mb-1 text-foreground'>관리 시스템</h1>
          <p className='text-muted-foreground text-sm'>사용자와 게시글을 관리하세요</p>
        </div>

        <div className='bg-background border border-border p-2.5'>
          <div className='mb-4 border-b-2 border-border-light pb-1'>
            <Button
              className='mr-1'
              variant={entityType === "post" ? "primary" : "secondary"}
              onClick={() => setEntityType("post")}
            >
              게시글
            </Button>
            <Button
              variant={entityType === "user" ? "primary" : "secondary"}
              onClick={() => setEntityType("user")}
            >
              사용자
            </Button>
          </div>

          <div>
            <div className='mb-4 text-right'>
              <Button variant='primary' onClick={() => setIsCreateModalOpen(true)}>
                새로 만들기
              </Button>
            </div>

            {showSuccessAlert && (
              <div className='mb-2.5'>
                <Alert variant='success' title='성공' onClose={() => setShowSuccessAlert(false)}>
                  {alertMessage}
                </Alert>
              </div>
            )}

            {showErrorAlert && (
              <div className='mb-2.5'>
                <Alert variant='error' title='오류' onClose={() => setShowErrorAlert(false)}>
                  {errorMessage}
                </Alert>
              </div>
            )}

            <div className='grid grid-cols-[repeat(auto-fit,minmax(130px,1fr))] gap-2.5 mb-4'>
              {/* 전체 통계 카드 */}
              <div className='py-3 px-4 bg-primary-light border border-primary-border rounded-sm'>
                <div className='text-xs text-muted-foreground mb-1'>전체</div>
                <div className='text-2xl font-bold text-primary'>{stats.total}</div>
              </div>

              {/* stat1 - 활성/게시됨 */}
              <div className='py-3 px-4 bg-success-light border border-success-border rounded-sm'>
                <div className='text-xs text-muted-foreground mb-1'>{stats.stat1.label}</div>
                <div className='text-2xl font-bold text-success'>{stats.stat1.value}</div>
              </div>

              {/* stat2 - 비활성/임시저장 */}
              <div className='py-3 px-4 bg-warning-light border border-warning-border rounded-sm'>
                <div className='text-xs text-muted-foreground mb-1'>{stats.stat2.label}</div>
                <div className='text-2xl font-bold text-warning'>{stats.stat2.value}</div>
              </div>

              {/* stat3 - 정지/보관됨 */}
              <div className='py-3 px-4 bg-danger-light border border-danger-border rounded-sm'>
                <div className='text-xs text-muted-foreground mb-1'>{stats.stat3.label}</div>
                <div className='text-2xl font-bold text-danger'>{stats.stat3.value}</div>
              </div>

              {/* stat4 - 관리자/총 조회수 */}
              <div className='py-3 px-4 bg-muted-light border border-muted-border rounded-sm'>
                <div className='text-xs text-muted-foreground mb-1'>{stats.stat4.label}</div>
                <div className='text-2xl font-bold text-foreground'>{stats.stat4.value}</div>
              </div>
            </div>

            <div className='border border-border bg-background overflow-auto'>
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
                onChange={handleChange}
                label='사용자명'
                placeholder='사용자명을 입력하세요'
                required
                width='full'
                error={validationError.username}
              />
              <FormInput
                name='email'
                value={formData.email || ""}
                onChange={handleChange}
                label='이메일'
                placeholder='이메일을 입력하세요'
                type='email'
                required
                width='full'
                error={validationError.email}
              />
              <div className='grid grid-cols-2 gap-4'>
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
                onChange={handleChange}
                label='제목'
                placeholder='게시글 제목을 입력하세요'
                required
                width='full'
                error={validationError.title}
              />
              <div className='grid grid-cols-2 gap-4'>
                <FormInput
                  name='author'
                  value={formData.author || ""}
                  onChange={handleChange}
                  label='작성자'
                  placeholder='작성자명'
                  required
                  width='full'
                  error={validationError.author}
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
                onChange={handleChange}
                label='사용자명'
                placeholder='사용자명을 입력하세요'
                required
                width='full'
                error={validationError.title}
              />
              <FormInput
                name='email'
                value={formData.email || ""}
                onChange={handleChange}
                label='이메일'
                placeholder='이메일을 입력하세요'
                type='email'
                required
                width='full'
                error={validationError.email}
              />
              <div className='grid grid-cols-2 gap-4'>
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
                onChange={handleChange}
                label='제목'
                placeholder='게시글 제목을 입력하세요'
                required
                width='full'
                error={validationError.title}
              />
              <div className='grid grid-cols-2 gap-4'>
                <FormInput
                  name='author'
                  value={formData.author || ""}
                  onChange={handleChange}
                  label='작성자'
                  placeholder='작성자명'
                  required
                  width='full'
                  error={validationError.author}
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
