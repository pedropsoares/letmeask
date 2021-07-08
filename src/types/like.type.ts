export type LikeType = {
  id?: string;
  isAnswered: boolean,
  likeCount?: number,
  likeId?: string | undefined,
  Likes?: Record<string, {
    authorId: string
  }>
  roomId?: string
}