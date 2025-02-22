import {
  signInAnonymously,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  EmailAuthProvider,
  linkWithCredential,
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc } from "firebase/firestore";

// تسجيل الدخول كمستخدم مجهول
export const loginAnonymously = async () => {
  try {
    const userCredential = await signInAnonymously(auth);
    return userCredential.user;
  } catch (error) {
    console.error("خطأ في تسجيل الدخول كمجهول:", error);
    throw error;
  }
};

// إنشاء حساب جديد باستخدام البريد الإلكتروني وكلمة المرور
export const signup = async (
  email: string,
  password: string,
  username: string,
  phone: string,
  image?: string
) => {
  try {
    let user;
    // إذا كان المستخدم الحالي موجود ومجهول، نقوم بترقية الحساب المجهول
    if (auth.currentUser && auth.currentUser.isAnonymous) {
      const credential = EmailAuthProvider.credential(email, password);
      const userCredential = await linkWithCredential(
        auth.currentUser,
        credential
      );
      user = userCredential.user;
    } else {
      // إنشاء حساب جديد باستخدام البريد الإلكتروني وكلمة المرور
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      user = userCredential.user;
    }
    // تحديث ملف المستخدم لإضافة اسم المستخدم والصورة (إذا وُجدت)
    await updateProfile(user, {
      displayName: username,
    });
    // تخزين البيانات الإضافية مثل رقم الهاتف والصورة في Firestore
    await setDoc(doc(db, "users", user.uid), {
      email,
      username,
      phone,
      image: image || null,
      createdAt: new Date(),
    });
    return user;
  } catch (error) {
    console.error("خطأ في إنشاء الحساب:", error);
    throw error;
  }
};
export const login = async (email: string, password: string) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    return userCredential.user;
  } catch (error) {
    console.error("خطأ في تسجيل الدخول:", error);
    throw error;
  }
};

export const logout = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error("خطأ في تسجيل الخروج:", error);
    throw error;
  }
};
