import { useHistory } from "react-router-dom";

import illustrationImg from "../assets/images/illustration.svg";
import googleIconImg from "../assets/images/google-icon.svg";
import logo from "../assets/images/logo.svg";

import "../styles/auth.scss";
import { Button } from "../components/Button";

export function Home() {
  const history = useHistory();

  function navigateToNewRoom() {
    history.push("/room/new");
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
          <button onClick={navigateToNewRoom} className="create-room">
            <img src={googleIconImg} alt="" />
            Crie sua sala com o google
          </button>
          <div className="separator">ou entre em uma sala</div>
          <form>
            <input type="text" placeholder="Digite o código da sala" />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
}
