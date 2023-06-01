import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { CharacterCanvas } from '../src/components/canvas';
import { About, Contact, Experience, Hero, Navbar, Tech, Works, StarsCanvas } from './components';

const App = () => {
  const scrollContainerRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [scrollPass, setScrollPass] = useState(0);
  const scrollMax = window.innerHeight * 1;

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = scrollContainerRef.current.scrollTop;
      // const scrollMax = window.innerHeight * 1;
      // console.log(scrollTop, scrollMax);

      if(scrollTop > scrollMax) {
        setScrollPosition(scrollMax - scrollTop);
      } else {
        setScrollPass(scrollTop);
      }
    };

    scrollContainerRef.current.addEventListener('scroll', handleScroll);

    return () => {
      scrollContainerRef.current.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
        </div>
          <div className='fixed w-[100vw] h-[200vh]'>
            <div className='absolute right-[10vw] w-[30%] h-[200%]' style={{ top: `${scrollPosition}px` }}>
              <CharacterCanvas scrollPass={scrollPass} scrollMax={scrollMax} />
            </div>
          </div>
        <div className="scroll-container" ref={scrollContainerRef}>
          <div className="scroll-item">
            <Hero />
          </div>
          <div className="scroll-item">
            <About />
          </div>
          {/* <Experience /> */}
          <div className="scroll-item">
            <Works />
            <div className="relative z-0">
              <Contact />
              <StarsCanvas />
            </div>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
};

export default App;