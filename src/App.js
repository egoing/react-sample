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
function Update(props) {
  var [title, setTitle] = useState(props.data.title);
  var [description, setDescription] = useState(props.data.description);

  return (
    <article>
      <h1>Update</h1>
      <form
        action="topics"
        method="put"
        onSubmit={function(e) {
          e.preventDefault();
          props.onUpdate({
            id: props.data.id,
            title: e.target.title.value,
            description: e.target.description.value
          });
          e.target.reset();
        }}
      >
        <p>
          <input
            type="text"
            name="title"
            placeholder="title"
            value={title}
            onChange={function(e) {
              setTitle(e.target.value);
            }}
          />
        </p>
        <p>
          <textarea
            name="description"
            placeholder="description"
            value={description}
            onChange={function(e) {
              setDescription(e.target.value);
            }}
          />
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
export default function App() {
  var [mode, setMode] = useState("UPDATE");
  var [selectedId, setSelectedId] = useState(1);
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
  } else if (mode === "UPDATE") {
    var selectedTopic = null;
    for (var i = 0; i < topics.length; i++) {
      if (topics[i].id === selectedId) {
        selectedTopic = topics[i];
        break;
      }
    }
    article = (
      <Update
        data={selectedTopic}
        onUpdate={function(data) {
          var newTopics = [...topics];
          for (var i = 0; i < newTopics.length; i++) {
            if (newTopics[i].id === data.id) {
              newTopics[i].title = data.title;
              newTopics[i].description = data.description;
              break;
            }
          }
          setTopics(newTopics);
          setMode("READ");
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
          if (mode === "DELETE") {
            var newTopics = [];
            for (var i = 0; i < topics.length; i++) {
              if (topics[i].id === selectedId) {
                continue;
              } else {
                newTopics.push(topics[i]);
              }
            }
            console.log(newTopics);
            setTopics(newTopics);
            mode = "WELCOME";
          }
          setMode(mode);
        }}
      />
    </div>
  );
}
