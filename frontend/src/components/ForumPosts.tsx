import { ProfileData } from '@/services/api';
import { Button, Text, Container, Textarea, Input, Image } from '@/shared';
import { formatDateTime } from '@/shared/utils';
import { usePostsStore } from '@/store/postsStore';
import { useProfileStore } from '@/store/profileStore';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

type ForumPostsProps = {
  currentUser: ProfileData
}

export const ForumPosts = ({ currentUser }: ForumPostsProps) => {
  const { userId } = useParams<{ userId: string }>();
  const [newPostContent, setNewPostContent] = useState('');
  const [editingPostId, setEditingPostId] = useState<number | null>(null);
  const [editedContent, setEditedContent] = useState('');
  const [extraPhotos, setExtraPhotos] = useState<string[]>([]);

  const { fetchPosts, addPost, posts, editPost, removePost,uploadPhotos } = usePostsStore();

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleCreatePost = async () => {
    if (!newPostContent.trim()) return;

    await addPost({ 
      text: newPostContent, 
      author_id: currentUser.id, 
      author_name: currentUser.first_name,
      images: extraPhotos
    });

    setNewPostContent('');
    setExtraPhotos([]);
  };

  const handleStartEdit = (postId: number, currentText: string) => {
    setEditingPostId(postId);
    setEditedContent(currentText);
  };

  const handleSaveEdit = async (postId: number) => {
    if (!editedContent.trim()) return;
    
    await editPost(postId, { text: editedContent });
    await fetchPosts();
    
    setEditingPostId(null);
    setEditedContent('');
  };

  const handleCancelEdit = () => {
    setEditingPostId(null);
    setEditedContent('');
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = e.target.files;

      const answer = await uploadPhotos(Array.from(files));

      setExtraPhotos(answer?.map((photo) => photo.url) || []);
    }
  };

  return (
    <div className="forum-posts border-top">
      <h2>Форум</h2>
      
      {posts.length === 0 ? (
        <div>Пока нет ни одного поста</div>
      ) : (
        <div className="posts-list">
          {posts.sort((a, b) => a.created_at < b.created_at ? -1 : 1).map(({
            id: postId,
            images,
            text,
            author_id,
            author_name,
            created_at,
            updated_at
          }) => {
            const isSomeUser = author_id === Number(userId);
            const isEditing = editingPostId === postId;

            return (
              <Container 
                key={postId} 
                ownStyles={`margin: 10px 0; ${isSomeUser ? "margin-right: 60%;" : "margin-left: 60%;"}border: 1px solid #ccc; border-radius: 20px; background: #FFF; justify-content: space-between;`}
              >
                <Container ownStyles="flex-direction: column; margin: 10px;">
                  {updated_at === created_at ? null : <Text ownStyles='font-size: 0.8em; color: #999;'>изменено</Text>}
                  <Text ownStyles='font-weight: bold;'>{formatDateTime(created_at)} - {author_name}:</Text>
                  {isEditing ? (
                    <Textarea
                      value={editedContent}
                      onChange={(e) => setEditedContent(e.target.value)}
                      style={{ width: '100%', minHeight: '80px' }}
                    />
                  ) : (
                    <Text>{text}</Text>
                  )}
                  <Container ownStyles="disply: flex;">
                  {images?.map((url) => (
                    <Image
                      key={url}
                      src={url ? `http://localhost:3001${url}` : url}
                      size="small"
                      ownStyles='margin-right: 10px; cursor: pointer;'
                      onClick={() => window.open(`http://localhost:3001${url}`, '_blank')}
                    />
                  ))}
                  </Container>
                </Container>
                
                {isSomeUser && (
                  <div className="flex flex-col">
                    {isEditing ? (
                      <>
                        <Button 
                          onClick={() => handleSaveEdit(postId)}
                          type="primary"
                          ownStyles="margin: 10px 10px 10px;"
                        >
                          Сохранить
                        </Button>
                        <Button 
                          onClick={handleCancelEdit}
                          type="secondary"
                          ownStyles="margin: 0 10px 10px;"
                        >
                          Отмена
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button 
                          onClick={() => handleStartEdit(postId, text)}
                          type="secondary"
                          ownStyles="margin: 10px 10px 10px;"
                        >
                          Редактировать
                        </Button>
                        <Button 
                          ownStyles="margin: 0 10px 10px;" 
                          type="danger" 
                          onClick={() => removePost(postId)}
                        >
                          Удалить
                        </Button>
                      </>
                    )}
                  </div>
                )}
              </Container>
            )
          })}
        </div>
      )}
      
      <Container ownStyles='margin-top: 20px; display: flex; flex-direction: column;'>
        <Container ownStyles='display: flex;'>
          {extraPhotos?.map((url) => (
            <Image
              key={url}
              src={url ? `http://localhost:3001${url}` : url}
              size="small"
              ownStyles='margin-right: 10px;'
            />
          ))}
        </Container>
        <Textarea
          value={newPostContent}
          onChange={(e) => setNewPostContent(e.target.value)}
          placeholder="Введите тут сообщение"
        />
        <Container ownStyles='justify-content: flex-end;'>
          <Input type="file" onChange={handleFileChange} multiple />
          <Button onClick={handleCreatePost}>Отправить</Button>
        </Container>
      </Container>
    </div>
  );
};