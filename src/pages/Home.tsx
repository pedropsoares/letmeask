import { useHistory } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

import illustrationImg from "../assets/images/illustration.svg";
import googleIconImg from "../assets/images/google-icon.svg";
import logo from "../assets/images/logo.svg";

import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";
import "../styles/auth.scss";

import { database } from "../service/firebase";
import { FormEvent, useState } from "react";
import { useRoom } from "../hooks/useRoom";

export function Home() {
  const history = useHistory();
  const { user, singWithGoogle } = useAuth();
  const [roomId, setRoomId] = useState("");
  const { isAuthoredByUser } = useRoom(roomId);

  async function handleCreateRoom() {
    if (!user) await singWithGoogle();

    history.push("/room/new");
  }

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomId.trim() === "") {
      toast("field cannot be empty");
      return;
    }

    const roomRef = await database.ref(`rooms/${roomId}`).get();

    if (!roomRef.exists()) {
      toast("Room does not exists.");
      return;
    }

    if (roomRef.val().endedAt) {
      toast("Room already cloused.");
      return;
    }

    if (isAuthoredByUser) {
      history.push(`/room/${roomId}`);
    } else {
      history.push(`/admin/room/${roomId}`);
    }
  }

  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustrationImg}
          alt="Inlustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp; A ao-vivo</strong>
        <p>Tire as duvidas da sua audiência em tempo real</p>
      </aside>
      <main>
        <Toaster />

        <div className="main-content">
          <img src={logo} alt="letmeask" />
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIconImg} alt="" />
            Crie sua sala com o google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomId(event.target.value)}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
