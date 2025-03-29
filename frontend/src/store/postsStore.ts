import { create } from "zustand";
import { getPosts, createPost, updatePost, deletePost, PostData, CreatePostData, uploadPhotos } from "@/services/api";

interface PostsState {
  posts: PostData[];
  fetchPosts: () => Promise<void>;
  addPost: (newPost: CreatePostData) => Promise<void>;
  editPost: (id: number, updatedData: Partial<PostData>) => Promise<void>;
  removePost: (id: number) => Promise<void>;
  uploadPhotos: (files: File[]) => Promise<{ url: string }[]>;
}

export const usePostsStore = create<PostsState>((set) => ({
  posts: [],

  fetchPosts: async () => {
    try {
      const data = await getPosts();
      set({ posts: data });
    } catch (error) {
      console.error("Ошибка при загрузке постов:", error);
    }
  },

  addPost: async (newPost: CreatePostData) => {
    try {
      const createdPost = await createPost(newPost);
      
      set((state) => ({ posts: [createdPost, ...state.posts] }));
    } catch (error) {
      console.error("Ошибка при создании поста:", error);
    }
  },

  editPost: async (id: number, updatedData: Partial<PostData>) => {
    try {
      const updatedPost = await updatePost(id, updatedData);
      set((state) => ({
        posts: state.posts.map((post) => (post.id === id ? updatedPost : post)),
      }));
    } catch (error) {
      console.error("Ошибка при редактировании поста:", error);
    }
  },

  removePost: async (id: number) => {
    try {
      await deletePost(id);
      set((state) => ({ posts: state.posts.filter((post) => post.id !== id) }));
    } catch (error) {
      console.error("Ошибка при удалении поста:", error);
    }
  },

  uploadPhotos: async (files: File[]): Promise<{ url: string }[]> => {
    try {
      const uploadedPhotos = await uploadPhotos(files);

      return uploadedPhotos
    } catch (error) {
      console.error("Ошибка при загрузке фотографий:", error);
      return []
    }
  },
}));
