import React, { useRef, useEffect, useState } from 'react';
import '../App.css'; // Assuming your custom CSS file is named styles.css

const FadeInLeft = () => {
  const [isVisible, setIsVisible] = useState(false);
  const componentRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5, // Adjust this value based on your requirement
      }
    );

    if (componentRef.current) {
      observer.observe(componentRef.current);
    }

    return () => {
      if (componentRef.current) {
        observer.unobserve(componentRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={componentRef}
      className={`transition-all duration-500 ${
        isVisible ? 'fadeInLeft' : 'opacity-0 translate-x-[-20px]'
      }`}
    >
      <img src="/assets/tipofday.png" alt="Eye Image"  />
    </div>
  );
}

export default FadeInLeft;
