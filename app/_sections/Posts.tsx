"use client";
import React, { useContext, useState, useEffect } from "react";
import Card from "../_components/Card";
import { Post, FetchPostContext } from "../contexts/FetchPostsContext";

export default function Posts() {
  const { posts, refreshPosts } = useContext(FetchPostContext);
  const [selectedCategory, setSelectedCategory] = useState("all");

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  useEffect(() => {
    refreshPosts();
  }, [refreshPosts]);

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

  let filteredPosts = posts;
  if (selectedCategory !== "all") {
    const filterChoice = selectedCategory;
    filteredPosts = posts.filter((post: Post) => post.choice === filterChoice);
  }

  return (
    <div className="flex flex-col gap-8 mt-28 p-14" id="content">
      <div className="flex sm:flex-row flex-col gap-4 justify-center">
        <div className="flex">
          <label className="relative flex items-center cursor-pointer">
            <input
              className="sr-only peer"
              name="futuristic-radio"
              type="radio"
              checked={selectedCategory === "all"}
              onChange={() => handleCategoryClick("all")}
            />
            <div className="w-6 h-6 bg-transparent border-2 border-green-500 rounded-full peer-checked:bg-green-500 peer-checked:border-green-500 peer-hover:shadow-lg peer-hover:shadow-green-500/50 peer-checked:shadow-lg peer-checked:shadow-green-500/50 transition duration-300 ease-in-out"></div>
            <span className="mx-2 text-black/90">الكل</span>
          </label>

          <label className="relative flex items-center cursor-pointer">
            <input
              className="sr-only peer"
              name="futuristic-radio"
              type="radio"
              checked={selectedCategory === "donation"}
              onChange={() => handleCategoryClick("donation")}
            />
            <div className="w-6 h-6 bg-transparent border-2 border-blue-500 rounded-full peer-checked:bg-blue-500 peer-checked:border-blue-500 peer-hover:shadow-lg peer-hover:shadow-blue-500/50 peer-checked:shadow-lg peer-checked:shadow-blue-500/50 transition duration-300 ease-in-out"></div>
            <span className="mx-2 text-black/70">تبرع</span>
          </label>
        </div>
        <div className="flex">
          <label className="relative flex items-center cursor-pointer">
            <input
              className="sr-only peer"
              name="futuristic-radio"
              type="radio"
              checked={selectedCategory === "exchange"}
              onChange={() => handleCategoryClick("exchange")}
            />
            <div className="w-6 h-6 bg-transparent border-2 border-yellow-500 rounded-full peer-checked:bg-yellow-500 peer-checked:border-yellow-500 peer-hover:shadow-lg peer-hover:shadow-yellow-500/50 peer-checked:shadow-lg peer-checked:shadow-yellow-500/50 transition duration-300 ease-in-out"></div>
            <span className="mx-2 text-black/70">تبادل</span>
          </label>
          <label className="relative flex items-center cursor-pointer">
            <input
              className="sr-only peer"
              name="futuristic-radio"
              type="radio"
              checked={selectedCategory === "lost"}
              onChange={() => handleCategoryClick("lost")}
            />
            <div className="w-6 h-6 bg-transparent border-2 border-red-500 rounded-full peer-checked:bg-red-500 peer-checked:border-red-500 peer-hover:shadow-lg peer-hover:shadow-red-500/50 peer-checked:shadow-lg peer-checked:shadow-red-500/50 transition duration-300 ease-in-out"></div>
            <span className="mx-2 text-black/90">مفقودات</span>
          </label>
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts?.length ? (
          filteredPosts.map((post: Post) => (
            <Card key={post.id} href={post?.id || ""} post={post} />
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
