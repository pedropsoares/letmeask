import { FormEvent, useState } from "react";
import { useParams } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import logoImg from "../assets/images/logo.svg";

import "../styles/room.scss";

import { Question } from "../types/question.type";
import { RoomCode } from "../components/RoomCode";
import { database } from "../service/firebase";
import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { useEffect } from "react";

type RoomParams = {
  id: string;
};

export function Room() {
  const { user } = useAuth();
  const { id: roomId } = useParams<RoomParams>();
  const [titleRoom, setTitleRoom] = useState("");
  const [newQuestion, setNewQuestion] = useState("");
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`);

    roomRef.on("value", (room) => {
      const dbRoom = room.val();
      const objQuestions: { [key: string]: Question } = dbRoom.questions || {};
      setQuestions(
        Object.entries(objQuestions).map(
          ([id, question]) => ({ ...question, id } as Question),
        ),
      );

      setTitleRoom(dbRoom.title);
    });
  }, [roomId]);

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (newQuestion.trim() === "") {
      toast.error("field cannot be empty");
      return;
    }

    if (!user) {
      toast.error("You must be logged");
      return;
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar,
      },
      isHighlighted: false,
      isAnswered: false,
    };

    await database.ref(`rooms/${roomId}/questions`).push(question);

    setNewQuestion("");
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <RoomCode code={roomId} />
        </div>
      </header>

      <main>
        <Toaster />

        <div className="room-title">
          <h1>Sala {titleRoom}</h1>
          {questions.length > 0 && <span>{questions.length} Pergunta(s)</span>}
        </div>

        <form onSubmit={handleSendQuestion}>
          <textarea
            placeholder="O que você quer perguntas"
            onChange={(event) => setNewQuestion(event.target.value)}
            value={newQuestion}
          />
          <div className="form-footer">
            {user ? (
              <div className="user-info">
                <img src={user.avatar} alt={user.name} />
                <span>{user.name}</span>
              </div>
            ) : (
              <span>
                Para enviar uma pergunta, <button>faça uma pergunta</button>{" "}
              </span>
            )}
            <Button type="submit" disabled={!user}>
              Enviar pergunta
            </Button>
          </div>
        </form>

        {JSON.stringify(questions)}
      </main>
    </div>
  );
}
