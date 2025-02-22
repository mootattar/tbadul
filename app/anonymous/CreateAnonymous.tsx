"use client";
import { Button } from "@/components/ui/button";
import { ImageUp } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { loginAnonymously } from "../functions/signIn";
import { db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";

export default function CreateAnonymous() {
  const [choice, setChoice] = useState<"exchange" | "lost" | "donation">(
    "donation"
  );
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [phone, setPhone] = useState("");
  const [image, setImage] = useState("");
  const [secondImage, setSecondImage] = useState("");
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
      const res = await fetch(process.env.NEXT_PUBLIC_CLOUDINARY_URL ?? "", {
        method: "POST",
        body: data,
      });
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
    if (digitsOnly.length < 10) {
      alert("رقم الهاتف يجب أن يحتوي على 10 أرقام على الأقل");
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
    } catch (error) {
      console.error("خطأ في إنشاء المنشور:", error);
    }
    // حفظ المنشور في localStorage (اختياري)
    localStorage.setItem("post", JSON.stringify({ post }));
  };

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
        <input
          type="text"
          placeholder="عنوان المنشور"
          onChange={(e) => setTitle(e.target.value)}
          className="p-2 border rounded"
          value={title}
        />
        <input
          type="text"
          placeholder="وصف المنشور"
          onChange={(e) => setBody(e.target.value)}
          className="p-2 border rounded"
          value={body}
        />
        {/* حقل رقم الهاتف */}
        <input
          type="tel"
          placeholder="رقم الهاتف"
          onChange={(e) => setPhone(e.target.value)}
          className="p-2 border rounded"
          value={phone}
        />
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
        <Button
          type="submit"
          disabled={!title || !body || phone.replace(/\D/g, "").length < 10}
        >
          إنشاء المنشور
        </Button>
      </form>
    </div>
  );
}
