"use client";
import { ImageUp } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { loginAnonymously } from "../functions/signIn";
import { useToast } from "../hooks/useToast";
import { usePostActions } from "../hooks/usePostActions";
import { useRouter } from "next/navigation";

export default function CreateAnonymous() {
  // custom hooks
  const { createPost, uploadImage } = usePostActions();
  // redirect
  const router = useRouter();
  // refs
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  // states
  const [choice, setChoice] = useState<
    "exchange" | "lost" | "donation" | "sale"
  >("donation");
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [phone, setPhone] = useState("");
  const [price, setPrice] = useState("");
  const [errors, setErrors] = useState({
    title: "",
    phone: "",
    uploading: "",
    price: "",
  });
  const [image, setImage] = useState("");
  const [secondImage, setSecondImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const { handleShow } = useToast();

  const handleAddImage = async (
    e: React.ChangeEvent<HTMLInputElement>,
    second: boolean
  ) => {
    setUploading(true);
    const file = e.target.files?.[0];
    if (!file) return;
    const url = await uploadImage(file);
    if (second) {
      setSecondImage(url);
      return setUploading(false);
    }
    setImage(url);
    return setUploading(false);
  };

  const handleChoiceChange = (
    newChoice: "exchange" | "lost" | "donation" | "sale"
  ) => {
    setChoice(newChoice);
    if (newChoice !== "exchange") {
      setSecondImage("");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const digitsOnly = phone.replace(/\D/g, "");
    let errorsObj: {
      title: string;
      phone: string;
      uploading: string;
      price: string;
    } = {
      title: "",
      phone: "",
      uploading: "",
      price: "",
    };
    if (title.trim() === "") {
      errorsObj = { ...errorsObj, title: "يرجى كتابة عنوان المنشور" };
    }
    if (digitsOnly.length !== 10) {
      errorsObj = {
        ...errorsObj,
        phone: "يجب ان يكون رقم الهاتف مكون من 10 ارقام",
      };
    }
    if (uploading) {
      errorsObj = {
        ...errorsObj,
        uploading: "الرجاء الإنتظار ريثما يتم تحميل الصورة...",
      };
    }
    if (choice === "sale") {
      if (price.trim() === "" || isNaN(parseFloat(price))) {
        errorsObj = { ...errorsObj, price: "يرجى إدخال سعر صالح" };
      }
    }
    if (
      errorsObj.title ||
      errorsObj.phone ||
      errorsObj.uploading ||
      errorsObj.price
    ) {
      setErrors(errorsObj);
      if (errorsObj.phone) phoneRef.current?.focus();
      if (errorsObj.title) titleRef.current?.focus();
      return;
    }
    const user = await loginAnonymously();
    const post = {
      image: image || "",
      secondImage: secondImage || "",
      title,
      body,
      phone,
      price:
        choice === "sale" && price !== undefined ? parseFloat(price) : null,
      uid: user ? user.uid : "",
      choice,
      createdAt: new Date(),
    };
    try {
      createPost(post);
      setTitle("");
      setBody("");
      setImage("");
      setSecondImage("");
      setChoice("donation");
      setPhone("");
      setPrice("");
      handleShow("تم انشاء المنشور بنجاح");
      router.push("/");
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
            placeholder=" "
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
              عنوان المنشور
            </label>
          )}
        </div>
        <div className="relative" dir="ltr">
          <input
            type="text"
            placeholder=" "
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
            placeholder=" "
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
              رقم للتواصل
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
        {uploading && errors.uploading ? (
          <p>{errors.uploading}</p>
        ) : (
          uploading && <p>جاري رفع الصورة...</p>
        )}
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
        <div className="flex sm:flex-row flex-col gap-4">
          <label className="relative flex items-center cursor-pointer">
            <input
              className="sr-only peer"
              name="futuristic-radio"
              type="radio"
              checked={choice === "lost"}
              onChange={() => handleChoiceChange("lost")}
            />
            <div className="w-6 h-6 bg-transparent border-2 border-red-500 rounded-full peer-checked:bg-red-500 peer-checked:border-red-500 peer-hover:shadow-lg peer-hover:shadow-red-500/50 peer-checked:shadow-lg peer-checked:shadow-red-500/50 transition duration-300 ease-in-out"></div>
            <span className="mx-2 text-black/90">مفقودات</span>
          </label>
          <label className="relative flex items-center cursor-pointer">
            <input
              className="sr-only peer"
              name="futuristic-radio"
              type="radio"
              checked={choice === "exchange"}
              onChange={() => handleChoiceChange("exchange")}
            />
            <div className="w-6 h-6 bg-transparent border-2 border-yellow-500 rounded-full peer-checked:bg-yellow-500 peer-checked:border-yellow-500 peer-hover:shadow-lg peer-hover:shadow-yellow-500/50 peer-checked:shadow-lg peer-checked:shadow-yellow-500/50 transition duration-300 ease-in-out"></div>
            <span className="mx-2 text-black/70">تبادل</span>
          </label>
          <label className="relative flex items-center cursor-pointer">
            <input
              className="sr-only peer"
              name="futuristic-radio"
              type="radio"
              checked={choice === "donation"}
              onChange={() => handleChoiceChange("donation")}
            />
            <div className="w-6 h-6 bg-transparent border-2 border-green-500 rounded-full peer-checked:bg-green-500 peer-checked:border-green-500 peer-hover:shadow-lg peer-hover:shadow-green-500/50 peer-checked:shadow-lg peer-checked:shadow-green-500/50 transition duration-300 ease-in-out"></div>
            <span className="mx-2 text-black/70">تبرع</span>
          </label>
          <label className="relative flex items-center cursor-pointer">
            <input
              className="sr-only peer"
              name="futuristic-radio"
              type="radio"
              checked={choice === "sale"}
              onChange={() => handleChoiceChange("sale")}
            />
            <div className="w-6 h-6 bg-transparent border-2 border-blue-500 rounded-full peer-checked:bg-blue-500 peer-checked:border-blue-500 peer-hover:shadow-lg peer-hover:shadow-blue-500/50 peer-checked:shadow-lg peer-checked:shadow-blue-500/50 transition duration-300 ease-in-out"></div>
            <span className="mx-2 text-black/70">للبيع</span>
          </label>
        </div>
        {choice === "sale" && (
          <div className="relative" dir="ltr">
            <input
              type="number"
              placeholder=" "
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className={`${inputClasses} ${
                errors.price
                  ? "border-red-500"
                  : price
                  ? "border-blue-500"
                  : "border-black"
              }`}
              step="0.1"
            />
            {errors.price ? (
              <label className={ErrorlabelClasses}>{errors.price}</label>
            ) : (
              <label className={labelClasses}>السعر</label>
            )}
          </div>
        )}
        <button type="submit" className={buttonClasses}>
          إنشاء المنشور
        </button>
      </form>
    </div>
  );
}
