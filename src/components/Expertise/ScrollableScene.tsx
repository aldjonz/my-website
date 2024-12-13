import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const ScrollableScene = () => {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current?.appendChild(renderer.domElement);

    // Function to create text sprite
    const createTextSprite = (message: string, color: string) => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      context!.font = 'Bold 24px Arial';
      context!.fillStyle = color;
      context!.fillText(message, 0, 24);

      const texture = new THREE.CanvasTexture(canvas);
      const spriteMaterial = new THREE.SpriteMaterial({ map: texture });
      const sprite = new THREE.Sprite(spriteMaterial);
      sprite.scale.set(2, 1, 1); // Adjust the scale as needed
      return sprite;
    };

    // Create skill panes with text
    const createPane = (color: string, positionZ: number, text: string) => {
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshBasicMaterial({ color });

      // Create two halves of the cube
      const leftHalf = new THREE.Mesh(geometry, material);
      const rightHalf = new THREE.Mesh(geometry, material);

      // Position the halves
      leftHalf.position.set(-0.5, 0, positionZ);
      rightHalf.position.set(0.5, 0, positionZ);

      scene.add(leftHalf);
      scene.add(rightHalf);

      const textSprite = createTextSprite(text, 'white');
      textSprite.position.set(0, 0.6, positionZ); // Position text above the cube
      scene.add(textSprite);

      return { leftHalf, rightHalf };
    };

    // Add skill panes with text
    const panes = [
      createPane('red', -2, 'Frontend Skills'),
      createPane('green', -6, 'Backend Skills'),
      createPane('blue', -10, 'AI Skills'),
      createPane('yellow', -14, 'DevOps Skills'),
      createPane('purple', -18, 'Human Languages Skills'),
    ];

    camera.position.z = 0;

    const animate = () => {
      requestAnimationFrame(animate);

      // Check camera position and animate cube halves
      panes.forEach(({ leftHalf, rightHalf }) => {
        const distance = Math.abs(camera.position.z - leftHalf.position.z);
        if (distance < 1.5) {
          // Open the cube halves
          leftHalf.position.x = THREE.MathUtils.lerp(leftHalf.position.x, -1.5, 0.05);
          rightHalf.position.x = THREE.MathUtils.lerp(rightHalf.position.x, 1.5, 0.05);
        } else {
          // Close the cube halves
          leftHalf.position.x = THREE.MathUtils.lerp(leftHalf.position.x, -0.5, 0.05);
          rightHalf.position.x = THREE.MathUtils.lerp(rightHalf.position.x, 0.5, 0.05);
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // Handle scroll to move camera
    const handleScroll = (event: WheelEvent) => {
      camera.position.z += -event.deltaY * 0.01; // Adjust the multiplier for sensitivity
    };

    window.addEventListener('wheel', handleScroll);

    // Clean up on component unmount
    return () => {
      window.removeEventListener('wheel', handleScroll);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} />;
};

export default ScrollableScene;