import { CameraControls, Environment, Gltf, Sky } from "@react-three/drei";
import { button, useControls } from "leva";
import { useEffect, useRef, useState } from "react";
import { degToRad } from "three/src/math/MathUtils.js";
import { sections } from "./UI";
import { TeslaModel3 } from "./TeslaModel3";
import { Cybertruck } from "./Cybertruck";
import { MeshReflectorMaterial } from '@react-three/drei';
const cameraPositions = {
  intro: [0, 5, 50, 0, 0, 0],
  cybertruck: [-2.5, 3.53, 11.15, -8.89, -0.65, 0.17],
  tesla: [5.35, 2.44, 7.13, 2.00, 0.50, 0.46],
  "action-button": [0, 0, 5, 0, 0, 0],
};

const cameraPositionsSmallScreen = {
  intro: [4.25, 2.75, 50.91, -0.05, -0.34, 0.20],
  cybertruck: [-3.18, 3.78, 20.09, -10.01, -0.57, 0.47],
  tesla: [4.25, 2.75, 15.91, -0.05, -0.34, 0.20],
  "action-button": [0, 0, 5, 0, 0, 0],
};

const SMALL_SCREEN_THRESHOLD = 900;

export const Experience = ({ section }) => {
  const controls = useRef();
  const box = useRef();
  const sphere = useRef();

  useControls("settings", {
    smoothTime: {
      value: 0.35,
      min: 0.1,
      max: 2,
      step: 0.1,
      onChange: (v) => (controls.current.smoothTime = v),
    },
  });





  const [introFinished, setIntroFinished] = useState(false);
  const intro = async () => {
    controls.current.setLookAt(0, 5, 25, 0, 0, 0, false);
    await controls.current.dolly(3, true);
    await controls.current.rotate(degToRad(180), degToRad(-5), true);

    setIntroFinished(true);
    playTransition();
  };

  const playTransition = () => {
    if (window.innerWidth > SMALL_SCREEN_THRESHOLD) {
      controls.current.setLookAt(...cameraPositions[sections[section]], true);
    } else {
      controls.current.setLookAt(
        ...cameraPositionsSmallScreen[sections[section]],
        true
      );
    }
  };

  useControls("Helper", {
    getLookAt: button(() => {
      const position = controls.current.getPosition();
      const target = controls.current.getTarget();
      console.log([...position, ...target]);
    }),
    toJson: button(() => console.log(controls.current.toJSON())),
  });

  useEffect(() => {
    intro();
  }, []);

  useEffect(() => {
    if (!introFinished) {
      return;
    }
    playTransition();
  }, [section]);

  return (
    <>
      <CameraControls
        ref={controls}
        // disable all mouse buttons
        // mouseButtons={{
        //   left: 0,
        //   middle: 0,
        //   right: 0,
        //   wheel: 0,
        // }}
        // disable all touch gestures
        // touches={{
        //   one: 0,
        //   two: 0,
        //   three: 0,
        // }}
      />
      <Cybertruck position={[-10, -.5 , 0]} />

      <TeslaModel3 scale={0.01} position={[0, 0, 0]} rotation={[0, 0, 0]} />
      <mesh ref={box} visible={false}>
        <boxGeometry args={[0.5, 0.8, 0.2]} />
        <meshBasicMaterial color="mediumpurple" wireframe />
      </mesh>
      <mesh ref={sphere} visible={false}>
        <sphereGeometry args={[0.36, 64]} />
        <meshBasicMaterial color="hotpink" wireframe />
      </mesh>

      <group rotation-y={Math.PI}>
        <Environment preset="warehouse" blur />
      </group>
      <mesh position={[0, -0.76, 0]} rotation-x={-Math.PI / 2}>
        <planeGeometry args={[1000, 1000]} />
        <MeshReflectorMaterial
          color="#171720"
          resolution={1024}
          mixStrength={3}
          roughness={0.6}
        />
      </mesh>
      {/* <Sky /> */}
    </>
  );
};
