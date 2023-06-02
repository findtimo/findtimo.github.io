import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, useAnimations, Sphere, MeshDistortMaterial } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Character = ({ isMobile, playAnimation }) => {
    const group = useRef();
    const { scene, animations } = useGLTF("./character/scene.glb");
    const { actions, mixer } = useAnimations(animations, group);

    // actions.float.timeScale = 0.5;

    useEffect(() => {
      if (playAnimation) {
        actions.idle.stop();
        actions.transition.timeScale = 1;
        actions.transition.play().crossFadeFrom(actions.float.play(), 0.3);
        actions.idle.play().crossFadeFrom(actions.transition, 0.3);
        actions.transition.stop();
      } else {
        actions.float.stop();
        actions.transition.timeScale = -1;
        actions.transition.play().crossFadeFrom(actions.idle.play(), 0.3);
        actions.float.play().crossFadeFrom(actions.transition, 0.3);
        actions.transition.stop();
      }
    }, [playAnimation]);
  

  return (
    <mesh>
      {/* <hemisphereLight intensity={0.5} groundColor='black' /> */}
      <ambientLight intensity={0.2}/>
      <directionalLight position={[3, 10, 1]} intensity={1.2} />
      <primitive
        ref={group}
        object={scene}
        scale={isMobile ? 1.5 : 3}
        position={[0, -5.5, 0]}
        dispose={null}
      />
    </mesh>
  );
};

const CharacterCanvas = (scrollPosition) => {
  const [isMobile, setIsMobile] = useState(false);
  const [playAnimation, setPlayAnimation] = useState(false);
  const containerRef = useRef();
  const [prevScrollY, setPrevScrollY] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 500)');
    
    setIsMobile(mediaQuery.matches);

    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    mediaQuery.addEventListener("change", handleMediaQueryChange);

    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  useEffect(() => {
  
    const handleScroll = () => {
      const scrollY = scrollPosition.scrollPass;
      const triggerPoint = scrollPosition.scrollMax/2;
      // console.log('test', scrollY, prevScrollY );
  
      if (scrollY > prevScrollY && prevScrollY < triggerPoint && scrollY >= triggerPoint) {
        console.log('1');
        setPlayAnimation(true);
      } else if (scrollY < prevScrollY && prevScrollY >= triggerPoint && scrollY < triggerPoint) {
        console.log('2');
        setPlayAnimation(false);
      }

      setPrevScrollY(scrollY);
    };

    handleScroll();
  
    return () => {
      // Cleanup function
    };
  }, [scrollPosition]);

  return (
    <div ref={containerRef} className='relative lg:h-[75vh] mt-0 h-[50vh]'>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{fov: 60, position: [6, 4, 6]}}
        gl={{ preserveDrawingBuffer: true }}
        style={{ position: "absolute", top: 0, left: 0, zIndex: 1 }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            enableZoom={false}
            enableRotate={false}
          />
          <Character isMobile={isMobile} playAnimation={playAnimation}/>
          <Sphere args={[1, 100, 200]} scale={12} position={isMobile ? [0, -3, -2.2] : [-14, -13, -14]}>
              <MeshDistortMaterial color="#3d1c58" distort={0.4} speed={2} />
            </Sphere>
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default CharacterCanvas;
