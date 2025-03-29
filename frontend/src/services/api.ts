import axios from "axios";

const API_URL = "http://localhost:3001/api";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Типы данных
export interface ProfileData {
  id: number,
  first_name: string,
  last_name: string,
  birth_date: string,
  about: string,
  email: string,
  phone: string,
  avatar: string,
  created_at: string,
  updated_at: string
}

export interface UpdateProfileData {
  id: number,
  first_name?: string,
  last_name?: string,
  birth_date?: string,
  about?: string,
  email?: string,
  phone?: string,
  avatar?: string,
}

export interface CreateProfileData {
  first_name?: string,
  last_name?: string,
  birth_date?: string,
  about?: string,
  email: string,
  phone?: string,
  avatar?: string,
}

export interface PostData {
  created_at: string
  id: number
  images: null | string[];
  text: string;
  updated_at: string;
  author_id: number;
  author_name: string
}

export interface CreatePostData {
  images?: null | string[];
  text: string;
  author_id: number;
  author_name: string;
}

type UpdatedData = Partial<PostData>;

type AvatarFile = File;
type PhotoFile = File;

// Profile API
export const getProfile = async (id?: string) => {
  const response = await api.get(`/users/${id || 1}`);
  return response.data;
};

export const getAllProfiles = async (id?: string) => {
  const response = await api.get(`/users`);
  return response.data;
};

export const updateProfile = async (profileData: UpdateProfileData) => {
  const response = await api.put(`/users/${profileData?.id}`, profileData);

  return response.data;
};

export const createProfile = async (profileData: CreateProfileData) => {
  const response = await api.post("/users", profileData);
  return response.data;
};

export const uploadAvatar = async (avatarFile: AvatarFile) => {
  const formData = new FormData();
  
  formData.append("file", avatarFile);

  const response = await api.post<{ url: string }>("/files/upload", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};

// Posts API
export const getPosts = async () => {
  const response = await api.get("/posts");
  return response.data;
};

export const createPost = async (postData: CreatePostData) => {
  console.log(postData, ' postData?')
  
  const response = await api.post("/posts", postData);
  return response.data;
};

export const updatePost = async (postId: number, updatedData: UpdatedData) => {
  const response = await api.put(`/posts/${postId}`, updatedData);
  return response.data;
};

export const deletePost = async (postId: number) => {
  await api.delete(`/posts/${postId}`);
};

export const uploadPhotos = async (photos: PhotoFile[]) => {
  const formData = new FormData();

  photos.forEach((file) => {
    formData.append('files', file);
  });

  const response = await api.post('/files/upload-multiple', formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};


export default api;
