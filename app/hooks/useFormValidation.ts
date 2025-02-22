import { handleloginErrors } from "../functions/handleError";
import { LoginData } from "../types/LoginTypes";
export const useFormValidation = () => {
  const handleSendData = (data: LoginData) => {
    const error = handleloginErrors(data);
    if (Object.keys(error).length > 0) {
      return { error };
    }
    return { data };
  };

  return { handleSendData };
};
