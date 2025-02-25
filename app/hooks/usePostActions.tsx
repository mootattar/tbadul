import { db } from "@/lib/firebase";
import { addDoc, collection } from "firebase/firestore";

export const usePostActions = () => {
  // إنشاء منشور
  const createPost = async (post: {
    title: string;
    body: string;
    image?: string;
    secondImage?: string;
    uid: string;
    phone?: string;
    choice: string;
    createdAt: Date;
  }) => {
    try {
      // هنا يتم إرسال البيانات إلى API أو تخزينها في قاعدة البيانات
      await addDoc(collection(db, "posts"), post);
      console.log("📝 تم إنشاء المنشور:", post);
    } catch (error) {
      console.error("❌ خطأ أثناء إنشاء المنشور:", error);
    }
  };

  // تعديل منشور
  const updatePost = async (
    id: string,
    title: string,
    body: string,
    image?: string,
    secondImage?: string
  ) => {
    try {
      // إرسال تحديث المنشور إلى API
      console.log("✏️ تعديل منشور:", {
        id,
        title,
        body,
        image,
        secondImage,
      });
    } catch (error) {
      console.error("❌ خطأ أثناء تعديل المنشور:", error);
    }
  };

  // رفع الصورة إلى Cloudinary أو أي API آخر
  const uploadImage = async (file: File) => {
    const data = new FormData();
    if (!file) return;
    data.append("file", file);
    data.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD ?? ""
    );

    try {
      const res = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_URL}/image/upload`,
        {
          method: "POST",
          body: data,
        }
      );

      if (!res.ok) throw new Error("❌ فشل رفع الصورة");

      const uploadedImage = await res.json();
      return uploadedImage.secure_url;
    } catch (error) {
      console.error("❌ خطأ أثناء رفع الصورة:", error);
      return null;
    }
  };

  return { createPost, updatePost, uploadImage };
};
