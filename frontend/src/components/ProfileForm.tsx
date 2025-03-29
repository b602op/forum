import React, { useState } from "react";
import { Button } from "@/shared/Button/Button";
import { Input } from "@/shared/Input";
import { TextBlock } from "@/shared/TextBlock";
import { useProfileStore } from "@/store/profileStore";
import { ProfileAvatar } from "./ProfileAvatar";

interface ProfileFormProps {
  onClose: () => void;
}

const ProfileForm: React.FC<ProfileFormProps> = ({ onClose }) => {
  const { profile, updateProfile } = useProfileStore();

  const {
    first_name: firstName,
    last_name: lastName,
    birth_date: birthDate,
    email,
    phone,
    about,
    id,
  } = profile;
  
  const [formData, setFormData] = useState({
    first_name: firstName || "",
    last_name: lastName || "",
    email: email || "",
    phone: phone || "",
    about: about ||  "",
    avatar: "",
    birth_date: birthDate || "",
    id,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    updateProfile({ ...formData, avatar: profile.avatar });
    onClose();
  };

  return (
    <>
      <div className="w-full max-w-md p-4 bg-white shadow-md rounded-2xl">
        <ProfileAvatar isEdit />
        <Input name="first_name" value={formData.first_name} onChange={handleChange} placeholder="Имя" />
        <Input name="last_name" value={formData.last_name} onChange={handleChange} placeholder="Фамилия" />
        <Input name="email" value={formData.email} onChange={handleChange} placeholder="Email" disabled />
        <Input name="phone" value={formData.phone} onChange={handleChange} placeholder="Телефон" />
        <TextBlock name="about" value={formData.about} onChange={handleChange} placeholder="О себе" />
        <Input type="date" name="birth_date" placeholder="дата рождения" value={formData.birth_date} onChange={handleChange} />
        <div className="flex justify-end gap-2">
          <Button onClick={onClose}>Отмена</Button>
          <Button onClick={handleSubmit}>Сохранить</Button>
        </div>
      </div>
    </>
  );
};

export default ProfileForm;