export class PostDto {
  id: number;
  text: string;
  images: string[];
  author_id: number;
  author_name: string;
  created_at: Date;
  updated_at: Date;
}

// update 
export class UpdatePostDto {
  id: number;
  text?: string;
  images?: string[];
}

// create
export class CreatePostDto {
  text: string;
  images?: string[];
  author_id: number;
  author_name: string;
}
