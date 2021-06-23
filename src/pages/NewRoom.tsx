import { FormEvent, useState } from "react";
import { Link, useHistory } from "react-router-dom";

import illustrationImg from "../assets/images/illustration.svg";
import logo from "../assets/images/logo.svg";

import "../styles/auth.scss";

import { database } from "../service/firebase";
import { Button } from "../components/Button";
import { useAuth } from "../hooks/useAuth";

export function NewRoom() {
  const { user } = useAuth();
  const history = useHistory();
  const [newRoom, setNewRoom] = useState("");

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === "") {
      alert("field cannot be empty");
      return;
    }

    const roomRef = database.ref("rooms");

    const firebaseRoom = await roomRef.push({
      title: newRoom,
      authorId: user?.id,
    });

    history.push(`/room/${firebaseRoom.key}`);
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
        <div className="main-content">
          <img src={logo} alt="letmeask" />
          <h2>Crie uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              onChange={(event) => setNewRoom(event.target.value)}
              value={newRoom}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          {user ? (
            <div></div>
          ) : (
            <p>
              Quer entrar em uma sala já existente?{" "}
              <Link to="/">Cique aqui</Link>
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
