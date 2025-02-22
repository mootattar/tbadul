"use client";
import { useEffect, useRef, useState } from "react";
import { useFormValidation } from "../../../hooks/useFormValidation";
import { Errors, RegisterData } from "../../../types/LoginTypes";
import { validateField } from "../../../functions/validateField";
import Link from "next/link";
import { signup } from "@/app/functions/signIn";
import { ImageUp } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Signup() {
  const { handleSendData } = useFormValidation();
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const telRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const [data, setData] = useState<RegisterData>({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    image: "",
  });
  const [errors, setErrors] = useState<Errors>({});
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = handleSendData(data);
    if (formData.error) {
      setErrors(formData.error);
      // التركيز على أول حقل يحتوي على خطأ حسب ترتيب ظهور الحقول
      if (formData.error.name) {
        nameRef.current?.focus();
      } else if (formData.error.email) {
        emailRef.current?.focus();
      } else if (formData.error.phone) {
        telRef.current?.focus();
      } else if (formData.error.password) {
        passwordRef.current?.focus();
      } else if (formData.error.confirmPassword) {
        confirmPasswordRef.current?.focus();
      }
    } else {
      setErrors({});
      await signup(
        data.email,
        data.password,
        data.name,
        data.phone,
        data.image
      );
      setData({
        name: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        image: "",
      });
      router.push("/");
    }
  };

  const handleAddImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD ?? ""
    );
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL ?? "", {
        method: "POST",
        body: formData,
      });
      if (!res.ok) {
        throw new Error("فشل رفع الصورة");
      }
      const uploadedImage = await res.json();
      setData((prevData) => ({ ...prevData, image: uploadedImage.secure_url }));
    } catch (error) {
      console.error("حدث خطأ أثناء رفع الصورة:", error);
    } finally {
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    nextRef: React.RefObject<HTMLInputElement | null>
  ) => {
    if (e.key === "Enter") {
      e.preventDefault();
      nextRef?.current?.focus();
    }
  };

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  // تعريف أصناف tailwindcss للحقول
  const inputClasses =
    "peer border-2 w-full p-3 rounded-lg transition-colors focus:outline-none bg-inherit";
  const ErrorlabelClasses =
    "absolute text-red-500 left-4 -top-2 text-sm px-1 rounded-sm select-none font-bold cursor-text peer-focus:border-red-500 peer-focus:text-xs peer-focus:-top-2 peer-focus:bg-red-500 peer-focus:text-white peer-placeholder-shown:top-3 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-red-500 peer-placeholder-shown:text-sm transition-all peer-not-placeholder-shown:bg-red-500 peer-not-placeholder-shown:text-white peer-not-placeholder-shown:text-xs";
  const labelClasses =
    "absolute text-slate-900 px-1 -top-2 text-sm left-4 cursor-text select-none rounded-sm peer-focus:bg-cyan-400 peer-focus:text-xs peer-focus:-top-2 transition-all peer-focus:text-slate-200 peer-placeholder-shown:top-3 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-slate-900 peer-placeholder-shown:text-sm peer-not-placeholder-shown:bg-cyan-400 peer-not-placeholder-shown:text-slate-200 peer-not-placeholder-shown:text-xs";
  const buttonClasses =
    "bg-cyan-400 font-bold text-slate-200 w-full p-2 mt-3 rounded-xl hover:rounded-3xl hover:bg-cyan-500 transition-all ease-in";

  return (
    <div className="container mx-auto p-4 flex flex-col gap-4 items-center justify-center bg-slate-200 h-screen w-screen">
      <h1 className="text-2xl font-bold text-slate-900">إنشاء حساب</h1>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 border-slate-900 border-2 p-8 rounded-lg"
        dir="rtl"
      >
        <div className="relative">
          <input
            type="text"
            placeholder=""
            ref={nameRef}
            id="name"
            value={data.name}
            onChange={(e) => {
              setData({ ...data, name: e.target.value });
              validateField("name", e.target.value, data, setErrors);
            }}
            onKeyDown={(e) => handleKeyDown(e, emailRef)}
            className={`${inputClasses} ${
              errors.name
                ? "border-red-500 focus:border-red-500"
                : data.name
                ? "border-cyan-400"
                : "border-slate-900"
            }`}
          />
          {errors.name ? (
            <label className={ErrorlabelClasses} htmlFor="name">
              {errors.name}
            </label>
          ) : (
            <label className={labelClasses} htmlFor="name">
              اسم المستخدم
            </label>
          )}
        </div>

        <div className="relative">
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
            onKeyDown={(e) => handleKeyDown(e, telRef)}
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
            type="tel"
            placeholder=""
            ref={telRef}
            id="phone"
            value={data.phone}
            onChange={(e) => {
              setData({ ...data, phone: e.target.value });
              validateField("phone", e.target.value, data, setErrors);
            }}
            onKeyDown={(e) => handleKeyDown(e, passwordRef)}
            className={`${inputClasses} ${
              errors.phone
                ? "border-red-500 focus:border-red-500"
                : data.phone
                ? "border-cyan-400"
                : "border-slate-900"
            }`}
          />
          {errors.phone ? (
            <label className={ErrorlabelClasses} htmlFor="phone">
              {errors.phone}
            </label>
          ) : (
            <label htmlFor="phone" className={labelClasses}>
              الهاتف
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
            onKeyDown={(e) => handleKeyDown(e, confirmPasswordRef)}
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

        <div className="relative">
          <input
            type="password"
            placeholder=""
            ref={confirmPasswordRef}
            id="confirmPassword"
            value={data.confirmPassword}
            onChange={(e) => {
              setData({ ...data, confirmPassword: e.target.value });
              validateField("confirmPassword", e.target.value, data, setErrors);
            }}
            className={`${inputClasses} ${
              errors.confirmPassword
                ? "border-red-500 focus:border-red-500"
                : data.confirmPassword
                ? "border-cyan-400"
                : "border-slate-900"
            }`}
          />
          {errors.confirmPassword ? (
            <label className={ErrorlabelClasses} htmlFor="confirmPassword">
              {errors.confirmPassword}
            </label>
          ) : (
            <label htmlFor="confirmPassword" className={labelClasses}>
              تأكيد كلمة المرور
            </label>
          )}
        </div>

        {!data.image ? (
          <>
            <input
              id="file-upload-second"
              type="file"
              onChange={handleAddImage}
              style={{ display: "none" }}
            />
            <label htmlFor="file-upload-second" className="cursor-pointer p-1">
              <div className="flex items-center gap-2">
                <ImageUp size={32} />
                <p className="text-sm">رفع الصورة الشخصية إختياري</p>
              </div>
            </label>
          </>
        ) : (
          <div className="relative">
            <Image
              loading="lazy"
              src={data?.image}
              width={64}
              height={64}
              alt="الصورة الرئيسية"
              className="w-[64px] h-[64px]"
            />
            <button
              type="button"
              onClick={() => setData((data) => ({ ...data, image: "" }))}
              className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
            >
              ×
            </button>
          </div>
        )}
        <button type="submit" className={buttonClasses}>
          إرسال
        </button>
        <Link
          href={"/login"}
          className="text-sm text-black/50 hover:text-black transition-[color]"
        >
          لديك حساب من قبل ؟ سجل به
        </Link>
      </form>
    </div>
  );
}
