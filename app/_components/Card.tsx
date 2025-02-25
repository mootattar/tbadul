"use client";
import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import noImage from "../assets/noImage.jpg";
import { useAuth } from "../contexts/AuthContexts";
import { doc, deleteDoc, updateDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { EditDialog, ConfirmDeleteDialog } from "./Dialog";

interface Post {
  id?: string;
  title?: string;
  body?: string;
  image?: string;
  secondImage?: string;
  phone?: string;
  uid?: string;
  choice?: string;
  auth?: string;
  createdAt?: Date;
}

export default function Card(props: { href: string; post: Post }) {
  const { href, post } = props;
  const { currentUser } = useAuth();

  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const handleEditConfirm = async (
    newTitle: string,
    newDescription?: string,
    newImage?: string,
    newSecondImage?: string
  ) => {
    try {
      await updateDoc(doc(collection(db, "posts"), post.id), {
        title: newTitle,
        body: newDescription,
        image: newImage,
        secondImage: newSecondImage,
      });
    } catch (error) {
      console.error("خطأ في تعديل المنشور:", error);
    } finally {
      setShowEditDialog(false);
    }
  };

  const handleEditCancel = () => {
    setShowEditDialog(false);
  };

  const handleDeleteConfirm = async () => {
    if (!post.id) {
      console.error("Post ID is undefined");
      return;
    }
    try {
      await deleteDoc(doc(db, "posts", post.id));
    } catch (error) {
      console.error("خطأ في حذف المنشور:", error);
    } finally {
      setShowDeleteDialog(false);
    }
  };

  const handleDeleteCancel = () => {
    setShowDeleteDialog(false);
  };

  return (
    <div className="bg-white shadow rounded-lg overflow-hidden relative">
      {post?.image ? (
        <Image
          src={post.image}
          alt={post.title || "Image"}
          loading="lazy"
          width={500}
          height={500}
          className="object-cover w-full h-[400px]"
        />
      ) : (
        <Image
          src={noImage}
          alt={post.title || "Image"}
          width={500}
          height={200}
          loading="lazy"
          className="object-contain w-full h-[300px]"
        />
      )}
      <div className="p-4 relative">
        <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
        <p className="text-gray-700 mb-4">{post.body}</p>
        <div className="flex justify-between">
          {currentUser?.uid === post.uid ? (
            <>
              <button
                onClick={() => setShowEditDialog(true)}
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded"
              >
                تعديل
              </button>
              <button
                onClick={() => setShowDeleteDialog(true)}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
              >
                حذف
              </button>
            </>
          ) : (
            <div className="flex justify-between w-full max-sm:flex-col text-center">
              <Link
                href={`post/${href}`}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded"
              >
                رؤية المزيد
              </Link>
              <Link
                href={`post/${href}`}
                className="bg-white hover:bg-black/10 border-2 text-black font-bold py-1 px-3 rounded-lg flex gap-2 transition-all"
              >
                التواصل مع الناشر{" "}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  version="1.1"
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  width="32"
                  height="32"
                  x="0"
                  y="0"
                  viewBox="0 0 200 200"
                  xmlSpace="preserve"
                >
                  <g>
                    <g data-name="Layer 2">
                      <g data-name="09.whatsapp">
                        <circle
                          cx="88"
                          cy="88"
                          r="88"
                          fill="#29a71a"
                          opacity="1"
                          data-original="#29a71a"
                          className=""
                        />
                        <g fill="#fff">
                          <path
                            d="M126.8 49.2a54.57 54.57 0 0 0-87.42 63.13l-5.79 28.11a2.08 2.08 0 0 0 .33 1.63 2.11 2.11 0 0 0 2.24.87l27.55-6.53A54.56 54.56 0 0 0 126.8 49.2zm-8.59 68.56a42.74 42.74 0 0 1-49.22 8l-3.84-1.9-16.89 4 .05-.21 3.5-17-1.88-3.71a42.72 42.72 0 0 1 7.86-49.59 42.73 42.73 0 0 1 60.42 0 2.28 2.28 0 0 0 .22.22 42.72 42.72 0 0 1-.22 60.19z"
                            fill="#ffffff"
                            opacity="1"
                            data-original="#ffffff"
                            className=""
                          />
                          <path
                            d="M116.71 105.29c-2.07 3.26-5.34 7.25-9.45 8.24-7.2 1.74-18.25.06-32-12.76l-.17-.15C63 89.41 59.86 80.08 60.62 72.68c.42-4.2 3.92-8 6.87-10.48a3.93 3.93 0 0 1 6.15 1.41l4.45 10a3.91 3.91 0 0 1-.49 4l-2.25 2.92a3.87 3.87 0 0 0-.35 4.32c1.26 2.21 4.28 5.46 7.63 8.47 3.76 3.4 7.93 6.51 10.57 7.57a3.82 3.82 0 0 0 4.19-.88l2.61-2.63a4 4 0 0 1 3.9-1l10.57 3a4 4 0 0 1 2.24 5.91z"
                            fill="#ffffff"
                            opacity="1"
                            data-original="#ffffff"
                            className=""
                          />
                        </g>
                      </g>
                    </g>
                  </g>
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>
      {showEditDialog && (
        <EditDialog
          initialTitle={post.title}
          initialBody={post.body}
          initialImage={post.image}
          initialSecondImage={post.secondImage}
          onConfirm={handleEditConfirm}
          onCancel={handleEditCancel}
        />
      )}
      {showDeleteDialog && (
        <ConfirmDeleteDialog
          message="هل أنت متأكد من حذف المنشور؟"
          onConfirm={handleDeleteConfirm}
          onCancel={handleDeleteCancel}
        />
      )}

      <p
        className={`absolute top-1 right-2 text-white px-3 py-1 rounded-md text-xs font-bold scale-75 ${
          post?.choice === "exchange"
            ? "bg-green-500"
            : post?.choice === "lost"
            ? "bg-red-500"
            : "bg-blue-500"
        }`}
      >
        {post?.choice === "exchange"
          ? "للتبادل"
          : post?.choice === "lost"
          ? "مفقودات"
          : "للتبرع"}
      </p>
    </div>
  );
}
