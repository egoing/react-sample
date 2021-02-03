import React, { useState } from "react";
export default function Header(props) {
  return (
    <header>
      <h1>
        <a
          href="/"
          onClick={function(e) {
            e.preventDefault();
            props.onChangeMode();
          }}
        >
          WEB
        </a>
      </h1>
    </header>
  );
}
