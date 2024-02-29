import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import { CustomDot, Img, Next, Prev, SliderItem, TopSlider } from './sliderStyled'
import { imagesLink } from '../../imagesLink';
import { StyleSheetManager } from 'styled-components'


const SliderComponent = () => {
  var settings = {
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    customPaging: () => <CustomDot></CustomDot>,
    prevArrow: <Prev src={'/img/back.svg'} alt='Previous' />,
    nextArrow: <Next src={'/img/back.svg'} alt='next' />,
    responsive: [
      {
        breakpoint: 1440,
        settings: {},
      },
      {
        breakpoint: 1024,
        settings: {},
      },
      {
        breakpoint: 640,
        settings: {},
      },
    ],
  };
  return (
    <>
      <StyleSheetManager
        shouldForwardProp={prop =>
          prop !== 'currentSlide' && prop !== 'slideCount'
        }
      >
        <TopSlider>
          <Slider {...settings}>
            {imagesLink.map((item, index) => {
              return (
                <SliderItem key={index}>
                  <Img src={item} alt={`Slide ${index + 1}`} />
                </SliderItem>
              );
            })}
          </Slider>
        </TopSlider>
      </StyleSheetManager>
    </>
  );
};

export default SliderComponent;
