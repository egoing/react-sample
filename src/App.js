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
function Create(props) {
  return (
    <article>
      <h1>Create</h1>
      <form
        action="topics"
        method="post"
        onSubmit={function(e) {
          e.preventDefault();
          props.onCreate({
            title: e.target.title.value,
            description: e.target.description.value
          });
          e.target.reset();
        }}
      >
        <p>
          <input type="text" name="title" placeholder="title" />
        </p>
        <p>
          <textarea name="description" placeholder="description" />
        </p>
        <p>
          <input type="submit" />
        </p>
      </form>
    </article>
  );
}
function Control(props) {
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
    </ul>
  );
}
export default function App() {
  var [mode, setMode] = useState("CREATE");
  var [selectedId, setSelectedId] = useState(null);
  var [nextId, setNextId] = useState(4);
  var [topics, setTopics] = useState([
    { id: 1, title: "html", description: "html is..." },
    { id: 2, title: "css", description: "css is..." },
    { id: 3, title: "js", description: "js is..." }
  ]);
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
  } else if (mode === "CREATE") {
    article = (
      <Create
        onCreate={function(data) {
          data.id = nextId;
          setTopics([...topics, data]);
          setSelectedId(nextId);
          setMode("READ");
          setNextId(nextId + 1);
        }}
      />
    );
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
      <Control
        onChangeMode={function(mode) {
          setMode(mode);
        }}
      />
    </div>
  );
}
