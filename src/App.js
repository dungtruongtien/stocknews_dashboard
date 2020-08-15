import React, { useEffect } from "react";
import { Client } from "@elastic/elasticsearch";
import logo from "./logo.svg";
import "./App.css";
const client = new Client({ node: "http://localhost:59701" });

function App() {
  useEffect(async () => {
    client.ping(
      {
        // ping usually has a 3000ms timeout
        requestTimeout: Infinity,
      },
      function (error) {
        if (error) {
          console.trace("elasticsearch cluster is down!");
        } else {
          console.log("All is well");
        }
      }
    );
    const result = await client.search({
      index: "my-index",
      body: {
        query: {
          match: { hello: "world" },
        },
      },
    });
    console.log("result---------------", result);
  }, []);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
