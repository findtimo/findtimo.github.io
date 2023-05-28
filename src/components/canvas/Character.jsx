import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Preload, useGLTF, useAnimations, Sphere, MeshDistortMaterial } from "@react-three/drei";

import CanvasLoader from "../Loader";

const Character = ({ isMobile }) => {
    const group = useRef();
    const { scene, animations } = useGLTF("./character/scene.glb");
    const { actions, mixer } = useAnimations(animations, group);

    useEffect(() => {
        actions.float.play();
    }, [mixer]);

  return (
    <mesh>
      {/* <hemisphereLight intensity={0.5} groundColor='black' /> */}
      <ambientLight intensity={0.2}/>
      <directionalLight position={[3, 10, 1]} intensity={2.2} />
      <primitive
        ref={group}
        object={scene}
        scale={isMobile ? 1.5 : 3.5}
        position={isMobile ? [0, -3, -2.2] : [0, -5.5, 0]}
        dispose={null}
      />
    </mesh>
  );
};

const CharacterCanvas = () => {
  const [isMobile, setIsMobile] = useState(false);

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

  return (
    <div style={{ position: "relative" }} className='lg:h-[85vh] lg:mt-0 h-[50vh] mt-8'>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{fov: 60, position: [6, 6, 6]}}
        gl={{ preserveDrawingBuffer: true }}
        style={{ width: "100%", height: "100%", position: "absolute", top: 0, left: 0, zIndex: 1 }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            enableZoom={false}
            enableRotate={false}
          />
          <Character isMobile={isMobile} />
          <Sphere args={[1, 100, 200]} scale={12} position={isMobile ? [0, -3, -2.2] : [-14, -12, -14]}>
              <MeshDistortMaterial color="#3d1c58" distort={0.4} speed={2} />
            </Sphere>
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default CharacterCanvas;
