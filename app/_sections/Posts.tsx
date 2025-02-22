"use client";
import React, { useContext, useState, useEffect } from "react";
import Card from "../_components/Card";
import { PostContext } from "../contexts/PostContext";

export default function Posts() {
  const { posts, refreshPosts } = useContext(PostContext);
  const [selectedCategory, setSelectedCategory] = useState("الكل");

  const categories = [
    { label: "الكل", color: "bg-gray-500" },
    { label: "التبادل", color: "bg-green-500" },
    { label: "التبرع", color: "bg-blue-500" },
    { label: "المفقودات", color: "bg-red-500" },
  ];

  // خريطة تحويل من التسميات العربية للقيم المخزنة (مثلاً: exchange, donation, lost)
  const categoryMapping: { [key: string]: string } = {
    التبادل: "exchange",
    التبرع: "donation",
    المفقودات: "lost",
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  // تحديث المنشورات عند تحميل الصفحة
  useEffect(() => {
    refreshPosts();
  }, [refreshPosts]);

  // تحديث المنشورات عند عودة المستخدم للصفحة
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        refreshPosts();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [refreshPosts]);

  // تطبيق الفلترة بناءً على الحقل choice
  let filteredPosts = posts;
  if (selectedCategory !== "الكل") {
    const filterChoice = categoryMapping[selectedCategory];
    filteredPosts = posts.filter((post: any) => post.choice === filterChoice);
  }

  return (
    <div className="flex flex-col gap-8 mt-28 p-14" id="content">
      <div className="flex justify-center flex-wrap gap-4 w-full overflow-auto">
        {categories.map((cat) => (
          <button
            key={cat.label}
            onClick={() => handleCategoryClick(cat.label)}
            className={`px-4 py-2 rounded-full border transition-all duration-300 ${
              selectedCategory === cat.label
                ? `${cat.color} text-white border-transparent`
                : "bg-transparent text-gray-700 border-gray-300 hover:bg-white/50"
            }`}
          >
            {cat.label}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts?.length ? (
          filteredPosts.map((post: any) => (
            <Card key={post.id} href={post.id} post={post} />
          ))
        ) : (
          <p className="col-span-full text-center text-lg text-gray-500">
            لايوجد منشورات حتى الآن
          </p>
        )}
      </div>
    </div>
  );
}
