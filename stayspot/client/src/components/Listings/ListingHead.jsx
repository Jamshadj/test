import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Heading from './Heading';

function ListingHead({ title, locationValue, imageSrc }) {
  return (
    <div className="relative">
      <Heading title={title} subtitle={`${locationValue?.text}`} />
      <div className="w-full md:h-[60vh] h-[30vh] overflow-hidden rounded-xl relative flex md:hidden">
        <Carousel
          showThumbs={false}
          showStatus={false}
          emulateTouch={true}
          swipeable={true}
        >
          {imageSrc.map((image, index) => (
            <div key={index}>
              <img src={image} alt={`Image ${index + 1}`} className="object-cover w-full h-[60vh]" />
            </div>
          ))}
        </Carousel>
      </div>
      <div className="hidden md:block">
        <div className="flex gap-2">
          <img
            src={imageSrc[0]}
            alt={`Image 1`}
            className="object-cover h-[60vh] w-1/2"
          />
          <div className="flex flex-col gap-2">
            {imageSrc.slice(1, 3).map((image, index) => (
              <img
                key={index + 1}
                src={image}
                alt={`Image ${index + 2}`}
                className="object-cover h-[30vh]"
              />
            ))}
          </div>
          <div className="flex flex-col gap-2">
            {imageSrc.slice(3, 5).map((image, index) => (
              <img
                key={index + 1}
                src={image}
                alt={`Image ${index + 2}`}
                className="object-cover h-[30vh]"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ListingHead;
