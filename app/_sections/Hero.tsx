import { Button } from "@/components/ui/button";
import React from "react";

export default function Hero() {
  return (
    <section className="relative bg-black/60 h-[90vh] flex items-center justify-center text-center p-6">
      {/* النص في الأعلى */}
      <div className="absolute top-14 font-bold text-white/80">
        <p className="sm:text-4xl text-2xl">
          مرحبا بك في <span className="text-blue-300 ">تبادُل</span>
        </p>
        <p className="sm:text-3xl text-xl text-white/70 mt-12">
          <span className="text-red-300">!</span>يمكنك تبادل الكتب أو التبرع بها
          أو الإبلاغ عن المفقودات
        </p>
        <p className="sm:text-lg text-white/60 mt-6">
          موقع طلابي يسهّل عليك إيجاد ما تحتاجه أو مشاركة ما لا تحتاجه
        </p>
        <a href="#content">
          {/* <Button className="mt-12 text-xl bg-[hsl(195,6%,13%)] hover:bg-[hsl(0,0%,17%)]">
            تصفح المنشورات{" "}
          </Button> */}
          <Button className="mt-12 text-xl text-white font-bold bg-blue-700 hover:bg-blue-800">
            تصفح المنشورات{" "}
          </Button>
        </a>
      </div>

      {/* القائمة في أسفل اليمين */}
      <ul
        className="absolute bottom-16 right-16 text-[#C4C4C4] list-disc text-right"
        dir="rtl"
      >
        <li className="mb-2 sm:text-xl text-md">
          ساهم في نشر المعرفة داخل الجامعة، تبرع أو تبادل الكتب بسهولة
        </li>
        <li className="mb-2 sm:text-xl text-md">
          يمكنك تبادل الكتب أو التبرع بها أو الإبلاغ عن المفقودات!
        </li>
      </ul>
    </section>
  );
}
