import React from "react";
import { Card, CardContent } from "@/shared/Card";
import { Button } from "@/shared/Button/Button";

interface PostProps {
  id: number;
  text: string;
  images: null | string[];
  date: string;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
  isEditing: boolean;
  authorName: string;
}

const Post: React.FC<PostProps> = ({ authorName, id, text, images, date, onEdit, onDelete, isEditing }) => {
  return (
    <Card className="w-full p-4 shadow-md rounded-2xl mb-4">
      <CardContent>
        <p className="text-gray-700 mb-2">{text}</p>
        {(images || []).length > 0 && (
          <div className="grid grid-cols-2 gap-2 mb-2">
            {(images || []).map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Post image ${index}`}
                className="w-full h-32 object-cover rounded-lg"
              />
            ))}
          </div>
        )}
        <p className="text-xs text-gray-500">Опубликовано: {new Date(date).toLocaleString()}</p>
        <div className="flex justify-end gap-2 mt-2">
          <Button onClick={() => onEdit(id)} ownStyles="margin: 10px 0;">Редактировать</Button>
          <Button type="danger" onClick={() => onDelete(id)}>Удалить</Button>
        </div>
        <>{isEditing ? "редактировано" : "не редактировано"}</>
        <>пост создал: {authorName}</>
      </CardContent>
    </Card>
  );
};

export default Post;