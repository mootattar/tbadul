"use client";
import { useEffect, useRef, useState } from "react";
import { useFormValidation } from "../../../hooks/useFormValidation";
import { Errors } from "../../../types/LoginTypes";
import { LoginData } from "../../../types/LoginTypes";
import { validateField } from "../../../functions/validateField";
import Link from "next/link";
import { login } from "@/app/functions/signIn";
import { useRouter } from "next/navigation";
export default function Login() {
  const { handleSendData } = useFormValidation();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [data, setData] = useState<LoginData>({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<Errors>({});

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    ("hello world");
    const fomrData = handleSendData(data);
    if (fomrData.error) {
      setErrors(fomrData.error);
      ("errooorrr");
      if (fomrData.error.password) passwordRef.current?.focus();
      if (fomrData.error.email) emailRef.current?.focus();
    } else {
      if (errors) setErrors({});
      await login(data.email, data.password);
      setData({
        email: "",
        password: "",
      });
      router.push("/");
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    nextRef: React.RefObject<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextRef?.current?.focus();
    }
  };

  useEffect(() => {
    if (emailRef.current) {
      emailRef.current.focus();
    }
  }, []);
  // tailwind css classes for the inputs

  const inputClasses =
    "peer border-2  w-full p-3 rounded-lg transition-colors focus:outline-none bg-inherit";
  const ErrorlabelClasses =
    "absolute text-red-500 left-4 -top-2 text-sm px-1 rounded-sm select-none font-bold cursor-text peer-focus:border-red-500 peer-focus:text-xs peer-focus:-top-2 peer-focus:bg-red-500 peer-focus:text-white peer-placeholder-shown:top-3 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-red-500 peer-placeholder-shown:text-sm transition-all peer-not-placeholder-shown:bg-red-500 peer-not-placeholder-shown:text-white peer-not-placeholder-shown:text-xs ";
  const labelClasses =
    "absolute text-slate-900 px-1 -top-2 text-sm left-4 cursor-text select-none rounded-sm peer-focus:bg-cyan-400 peer-focus:text-xs peer-focus:-top-2 transition-all peer-focus:text-slate-200 peer-placeholder-shown:top-3 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-slate-900 peer-placeholder-shown:text-sm peer-not-placeholder-shown:bg-cyan-400 peer-not-placeholder-shown:text-slate-200 peer-not-placeholder-shown:text-xs";
  const buttonClasses =
    "bg-cyan-400 font-bold text-slate-200 w-full p-2 mt-3 rounded-xl hover:rounded-3xl hover:bg-cyan-500 transition-all ease-in ";
  return (
    <div className="container mx-auto p-4 flex flex-col gap-4 items-center justify-center bg-slate-200 h-screen w-screen">
      <h1 className="text-2xl font-bold text-slate-900">تسجيل الدخول</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 border-slate-900 border-2 p-8 rounded-lg"
        dir="rtl"
      >
        <div className="relative" dir="ltr">
          <input
            type="text"
            placeholder=""
            ref={emailRef}
            id="email"
            value={data.email}
            onChange={(e) => {
              setData({ ...data, email: e.target.value });
              validateField("email", e.target.value, data, setErrors);
            }}
            onKeyDown={(e) => handleKeyDown(e, passwordRef)}
            className={`${inputClasses} ${
              errors.email
                ? "border-red-500 focus:border-red-500"
                : data.email
                ? "border-cyan-400"
                : "border-slate-900"
            }`}
          />
          {errors.email ? (
            <label className={ErrorlabelClasses} htmlFor="email">
              {errors.email}
            </label>
          ) : (
            <label htmlFor="email" className={labelClasses}>
              البريد الإلكتروني
            </label>
          )}
        </div>

        <div className="relative">
          <input
            type="password"
            ref={passwordRef}
            id="password"
            value={data.password}
            onChange={(e) => {
              setData({ ...data, password: e.target.value });
              validateField("password", e.target.value, data, setErrors);
            }}
            placeholder=" "
            className={`${inputClasses} ${
              errors.password
                ? "border-red-500 focus:border-red-500"
                : data.password
                ? "border-cyan-400"
                : "border-slate-900"
            }`}
          />
          {errors.password ? (
            <label className={ErrorlabelClasses} htmlFor="password">
              {errors.password}
            </label>
          ) : (
            <label htmlFor="password" className={labelClasses}>
              كلمة المرور
            </label>
          )}
        </div>
        <button type="submit" className={buttonClasses}>
          إرسال
        </button>
        <Link
          href={"/signup"}
          className="text-sm text-black/50 hover:text-black transition-[color]"
        >
          ليس لديك حساب ؟ أنشئ حساب
        </Link>
      </form>
    </div>
  );
}
