// Dialogs.tsx
import Image from "next/image";
import React, { useState } from "react";
import { usePostActions } from "../hooks/usePostActions";
import { ImageUp } from "lucide-react";

interface EditDialogProps {
  initialTitle?: string;
  initialBody?: string;
  initialImage?: string;
  initialSecondImage?: string;
  onConfirm: (
    title: string,
    body: string,
    image?: string,
    secondImage?: string
  ) => void;
  onCancel: () => void;
}

export const EditDialog: React.FC<EditDialogProps> = ({
  initialTitle = "",
  initialBody = "",
  initialImage,
  initialSecondImage,
  onConfirm,
  onCancel,
}) => {
  const { uploadImage } = usePostActions();
  const [errors, setErrors] = useState<{ title?: string; uploading?: string }>({
    title: "",
    uploading: "",
  });
  const [uploading, setUploading] = useState(false);
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const [image, setImage] = useState(initialImage);
  const [secondImage, setSecondImage] = useState(initialSecondImage);
  const handleAddImage = async (
    e: React.ChangeEvent<HTMLInputElement>,
    secondImage?: boolean
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    const url = await uploadImage(file);
    if (secondImage) setSecondImage(url);
    else setImage(url);
    setUploading(false);
  };
  const onSubmit = () => {
    let errors: {
      title?: string;
      uploading?: string;
    } = {
      title: "",
      uploading: "",
    };
    if (title.trim().length === 0) {
      errors = {
        ...errors,
        title: "يجب ان تدخل عنوان للمنشور",
      };
    }
    if (uploading) {
      errors = {
        ...errors,
        uploading: "الرجاء الإنتظار ريثما يتم تحميل الصورة",
      };
    }
    if (errors.title || errors.uploading) {
      setErrors(errors);
      return;
    }
    onConfirm(title, body, image, secondImage);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">تعديل المنشور</h2>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">العنوان</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="أدخل العنوان"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">الوصف</label>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="أدخل الوصف"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          {!image && (
            <>
              <input
                id="file-upload"
                type="file"
                onChange={(e) => handleAddImage(e, false)}
                style={{ display: "none" }}
              />
              <label htmlFor="file-upload" className="cursor-pointer p-1">
                <div className="flex items-center gap-4">
                  <ImageUp size={32} />
                  <p className="font-bold">إرفع الصورة</p>
                </div>
              </label>
            </>
          )}
          {uploading && errors.uploading ? (
            <p>{errors.uploading}</p>
          ) : (
            uploading && <p>جاري رفع الصورة...</p>
          )}
          <div className="flex gap-8">
            {image && (
              <div className="relative">
                <Image
                  loading="lazy"
                  src={image}
                  width={64}
                  height={64}
                  alt="الصورة الرئيسية"
                  className="w-[64px] h-[64px]"
                />
                <button
                  type="button"
                  onClick={() => setImage("")}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </div>
            )}
            {secondImage && (
              <div className="relative">
                <Image
                  src={secondImage}
                  width={64}
                  height={64}
                  alt="الصورة الثانية"
                  className="w-[64px] h-[64px]"
                  loading="lazy"
                />
                <button
                  type="button"
                  onClick={() => setSecondImage("")}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            الرجوع
          </button>
          <button
            onClick={() => onSubmit()}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            تأكيد
          </button>
        </div>
      </div>
    </div>
  );
};

interface ConfirmDeleteDialogProps {
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export const ConfirmDeleteDialog: React.FC<ConfirmDeleteDialogProps> = ({
  message = "هل أنت متأكد من حذف المنشور؟",
  onConfirm,
  onCancel,
}) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-sm">
        <p className="text-lg text-center mb-6">{message}</p>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            إلغاء
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            تأكيد
          </button>
        </div>
      </div>
    </div>
  );
};
