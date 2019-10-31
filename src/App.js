import React from 'react';
import './App.css';
import Navigation from "./components/navigation/Navigation";
import Logo from "./components/logo/logo";
import ImageLinkForm from "./components/imagelinkform/ImageLinkForm";

function App() {
  return (
    <div className="App">
      <Navigation />
       <Logo />
       
      <ImageLinkForm />
      {/*
      <FaceRecognition />} */}
    </div>
  );
}

export default App;
