import { useParams, useHistory } from "react-router-dom";
import { FormEvent, useState, useEffect } from "react";

import logoImg from "../assets/images/logo.svg";

import "../styles/room.scss";

import { LikeButton } from "../components/LikeButton";
import { Question } from "../components/Question";
import { RoomCode } from "../components/RoomCode";
import { Loading } from "../components/Loading";
import { database } from "../service/firebase";
import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import { useRoom } from "../hooks/useRoom";

type RoomParams = {
  id: string;
};

export function Room() {
  const history = useHistory();
  const { user, singWithGoogle } = useAuth();
  const { id: roomId } = useParams<RoomParams>();
  const { questions, titleRoom, isAuthoredByUser } = useRoom(roomId);

  const [newQuestion, setNewQuestion] = useState("");
  const [loading, setLoading] = useState(true);

  async function handleCreateRoom() {
    await singWithGoogle();
  }

  useEffect(() => {
    if (typeof isAuthoredByUser === "boolean") {
      if (isAuthoredByUser) {
        history.push(`/admin/room/${roomId}`);
      } else {
        setLoading(false);
      }
    }
  }, [history, isAuthoredByUser, roomId]);

  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();

    if (!user) {
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

  if (loading) {
    return <Loading />;
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
                Para enviar uma pergunta,{" "}
                <button type="button" onClick={handleCreateRoom}>
                  faça login
                </button>{" "}
              </span>
            )}
            <Button type="submit" disabled={!user || newQuestion === ""}>
              Enviar pergunta
            </Button>
          </div>
        </form>

        <div className="question-list">
          {questions.map(
            ({
              id,
              author,
              content,
              isAnswered,
              isHighlighted,
              likeId,
              likeCount,
            }) => {
              return (
                <Question
                  key={id}
                  author={author}
                  content={content}
                  isAnswered={isAnswered}
                  isHighlighted={isHighlighted}
                >
                  <LikeButton
                    roomId={roomId}
                    id={id}
                    likeId={likeId}
                    likeCount={likeCount}
                    isAnswered={isAnswered}
                  />
                </Question>
              );
            },
          )}
        </div>
      </main>
    </div>
  );
}
