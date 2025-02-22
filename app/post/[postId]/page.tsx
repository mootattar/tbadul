import React from "react";
import PostDetails from "@/app/_components/PostDetails";

export default async function PostId({
  params,
}: {
  params: Promise<{ postId: string }>;
}) {
  const id = (await params).postId;
  return (
    <>
      <PostDetails id={id} />
    </>
  );
}
