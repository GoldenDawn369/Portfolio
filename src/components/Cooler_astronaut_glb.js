// components/AstronautCanvas.js
import React, { useRef, useEffect } from 'react';
import { Suspense } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, useAnimations, useGLTF } from '@react-three/drei';
import { TextureLoader, DoubleSide, Color, MeshStandardMaterial } from 'three';

function AstronautModel({ onLoaded, visible }) {
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
        const loadStartTime = performance.now();
        console.log('Astronaut loading started at:', loadStartTime.toFixed(2), 'ms');

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
                    roughness: 0.00,
                    metalness: 0.0,
                });

                child.castShadow = true;
                child.receiveShadow = true;

                child.material = material;
                textureIndex++;
            }
        });

        const loadEndTime = performance.now();
        console.log('Astronaut loading completed at:', loadEndTime.toFixed(2), 'ms');
        console.log('Total loading time:', (loadEndTime - loadStartTime).toFixed(2), 'ms');

        if (onLoaded) onLoaded();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

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
        <Canvas
            shadows
            camera={{ position: [3, 4, -3] }}
            style={{ width: '100%', height: '100vh' }}
            dpr={[1, 2]} // Adjust device pixel ratio for performance
            gl={{ antialias: false }} // Disable antialiasing for better performance
        >
            {/* Conditional Lighting Setup */}
            {lightingLevel === 'standard' ? (
                <>
                    {/* Ambient Light for base illumination */}
                    <ambientLight intensity={0.5} />

                    {/* Hemisphere Light for general illumination */}
                    <hemisphereLight
                        skyColor={0xffffff}
                        groundColor={0x444444}
                        intensity={1.0}
                        position={[0, 50, 0]}
                    />

                    {/* Directional Lights */}
                    <directionalLight position={[0, 10, 10]} intensity={2.0} castShadow />
                    <directionalLight position={[10, 5, 5]} intensity={1.5} />
                    <directionalLight position={[-10, 5, 5]} intensity={1.5} />
                    <directionalLight position={[0, 5, -10]} intensity={1.5} />

                    {/* Point Lights */}
                    <pointLight position={[0, 15, 0]} intensity={1.0} />
                    <pointLight position={[15, 0, 0]} intensity={1.0} />
                    <pointLight position={[-15, 0, 0]} intensity={1.0} />
                    <pointLight position={[0, -15, 0]} intensity={1.0} />
                </>
            ) : (
                <>
                    {/* Minimal Lighting Setup */}
                    <ambientLight intensity={0.3} />
                    <directionalLight position={[5, 10, 5]} intensity={1.0} castShadow />
                </>
            )}

            <Suspense fallback={null}>
                <AstronautModel onLoaded={onModelLoaded} visible={showAstronaut} />
            </Suspense>

            <OrbitControls enableZoom={false} />
        </Canvas>
    );
}
