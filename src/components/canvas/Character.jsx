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
      <ambientLight intensity={1}/>
      <directionalLight position={[3, 2, 1]} />
      {/* <spotLight
        position={[-20, 40, 10]}
        angle={0.12}
        penumbra={1}
        intensity={0.5}
        // castShadow
        shadow-mapSize={1024}
      /> */}
      {/* <pointLight intensity={1} /> */}
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
    // Add a listener for changes to the screen size
    const mediaQuery = window.matchMedia("(max-width: 500px)");

    // Set the initial value of the `isMobile` state variable
    setIsMobile(mediaQuery.matches);

    // Define a callback function to handle changes to the media query
    const handleMediaQueryChange = (event) => {
      setIsMobile(event.matches);
    };

    // Add the callback function as a listener for changes to the media query
    mediaQuery.addEventListener("change", handleMediaQueryChange);

    // Remove the listener when the component is unmounted
    return () => {
      mediaQuery.removeEventListener("change", handleMediaQueryChange);
    };
  }, []);

  return (
    <div style={{ position: "relative" }}>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{fov: 60, position: [6, 6, 6]}}
        gl={{ preserveDrawingBuffer: true }}
        style={{ width: "100%", height: "80vh", position: "absolute", top: 0, left: 0, zIndex: 1 }}
      >
        <Suspense fallback={<CanvasLoader />}>
          <OrbitControls
            enableZoom={false}
            enableRotate={false}
            // maxPolarAngle={Math.PI / 2}
            // minPolarAngle={Math.PI / 2}
          />
          <Character isMobile={isMobile} />
          <Sphere args={[1, 100, 200]} scale={12} position={isMobile ? [0, -3, -2.2] : [-15, -12, -15]}>
              <MeshDistortMaterial color="#3d1c58" distort={0.4} speed={2} />
            </Sphere>
        </Suspense>
        <Preload all />
      </Canvas>
    </div>
  );
};

export default CharacterCanvas;
