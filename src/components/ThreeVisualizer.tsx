import React, { useEffect, useRef } from "react";
import * as THREE from "three";

interface ThreeVisualizerProps {
  className?: string;
}

export const ThreeVisualizer: React.FC<ThreeVisualizerProps> = ({
  className = "w-full h-full relative",
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });

    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));

    // Clear previous elements if any
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }
    container.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const material = new THREE.MeshPhongMaterial({
      color: 0x3b82f6,
      wireframe: true,
      transparent: true,
      opacity: 0.35,
    });

    // Central Sphere (The Nucleus of Data)
    const sphereGeom = new THREE.SphereGeometry(2, 28, 28);
    const sphere = new THREE.Mesh(sphereGeom, material);
    group.add(sphere);

    // Inner glowing core
    const coreGeom = new THREE.IcosahedronGeometry(1.2, 2);
    const coreMat = new THREE.MeshBasicMaterial({
      color: 0x22d3ee,
      wireframe: true,
      transparent: true,
      opacity: 0.6,
    });
    const core = new THREE.Mesh(coreGeom, coreMat);
    group.add(core);

    // Orbiting Rings (Processes)
    const ringGeom = new THREE.TorusGeometry(4, 0.05, 16, 100);
    const ring1 = new THREE.Mesh(ringGeom, material);
    ring1.rotation.x = Math.PI / 2;
    group.add(ring1);

    const ring2 = new THREE.Mesh(ringGeom, material);
    ring2.rotation.y = Math.PI / 2;
    group.add(ring2);

    const ring3 = new THREE.Mesh(new THREE.TorusGeometry(5, 0.04, 16, 100), new THREE.MeshPhongMaterial({
      color: 0x22d3ee,
      wireframe: true,
      transparent: true,
      opacity: 0.25,
    }));
    ring3.rotation.x = Math.PI / 4;
    ring3.rotation.y = Math.PI / 4;
    group.add(ring3);

    // Floating Particles (Data Points)
    const particlesCount = 220;
    const positions = new Float32Array(particlesCount * 3);
    for (let i = 0; i < particlesCount * 3; i++) {
      positions[i] = (Math.random() - 0.5) * 15;
    }
    const particlesGeom = new THREE.BufferGeometry();
    particlesGeom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const particlesMaterial = new THREE.PointsMaterial({
      color: 0x22d3ee,
      size: 0.06,
      transparent: true,
      opacity: 0.85,
    });
    const particles = new THREE.Points(particlesGeom, particlesMaterial);
    scene.add(particles);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);
    const pointLight = new THREE.PointLight(0x3b82f6, 1.5);
    pointLight.position.set(5, 5, 5);
    scene.add(pointLight);

    camera.position.z = 9.5;

    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);
      group.rotation.y += 0.005;
      group.rotation.x += 0.003;
      core.rotation.y -= 0.01;
      particles.rotation.y -= 0.002;
      renderer.render(scene, camera);
    };

    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth || window.innerWidth;
      const newHeight = container.clientHeight || window.innerHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", handleResize);
      if (renderer.domElement && renderer.domElement.parentNode) {
        renderer.domElement.parentNode.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={containerRef} className={className} />;
};
