import React from "react";
import style from "./HeroLayer.module.css";
import particle from "../../assets/images/particle.png";

const HeroLayer = ({ backgroundWhite = false }) => {
  return (
    <div className={`${backgroundWhite ? style.bgWhite : ""} ${style.layer}`}>
      <img
        className={`${style.particle} ${style.left}`}
        src={particle}
        alt="Particle background"
      />
      <img
        className={`${style.particle} ${style.right}`}
        src={particle}
        alt="Particle background"
      />
    </div>
  );
};

export default HeroLayer;
