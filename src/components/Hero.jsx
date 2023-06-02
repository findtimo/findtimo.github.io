import { motion } from "framer-motion";

import { styles } from "../styles";
import { CharacterCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";

const Hero = () => {
  return (
    // <section className={`relative w-full h-auto mx-auto h-screen `}>
      <div className={`relative w-full md:h-[90vh] `}>
        <div className={`inset-0 max-w-7xl mx-auto flex`} >
          <div className='flex md:w-[55%] w-full mt-0 md:mt-12'>
            <div className='flex flex-row items-start gap-5 '>
              <div className='flex flex-col justify-center items-center'>
                <div className='w-5 h-5 rounded-full bg-[#915EFF]' />
                <div className='w-1 sm:h-50 h-40 violet-gradient' />
              </div>

              <div className='flex flex-col'>
                <div>
                  <h1 className={`${styles.heroHiImText} text-white`}> Hi, I'm </h1>
                  <h1 className={`${styles.heroHeadText} text-[#915EFF]`}>Timothy Koh</h1>
                </div>
                <p className={`${styles.heroSubText} mt-2 md:mt-8 text-white-100 w-[80%]`}>
                  I'm a <b>Software Engineer</b> specialising in full-stack development. Currently studying at <b>Singapore Management University</b>.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute bottom-32 left-0 right-0 flex justify-center">
          <div className="hidden md:block">
            <a href='#about'>
              <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start'>
                <motion.div animate={{y: [0, 24, 0], }} transition={{ duration: 1.5, repeat: Infinity, repeatType: "loop", }} className='w-3 h-3 rounded-full bg-secondary mb-1'/>
              </div>
            </a>
          </div>
        </div>
      </div>
    // </section>
  );
};

export default SectionWrapper(Hero, "hero");
