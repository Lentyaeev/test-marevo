import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import CanvasComponent from "./components/Canvas/Canvas";
import Selector from "./components/Selector/Selector";
import { colors, materials, metals } from "./constants";
import { useSearchParams } from "react-router-dom";
import ArButton from "./components/ArButton/ArButton";

function App() {
  const [searchParams, setSearchParams] = useSearchParams();
  //   React.useEffect(() => {
  //     const newParams = new URLSearchParams(searchParams);
  //     newParams.set("body", colors[0].value);
  //     newParams.set("metal", metals[0]);
  //     newParams.set("material", materials[0]);
  //     setSearchParams(newParams);
  //   }, []);
  const [mesh, setMesh] = React.useState(null);

  return (
    <>
      <ArButton mesh={mesh}/>
      <CanvasComponent setMesh={setMesh}/>
      <Selector />
    </>
  );
}

export default App;
