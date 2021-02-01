import React, { useState } from "react";
import "./style.css";
function Header(props) {
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
function Nav(props) {
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
function Article(props) {
  return (
    <article>
      <h2>{props.title}</h2>
      {props.description}
    </article>
  );
}
export default function App() {
  var [mode, setMode] = useState("WELCOME");
  var [selectedId, setSelectedId] = useState(null);
  var topics = [
    { id: 1, title: "html", description: "html is..." },
    { id: 2, title: "css", description: "css is..." },
    { id: 3, title: "js", description: "js is..." }
  ];
  var article = null;
  if (mode === "WELCOME") {
    article = <Article title="Welcome" description="Hello, WEB" />;
  } else if (mode === "READ") {
    for (var i = 0; i < topics.length; i++) {
      if (topics[i].id === selectedId) {
        article = (
          <Article
            title={topics[i].title}
            description={topics[i].description}
          />
        );
      }
    }
  }
  return (
    <div>
      <Header
        onChangeMode={function() {
          setMode("WELCOME");
        }}
      />
      <Nav
        data={topics}
        onChangeMode={function(topic_id) {
          setMode("READ");
          setSelectedId(topic_id);
        }}
      />
      {article}
    </div>
  );
}
