import React, { useState } from "react";
export default function Nav(props) {
  var tag = [];
  var d = props.data;
  for (var i = 0; i < d.length; i++) {
    tag.push(
      <li key={d[i].id}>
        <a
          href={"/" + d[i].id}
          data-id={d[i].id}
          onClick={function(e) {
            e.preventDefault();
            props.onChangeMode(Number(e.target.dataset.id));
          }}
        >
          {d[i].title}
        </a>
      </li>
    );
  }
  return (
    <nav>
      <ul>{tag}</ul>
    </nav>
  );
}
