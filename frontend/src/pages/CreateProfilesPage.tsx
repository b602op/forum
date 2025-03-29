import { useState } from "react";
import { Button, Input, Textarea } from "@/shared";
import { useProfileStore } from "@/store/profileStore";
import { useNavigate } from "react-router-dom";
import { ProfileAvatar } from "@/components/ProfileAvatar";

export const CreateProfilesPage = () => {
  const navigate = useNavigate();
  const { createProfile, profile } = useProfileStore();

  const [profileData, setProfileData] = useState({
    first_name: "",
    last_name: "",
    birth_date: "",
    about: "",
    email: "",
    phone: "",
    avatar: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({ ...prev, [name]: value }));
  };

  // Обработчик отправки формы
  const handleSubmit = async () => {
    if (!profileData.email) {
      alert("Email обязателен");
      return;
    }
    await createProfile({ ...profileData, avatar: profile.avatar });
    navigate("/profile");
  };

  return (
    <div className="max-w-lg mx-auto p-4 bg-white shadow rounded">
      <Button onClick={() => navigate("/profile")} type="secondary">
        Назад к списку
      </Button>

      <h1 className="text-xl font-bold mt-4 mb-2">Создание профиля</h1>

      <ProfileAvatar isEdit />

      <div className="space-y-3">
        <Input name="first_name" placeholder="Имя" value={profileData.first_name} onChange={handleChange} />
        <Input name="last_name" placeholder="Фамилия" value={profileData.last_name} onChange={handleChange} />
        <Input type="date" name="birth_date" placeholder="дата рождения" value={profileData.birth_date} onChange={handleChange} />
        <Textarea name="about" placeholder="О себе" value={profileData.about} onChange={handleChange} />
        <Input name="email" type="email" placeholder="Email *" value={profileData.email} onChange={handleChange} />
        <Input name="phone" type="tel" placeholder="Телефон" value={profileData.phone} onChange={handleChange} />
      </div>

      <Button onClick={handleSubmit} type="primary" className="mt-4">
        Создать профиль
      </Button>
    </div>
  );
};
