import React from "react";
import "./style.css";
function Header() {
  return (
    <header>
      <h1>WEB</h1>
    </header>
  );
}
function Nav() {
  return (
    <nav>
      <ul>
        <li>
          <a href="/1">html</a>
        </li>
        <li>
          <a href="/2">css</a>ewrewr
        </li>
        <li>
          <a href="/3">javascript</a>
        </li>
      </ul>
    </nav>
  );
}
function Article() {
  return (
    <article>
      <h2>Welcome</h2>
      Hello, WEB!
    </article>
  );
}
export default function App() {
  return (
    <div>
      <Header />
      <Nav />
      <Article />
    </div>
  );
}
