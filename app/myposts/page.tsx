import React from "react";
import MyPosts from "./MyPosts";
export const metadata = {
  title: "myposts",
};
export default function page() {
  return (
    <>
      <MyPosts />
    </>
  );
}
