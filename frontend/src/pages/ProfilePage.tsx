// frontend/src/pages/ProfilePage.tsx
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProfileStore } from "@/store/profileStore";
import { Button } from "@/shared/Button/Button";
import ProfileForm from "@/components/ProfileForm";
import { ForumPosts } from "@/components/ForumPosts";
import { ProfileAvatar } from "@/components/ProfileAvatar";
import { Container } from "@/shared/Container";
import { Text } from "@/shared";

const defaultAvatar = require("@/assets/avatar.png");

const ProfilePage: React.FC = () => {
  const { userId } = useParams<{ userId: string }>();

  const { profile, fetchProfile } = useProfileStore();
  const [isEditing, setIsEditing] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      fetchProfile({ userId });
    }
  }, [fetchProfile, userId]);

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  if (!profile) {
    return <div>Loading...</div>;
  }

  const {
    avatar,
    first_name: firstName,
    last_name: lastName,
    email,
    phone,
    about,
    id
  } = profile;

  return (
    <Container ownStyles="display: flex; flex-direction: column; margin: 20px;">
      <div>
      <Button
        onClick={() => navigate('/profile')}
      >
        назад к списку
      </Button>
      </div>
      <h1 className="text-2xl font-bold mb-4">Профиль пользователя</h1>
      <Container ownStyles="margin-bottom: 20px; display: flex; flex-direction: column; align-items: center;">
        {!isEditing ? (
          <Container ownStyles="display: flex; flex-direction: column; align-items: center;">
            <Container ownStyles="display: flex; flex-direction: column; align-items: center;">
              <ProfileAvatar />
              <Text>ФИО: {firstName} {lastName}</Text>
              <Text>Почта: {email}</Text>
              <Text>Телефон: {phone}</Text>
              <Text>О себе: {about}</Text>
            </Container>

            <Button onClick={() => setIsEditing(true)} type="primary">
              Редактировать профиль
            </Button>
          </Container>
        ) : (
          <ProfileForm
            // initialData={profile}
            // onSave={handleSaveProfile}
            onClose={handleCancelEdit}
          />
        )}
      </Container>
      <ForumPosts currentUser={profile} />
    </Container>
  );
};

export default ProfilePage;
