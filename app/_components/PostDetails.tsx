"use client";
import { User } from "lucide-react";
import Image from "next/image";
import React, { useContext, useEffect, useState } from "react";
import avatar from "../assets/avatar.png";
import { Post, PostContext } from "../contexts/PostContext";
import noImage from "../assets/noImage.jpg";
import Link from "next/link";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export default function PostDetails({ id }: { id: string }) {
  const { posts } = useContext(PostContext);
  const post = posts?.find((p: Post) => p.id === id);
  const [phone, setPhone] = useState("");
  useEffect(() => {
    const getUserPhone = async () => {
      if (post && post.uid) {
        const userDoc = await getDoc(doc(db, "users", post.uid!));
        setPhone(userDoc.data()?.phone || post.phone);
      }
    };
    getUserPhone();
  }, [post]);

  if (!post) {
    return <h1>post is not exist</h1>;
  }
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div
        className="max-w-6xl w-full bg-white rounded-lg shadow-xl p-8 md:p-10 flex flex-col md:flex-row gap-8"
        dir="rtl"
      >
        <div className="md:w-1/2 flex flex-col justify-between">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <h1 className="text-3xl font-bold text-gray-800">{post.title}</h1>
              <p className="text-gray-600 leading-relaxed">{post.body}</p>
            </div>

            <div className="flex gap-4">
              <div className="flex flex-col gap-2">
                <p>تواصل مع الناشر من خلال الواتس آب</p>
                <Link
                  href={`https://wa.me/+962${phone?.slice(1)}`}
                  target="_blank"
                  className="text-white bg-green-500 text-nowrap hover:bg-green-600 focus:ring-4 focus:outline-none focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all"
                >
                  الذهاب إلى الواتس آب
                </Link>
              </div>
              <Link
                href={`https://wa.me/+962${phone?.slice(1)}`}
                target="_blank"
              >
                {" "}
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
                </svg>{" "}
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4 mt-6 p-4 bg-gray-50 rounded-lg">
            <Image
              loading="lazy"
              alt="author"
              src={avatar}
              className="rounded-full w-[48px] h-[48px]"
            />
            <div className="flex flex-col">
              <p className="font-semibold text-gray-700">
                {post?.auth || "مجهول"}
              </p>
            </div>
            <User className="text-gray-400 ml-auto" />
          </div>
        </div>

        <div className="md:w-1/2">
          <div className="flex flex-col gap-2">
            <div className="relative rounded-lg overflow-hidden">
              <Image
                alt="space"
                src={post.image || noImage}
                width={600}
                height={400}
                loading="lazy"
                className="object-contains w-full h-full"
              />
            </div>

            {post.secondImage && (
              <div className="relative flex items-center justify-center overflow-hidden">
                <Image
                  alt="space"
                  width={40}
                  height={40}
                  loading="lazy"
                  src={post.secondImage}
                  className="w-[40px] h-[40px] rounded-full"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
