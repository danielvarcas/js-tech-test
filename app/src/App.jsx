import React from "react";
import "./App.css";
import Button from "react-bootstrap/Button";
import { Navbar } from "react-bootstrap";
import SkyBetLogo from "./images/skybet-logo.png";

function App() {
  return (
    <div className="App">
      <Navbar bg="primary">
        <Navbar.Brand href="#home">
          <img src={SkyBetLogo} alt="Sky Bet" />
        </Navbar.Brand>
      </Navbar>
      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
    </div>
  );
}

export default App;
