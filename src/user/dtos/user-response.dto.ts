export class UserResponseDto {
  id: string;
  isAdmin?: boolean;
  session_id: string;
  bookmarks: string[];
  created_at: Date;
  updated_at: Date;
}
