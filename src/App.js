import React, { useState } from "react";
import "./style.css";
import Article from "./components/Article";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Create from "./components/Create";
import Update from "./components/Update";
import Control from "./components/Control";

export default function App() {
  var [mode, setMode] = useState("WELCOME");
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
