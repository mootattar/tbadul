"use client";
import { db } from "@/lib/firebase";
import { collection, getDocs } from "firebase/firestore";
import {
  createContext,
  useCallback,
  useEffect,
  useState,
  useContext,
} from "react";

export const PostContext = createContext({});

// Provider يقوم بجلب البيانات عند التحميل ويُمرر الدالة refreshPosts
export default function PostProvider({ children }) {
  const [posts, setPosts] = useState([]);

  // دالة لجلب المنشورات من Firestore
  const fetchPosts = useCallback(async () => {
    try {
      const postsCollection = collection(db, "posts");
      const postsSnapshot = await getDocs(postsCollection);
      const postsList = postsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setPosts(postsList);
    } catch (error) {
      console.error("خطأ في جلب المنشورات:", error);
    }
  }, []);

  // جلب البيانات عند تحميل المكون
  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  // دالة يمكن استدعاؤها لتحديث البيانات
  const refreshPosts = async () => {
    await fetchPosts();
  };

  return (
    <PostContext.Provider value={{ posts, refreshPosts }}>
      {children}
    </PostContext.Provider>
  );
}

// Custom hook لإعادة جلب البيانات عند الاستدعاء
export function useRefreshPosts() {
  const { refreshPosts } = useContext(PostContext);
  return refreshPosts;
}
