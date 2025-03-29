import { Button } from "@/shared";
import { useProfileStore } from "@/store/profileStore";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const ProfilesPage = () => {
  const { profiles, fetchAllProfiles } = useProfileStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchAllProfiles();
  }, [fetchAllProfiles]);
  
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Список профилей</h1>
      <Button onClick={() => navigate(`/profile/create`)} type="primary">
        создать профиль
      </Button>
      <div className="grid grid-cols-3 gap-4 p-4">
        {profiles.map(({
          id,
          first_name: firstName,
          last_name: lastName
        }) => (
          <div 
            key={id} 
            className="p-4 border rounded-lg cursor-pointer background-gray-200 hoverbg-white" 
            onClick={() => navigate(`/profile/${id}`)}
          >
            <h2 className="text-lg font-bold text-center mt-2">
              {firstName} {lastName} (id: {id}) 
            </h2>
          </div>
        ))}
      </div>
    </div>
  );
};