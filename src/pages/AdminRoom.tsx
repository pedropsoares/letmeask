import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import logoImg from "../assets/images/logo.svg";
import deleteImg from "../assets/images/delete.svg";

import { useHistory } from "react-router-dom";

import "../styles/room.scss";

import { Question } from "../components/Question";
import { RoomCode } from "../components/RoomCode";
import { Loading } from "../components/Loading";
import { database } from "../service/firebase";
import { Button } from "../components/Button";
import { useRoom } from "../hooks/useRoom";

type RoomParams = {
  id: string;
};

export function AdminRoom() {
  const history = useHistory();
  const { id: roomId } = useParams<RoomParams>();
  const { questions, titleRoom, isAuthoredByUser } = useRoom(roomId);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof isAuthoredByUser === "boolean") {
      if (!isAuthoredByUser) {
        history.push(`/room/${roomId}`);
      } else {
        setLoading(false);
      }
    }
  }, [history, isAuthoredByUser, roomId]);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    });

    history.push("/");
  }

  async function handleDeleteQuestion(questionId: string | undefined) {
    if (window.confirm("Tem certeza que você deseja excluir esta pergunta?")) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  if (loading) {
    return <Loading />;
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={handleEndRoom}>
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>

      <main>
        {/* <Toaster /> */}

        <div className="room-title">
          <h1>Sala {titleRoom}</h1>
          {questions.length > 0 && <span>{questions.length} Pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map((question) => {
            return (
              <Question
                key={question.id}
                content={question.content}
                author={question.author}
              >
                <button onClick={() => handleDeleteQuestion(question.id)}>
                  <img src={deleteImg} alt="" />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  );
}
