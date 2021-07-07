import { ReactNode } from 'react';
export type QuestionProps = {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isHighlighted?: boolean;
  isAnswered?: boolean;
}