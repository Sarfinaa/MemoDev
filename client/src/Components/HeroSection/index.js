import React, { useState } from "react";
import Video from "../../videos/video.mp4";
import {
  HeroContainer,
  HeroBg,
  VideoBg,
  HeroContent,
  HeroH1,
  HeroBtnWrapper,
  ArrowForward,
  ArrowRight,
} from "./HeroElement";
import { Button } from "./ButtonElements";



const HeroSection = () => {
  const [hover, setHover] = useState(false);

  const onHover = () => {
    setHover(!hover);
  };

  return (
    <HeroContainer>
      <HeroBg>
        <VideoBg autoPlay loop muted src={Video} type="video/mp4" />
      </HeroBg>
      <HeroContent>
     
        <HeroH1>NEVER FORGET WHAT<br></br>YOU LEARN</HeroH1>
        <HeroBtnWrapper>
        <Button to="/auth"
        primary= "true"
        dark= "true"
        onMouseEnter={onHover} onMouseLeave={onHover}>
          Get started {hover ? <ArrowForward /> : <ArrowRight />}
        </Button>
      </HeroBtnWrapper>
      </HeroContent>
    </HeroContainer>
  );
};

export default HeroSection;
