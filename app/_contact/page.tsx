import React from "react";

export default function Contact() {
  return (
    <div dir="rtl" className="min-h-screen bg-gray-100 flex flex-col">
      {/* الهيدر */}
      <header className="w-full bg-gray-800 p-6">
        <h1 className="text-white text-3xl font-bold text-center">
          تواصل معنا
        </h1>
      </header>

      {/* المحتوى الرئيسي */}
      <main className="flex-grow w-full max-w-3xl mx-auto my-8 p-4">
        <div className="bg-white shadow-md rounded-lg p-8">
          <form className="space-y-6">
            <div>
              <label
                htmlFor="name"
                className="block text-gray-700 font-bold mb-2"
              >
                الاسم
              </label>
              <input
                type="text"
                id="name"
                placeholder="أدخل اسمك"
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block text-gray-700 font-bold mb-2"
              >
                البريد الإلكتروني
              </label>
              <input
                type="email"
                id="email"
                placeholder="أدخل بريدك الإلكتروني"
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
            <div>
              <label
                htmlFor="subject"
                className="block text-gray-700 font-bold mb-2"
              >
                الموضوع
              </label>
              <input
                type="text"
                id="subject"
                placeholder="موضوع الرسالة"
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
              />
            </div>
            <div>
              <label
                htmlFor="message"
                className="block text-gray-700 font-bold mb-2"
              >
                الرسالة
              </label>
              <textarea
                id="message"
                placeholder="اكتب رسالتك هنا"
                rows={5}
                className="w-full border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-gray-500"
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded"
              >
                إرسال الرسالة
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
