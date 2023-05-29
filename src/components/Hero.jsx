import { motion } from "framer-motion";

import { styles } from "../styles";
import { CharacterCanvas } from "./canvas";

const Hero = () => {
  return (
    <section className={`relative w-full h-auto mx-auto lg:h-[100vh] pt-10`}>
      <div className={`inset-0 max-w-7xl mx-auto ${styles.paddingX} flex xl:flex-row flex-col mt-5`} >
        <div className='flex-1 mt-10'>
          <div className='flex flex-row items-start mt-10 gap-5 '>
            <div className='flex flex-col justify-center items-center mt-15'>
              <div className='w-5 h-5 rounded-full bg-[#915EFF]' />
              <div className='w-1 sm:h-50 h-40 violet-gradient' />
            </div>

            <div className='flex flex-col mt-15'>
              <div>
                <h1 className={`${styles.heroHiImText} text-white`}> Hi, I'm </h1>
                <h1 className={`${styles.heroHeadText} text-[#915EFF]`}>Timothy Koh</h1>
              </div>
              <p className={`${styles.heroSubText} mt-4 text-white-100 w-[80%]`}>
                I'm a <b>Software Engineer</b> specialising in full-stack development. Currently studying at <b>Singapore Management University</b>.
              </p>
            </div>
          </div>
        </div>
        <div className='flex-1'>
          <CharacterCanvas />
        </div>
      </div>

      <div className='relative xs:bottom-10 bottom-32 w-full flex justify-center items-center'>
        <a href='#about'>
          <div className='w-[35px] h-[64px] rounded-3xl border-4 border-secondary flex justify-center items-start mt-6'>
            <motion.div
              animate={{
                y: [0, 24, 0],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "loop",
              }}
              className='w-3 h-3 rounded-full bg-secondary mb-1'
            />
          </div>
        </a>
      </div>
    </section>
  );
};

export default Hero;
