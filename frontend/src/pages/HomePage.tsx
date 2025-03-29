import React, { useState } from "react";
import ProfileCard from "@/components/ProfileCard";
import PostList from "@/components/PostList";
import ProfileForm from "@/components/ProfileForm";
import { Button } from "@/shared";

const Home: React.FC = () => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);

  return (
    <div className="w-full max-w-4xl mx-auto p-4">
      <h1 className="text-2xl font-semibold text-center mb-4">Мой профиль</h1>
      <div className="flex flex-col items-center mb-6">
        {isEditingProfile ? (
          <ProfileForm onClose={() => setIsEditingProfile(false)} />
        ) : (
          <>
            <ProfileCard />
            <Button className="mt-4" onClick={() => setIsEditingProfile(true)}>Редактировать профиль</Button>
          </>
        )}
        <h2 className="text-xl font-semibold mb-4 items-center">Мои посты</h2>
      </div>
      <PostList />
    </div>
  );
};

export default Home;