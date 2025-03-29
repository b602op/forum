import React from "react";
import Post from "@/components/Post";
import { usePostsStore } from "@/store/postsStore";

const PostList: React.FC = () => {
  const { posts } = usePostsStore();

  return (
    <div className="w-full max-w-2xl mx-auto mt-4">
      {posts.length > 0 ? (
        posts.map(({
          id,
          text,
          images,
          created_at,
          updated_at,
          author_name: authorName,
        }) => (
          <Post
            key={id}
            id={id}
            text={text}
            images={images}
            date={updated_at || created_at}
            isEditing={!!updated_at}
            onEdit={() => console.log("onEdit posts")}
            onDelete={() => console.log("onDelete posts")}
            authorName={authorName}
          />
        ))
      ) : (
        <p className="text-gray-500 text-center">Постов пока нет.</p>
      )}
    </div>
  );
};

export default PostList;
