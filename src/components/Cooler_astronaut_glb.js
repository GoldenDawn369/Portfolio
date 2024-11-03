import React, { useRef, useEffect } from 'react';
import { Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, useAnimations, useGLTF } from '@react-three/drei';
import { TextureLoader, DoubleSide, Color, MeshStandardMaterial } from 'three';
import '../styles/AstronautCanvas.css';

function AstronautModel({ onLoaded, visible, scale }) {
    const gltf = useGLTF('/source/Walking astronaut.glb');

    const textures = useLoader(TextureLoader, [
        '/textures/gltf_embedded_0.png',
        '/textures/gltf_embedded_1.png',
        '/textures/gltf_embedded_1@channels=A.png',
        '/textures/gltf_embedded_2.png',
        '/textures/gltf_embedded_3@channels=R.png',
        '/textures/gltf_embedded_4.png',
        '/textures/gltf_embedded_5.png',
        '/textures/gltf_embedded_5@channels=A.png',
        '/textures/gltf_embedded_6.png',
        '/textures/gltf_embedded_7@channels=R.png',
    ]);

    const modelRef = useRef();
    const { animations } = gltf;
    const { actions } = useAnimations(animations, modelRef);

    useEffect(() => {
        if (actions) {
            const firstAction = actions[Object.keys(actions)[0]];
            if (firstAction) {
                firstAction.play();
            }
        }

        let textureIndex = 0;
        gltf.scene.traverse((child) => {
            if (child.isMesh) {
                if (child.geometry) {
                    child.geometry.computeVertexNormals();
                }

                const material = new MeshStandardMaterial({
                    map: textures[textureIndex % textures.length] || null,
                    color: new Color(0xffffff),
                    side: DoubleSide,
                    roughness: 0.0,
                    metalness: 0.0,
                });

                child.castShadow = true;
                child.receiveShadow = true;
                child.material = material;
                textureIndex++;
            }
        });

        if (onLoaded) onLoaded();
    }, [actions, gltf, onLoaded, textures]);

    return (
        <primitive
            ref={modelRef}
            object={gltf.scene}
            scale={0.8}
            rotation={[0, Math.PI + 0.3, 0]}
            visible={visible}
        />
    );
}

export default function AstronautCanvas({ showAstronaut, onModelLoaded, lightingLevel = 'standard' }) {
    useEffect(() => {
        if (onModelLoaded) onModelLoaded();
    }, [onModelLoaded]);

    return (
        <div className="astronaut-canvas-container">
            <Canvas
                shadows
                camera={{ position: [3, 4, -3] }}
                style={{ width: '100%', height: '100vh', position: 'relative' }}
                dpr={[1, 2]}
                gl={{ antialias: false }}
            >
                {lightingLevel === 'standard' ? (
                    <>
                        <ambientLight intensity={0.5} />
                        <hemisphereLight skyColor={0xffffff} groundColor={0x444444} intensity={1.0} position={[0, 50, 0]} />
                        <directionalLight position={[0, 10, 10]} intensity={2.0} castShadow />
                        <directionalLight position={[10, 5, 5]} intensity={1.5} />
                        <directionalLight position={[-10, 5, 5]} intensity={1.5} />
                        <directionalLight position={[0, 5, -10]} intensity={1.5} />
                        <pointLight position={[0, 15, 0]} intensity={1.0} />
                        <pointLight position={[15, 0, 0]} intensity={1.0} />
                        <pointLight position={[-15, 0, 0]} intensity={1.0} />
                        <pointLight position={[0, -15, 0]} intensity={1.0} />
                    </>
                ) : (
                    <>
                        <ambientLight intensity={0.3} />
                        <directionalLight position={[5, 10, 5]} intensity={1.0} castShadow />
                    </>
                )}
                <Suspense fallback={null}>
                    <AstronautModel onLoaded={onModelLoaded} visible={showAstronaut} />
                </Suspense>
                <OrbitControls enableZoom={false} />
            </Canvas>
        </div>
    );
}
