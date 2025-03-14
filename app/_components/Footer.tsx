import { Facebook } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4 flex flex-col md:flex-row justify-between items-center">
        {/* القسم الأول: معلومات الموقع */}
        <div className="mb-4 md:mb-0 text-center md:text-left">
          <h1 className="text-lg font-bold">تبادُل</h1>
          <p className="text-sm text-gray-400">© 2025 جميع الحقوق محفوظة</p>
        </div>
        {/* القسم الثاني: روابط التنقل */}
        <div className="flex flex-wrap justify-center space-x-4">
          <Link href="/" className="hover:text-gray-300">
            الرئيسية
          </Link>
          <Link href="/about" className="hover:text-gray-300">
            حولنا
          </Link>
        </div>
        {/* القسم الثالث: وسائل التواصل الاجتماعي */}
        <div className="mt-4 md:mt-0 text-center md:text-right">
          <p className="text-sm text-gray-400">
            تواصل معنا عبر وسائل التواصل الاجتماعي
          </p>
          <div className="flex justify-center md:justify-end space-x-3 mt-2">
            <Link
              href="https://www.facebook.com/profile.php?id=100076633877305"
              target="_blank"
              className="text-[hsl(214,89%,62%)]"
            >
              <Facebook />
            </Link>
            <Link href={`https://wa.me/+962776242523`} target="_blank">
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
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
