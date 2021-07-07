import { useEffect, useState } from "react";
import { database } from "../service/firebase";

import { QuestionType } from "../types/question.type";
import { useAuth } from "./useAuth";

export function useRoom(roomId: string) {
  const { user } = useAuth();
  const [titleRoom, setTitleRoom] = useState("");
  const [questions, setQuestions] = useState<QuestionType[]>([]);
  const [isAuthoredByUser, setIsAuthoredByUser] = useState<boolean>();

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on("value", (room) => {
      const dbRoom = room.val();
      const objQuestions: { [key: string]: QuestionType } =
        dbRoom.questions || {};

      const questionsa = Object.entries(objQuestions)

      setQuestions(
        questionsa.map(
          ([id, question]) => ({
            ...question,
            id,
            likeCount: Object.values(question.Likes ?? {}).length,
            likeId: Object.entries(question.Likes ?? {}).find(([key, like]) => like.authorId === user?.id)?.[0]
          } as QuestionType),
        ),
      );

      setIsAuthoredByUser(dbRoom.authorId === user?.id)
      setTitleRoom(dbRoom.title);
    });

    return () => {
      roomRef.off("value")
    }
  }, [roomId, user?.id]);

  return { questions, titleRoom, isAuthoredByUser }

}