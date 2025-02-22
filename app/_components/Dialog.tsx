// Dialogs.tsx
import React, { useState } from "react";

interface EditDialogProps {
  initialTitle?: string;
  initialDescription?: string;
  onConfirm: (title: string, description: string) => void;
  onCancel: () => void;
}

export const EditDialog: React.FC<EditDialogProps> = ({
  initialTitle = "",
  initialDescription = "",
  onConfirm,
  onCancel,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);

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
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="أدخل الوصف"
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex justify-end gap-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
          >
            الرجوع
          </button>
          <button
            onClick={() => onConfirm(title, description)}
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
