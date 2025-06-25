// import React from 'react';
// import logo from './images/logo.svg';
import Navbar from "./components/Navbar";
import Gallery from "./components/Gallery";
import Content from "./components/Content";
import Footer from "./components/Footer";
import CityGrid from './components/CityGrid';

import './styles/App.css';

function App() {
 return (
  <div>
    <Navbar/>
    <Gallery/>
    <Content/>
    {/* <CityGrid /> */}
    <Footer/>
  </div>
 );
}

export default App;