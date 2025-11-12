"use client";

import { motion } from 'framer-motion';
import { Code2, Smartphone, Cloud, Database, Cpu, Palette } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import React from 'react';
import { combineDomainOfAllAppliedNumericalValuesIncludingErrorValues } from 'recharts/types/state/selectors/axisSelectors';

// ============================================
// 3D MODEL CONFIGURATION
// Easy customization: Change model paths and hover colors here
// ============================================
const serviceConfigs = [
  {
    icon: Code2,
    title: 'Web Development',
    summary: 'Build powerful, responsive web applications that scale with your business',
    tools: ['React', 'Next.js', 'Vue', 'TypeScript', 'Tailwind CSS', 'GSAP', 'Motion', 'Three.js', 'WordPress', 'Bubble.io'],
    // example: 'Built a real-time collaboration platform serving 50K+ users with 99.9% uptime',
    modelPath: '/3d_models/Phone.fbx',
    hoverColor: '#10b981', // Green - CUSTOMIZE THIS
  },
  {
    icon: Smartphone,
    title: 'Mobile Development',
    summary: 'Native and cross-platform mobile apps for iOS and Android',
    tools: ['React Native', 'Flutter', 'Android Studio', 'Kotlin', 'Bubble.io'],
    // example: 'Delivered a fintech app with biometric authentication and offline capabilities',
    modelPath: '/3d_models/Phone.fbx',
    hoverColor: '#3b82f6', // Blue - CUSTOMIZE THIS
  },
  {
    icon: Cloud,
    title: 'Cloud Solutions',
    summary: 'Scalable cloud infrastructure and migration services',
    tools: ['AWS', 'GCP', 'Docker', 'Kubernetes', 'Vercel', 'Firebase'],
    // example: 'Migrated legacy monolith to microservices, reducing costs by 40%',
    modelPath: '/3d_models/Cloud_2.gltf',
    hoverColor: '#8b5cf6', // Purple - CUSTOMIZE THIS
  },
  {
    icon: Database,
    title: 'Backend Development',
    summary: 'Robust APIs and server-side logic for complex business requirements',
    tools: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'Redis', 'Express', 'Django', 'Flask'],
    // example: 'Created high-performance API handling 10M+ requests daily',
    modelPath: '/3d_models/Prop_Crate.gltf',
    hoverColor: '#f59e0b', // Orange - CUSTOMIZE THIS
  },
  {
    icon: Cpu,
    title: 'AI Integration',
    summary: 'Integrate AI/ML capabilities into your applications',
    tools: ['TensorFlow', 'PyTorch', 'OpenAI', 'Langchain', 'OpenCV', 'NLP', 'Image Processing'],
    // example: 'Implemented AI chatbot reducing customer support tickets by 60%',
    modelPath: '/3d_models/Enemy_EyeDrone.gltf',
    hoverColor: '#ec4899', // Pink - CUSTOMIZE THIS
  },
  {
    icon: Palette,
    title: 'UI/UX Design',
    summary: 'Beautiful, intuitive interfaces that users love',
    tools: ['Figma', 'Canva', 'Framer', 'Design Systems'],
    // example: 'Redesigned e-commerce platform, increasing conversions by 35%',
    modelPath: '/3d_models/Cloud_3.gltf',
    hoverColor: '#06b6d4', // Cyan - CUSTOMIZE THIS
  }
];

// Type definition for service prop
interface ServiceConfig {
  icon: React.ElementType;
  title: string;
  summary: string;
  tools: string[];
  // example: string;
  modelPath: string;
  hoverColor: string;
}

// ============================================
// 3D SERVICE CARD COMPONENT
// Handles Three.js scene setup and animations
// ============================================
const ServiceCard3D = ({ service, index }: { service: ServiceConfig; index: number }) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const modelRef = useRef<THREE.Object3D | null>(null);
  const animationRef = useRef<number | null>(null);
  const baseScaleRef = useRef<number>(1);
  const isHoveredRef = useRef<boolean>(false);
  const modelLoadedRef = useRef<boolean>(false);
  const [isHovered, setIsHovered] = useState(false);
  const [modelLoaded, setModelLoaded] = useState(false);

  // ============================================
  // THREE.JS SCENE INITIALIZATION
  // ============================================
  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current as HTMLDivElement;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.PerspectiveCamera(50, width / height, 0.1, 1000);
    camera.position.z = 4;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // ============================================
    // 3D MODEL LOADING
    // Load FBX models from public folder
    // ============================================
    const fbxLoader = new FBXLoader();
    const gltfLoader = new GLTFLoader();

    const loadModelByExtension = (path: string) =>
      new Promise<THREE.Object3D>((resolve, reject) => {
        const extension = path.split('.').pop()?.toLowerCase();

        if (extension === 'gltf' || extension === 'glb') {
          gltfLoader.load(
            path,
            (gltf) => resolve(gltf.scene),
            undefined,
            (error) => reject(error)
          );
          return;
        }

        if (extension === 'fbx') {
          fbxLoader.load(
            path,
            (fbx) => resolve(fbx),
            undefined,
            (error) => reject(error)
          );
          return;
        }

        reject(new Error(`Unsupported model format for path: ${path}`));
      });

    let isCancelled = false;

    const applyModelToScene = (object: THREE.Object3D) => {
      if (isCancelled) return;

      // Center and scale the model
      const box = new THREE.Box3().setFromObject(object);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());

      // Calculate scale to fit nicely in the scene
      const maxDim = Math.max(size.x, size.y, size.z);
      const scale = maxDim === 0 ? 1 : 2 / maxDim; // Scale to fit in a 2-unit space

      // Store base scale for animation
      baseScaleRef.current = scale;

      // Center the model
      object.position.sub(center);

      // Apply material to all meshes in the model
      object.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          child.material = new THREE.MeshPhongMaterial({
            color: 0xffffff,
            shininess: 100,
            transparent: true,
            opacity: 0.9,
            wireframe: false, // Set to true if you want wireframe
          });
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });

      // Start with model very small (will be scaled up on hover)
      object.scale.setScalar(scale * 0.01);
      scene.add(object);
      modelRef.current = object;
      modelLoadedRef.current = true;
      setModelLoaded(true);
    };

    const handleModelLoadError = (error: unknown) => {
      if (isCancelled) return;

      console.error('Error loading model:', error);
      // Fallback to a simple geometry if model fails to load
      const geometry = new THREE.BoxGeometry(1, 1, 1);
      const material = new THREE.MeshPhongMaterial({
        color: 0xffffff,
        wireframe: true,
        transparent: true,
        opacity: 0.9,
      });
      const mesh = new THREE.Mesh(geometry, material);
      // Set base scale for fallback (similar to model scaling)
      baseScaleRef.current = 2; // Scale to fit in a 2-unit space
      mesh.scale.setScalar(2 * 0.01); // Start small
      scene.add(mesh);
      modelRef.current = mesh;
      modelLoadedRef.current = true;
      setModelLoaded(true);
    };

    loadModelByExtension(service.modelPath)
      .then(applyModelToScene)
      .catch(handleModelLoadError);

    // Lighting
    const light1 = new THREE.DirectionalLight(0xffffff, 1.5);
    light1.position.set(5, 5, 5);
    scene.add(light1);

    const light2 = new THREE.DirectionalLight(0xffffff, 0.8);
    light2.position.set(-5, -5, -5);
    scene.add(light2);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // ============================================
    // ANIMATION LOOP
    // ============================================
    let currentScaleFactor = 0.01;
    
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      if (!modelRef.current || !modelLoadedRef.current) return;

      // Smooth scale transition based on hover state
      const targetScaleFactor = isHoveredRef.current ? 1 : 0.01;
      currentScaleFactor += (targetScaleFactor - currentScaleFactor) * 0.1;
      const actualScale = baseScaleRef.current * currentScaleFactor;
      modelRef.current.scale.setScalar(actualScale);

      // Continuous rotation
      modelRef.current.rotation.x += 0.000;
      modelRef.current.rotation.y += 0.012;

      if (rendererRef.current && sceneRef.current && cameraRef.current) {
        rendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      const container = containerRef.current as HTMLDivElement;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      
      cameraRef.current.aspect = newWidth / newHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(newWidth, newHeight);
    };
    
    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);

      isCancelled = true;
      
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      // Dispose model
      if (modelRef.current) {
        modelRef.current.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            if (child.geometry) child.geometry.dispose();
            if (child.material) {
              if (Array.isArray(child.material)) {
                child.material.forEach((mat) => mat.dispose());
              } else {
                child.material.dispose();
              }
            }
          }
        });
        if (sceneRef.current && modelRef.current) {
          sceneRef.current.remove(modelRef.current);
        }
      }
      
      if (container && rendererRef.current && rendererRef.current.domElement) {
        container.removeChild(rendererRef.current.domElement);
      }
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
    };
  }, [service.modelPath]);

  // Update model material color on hover (optional enhancement)
  useEffect(() => {
    if (!modelRef.current || !modelLoaded) return;
    
    // Update material color based on hover state
    modelRef.current.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.material instanceof THREE.MeshPhongMaterial) {
          // Slightly tint the material on hover
          child.material.color.setHex(isHovered ? 0xffffff : 0xffffff);
        }
      }
    });
  }, [isHovered, modelLoaded]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="relative"
      onMouseEnter={() => {
        setIsHovered(true);
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        isHoveredRef.current = false;
      }}
    >
      <Card className="relative overflow-hidden p-8 h-full transition-all duration-500 hover:-translate-y-1">
        {/* ============================================
            3D CANVAS BACKGROUND
            Positioned behind card content
            ============================================ */}
        <div
          className="absolute inset-0 transition-all duration-500 flex items-center justify-center"
          style={{
            opacity: isHovered ? 1 : 0,
            backgroundColor: isHovered ? service.hoverColor : 'transparent',
          }}
        >
          {/* Dark overlay for text visibility */}
          <div className="absolute inset-0 bg-black/30" />
          
          {/* Three.js container */}
          <div
            ref={containerRef}
            className="absolute inset-0"
            style={{ width: '100%', height: '100%' }}
          />
        </div>

        {/* ============================================
            CARD CONTENT
            Always on top of 3D background
            ============================================ */}
        <div className="relative z-10">
          {React.createElement(service.icon, {
            className: `w-12 h-12 mb-4 transition-colors duration-500 ${
              isHovered ? 'text-white' : 'text-secondary'
            }`,
          })}
          
          <h3 
            className={`text-2xl font-bold mb-3 transition-colors duration-500 ${
              isHovered ? 'text-white' : 'text-foreground'
            }`}
          >
            {service.title}
          </h3>
          
          <p 
            className={`mb-6 transition-colors duration-500 ${
              isHovered ? 'text-white/90' : 'text-muted-foreground'
            }`}
          >
            {service.summary}
          </p>
          
          <div className="mb-6">
            <h4 
              className={`font-semibold text-sm mb-2 transition-colors duration-500 ${
                isHovered ? 'text-white' : 'text-primary'
              }`}
            >
              Technologies
            </h4>
            <div className="flex flex-wrap gap-2">
              {service.tools.map((tool) => (
                <span
                  key={tool}
                  className={`px-3 py-1 text-xs rounded-full transition-all duration-500 ${
                    isHovered 
                      ? 'bg-white/20 text-white' 
                      : 'bg-secondary/10 text-secondary'
                  }`}
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>
          
          {/* <div className={`pt-6 border-t transition-colors duration-500 ${
            isHovered ? 'border-white/20' : 'border-border'
          }`}>
            <h4 
              className={`font-semibold text-sm mb-2 transition-colors duration-500 ${
                isHovered ? 'text-white' : 'text-foreground'
              }`}
            >
              Example Project
            </h4>
            <p 
              className={`text-sm transition-colors duration-500 ${
                isHovered ? 'text-white/80' : 'text-muted-foreground'
              }`}
            >
              {service.example}
            </p>
          </div> */}
        </div>
      </Card>
    </motion.div>
  );
};

// ============================================
// MAIN SERVICES PAGE COMPONENT
// ============================================
const Services = () => {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gradient-subtle">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl font-bold">Our Services</h1>
          </motion.div>
        </div>
      </section>

      {/* Services Grid with 3D Cards */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {serviceConfigs.map((service, index) => (
              <ServiceCard3D key={service.title} service={service} index={index} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;