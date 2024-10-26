import React, { useRef, useEffect } from 'react';
import { Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, useAnimations, useGLTF } from '@react-three/drei';
import { TextureLoader, DoubleSide } from 'three';

function AstronautModel({ onLoaded }) {
    // Load the GLTF model
    const { scene, animations } = useGLTF('/astronaut/scene.gltf');

    // Load the textures
    const [
        material0Diffuse,
        material0Normal,
        material0Occlusion,
        material2Diffuse,
        material2Normal,
        material2Occlusion,
    ] = useLoader(TextureLoader, [
        '/astronaut/textures/material_0_diffuse.png',
        '/astronaut/textures/material_0_normal.png',
        '/astronaut/textures/material_0_occlusion.png',
        '/astronaut/textures/material_2_diffuse.png',
        '/astronaut/textures/material_2_normal.png',
        '/astronaut/textures/material_2_occlusion.png',
    ]);

    const modelRef = useRef();
    const { actions } = useAnimations(animations, modelRef);

    useEffect(() => {
        if (onLoaded) onLoaded(); // Trigger callback when loaded
        if (actions) {
            actions[Object.keys(actions)[0]].play(); // Play the first animation
        }

        // Traverse the model and apply textures manually
        scene.traverse((child) => {
            if (child.isMesh) {
                // Apply textures to material_0
                if (child.material.name === 'material_0') {
                    child.material.map = material0Diffuse;
                    child.material.normalMap = material0Normal;
                    child.material.aoMap = material0Occlusion;
                    child.material.side = DoubleSide;  // Ensure the material is double-sided
                    child.material.needsUpdate = true;
                }
                // Apply textures to material_2
                if (child.material.name === 'material_2') {
                    child.material.map = material2Diffuse;
                    child.material.normalMap = material2Normal;
                    child.material.aoMap = material2Occlusion;
                    child.material.side = DoubleSide;  // Ensure the material is double-sided
                    child.material.needsUpdate = true;
                }
            }
        });
    }, [scene, actions, onLoaded, material0Diffuse, material0Normal, material0Occlusion, material2Diffuse, material2Normal, material2Occlusion]);

    return <primitive ref={modelRef} object={scene} scale={0.6} />;
}

export default function AstronautCanvas({ onModelLoaded }) {
    return (
        <Canvas shadows camera={{ position: [3, 2, -3] }} style={{ width: '100%', height: '100vh' }}>
            {/* Adjust the lighting to better illuminate the model from multiple angles */}
            <ambientLight intensity={1.5} /> {/* Balanced ambient light */}
            <directionalLight
                castShadow
                position={[5, 10, 7]}
                intensity={2.5}  // Strong directional light for brightness
                shadow-mapSize-width={1024}
                shadow-mapSize-height={1024}
                shadow-camera-far={50}
                shadow-camera-left={-10}
                shadow-camera-right={10}
                shadow-camera-top={10}
                shadow-camera-bottom={-10}
            />
            {/* Add a second directional light to illuminate the back */}
            <directionalLight
                position={[-5, -10, -7]}
                intensity={1.5}  // Slightly less intensity for backlighting
            />
            <pointLight position={[-10, 10, 5]} intensity={1.5} />
            <pointLight position={[10, -10, -10]} intensity={1.5} />

            <Suspense>
                <AstronautModel onLoaded={onModelLoaded} />
            </Suspense>
            <OrbitControls />
        </Canvas>
    );
}
