import { isEmailValid } from "./isEmailValid";
import { Errors } from "../types/LoginTypes";
export const handleError: (data: Errors) => Errors = ({
  name,
  email,
  phone,
  password,
  confirmPassword,
}) => {
  const error: Errors = {};

  if (!name?.trim()) {
    error.name = "أدخل الاسم";
  }
  if (!email?.trim()) {
    error.email = "أدخل البريد الإلكتروني";
  }
  if (!phone?.trim()) {
    error.phone = "أدخل رقم الهاتف";
  }
  if (!password?.trim()) {
    error.password = "أدخل كلمة المرور";
  }
  if (password !== confirmPassword) {
    error.confirmPassword = "كلمة المرور غير متطابقة";
  }
  if (!confirmPassword?.trim()) {
    error.confirmPassword = "أدخل تأكيد كلمة المرور";
  }
  if (email && !isEmailValid(email)) {
    error.email = "البريد الإلكتروني غير صحيح";
  }
  if (phone && phone.length !== 10) {
    error.phone = "رقم الهاتف غير صحيح";
  }

  return error;
};
export const handleloginErrors: (data: Errors) => Errors = ({
  email,
  password,
}) => {
  const error: Errors = {};

  if (!email?.trim()) {
    error.email = "أدخل البريد الإلكتروني";
  }
  if (!password?.trim()) {
    error.password = "أدخل كلمة المرور";
  }
  if (email && !isEmailValid(email)) {
    error.email = "البريد الإلكتروني غير صحيح";
  }

  return error;
};
