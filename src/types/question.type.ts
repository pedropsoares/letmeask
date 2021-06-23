export type Question = {
  id?: string;
  author: {
    name: string,
    avatar: string
  },
  content: string,
  inAnswered: boolean,
  isHighlighted: boolean
}


