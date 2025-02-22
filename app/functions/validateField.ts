import { Errors, LoginData } from "../types/LoginTypes";
import { isEmailValid } from "./isEmailValid";
export const validateField = (
  name: string,
  value: string,
  data: LoginData,
  setErrors: React.Dispatch<React.SetStateAction<Errors>>
) => {
  let errorMessage = "";

  switch (name) {
    case "name":
      if (value.trim()) errorMessage = "";
      break;
    case "email":
      if ((value && !isEmailValid(value)) || !value)
        errorMessage = "ex@mail.com";
      break;
    case "phone":
      if (!/^\d+$/.test(value) || value.trim().length !== 10)
        errorMessage = "يجب أن يكون الرقم مكونًا من 10 أرقام";
      break;
    case "password":
      if (value.trim().length < 6) errorMessage = "على الأقل 6 أحرف";
      break;
    case "confirmPassword":
      if (value !== data.password) errorMessage = "كلمات المرور غير متطابقة";
      break;
    default:
      break;
  }

  setErrors((prevErrors) => ({
    ...prevErrors,
    [name]: errorMessage,
  }));
};
