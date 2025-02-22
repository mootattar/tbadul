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
    newDescription: string
  ) => {
    try {
      await updateDoc(doc(collection(db, "posts"), post.id), {
        title: newTitle,
        body: newDescription,
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
            <Link
              href={`post/${href}`}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-1 px-3 rounded"
            >
              رؤية المزيد
            </Link>
          )}
        </div>
      </div>
      {showEditDialog && (
        <EditDialog
          initialTitle={post.title}
          initialDescription={post.body}
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
