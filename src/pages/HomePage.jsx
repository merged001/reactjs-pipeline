import React from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import Slider from "../components/slider/Slider";
import sliderData from "../assets/fake-data/data-slider";

const HomePage = () => {
  return (
    <div className="home-1">
      <Header />
      <Slider data={sliderData} />
      <Footer />
    </div>
  );
};

export default HomePage;
