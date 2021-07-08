import Spinner from "react-spinner-material";

import "./styles.scss";

import logoImg from "../../assets/images/logo.svg";

export function Loading() {
  return (
    <div className="snip">
      <Spinner
        radius={150}
        color={"#835afd"}
        spinnerColor={"#333"}
        spinnerWidth={1}
        visible={true}
        stroke={""}
        border
      />
      <div className="logo">
        <img src={logoImg} alt="Letmeask" />
      </div>
    </div>
  );
}
