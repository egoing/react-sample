import React, { useState, useEffect } from "react";
import "./style.css";
import Article from "./components/Article";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Create from "./components/Create";
import Update from "./components/Update";
import Control from "./components/Control";

var URL = process.env.REACT_APP_API_URL;
if(URL === undefined){
  console.error('/.env.development.template => /.env.development')
}
function getTopics(setTopics) {
  fetch(URL + "topics")
    .then(function(type) {
      return type.json();
    })
    .then(function(result) {
      setTopics(result);
    });
}

function Read(props) {
  var [topic, setTopic] = useState();
  useEffect(
    function() {
      if (props.id === null) return;
      fetch(URL + "topics/" + props.id)
        .then(function(type) {
          return type.json();
        })
        .then(function(result) {
          setTopic(result);
        });
    },
    [props.id]
  );
  if (topic) {
    return <Article title={topic.title} description={topic.description} />;
  } else {
    return <>Loading...</>;
  }
}
export default function App() {
  var [mode, setMode] = useState("WELCOME");
  var [selectedId, setSelectedId] = useState(null);
  var [topic, setTopic] = useState();
  var [nextId, setNextId] = useState(4);
  var [topics, setTopics] = useState([]);
  useEffect(function() {
    getTopics(setTopics);
  }, []);

  var article = null;
  if (mode === "WELCOME") {
    article = <Article title="Welcome" description="Hello, WEB" />;
  } else if (mode === "READ") {
    article = <Read id={selectedId} />;
  } else if (mode === "CREATE") {
    article = (
      <Create
        onCreate={function(data) {
          fetch(URL + "topics", {
            method: "POST",
            body: JSON.stringify({
              title: data.title,
              description: data.description
            }),
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(function(type) {
              return type.json();
            })
            .then(function(result) {
              getTopics(setTopics);
              setSelectedId(result.id);
              setMode("READ");
            });
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
          fetch(URL + "topics/" + data.id, {
            method: "PUST",
            body: JSON.stringify({
              title: data.title,
              description: data.description
            }),
            headers: {
              "Content-Type": "application/json"
            }
          })
            .then(function(type) {
              return type.json();
            })
            .then(function(result) {
              getTopic(setTopics);
              setSelectedId(result.id);
              setMode("READ");
            });

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
            setTopics(newTopics);
            mode = "WELCOME";
          }
          setMode(mode);
        }}
      />
    </div>
  );
}
