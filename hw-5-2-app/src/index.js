import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import MovieUpdate from "./components/Pages/MovieUpdate";
import ShowList from "./components/Pages/ShowList";
import MovieDetail from "./components/Pages/MovieDetail";
import MovieCreate from "./components/Pages/MovieCreate";

const path = window.location.pathname;
let component;

if (path.startsWith('/update/')) {
  component = <MovieUpdate />;
} else if (path.startsWith('/detail/')) {
  component = <MovieDetail />;
} else if (path === '/create') {
  component = <MovieCreate />;
} else {
  component = <ShowList />;
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(component);