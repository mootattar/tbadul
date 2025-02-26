import { db } from "@/lib/firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";

interface Post {
  title: string;
  body: string;
  image?: string;
  secondImage?: string;
  uid: string;
  phone?: string;
  choice: string;
  createdAt: Date;
}
interface UpdatePost {
  id: string;
  title: string;
  body?: string;
  image?: string;
  secondImage?: string;
  newChoice?: string;
}

export const usePostActions = () => {
  // إنشاء منشور
  const createPost = async (post: Post) => {
    try {
      // هنا يتم إرسال البيانات إلى API أو تخزينها في قاعدة البيانات
      await addDoc(collection(db, "posts"), post);
      console.log("📝 تم إنشاء المنشور:", post);
    } catch (error) {
      console.error("❌ خطأ أثناء إنشاء المنشور:", error);
    }
  };

  const updatePost = async (post: UpdatePost) => {
    try {
      await updateDoc(doc(collection(db, "posts"), post.id), {
        title: post.title,
        body: post.body,
        image: post.image,
        secondImage: post.secondImage,
        choice: post.newChoice,
      });
    } catch (error) {
      console.error("خطأ في تعديل المنشور:", error);
    }
  };

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
