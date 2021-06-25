export type QuestionType = {
  id?: string;
  author: {
    name: string,
    avatar: string
  },
  content: string,
  inAnswered: boolean,
  isHighlighted: boolean,
  likeCount?: number,
  likeId?: string | undefined,
  Likes?: Record<string, {
    authorId: string
  }>
}


