import { useLayoutEffect } from 'react';
import { useThree } from '@react-three/fiber';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollCameraZoomProps {
  triggerSelector: string;
  fromZ?: number;
  toZ?: number;
  scrub?: number;
}

export function ScrollCameraZoom({
  triggerSelector,
  fromZ = 8,
  toZ = 3,
  scrub = 2,
}: ScrollCameraZoomProps) {
  const { camera } = useThree();

  useLayoutEffect(() => {
    const trigger = document.querySelector(triggerSelector);
    if (!trigger) return;

    camera.position.z = fromZ;

    const tween = gsap.to(camera.position, {
      z: toZ,
      ease: 'none',
      scrollTrigger: {
        trigger,
        start: 'top top',
        end: 'bottom top',
        scrub,
        invalidateOnRefresh: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [camera, triggerSelector, fromZ, toZ, scrub]);

  return null;
}
