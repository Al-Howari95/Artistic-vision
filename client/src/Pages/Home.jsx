import React from "react";
import Card from "../Component/Card";
import Dat from "../Component/Dat";
import D from "../Component/D";
import Oss from "../Component/Oss";
import Card2 from "../Component/Card2";
import Hero from "../Component/Hero";
import Button from "../Component/Button";

const Home = () => {
  return (
    <>
    
      <Hero />
      <Card />
      {/* <Dat /> */}
      <D />
      <Card2 />
      <Oss />
      <Button/>

    </>
  );
};

export default Home;
