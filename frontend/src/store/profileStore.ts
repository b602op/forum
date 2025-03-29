import { create } from "zustand";
import { getProfile, updateProfile, uploadAvatar, getAllProfiles, ProfileData, UpdateProfileData, CreateProfileData, createProfile } from "@/services/api";

interface ProfileState {
  profile: ProfileData;
  profiles: ProfileData[];
  fetchProfile: ({ userId }: { userId: string }) => Promise<void>;
  updateProfile: (profileData: UpdateProfileData) => Promise<void>;
  updateAvatar: (avatarFile: File) => Promise<unknown>;
  fetchAllProfiles: () => Promise<void>;
  createProfile: (profileData: CreateProfileData) => Promise<void>;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  profile: {
    "id": 0,
    "first_name": "пусто",
    "last_name": "пусто",
    "birth_date": "пусто",
    "about": "пусто",
    "email": "пусто",
    "phone": "пусто",
    "avatar": "",
    "created_at": "пусто",
    "updated_at": "пусто"
},
  profiles: [],

  fetchProfile: async ({ userId }: { userId: string }) => {
    try {
      const data = await getProfile(userId);
      set({ profile: data });
    } catch (error) {
      console.error("Ошибка при загрузке профиля:", error);
    }
  },

  fetchAllProfiles: async () => {
    try {
      const data = await getAllProfiles();
      set({ profiles: data });
    } catch (error) {
      console.error("Ошибка при загрузке всех профилей:", error);
    }
  },

  updateProfile: async (profileData: UpdateProfileData) => {
    try {
      const updatedProfile = await updateProfile(profileData);
      set({ profile: updatedProfile });
    } catch (error) {
      console.error("Ошибка при обновлении профиля:", error);
    }
  },

  createProfile: async (profileData: CreateProfileData) => {
    try {
      const updatedProfile = await createProfile(profileData);
      set({ profile: updatedProfile });
    } catch (error) {
      console.error("Ошибка при обновлении профиля:", error);
    }
  },

  updateAvatar: async (avatarFile: File) => {
    const currentProfile = get().profile;

    try {
      const updatedProfile = await uploadAvatar(avatarFile);

      set({ profile: { ...currentProfile, avatar: updatedProfile.url }});
    } catch (error) {
      console.error("Ошибка при обновлении аватара:", error);
    }
  },
}));