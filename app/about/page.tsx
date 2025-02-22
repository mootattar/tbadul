import React from "react";

export const metadata = {
  title: "about",
};

export default function About() {
  return (
    <div dir="rtl" className="min-h-screen flex flex-col bg-gray-50">
      {/* الهيدر */}
      <header className="bg-gray-800 p-6 text-center">
        <h1 className="text-white text-3xl font-bold">حولنا</h1>
      </header>

      {/* المحتوى الرئيسي */}
      <main className="flex-grow max-w-4xl mx-auto p-8">
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">منصتنا</h2>
          <p className="text-gray-700">
            منصتنا تهدف إلى تسهيل عمليات تبادل الكتب، التبرعات، والإبلاغ عن
            المفقودات بين طلبة الجامعات. نحن نسعى لجعل المعرفة والمساعدات متاحة
            للجميع من خلال توفير بيئة آمنة وسهلة الاستخدام.
          </p>
        </section>
        <section className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">رؤيتنا</h2>
          <p className="text-gray-700">
            رغم أن المنصة ما زالت في طور التطوير، فإن رؤيتنا هي أن تصبح منصة
            شاملة تخدم المجتمع بكافة فئاته، سواء كانوا طلبة أو غيرهم، من خلال
            دعم تبادل المعرفة والمساعدات بفعالية.
          </p>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">قيمنا</h2>
          <ul className="list-disc list-inside text-gray-700">
            <li>التعاون والمشاركة</li>
            <li>تبادل المعرفة</li>
            <li>الشفافية والثقة</li>
            <li>دعم المجتمع</li>
          </ul>
        </section>
      </main>
    </div>
  );
}
