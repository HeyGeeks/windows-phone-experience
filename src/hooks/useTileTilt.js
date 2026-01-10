import { useRef, useCallback } from 'react';

export function useTileTilt() {
    const tileRef = useRef(null);

    const handleMouseMove = useCallback((e) => {
        if (!tileRef.current) return;

        const rect = tileRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / centerY * -10;
        const rotateY = (x - centerX) / centerX * 10;

        tileRef.current.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
    }, []);

    const handleMouseLeave = useCallback(() => {
        if (!tileRef.current) return;
        tileRef.current.style.transform = '';
    }, []);

    const handleTouchMove = useCallback((e) => {
        if (!tileRef.current || !e.touches[0]) return;

        const touch = e.touches[0];
        const rect = tileRef.current.getBoundingClientRect();
        const x = touch.clientX - rect.left;
        const y = touch.clientY - rect.top;

        const centerX = rect.width / 2;
        const centerY = rect.height / 2;

        const rotateX = (y - centerY) / centerY * -8;
        const rotateY = (x - centerX) / centerX * 8;

        tileRef.current.style.transform = `perspective(500px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(0.98)`;
    }, []);

    const handleTouchEnd = useCallback(() => {
        if (!tileRef.current) return;
        tileRef.current.style.transform = '';
    }, []);

    return {
        tileRef,
        handlers: {
            onMouseMove: handleMouseMove,
            onMouseLeave: handleMouseLeave,
            onTouchMove: handleTouchMove,
            onTouchEnd: handleTouchEnd,
        }
    };
}
