import React, { useState } from "react";
export default function Control(props) {
  return (
    <ul>
      <li>
        <input
          type="button"
          value="create"
          onClick={function() {
            props.onChangeMode("CREATE");
          }}
        />
      </li>
      <li>
        <input
          type="button"
          value="update"
          onClick={function() {
            props.onChangeMode("UPDATE");
          }}
        />
      </li>
      <li>
        <input
          type="button"
          value="delete"
          onClick={function() {
            props.onChangeMode("DELETE");
          }}
        />
      </li>
    </ul>
  );
}
