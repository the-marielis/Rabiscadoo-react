import React from "react";
import "../main.css";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import tattoo1 from "../../public/images/tatuagem1.jpg";
import tattoo2 from "../../public/images/tatuagem2.jpg";
import tattoo3 from "../../public/images/tatuagem3.jpg";
import tattoo4 from "../../public/images/tatuagem4.jpg";
import tattoo5 from "../../public/images/tatuagem5.jpg";
import tattoo6 from "../../public/images/tatuagem6.jpg";
import manchaImg from "../../public/images/mancha1.png";

const Home = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="container-home">
      <div className="slider">
      <Slider {...settings}>
              <div><img src={tattoo1} alt="Tattoo 1" /></div>
              <div><img src={tattoo2} alt="Tattoo 2" /></div>
              <div><img src={tattoo3} alt="Tattoo 3" /></div>
              <div className="tattoo4"><img src={tattoo4} alt="Tattoo 4" /></div>
              <div><img src={tattoo5} alt="Tattoo 5" /></div>
              <div><img src={tattoo6} alt="Tattoo 6" /></div>
            </Slider>
      </div>

      <div className="img-fundo">
        <img src={manchaImg} alt="mancha" />
      </div>
      <div className="entrar">
        <button>
          <a href="#">VENHA <br /> CONHECER</a>
        </button>
      </div>
    </div>
  );
};

export default Home;