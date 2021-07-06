import Spinner from "react-spinner-material";
import React from "react";

import "./style.scss"

export function Loading() {
  return (
    <div className="snip">
      <Spinner
        size={300}
        radius={200}
        color={"#835afd"}
        spinnerColor={"#333"}
        spinnerWidth={2}
        visible={true}
      />
    </div>
  );
}
