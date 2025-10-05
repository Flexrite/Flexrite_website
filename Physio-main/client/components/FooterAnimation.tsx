import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createNoise4D } from 'simplex-noise';

interface FooterAnimationProps {
  className?: string;
}

export default function FooterAnimation({ className }: FooterAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const sceneRef = useRef<{
    renderer?: THREE.WebGLRenderer;
    scene?: THREE.Scene;
    camera?: THREE.PerspectiveCamera;
    plane?: THREE.Mesh;
    lights?: THREE.PointLight[];
    noise?: ReturnType<typeof createNoise4D>;
  }>({});

  useEffect(() => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const noise = createNoise4D();
    sceneRef.current.noise = noise;

    // Configuration with subtle colors matching the gradient background
    const config = {
      fov: 75,
      cameraZ: 60,
      xyCoef: 80, // Minimum noise coefficient for subtle effect
      zCoef: 3,   // Reduced height coefficient for subtlety
      lightIntensity: 0.4, // Reduced intensity for subtlety
      ambientColor: 0x000000,
      // Subtle accent colors that complement the purple/teal gradient
      light1Color: 0x8B5CF6, // Soft purple
      light2Color: 0x6366F1, // Soft indigo
      light3Color: 0x06B6D4, // Soft cyan
      light4Color: 0x10B981, // Soft emerald
    };

    let width = canvas.offsetWidth;
    let height = canvas.offsetHeight;

    // Initialize Three.js
    const renderer = new THREE.WebGLRenderer({ 
      canvas, 
      antialias: true, 
      alpha: true 
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    
    const camera = new THREE.PerspectiveCamera(config.fov, width / height, 0.1, 1000);
    camera.position.z = config.cameraZ;
    
    const scene = new THREE.Scene();
    
    // Create plane geometry
    const wWidth = (2 * Math.tan((config.fov * Math.PI) / 360) * Math.abs(config.cameraZ)) * camera.aspect;
    const wHeight = 2 * Math.tan((config.fov * Math.PI) / 360) * Math.abs(config.cameraZ);
    
    const geometry = new THREE.PlaneGeometry(wWidth, wHeight, Math.floor(wWidth / 2), Math.floor(wHeight / 2));
    const material = new THREE.MeshLambertMaterial({ 
      color: 0xffffff, 
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.6 // Make it more subtle
    });
    
    const plane = new THREE.Mesh(geometry, material);
    plane.rotation.x = -Math.PI / 2 - 0.2;
    plane.position.y = -25;
    scene.add(plane);
    
    // Create lights
    const lights: THREE.PointLight[] = [];
    const lightDistance = 500;
    const r = 30;
    const y = 10;
    
    const lightConfigs = [
      { color: config.light1Color, position: [0, y, r] },
      { color: config.light2Color, position: [0, -y, -r] },
      { color: config.light3Color, position: [r, y, 0] },
      { color: config.light4Color, position: [-r, y, 0] }
    ];
    
    lightConfigs.forEach((lightConfig, index) => {
      const light = new THREE.PointLight(lightConfig.color, config.lightIntensity, lightDistance);
      light.position.set(lightConfig.position[0], lightConfig.position[1], lightConfig.position[2]);
      lights.push(light);
      scene.add(light);
    });
    
    // Store references
    sceneRef.current = { renderer, scene, camera, plane, lights, noise };
    
    // Mouse tracking for subtle interaction
    const mouse = new THREE.Vector2();
    const handleMouseMove = (event: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
    };
    
    canvas.addEventListener('mousemove', handleMouseMove);
    
    // Animation loop
    const animate = () => {
      if (!sceneRef.current.plane || !sceneRef.current.noise || !sceneRef.current.renderer || !sceneRef.current.scene || !sceneRef.current.camera) return;
      
      const time = Date.now() * 0.0002;
      const positions = sceneRef.current.plane.geometry.attributes.position;
      const array = positions.array as Float32Array;
      
      // Animate plane vertices with noise
      for (let i = 0; i < array.length; i += 3) {
        array[i + 2] = sceneRef.current.noise(
          array[i] / config.xyCoef, 
          array[i + 1] / config.xyCoef, 
          time, 
          mouse.x * 0.1 + mouse.y * 0.1
        ) * config.zCoef;
      }
      positions.needsUpdate = true;
      
      // Animate lights subtly
      if (sceneRef.current.lights) {
        const lightTime = Date.now() * 0.0005; // Slower light movement
        const d = 25; // Smaller movement radius
        
        sceneRef.current.lights.forEach((light, index) => {
          light.position.x = Math.sin(lightTime * (0.1 + index * 0.1)) * d;
          light.position.z = Math.cos(lightTime * (0.2 + index * 0.1)) * d;
        });
      }
      
      sceneRef.current.renderer.render(sceneRef.current.scene, sceneRef.current.camera);
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animate();
    
    // Handle resize
    const handleResize = () => {
      if (!sceneRef.current.renderer || !sceneRef.current.camera) return;
      
      width = canvas.offsetWidth;
      height = canvas.offsetHeight;
      
      sceneRef.current.renderer.setSize(width, height);
      sceneRef.current.camera.aspect = width / height;
      sceneRef.current.camera.updateProjectionMatrix();
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      if (sceneRef.current.renderer) {
        sceneRef.current.renderer.dispose();
      }
      
      if (sceneRef.current.plane) {
        sceneRef.current.plane.geometry.dispose();
        if (Array.isArray(sceneRef.current.plane.material)) {
          sceneRef.current.plane.material.forEach(material => material.dispose());
        } else {
          sceneRef.current.plane.material.dispose();
        }
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className || ''}`}
      style={{ 
        zIndex: -1,
        opacity: 0.7 // Additional subtle opacity
      }}
    />
  );
}