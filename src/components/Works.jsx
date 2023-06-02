import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { github } from "../assets";
import { SectionWrapper } from "../hoc";
import { projects } from "../constants";
import { fadeIn, textVariant } from "../utils/motion";
import {FaArrowRight, FaArrowLeft} from 'react-icons/fa'

const ProjectCard = ({
  index,
  name,
  desc,
  description,
  tags,
  image,
  source_code_link,
}) => {
  return (
    // <motion.div variants={fadeIn("up", "spring", index * 0.2, 0.75)}
      <div className='relative bg-tertiary md:w-[340px] md:h-[430px] w-[100%] h-[100%] rounded-2xl overflow-hidden'>
          <div style={{ backgroundImage: `url(${image})` }} className='absolute  inset-0 h-full w-full bg-cover bg-center z-[0]'></div>
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black md:opacity-50 opacity-80 z-[0]" />

          <div className='absolute md:inset-6 inset-4 flex flex-col z-[2]'>
            <div className='mt-0'>
              <h3 className='text-white font-bold text-[18px]'>{name}</h3>
              <p className='mt-1 text-white text-[12px]'>{desc}</p>
            </div>
            <div className='mt-auto flex'>
              <div className='flex flex-wrap gap-2'>
                {tags.map((tag) => (
                  <p
                    key={`${name}-${tag.name}`}
                    className={`text-[14px] ${tag.color}`}
                  >
                    #{tag.name}
                  </p>
                ))}
              </div>
            </div>
          </div>
      </div>
    // </motion.div>
  );
};

const Works = () => {

  const [width, setWidth] = useState(0);
  const carousel = useRef();

  useEffect(() => {
    setWidth(carousel.current.scrollWidth - carousel.current.offsetWidth);
  }, []);

  return (
    <>
      <motion.div variants={textVariant()}>
        <p className={`${styles.sectionSubText} `}>My work</p>
        <h2 className={`${styles.sectionHeadText}`}>Projects.</h2>
      </motion.div>

      <div className='w-full flex'>
        <motion.p
          variants={fadeIn("", "", 0.1, 1)}
          className='mt-3 text-secondary text-[17px] max-w-3xl leading-[30px]'
        >
          Following projects showcases my skills and experience through
          real-world examples of my work. Each project is briefly described with
          links to code repositories and live demos.
        </motion.p>
      </div>

      {/* <motion.div className='mt-8 flex flex-wrap gap-7]' variants={fadeIn("left", "spring",  0.2, 0.75)} >
        <motion.div ref={carousel} className="md:carousel" whileTap={{cursor: "grabbing"}}>
          <motion.div className="md:carousel-inner md:flex-none md:flex-wrap-none flex flex-wrap gap-4" drag="x" dragConstraints={{right:0, left:-width}}>
            {projects.map((project, index) => (
              <motion.div className="md:carousel-item md:w-[340px] md:h-[430px] w-[90vw] h-[24vh] " key={`project-${index}`}>
                <ProjectCard key={`project-${index}`} index={index} {...project}/>
              </motion.div>
            ))}
            </motion.div>
        </motion.div>
      </motion.div> */}


      <motion.div className='mt-8 flex flex-wrap gap-7]' variants={fadeIn("left", "spring",  0.2, 0.75)} >
        <motion.div ref={carousel} className="md:cursor-grab md:overflow-hidden" whileTap={{cursor: "grabbing"}}>
          <motion.div className="flex md:flex-nowrap flex-wrap md:gap-0 gap-4" drag="x" dragConstraints={{right:0, left:-width}}>
            {projects.map((project, index) => (
              <motion.div className="md:mr-[30px] md:w-[340px] md:h-[430px] w-[88vw] h-[30vh]" key={`project-${index}`}>
                <ProjectCard key={`project-${index}`} index={index} {...project}/>
              </motion.div>
            ))}
            </motion.div>
        </motion.div>
      </motion.div>
    </>
  );
};

export default SectionWrapper(Works, "work");


