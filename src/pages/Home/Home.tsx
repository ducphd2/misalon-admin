import React from "react";
import CardHome from "./components/Card";
import HeaderHome from "./components/Header";
import FooterHome from "./components/Footer";
import ContentHome from "./components/Content";

function Home() {
  return (
    <div>
      <HeaderHome />
      <ContentHome />
      <CardHome />
      <FooterHome />
    </div>
  );
}

export default Home;
