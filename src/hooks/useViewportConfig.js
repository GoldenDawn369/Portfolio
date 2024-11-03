// src/hooks/useViewportConfig.js
import { useState, useEffect } from 'react';
import { viewportConfigs } from '../config/viewportConfigs';

export const useViewportConfig = () => {
    const getConfig = () => {
        const width = window.innerWidth;
        const height = window.innerHeight;
        return (
            viewportConfigs.find(
                (config) =>
                    width >= config.minWidth &&
                    width <= config.maxWidth &&
                    height >= config.minHeight &&
                    height <= config.maxHeight
            ) || viewportConfigs[viewportConfigs.length - 1] // Default to the last config if none match
        );
    };

    const [viewportConfig, setViewportConfig] = useState(getConfig);

    useEffect(() => {
        const handleResize = () => {
            setViewportConfig(getConfig());
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return viewportConfig;
};
