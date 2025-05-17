"use client"

import { useRef, useState, useEffect } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sphere } from "@react-three/drei"
import * as THREE from "three"
import { motion } from "framer-motion"

interface CurvePointProps {
  startLat: number;
  startLng: number;
  endLat: number;
  endLng: number;
  radius?: number;
  color?: string;
}

// Create a curve between two points on the globe
const CurvePoint = ({ startLat, startLng, endLat, endLng, radius = 1, color = "#4f46e5" }: CurvePointProps) => {
  const lineRef = useRef<THREE.Line>(null);
  
  useEffect(() => {
    if (!lineRef.current) return;
    
    // Convert lat/lng to 3D coordinates
    const startPhi = (90 - startLat) * (Math.PI / 180);
    const startTheta = (startLng + 180) * (Math.PI / 180);
    
    const endPhi = (90 - endLat) * (Math.PI / 180);
    const endTheta = (endLng + 180) * (Math.PI / 180);
    
    const startX = -radius * Math.sin(startPhi) * Math.cos(startTheta);
    const startY = radius * Math.cos(startPhi);
    const startZ = radius * Math.sin(startPhi) * Math.sin(startTheta);
    
    const endX = -radius * Math.sin(endPhi) * Math.cos(endTheta);
    const endY = radius * Math.cos(endPhi);
    const endZ = radius * Math.sin(endPhi) * Math.sin(endTheta);
    
    // Create a curved path between the points
    const start = new THREE.Vector3(startX, startY, startZ);
    const end = new THREE.Vector3(endX, endY, endZ);
    
    // Calculate the midpoint and elevate it
    const mid = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
    const midLength = mid.length();
    mid.normalize().multiplyScalar(midLength + radius * 0.2);
    
    // Create a quadratic bezier curve
    const bezierCurve = new THREE.QuadraticBezierCurve3(start, mid, end);
    
    // Create geometry from the curve
    const points = bezierCurve.getPoints(50);
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    
    // Set the geometry to the line
    if (lineRef.current) {
      lineRef.current.geometry = geometry;
    }
  }, [startLat, startLng, endLat, endLng, radius, color]);
  
  return (
    <line ref={lineRef}>
      <bufferGeometry />
      <lineBasicMaterial color={color} linewidth={2} />
    </line>
  );
}

interface PulsePointProps {
  lat: number;
  lng: number;
  radius?: number;
  color?: string;
}

// Animated pulse point on the globe
const PulsePoint = ({ lat, lng, radius = 1, color = "#4f46e5" }: PulsePointProps) => {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const [active, setActive] = useState(false);
  
  // Convert lat/lng to 3D coordinates
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  
  useFrame(() => {
    if (mesh.current) {
      mesh.current.scale.x = THREE.MathUtils.lerp(
        mesh.current.scale.x,
        hovered || active ? 1.4 : 1,
        0.1
      );
      mesh.current.scale.y = THREE.MathUtils.lerp(
        mesh.current.scale.y,
        hovered || active ? 1.4 : 1,
        0.1
      );
      mesh.current.scale.z = THREE.MathUtils.lerp(
        mesh.current.scale.z,
        hovered || active ? 1.4 : 1,
        0.1
      );
    }
  })
  
  return (
    <mesh
      ref={mesh}
      position={[x, y, z]}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      onClick={() => setActive(!active)}
    >
      <sphereGeometry args={[0.02, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} />
    </mesh>
  )
}

interface EarthProps {
  darkMode?: boolean;
}

interface Location {
  name: string;
  lat: number;
  lng: number;
  color: string;
}

interface Transaction {
  start: string;
  end: string;
  color: string;
}

// Rotating Earth with animated points and curves
const Earth = ({ darkMode = false }: EarthProps) => {
  const earthRef = useRef<THREE.Group>(null);
  
  // Define major financial hubs
  const locations: Location[] = [
    { name: "New York", lat: 40.7128, lng: -74.0060, color: "#3b82f6" },
    { name: "London", lat: 51.5074, lng: -0.1278, color: "#10b981" },
    { name: "Tokyo", lat: 35.6762, lng: 139.6503, color: "#f59e0b" },
    { name: "Singapore", lat: 1.3521, lng: 103.8198, color: "#ef4444" },
    { name: "Mumbai", lat: 19.0760, lng: 72.8777, color: "#8b5cf6" },
    { name: "Sydney", lat: -33.8688, lng: 151.2093, color: "#ec4899" },
    { name: "São Paulo", lat: -23.5505, lng: -46.6333, color: "#14b8a6" },
  ];
  
  // Create transaction paths between random locations
  const transactions: Transaction[] = [
    { start: "New York", end: "Tokyo", color: "#3b82f6" },
    { start: "London", end: "Singapore", color: "#10b981" },
    { start: "Mumbai", end: "Sydney", color: "#8b5cf6" },
    { start: "São Paulo", end: "New York", color: "#14b8a6" },
    { start: "Singapore", end: "London", color: "#f59e0b" },
  ];
  
  // Slow continuous rotation
  useFrame(() => {
    if (earthRef.current) {
      earthRef.current.rotation.y += 0.001;
    }
  });
  
  return (
    <group ref={earthRef}>
      {/* Earth sphere */}
      <Sphere args={[1, 64, 64]}>
        <meshStandardMaterial
          color={darkMode ? "#1e293b" : "#f8fafc"}
          map={new THREE.TextureLoader().load("/earth-texture.jpg")}
          roughness={0.7}
          metalness={0.2}
        />
      </Sphere>
      
      {/* Atmosphere glow */}
      <Sphere args={[1.01, 64, 64]}>
        <meshStandardMaterial
          color={darkMode ? "#3b82f6" : "#60a5fa"}
          transparent
          opacity={0.1}
          roughness={1}
        />
      </Sphere>
      
      {/* Pulse points at major financial hubs */}
      {locations.map((loc) => (
        <PulsePoint
          key={loc.name}
          lat={loc.lat}
          lng={loc.lng}
          radius={1}
          color={loc.color}
        />
      ))}
      
      {/* Transaction curves between locations */}
      {transactions.map((transaction, i) => {
        const start = locations.find((loc) => loc.name === transaction.start)
        const end = locations.find((loc) => loc.name === transaction.end)
        
        if (start && end) {
          return (
            <CurvePoint
              key={`transaction-${i}`}
              startLat={start.lat}
              startLng={start.lng}
              endLat={end.lat}
              endLng={end.lng}
              radius={1}
              color={transaction.color}
            />
          )
        }
        return null
      })}
    </group>
  )
}

export function GlobeVisualization({ darkMode = false }) {
  return (
    <motion.div
      className="w-full h-[400px] md:h-[500px] rounded-xl overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: true, margin: "-100px" }}
    >
      <Canvas camera={{ position: [0, 0, 2.5], fov: 45 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} />
        <Earth darkMode={darkMode} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          rotateSpeed={0.4}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </motion.div>
  )
}
