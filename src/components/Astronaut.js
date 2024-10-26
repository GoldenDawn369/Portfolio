import React, { Suspense, useEffect } from 'react';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader';
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader';

function AstronautModel({ onLoaded }) {
    const materials = useLoader(MTLLoader, '/astronaut.mtl');
    const obj = useLoader(OBJLoader, '/astronaut.obj', (loader) => {
        materials.preload();
        loader.setMaterials(materials);
    });

    useEffect(() => {
        if (obj && materials && onLoaded) {
            onLoaded(); // Call the onLoaded callback when everything is loaded
        }
    }, [obj, materials, onLoaded]);

    return <primitive object={obj} scale={1.6} rotation={[0.1, Math.PI / 1.8, 0]} />;
}

export default function AstronautCanvas({ onModelLoaded }) {
    return (
        <Canvas style={{ width: '100%', height: '100vh' }}>
            <ambientLight intensity={0.5} />
            <directionalLight position={[10, 10, 5]} intensity={1} />
            <Suspense fallback={null}>
                <AstronautModel onLoaded={onModelLoaded} /> {/* Pass onModelLoaded as onLoaded */}
            </Suspense>
            <OrbitControls />
        </Canvas>
    );
}
