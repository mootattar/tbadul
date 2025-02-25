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

export interface Post {
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
interface PostContextType {
  posts: Post[];
  refreshPosts: () => void;
}
export const FetchPostContext = createContext<PostContextType>({
  posts: [],
  refreshPosts: () => {},
});
export default function FetchPostsProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [posts, setPosts] = useState<Post[]>([]);
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
    <FetchPostContext.Provider value={{ posts, refreshPosts }}>
      {children}
    </FetchPostContext.Provider>
  );
}

// Custom hook لإعادة جلب البيانات عند الاستدعاء
export function useRefreshPosts() {
  const { refreshPosts } = useContext(FetchPostContext);
  return refreshPosts;
}
