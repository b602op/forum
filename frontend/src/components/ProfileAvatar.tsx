import { Button, Container, Image, Input } from "@/shared";
import { useProfileStore } from "@/store/profileStore";
import { useState } from "react";


const avatar = require("@/assets/avatar.png");

type ProfileAvatarProps = {
  isEdit?: boolean;
}

export const ProfileAvatar = ({ isEdit }: ProfileAvatarProps) => {
  const [file, setFile] = useState<File | null>(null);
  
  const { profile, updateAvatar } = useProfileStore();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      setFile(file);

      await updateAvatar(file) as { url: string }
    }
  };
  
  return (
    <Container ownStyles="display: flex; flex-direction: column;">
      <Container ownStyles="display: flex; justify-content: center;">
      <Image
        src={profile.avatar ? `http://localhost:3001${profile.avatar}` : avatar}
        alt="Avatar"
        size="large"
      />
      </Container>
      {isEdit ? (
        <div className="file-upload-container">
          <div className="flex">
          <Input name="file" type="file" onChange={handleFileChange} />
          </div>
        </div>
      ) : null}
    </Container>
  )
};