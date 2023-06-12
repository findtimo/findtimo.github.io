import React, { useEffect, useState, useRef } from 'react';
import { BrowserRouter } from 'react-router-dom';

import { CharacterCanvas } from '../src/components/canvas';
import { About, Contact, Experience, Hero, Navbar, Tech, Works, StarsCanvas } from './components';
import { styles } from "./styles";
import { throttle } from 'lodash';

const App = () => {
  const scrollContainerRef = useRef(null);
  const [scrollPass, setScrollPass] = useState(0);
  const [scrollMax, setScrollMax] = useState(window.innerHeight * 1);

  useEffect(() => {
    
    const handleScroll = throttle(() => {
      const scrollCurr = scrollContainerRef.current.scrollTop;
      
      if (scrollCurr < scrollMax/2 && scrollPass > scrollMax/2) {  //update scrollPassOverToChar when 
        setScrollPass(scrollCurr); //update character.jsx for animation
      } else if (scrollCurr >= scrollMax/2 && scrollPass < scrollMax/2) {
        setScrollPass(scrollCurr); //update character.jsx for animation
      }
    }, 250);

    scrollContainerRef.current.addEventListener('scroll', handleScroll);

    return () => {
      scrollContainerRef.current.removeEventListener('scroll', handleScroll);
    };
  }, [scrollPass, ]);

  return (
    <BrowserRouter>
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
        </div>
        <div className="scroll-container" ref={scrollContainerRef}>
          <div className="relative w-[auto] h-[200vh] scroll-section flex">
            <div className='relative w-[100%]'>
              <div className="scroll-content pt-12 md:pt-0">
                <Hero />
                <div className={`sticky right-0 top-0 pt-12 block md:hidden `}>
                    <CharacterCanvas scrollPass={scrollPass} scrollMax={scrollMax} />
                </div>
              </div>
              <div className="scroll-content">
                <About />
              </div>
            </div>
            <div className='absolute flex justify-end w-[100vw] h-[200vh] z-[-1]'>
              <div className='sticky w-[60%] h-[auto] '>
                <div className={`sticky right-0 top-0 pt-12 hidden md:block `}>
                    <CharacterCanvas scrollPass={scrollPass} scrollMax={scrollMax} />
                </div>
              </div>
            </div>
          </div>
            {/* <Experience /> */}
            <div className="scroll-item">
              <Works />
            </div>
            <div className="scroll-item relative z-0">
              <Contact />
              <StarsCanvas />
            </div>
        </div>

      </div>
    </BrowserRouter>
  );
};

export default App;