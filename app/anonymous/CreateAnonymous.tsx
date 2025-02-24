"use client";
import { Button } from "@/components/ui/button";
import { ImageUp } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { loginAnonymously } from "../functions/signIn";
import { db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";
import { useToast } from "../hooks/useToast";

export default function CreateAnonymous() {
  // refs
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  // states
  const [choice, setChoice] = useState<"exchange" | "lost" | "donation">(
    "donation"
  );
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState({
    title: "",
    phone: "",
  });
  const [image, setImage] = useState("");
  const [secondImage, setSecondImage] = useState("");
  const { handleShow } = useToast();
  const [uploading, setUploading] = useState(false);

  const handleAddImage = async (
    e: React.ChangeEvent<HTMLInputElement>,
    second: boolean
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD ?? ""
    );
    setUploading(true);
    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );
      if (!res.ok) {
        throw new Error("فشل رفع الصورة");
      }
      const uploadedImage = await res.json();
      if (second) {
        setSecondImage(uploadedImage.secure_url);
      } else {
        setImage(uploadedImage.secure_url);
      }
    } catch (error) {
      console.error("حدث خطأ أثناء رفع الصورة:", error);
    } finally {
      setUploading(false);
    }
  };

  // تحديث الخيار مع إزالة الصورة الثانية إذا لم يكن الخيار "exchange"
  const handleChoiceChange = (newChoice: "exchange" | "lost" | "donation") => {
    setChoice(newChoice);
    if (newChoice !== "exchange") {
      setSecondImage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // التحقق من رقم الهاتف: يجب أن يحتوي على 10 أرقام على الأقل
    const digitsOnly = phone.replace(/\D/g, "");
    let errors: { title: string; phone: string } = { title: "", phone: "" };
    if (title.trim() === "") {
      errors = {
        ...errors,
        title: "يرجى كتابة عنوان المنشور",
      };
    }
    if (digitsOnly.length !== 10) {
      errors = {
        ...errors,
        phone: "يجب ان يكون رقم الهاتف مكون من 10 ارقام",
      };
    }
    if (Object.keys(errors).length > 0) {
      setErrors(errors);
      return;
    }
    const user = await loginAnonymously();
    const post = {
      image: image || null,
      secondImage: secondImage || null,
      title,
      body,
      phone,
      uid: user ? user.uid : null,
      choice,
      createdAt: new Date(),
    };
    try {
      // إضافة المنشور إلى مجموعة "posts" في Firestore
      await addDoc(collection(db, "posts"), post);
      setTitle("");
      setBody("");
      setImage("");
      setSecondImage("");
      setChoice("donation");
      setPhone("");
      handleShow("تم انشاء المنشور بنجاح");
    } catch (error) {
      console.error("خطأ في إنشاء المنشور:", error);
    }
  };

  const inputClasses =
    "peer border-2 w-full p-3 rounded-lg transition-colors focus:outline-none bg-inherit";
  const ErrorlabelClasses =
    "absolute text-red-500 left-4 -top-2 text-sm px-1 rounded-sm select-none font-bold cursor-text peer-focus:border-red-500 peer-focus:text-xs peer-focus:-top-2 peer-focus:bg-red-500 peer-focus:text-white peer-placeholder-shown:top-3 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-red-500 peer-placeholder-shown:text-sm transition-all peer-not-placeholder-shown:bg-red-500 peer-not-placeholder-shown:text-white peer-not-placeholder-shown:text-xs";
  const labelClasses =
    "absolute text-slate-900 px-1 -top-2 text-sm left-4 cursor-text select-none rounded-sm peer-focus:bg-blue-500 peer-focus:text-xs peer-focus:-top-2 transition-all peer-focus:text-slate-200 peer-placeholder-shown:top-3 peer-placeholder-shown:bg-transparent peer-placeholder-shown:text-slate-900 peer-placeholder-shown:text-sm peer-not-placeholder-shown:bg-blue-500 peer-not-placeholder-shown:text-slate-200 peer-not-placeholder-shown:text-xs";
  const buttonClasses =
    "bg-blue-500 font-bold text-slate-200 w-full p-2 mt-3 rounded-xl hover:bg-blue-600 transition-all cursor-pointer";

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
    if (titleRef.current) {
      titleRef.current.focus();
    }
  }, []);

  return (
    <div className="container mx-auto p-4 flex flex-col gap-4 items-center justify-center bg-slate-200 min-h-screen w-screen">
      <h1 className="text-2xl font-bold text-slate-900">
        إنشاء منشور مجهول الاسم
      </h1>
      <form
        className="flex flex-col gap-4 border-slate-900 border-2 p-8 rounded-lg"
        dir="rtl"
        onSubmit={handleSubmit}
      >
        <div className="relative" dir="ltr">
          <input
            type="text"
            placeholder=""
            ref={titleRef}
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, bodyRef)}
            className={`${inputClasses} ${
              errors.title
                ? "border-red-500"
                : title
                ? "border-blue-500"
                : "border-black"
            }`}
          />
          {errors.title ? (
            <label className={ErrorlabelClasses} htmlFor="title">
              {errors.title}
            </label>
          ) : (
            <label htmlFor="title" className={labelClasses}>
              عنوان المنشور{" "}
            </label>
          )}
        </div>
        <div className="relative" dir="ltr">
          <input
            type="text"
            placeholder=""
            ref={bodyRef}
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            onKeyDown={(e) => handleKeyDown(e, phoneRef)}
            className={`${inputClasses} ${
              body ? "border-blue-500" : "border-black"
            }`}
          />
          <label htmlFor="body" className={labelClasses}>
            وصف المنشور
          </label>
        </div>
        <div className="relative" dir="ltr">
          <input
            type="tel"
            placeholder=""
            ref={phoneRef}
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className={`${inputClasses} ${
              errors.phone
                ? "border-red-500"
                : phone
                ? "border-blue-500"
                : "border-black"
            }`}
          />
          {errors.phone ? (
            <label className={ErrorlabelClasses} htmlFor="phone">
              {errors.phone}
            </label>
          ) : (
            <label htmlFor="phone" className={labelClasses}>
              رقم للتواصل{" "}
            </label>
          )}
        </div>
        {!image && (
          <>
            <input
              id="file-upload"
              type="file"
              onChange={(e) => handleAddImage(e, false)}
              style={{ display: "none" }}
            />
            <label htmlFor="file-upload" className="cursor-pointer p-1">
              <div className="flex items-center gap-4">
                <ImageUp size={32} />
                <p className="font-bold">إرفع الصورة</p>
              </div>
            </label>
          </>
        )}
        {uploading && <p>جاري رفع الصورة...</p>}
        <div className="flex gap-8">
          {image && (
            <div className="relative">
              <Image
                loading="lazy"
                src={image}
                width={64}
                height={64}
                alt="الصورة الرئيسية"
                className="w-[64px] h-[64px]"
              />
              <button
                type="button"
                onClick={() => setImage("")}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
              >
                ×
              </button>
            </div>
          )}
          {secondImage && (
            <div className="relative">
              <Image
                loading="lazy"
                src={secondImage}
                width={64}
                height={64}
                alt="الصورة الثانية"
                className="w-[64px] h-[64px]"
              />
              <button
                type="button"
                onClick={() => setSecondImage("")}
                className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
              >
                ×
              </button>
            </div>
          )}
        </div>
        <div className="flex flex-wrap gap-4">
          <Button
            type="button"
            onClick={() => handleChoiceChange("exchange")}
            className={`${
              choice === "exchange"
                ? "bg-slate-400 text-black hover:bg-slate-400 hover:text-black"
                : ""
            }`}
          >
            تبادل
          </Button>
          <Button
            type="button"
            onClick={() => handleChoiceChange("donation")}
            className={`${
              choice === "donation"
                ? "bg-slate-400 text-black hover:bg-slate-400 hover:text-black"
                : ""
            }`}
          >
            تبرع
          </Button>
          <Button
            type="button"
            onClick={() => handleChoiceChange("lost")}
            className={`${
              choice === "lost"
                ? "bg-slate-400 text-black hover:bg-slate-400 hover:text-black"
                : ""
            }`}
          >
            مفقودات
          </Button>
          {choice === "exchange" && !secondImage && (
            <>
              <input
                id="file-upload-second"
                type="file"
                onChange={(e) => handleAddImage(e, true)}
                style={{ display: "none" }}
              />
              <label
                htmlFor="file-upload-second"
                className="cursor-pointer p-1"
              >
                <div className="flex items-center gap-2">
                  <ImageUp size={32} />
                  <p className="text-sm">رفع الصورة الأخرى إختياري</p>
                </div>
              </label>
            </>
          )}
        </div>
        <button
          type="submit"
          className={buttonClasses}
          // disabled={!title || !body || phone.replace(/\D/g, "").length < 10}
        >
          إنشاء المنشور
        </button>
      </form>
    </div>
  );
}
