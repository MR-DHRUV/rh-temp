import React, { useState, useEffect } from "react";
import Testimonial from "./Testimonial";

const TestimonialSlider = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch(
          "https://rheapi.azurewebsites.net/testimonial"
        );
        const data = await response.json();
        setTestimonials(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTestimonials();
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(
        (currentIndex) => (currentIndex + 1) % testimonials.length
      );
    }, 10000);

    return () => clearInterval(intervalId);
  }, [testimonials]);

  // Validate testimonials array and set default value
  const testimonial =
    Array.isArray(testimonials) && testimonials[currentIndex]
      ? testimonials[currentIndex]
      : {};

  const handlePrevClick = () => {
    setCurrentIndex(
      currentIndex === 0 ? testimonials.length - 1 : currentIndex - 1
    );
  };

  const handleNextClick = () => {
    setCurrentIndex(
      currentIndex === testimonials.length - 1 ? 0 : currentIndex + 1
    );
  };

  return (
    <div className="testimonial-slider">
      <button onClick={handlePrevClick} className="testimonial-previous">
        <img src={require("../Assets/Media/Images/leftarrow_icon.png")} />
        {currentIndex + 1}/{testimonials.length}
      </button>
      <Testimonial testimonial={testimonial} />

      <button onClick={handleNextClick} className="testimonial-next">
        <img src={require("../Assets/Media/Images/rightarrow_icon.png")} />
      </button>
    </div>
  );
};

export default TestimonialSlider;
