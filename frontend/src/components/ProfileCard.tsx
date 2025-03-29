import { Card, CardContent } from "@/shared/Card";
import { useProfileStore } from "@/store/profileStore";
import { ProfileAvatar } from "./ProfileAvatar";

const ProfileCard = () => {
  const profile = useProfileStore((state) => state.profile);

  return (
    <Card className="w-full max-w-md p-4 shadow-md rounded-2xl">
      <ProfileAvatar />
      <CardContent className="flex flex-col items-center">
        <h2 className="text-xl font-semibold">{profile.first_name || "Имя"} {profile.last_name || "Фамилия"}</h2>
        <p className="text-gray-500">{profile.about || "О себе: не указано"}</p>
        <p className="text-gray-500">Email: {profile.email || "Не указан"}</p>
        <p className="text-gray-500">Телефон: {profile.phone || "Не указан"}</p>
      </CardContent>
    </Card>
  );
};

export default ProfileCard;