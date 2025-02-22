/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContexts";
import noImage from "../assets/noImage.jpg";
import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import { EditDialog, ConfirmDeleteDialog } from "../_components/Dialog";

export default function MyPosts() {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedPost, setSelectedPost] = useState<any>(null);

  const openEditDialog = (post: any) => {
    setSelectedPost(post);
    setShowEditDialog(true);
  };

  // دالة فتح حوار الحذف مع تمرير البيانات
  const openDeleteDialog = (post: any) => {
    setSelectedPost(post);
    setShowDeleteDialog(true);
  };

  // دالة التأكيد لتعديل المنشور
  const handleEditConfirm = async (
    newTitle: string,
    newDescription: string
  ) => {
    if (!selectedPost) return;
    try {
      await updateDoc(doc(db, "posts", selectedPost.id), {
        title: newTitle,
        description: newDescription, // تعديل الوصف بدلاً من `body`
      });

      // تحديث البيانات في الواجهة بدون إعادة تحميل الصفحة
      setPosts((prevPosts) =>
        prevPosts.map((post) =>
          post.id === selectedPost.id
            ? { ...post, title: newTitle, description: newDescription }
            : post
        )
      );
    } catch (error) {
      console.error("خطأ في تعديل المنشور:", error);
    } finally {
      setShowEditDialog(false);
      setSelectedPost(null);
    }
  };

  // دالة التأكيد لحذف المنشور
  const handleDeleteConfirm = async () => {
    if (!selectedPost) return;
    try {
      await deleteDoc(doc(db, "posts", selectedPost.id));

      // تحديث الحالة لإزالة المنشور المحذوف
      setPosts((prevPosts) =>
        prevPosts.filter((post) => post.id !== selectedPost.id)
      );
    } catch (error) {
      console.error("خطأ في حذف المنشور:", error);
    } finally {
      setShowDeleteDialog(false);
      setSelectedPost(null);
    }
  };

  // دالة لجلب المنشورات الخاصة بالمستخدم الحالي
  const fetchPosts = async () => {
    if (!currentUser) return;
    setLoading(true);
    try {
      const q = query(
        collection(db, "posts"),
        where("uid", "==", currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const fetchedPosts = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(fetchedPosts);
    } catch (error) {
      console.error("خطأ في جلب المنشورات:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  return (
    <div dir="rtl" className="min-h-screen bg-gray-100">
      <header className="w-screen bg-gray-800 p-6 mb-4 flex justify-between items-center">
        <h1 className="text-white text-3xl font-bold text-center w-full">
          منشوراتي
        </h1>
        <button
          onClick={fetchPosts}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
        >
          تحديث
        </button>
      </header>

      {loading && currentUser ? (
        <p className="text-center text-gray-600">جارٍ تحميل المنشورات...</p>
      ) : posts.length === 0 ? (
        <p className="text-center text-gray-600">لا توجد منشورات حتى الآن.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white shadow rounded-lg overflow-hidden"
            >
              <Image
                src={post.image || noImage}
                alt={post.title}
                width={500}
                height={300}
                loading="lazy"
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
                <p className="text-gray-700 mb-4">{post.description}</p>
                <div className="flex justify-between">
                  <button
                    onClick={() => openEditDialog(post)}
                    className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded"
                  >
                    تعديل
                  </button>
                  <button
                    onClick={() => openDeleteDialog(post)}
                    className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
                  >
                    حذف
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* حوار تعديل المنشور */}
      {showEditDialog && selectedPost && (
        <EditDialog
          initialTitle={selectedPost.title}
          initialDescription={selectedPost.description}
          onConfirm={handleEditConfirm}
          onCancel={() => setShowEditDialog(false)}
        />
      )}

      {/* حوار تأكيد الحذف */}
      {showDeleteDialog && selectedPost && (
        <ConfirmDeleteDialog
          message="هل أنت متأكد من حذف المنشور؟"
          onConfirm={handleDeleteConfirm}
          onCancel={() => setShowDeleteDialog(false)}
        />
      )}
    </div>
  );
}
