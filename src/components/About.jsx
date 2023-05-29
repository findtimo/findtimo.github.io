import React from "react";
import { Tilt } from "react-tilt";
import { motion } from "framer-motion";

import { styles } from "../styles";
// import { services } from "../constants";
import { technologies } from "../constants";
import { SectionWrapper } from "../hoc";
import { fadeIn, textVariant } from "../utils/motion";

// const ServiceCard = ({ index, title, icon }) => (
//   <Tilt className='xs:w-[250px] w-full'>
//     <motion.div
//       variants={fadeIn("right", "spring", index * 0.5, 0.75)}
//       className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
//     >
//       <div
//         options={{
//           max: 45,
//           scale: 1,
//           speed: 450,
//         }}
//         className='bg-tertiary rounded-[20px] py-5 px-12 min-h-[280px] flex justify-evenly items-center flex-col'
//       >
//         <img
//           src={icon}
//           alt='web-development'
//           className='w-16 h-16 object-contain'
//         />

//         <h3 className='text-white text-[20px] font-bold text-center'>
//           {title}
//         </h3>
//       </div>
//     </motion.div>
//   </Tilt>
// );

const ServiceCard = ({ name }) => (
  <div className='xs:w-[110px] w-full' >
    <div
        // variants={fadeIn("right", "spring", index * 0.5, 0.75)}
        className='w-full green-pink-gradient p-[1px] rounded-[20px] shadow-card'
      >
        <div
          // options={{
          //   max: 45,
          //   scale: 1,
          //   speed: 450,
          // }}
          className='bg-tertiary rounded-[20px] py-2 px-4 min-h-[50px] flex justify-evenly items-center flex-col'
        >

          <h3 className='text-white text-[12px] font-bold text-center'>
            { name }
          </h3>
        </div>
      </div>
    </div>
);

const About = () => {
  return (
      <div>
        <motion.div variants={textVariant()}>
          <p className={styles.sectionSubText}>Introduction</p>
          <h2 className={styles.sectionHeadText}>Overview.</h2>
        </motion.div>
        <div className="flex lg:flex-row flex-col-reverse gap-10">
          <div className="flex flex-col lg:w-[55%]">
            <motion.p
              variants={fadeIn("", "", 0.1, 1)}
              className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
            >
              I'm an enthusiastic software developer based in Singapore, proficient in Java, C, and Python. 
              With experience in full stack web development, I possess a versatile skill set that complements my expertise. 
              <br/><br/>
              My passion for technology began at a young age when I first delved into coding while experimenting with flash games. 
              Since then, my enthusiasm for programming and tech has only grown stronger. 
              Currently, I am excitedly exploring the potential of web3.0 applications, 
              driven by a desire to push the boundaries of what technology can achieve.
            </motion.p>

            <div className='mt-10 flex flex-wrap gap-6'>
              {technologies.map((technology) => (
                <ServiceCard name={technology.name} key={technology.name}/>
              ))}
            </div>
          </div>

          <div className="flex flex-col lg:w-[45%]">
            <motion.p
              variants={fadeIn("", "", 0.1, 1)}
              className='mt-4 text-secondary text-[17px] max-w-3xl leading-[30px]'
            >
              
            </motion.p>
          </div>
        </div>
    </div>
  );
};

export default SectionWrapper(About, "about");
