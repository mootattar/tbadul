"use client";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
} from "@/components/ui/sheet";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { MenuIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import avatar from "../assets/avatar.png";
import { useAuth } from "../contexts/AuthContexts";
import { logout } from "../functions/signIn";
import { db } from "@/lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function Header() {
  const { currentUser } = useAuth();
  const [open, setOpen] = useState(false);
  const [userPhoto, setuserPhoto] = useState("");
  const router = useRouter();
  const menuRef = useRef<HTMLImageElement>(null);
  useEffect(() => {
    const fetchuserPhoto = async () => {
      if (currentUser) {
        const userDoc = await getDoc(doc(db, "users", currentUser.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setuserPhoto(userData.image);
        }
      }
    };
    fetchuserPhoto();
  }, [currentUser]);
  const handleLogout = () => {
    logout();
    router.push("/");
  };
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const buttons = [
    {
      label: "الرئيسية",
      href: "/",
    },
    {
      label: "منشوراتي",
      href: "/myposts",
    },
    {
      label: "حولنا",
      href: "/about",
    },
  ];
  if (!currentUser || currentUser.anonymous) {
    buttons.push({
      label: "نشر كمجهول",
      href: "/anonymous",
    });
  } else {
    buttons.push({
      label: "إنشاء منشور",
      href: "/create",
    });
  }
  return (
    <div dir="rtl" className="w-full px-4 lg:px-8 bg-[#202324]">
      <header className="flex h-20 w-full shrink-0 items-center px-4 md:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="lg:hidden">
              <MenuIcon className="h-6 w-6" />
              <span className="sr-only">تبديل قائمة التنقل</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="right">
            <SheetTitle className="sr-only">التنقل</SheetTitle>
            <Link href="#" prefetch={false}>
              <svg
                width="32"
                height="32"
                viewBox="0 0 32 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.5596 4.47998H24.0518L14.1324 19.1826H0.640137L10.5596 4.47998Z"
                  fill="#212121"
                />
                <path
                  d="M11.1502 21.1853L7.30811 26.88H21.4403L31.3598 12.1774H20.9294L14.8519 21.1853H11.1502Z"
                  fill="#404040"
                />
              </svg>{" "}
            </Link>
            <div className="grid gap-2 py-6">
              {buttons.map((button, index) => (
                <Link
                  key={index}
                  href={button.href}
                  className="flex w-full items-center py-2 text-lg font-semibold"
                  prefetch={false}
                >
                  {button.label}
                </Link>
              ))}
            </div>
          </SheetContent>
        </Sheet>
        <Link href="/" className="ml-6 hidden lg:flex" prefetch={false}>
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10.5596 4.47998H24.0518L14.1324 19.1826H0.640137L10.5596 4.47998Z"
              fill="#fa0"
            />
            <path
              d="M11.1502 21.1853L7.30811 26.88H21.4403L31.3598 12.1774H20.9294L14.8519 21.1853H11.1502Z"
              fill="#fff"
            />
          </svg>{" "}
        </Link>
        <NavigationMenu className="hidden lg:flex mr-20">
          <NavigationMenuList className="space-x-0 gap-4" dir="rtl">
            {buttons.map((button) => (
              <NavigationMenuLink key={button.label} asChild>
                <Link
                  href={button.href}
                  className="group navlink inline-flex h-9 w-max items-center focus:after:w-full justify-center rounded-md text-gray-400 bg-[#202324] text-sm font-semibold transition-colors hover:text-gray-50 focus:text-gray-50 focus:outline-none disabled:pointer-events-none disabled:opacity-50 data-[active]:bg-gray-100/50 data-[state=open]:bg-gray-100/50"
                  prefetch={false}
                >
                  {button.label}
                </Link>
              </NavigationMenuLink>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="flex mr-auto relative items-center gap-2 cursor-pointer group transition-all ease-linear px-8 sm:px-0">
          {currentUser ? (
            !currentUser.isAnonymous ? (
              <>
                <Image
                  width={40}
                  height={40}
                  src={userPhoto || avatar}
                  alt="space"
                  onClick={() => setOpen(!open)}
                  ref={menuRef}
                  loading="lazy"
                  className="rounded-full w-[40px] h-[40px]"
                />
                <div
                  className={`absolute top-[100%] z-50 right-[50%] translate-x-[50%] w-fit border bg-[#202324] text-black overflow-hidden transition-all ease-linear duration-500 whitespace-nowrap group-hover:max-h-[500px] group-hover:visible rounded-md ${
                    open ? "max-h-[500px] visible" : "max-h-0 invisible"
                  }`}
                >
                  <ul className="list-none text-white flex flex-col justify-center items-center p-4 gap-2 cursor-default">
                    <Link href="/profile">
                      <li className="font-bold hover:text-white/50 cursor-pointer transition-all">
                        حسابي
                      </li>
                    </Link>
                    <hr className="w-full border-gray-500" />
                    <li
                      onClick={handleLogout}
                      className="text-red-500 hover:text-red-300 cursor-pointer transition-all"
                    >
                      تسجيل الخروج
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <div className="flex gap-2">
                <Link href={"/login"} prefetch={false}>
                  <Button
                    variant="outline"
                    className="text-white/90 bg-[#181a1b] hover:bg-transparent hover:text-white border border-[#2b2f31]"
                  >
                    تسجيل الدخول
                  </Button>
                </Link>
                <Link href={"/signup"} prefetch={false}>
                  <Button className="text-white bg-black hover:bg-black/50">
                    إنشاء حساب
                  </Button>
                </Link>
              </div>
            )
          ) : (
            <div className="flex gap-2">
              <Link href={"/login"} prefetch={false}>
                <Button
                  variant="outline"
                  className="text-white/90 bg-[#181a1b] hover:bg-transparent hover:text-white border border-[#2b2f31]"
                >
                  تسجيل الدخول
                </Button>
              </Link>
              <Link href={"/signup"} prefetch={false}>
                <Button className="text-white bg-black hover:bg-black/50">
                  إنشاء حساب
                </Button>
              </Link>
            </div>
          )}
        </div>
      </header>
    </div>
  );
}
