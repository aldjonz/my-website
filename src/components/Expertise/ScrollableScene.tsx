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

    // Create base geometry (e.g., a box)
    const baseGeometry = new THREE.BoxGeometry(1, 1, 1);

    // Create target geometry (e.g., a sphere)
    const sphereGeometry = new THREE.SphereGeometry(0.75, 32, 32);

    // Add sphere geometry as a morph target
    baseGeometry.morphAttributes.position = [sphereGeometry.attributes.position];

    // Create a mesh with morph targets
    const material = new THREE.MeshBasicMaterial({ color: 'blue', wireframe: true });
    const morphMesh = new THREE.Mesh(baseGeometry, material);
    scene.add(morphMesh);

    camera.position.z = 5;

    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };

    animate();

    // Handle scroll to morph shapes
    const handleScroll = (event: WheelEvent) => {
      // Adjust morph target influence based on scroll
      morphMesh.morphTargetInfluences![0] = THREE.MathUtils.clamp(
        morphMesh.morphTargetInfluences![0] + event.deltaY * 0.001,
        0,
        1
      );
    };

    window.addEventListener('wheel', handleScroll);

    // Clean up on component unmount
    return () => {
      window.removeEventListener('wheel', handleScroll);
      mountRef.current?.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div>
      <div ref={mountRef} />
      <div style={{ backgroundColor: 'red', height: '10vh', width: '15vw', position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}></div>
    </div>
  );
};

export default ScrollableScene;