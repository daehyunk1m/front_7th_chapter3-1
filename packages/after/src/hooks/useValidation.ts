import { useState } from "react";
import type { EntityType } from "./useManagement";

export type FieldType = "username" | "email" | "postTitle" | "slug" | "normal";

export const useValidation = (entityType: EntityType) => {
  const [validationError, setValidationError] = useState<Record<string, string>>({});
  const validateField = (
    val: string | undefined,
    name: string,
    fieldType: FieldType = "normal",
    checkBusinessRules: boolean = false
  ) => {
    setValidationError({ ...validationError, [name]: "" });

    if (!val) return;

    // 기본 필드 타입 검증
    if (fieldType === "username") {
      if (val.length < 3) {
        setValidationError({ ...validationError, [name]: "사용자명은 3자 이상이어야 합니다" });
      } else if (!/^[a-zA-Z0-9_]+$/.test(val)) {
        setValidationError({
          ...validationError,
          [name]: "영문, 숫자, 언더스코어만 사용 가능합니다",
        });
      } else if (val.length > 20) {
        setValidationError({ ...validationError, [name]: "사용자명은 20자 이하여야 합니다" });
      }

      // 🚨 도메인 특화 검증: 예약어 체크
      if (checkBusinessRules) {
        const reservedWords = ["admin", "root", "system", "administrator"];
        if (reservedWords.includes(val.toLowerCase())) {
          setValidationError({ ...validationError, [name]: "예약된 사용자명입니다" });
        }
      }
    } else if (fieldType === "email") {
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
        setValidationError({ ...validationError, [name]: "올바른 이메일 형식이 아닙니다" });
      }

      // 🚨 비즈니스 규칙: User 엔티티의 이메일은 회사 도메인만
      if (checkBusinessRules && entityType === "user") {
        if (!val.endsWith("@company.com") && !val.endsWith("@example.com")) {
          setValidationError({
            ...validationError,
            [name]: "회사 이메일(@company.com 또는 @example.com)만 사용 가능합니다",
          });
        }
      }
    } else if (fieldType === "postTitle") {
      if (val.length < 5) {
        setValidationError({ ...validationError, [name]: "제목은 5자 이상이어야 합니다" });
      } else if (val.length > 100) {
        setValidationError({ ...validationError, [name]: "제목은 100자 이하여야 합니다" });
      }

      // 🚨 비즈니스 규칙: 금칙어 체크
      if (checkBusinessRules && entityType === "post") {
        const bannedWords = ["광고", "스팸", "홍보"];
        const hasBannedWord = bannedWords.some((word) => val.includes(word));
        if (hasBannedWord) {
          setValidationError({
            ...validationError,
            [name]: "제목에 금지된 단어가 포함되어 있습니다",
          });
        }
      }
    }
  };
  return { validationError, validateField };
};
