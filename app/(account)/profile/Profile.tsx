"use client";
import React, { useState, useEffect } from "react";
import {
  signOut,
  reauthenticateWithCredential,
  EmailAuthProvider,
  updateProfile,
  updateEmail,
  deleteUser,
} from "firebase/auth";
import { doc, updateDoc, deleteDoc, getDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

export default function Profile() {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");

  // جلب بيانات المستخدم الحالي عند تحميل المكون
  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        setName(user.displayName || "");
        setEmail(user.email || "");
        try {
          const userDoc = await getDoc(doc(db, "users", user.uid));
          setPhone(userDoc.data()?.phone || "");
        } catch (error) {
          console.error("Error fetching user data:", error);
        }
      }
    };

    fetchUserData();
  }, []);

  // تبديل وضع التعديل
  const handleEdit = () => {
    setEdit(!edit);
  };

  // دالة تحديث معلومات الحساب بعد التحقق من كلمة المرور
  const handleUpdateAccount = async () => {
    if (!currentPassword) {
      alert("يرجى إدخال كلمة المرور الحالية للتحقق.");
      return;
    }
    const user = auth.currentUser;
    if (!user || !user.email) {
      alert("المستخدم غير موجود.");
      return;
    }
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    try {
      await reauthenticateWithCredential(user, credential);
      // تحديث بيانات الحساب في Auth
      await updateProfile(user, { displayName: name });
      if (user.email !== email) {
        await updateEmail(user, email);
      }
      // تحديث البيانات في Firestore
      const userDocRef = doc(db, "users", user.uid);
      await updateDoc(userDocRef, {
        username: name,
        email,
        phone,
      });
      alert("تم تحديث معلومات الحساب بنجاح.");
      setEdit(false);
      setCurrentPassword("");
    } catch (error) {
      console.error("Error updating account:", error);
      alert("فشل تحديث الحساب. تأكد من صحة كلمة المرور.");
    }
  };

  // دالة حذف الحساب بعد التحقق من كلمة المرور
  const handleDeleteAccount = async () => {
    if (!currentPassword) {
      alert("يرجى إدخال كلمة المرور الحالية للتحقق.");
      return;
    }
    const user = auth.currentUser;
    if (!user || !user.email) {
      alert("المستخدم غير موجود.");
      return;
    }
    const credential = EmailAuthProvider.credential(
      user.email,
      currentPassword
    );
    try {
      await reauthenticateWithCredential(user, credential);
      // حذف بيانات المستخدم من Firestore
      await deleteDoc(doc(db, "users", user.uid));
      // حذف الحساب من Auth
      await deleteUser(user);
      alert("تم حذف الحساب بنجاح.");
      // يمكنك إعادة توجيه المستخدم لصفحة تسجيل الدخول أو صفحة أخرى
      // window.location.href = "/signup";
    } catch (error) {
      console.error("Error deleting account:", error);
      alert("فشل حذف الحساب. تأكد من صحة كلمة المرور.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-8 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-6">حسابي</h1>
        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold">
              اسم الحساب:
            </label>
            {edit ? (
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            ) : (
              <p className="mt-1 text-gray-900">{name || "UserName"}</p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">
              البريد الإلكتروني:
            </label>
            {edit ? (
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            ) : (
              <p className="mt-1 text-gray-900">
                {email || "user@example.com"}
              </p>
            )}
          </div>
          <div>
            <label className="block text-gray-700 font-semibold">
              رقم الهاتف:
            </label>
            {edit ? (
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            ) : (
              <p className="mt-1 text-gray-900">
                {phone || "+966 123 456 789"}
              </p>
            )}
          </div>
          {/* حقل التحقق من كلمة المرور مطلوب للتحديث والحذف */}
          <div>
            <label className="block text-gray-700 font-semibold">
              كلمة المرور الحالية:
            </label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              placeholder="أدخل كلمة المرور للتحقق"
              className="mt-1 block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        </div>
        <div className="flex gap-4 flex-wrap w-full mt-6">
          <button
            onClick={handleDeleteAccount}
            className="grow bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            حذف الحساب
          </button>
          <button
            onClick={handleEdit}
            className="grow bg-teal-600 hover:bg-teal-700 text-white font-bold py-2 px-4 rounded"
          >
            {edit ? "إلغاء التعديل" : "تعديل المعلومات"}
          </button>
          {edit && (
            <button
              onClick={handleUpdateAccount}
              className="grow bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              تأكيد
            </button>
          )}
        </div>
        <div className="mt-4 text-center">
          <button
            onClick={() => signOut(auth)}
            className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
          >
            تسجيل الخروج
          </button>
        </div>
      </div>
    </div>
  );
}
