"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Environment, Float, Text, Html, useTexture } from "@react-three/drei"
import { motion } from "framer-motion-3d"
import { MotionConfig } from "framer-motion"
import { Vector3 } from "three"
import { AdvancedCurrencyFlow } from "./advanced-currency-flow"
import { DynamicLogo } from "./dynamic-logo"
import { AnimatedButton } from "./animated-button"

// Currency symbols for the 3D scene
const currencySymbols = [
  { symbol: "$", position: [-3, 2, -2], color: "#3b82f6" },
  { symbol: "€", position: [3, 1, -1], color: "#0ea5e9" },
  { symbol: "£", position: [-2, -1, -3], color: "#6366f1" },
  { symbol: "₹", position: [2, 3, -2], color: "#0d9488" },
  { symbol: "₱", position: [-4, 0, -1], color: "#7c3aed" },
  { symbol: "₦", position: [4, -1, -3], color: "#0891b2" },
]

// Animated floating currency symbol
function CurrencySymbol({ symbol, position, color }) {
  const [hover, setHover] = useState(false)
  const meshRef = useRef()

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.1
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.2) * 0.1
    }
  })

  return (
    <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
      <motion.mesh
        ref={meshRef}
        position={position}
        whileHover={{ scale: 1.2 }}
        animate={hover ? { rotateY: Math.PI * 2 } : {}}
        onPointerOver={() => setHover(true)}
        onPointerOut={() => setHover(false)}
      >
        <Text fontSize={0.5} color={color} anchorX="center" anchorY="middle" font="/fonts/Inter_Bold.json">
          {symbol}
        </Text>
        <meshBasicMaterial attach="material" color={color} transparent opacity={0.8} />
      </motion.mesh>
    </Float>
  )
}

// Animated globe component
function Globe({ darkMode }) {
  const meshRef = useRef()
  const texture = useTexture("/assets/3d/texture_earth.jpg")

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.001
    }
  })

  return (
    <motion.mesh
      ref={meshRef}
      position={[0, 0, -5]}
      animate={{
        rotateY: Math.PI * 2,
      }}
      transition={{
        repeat: Number.POSITIVE_INFINITY,
        duration: 60,
        ease: "linear",
      }}
    >
      <sphereGeometry args={[2, 64, 64]} />
      <meshStandardMaterial map={texture} />
    </motion.mesh>
  )
}

// Animated connection lines between currencies
function ConnectionLines({ darkMode }) {
  const linesRef = useRef()
  const { clock } = useThree()

  useFrame(() => {
    if (linesRef.current) {
      linesRef.current.rotation.y = Math.sin(clock.elapsedTime * 0.1) * 0.1
    }
  })

  return (
    <group ref={linesRef}>
      {currencySymbols.map((source, i) =>
        currencySymbols.slice(i + 1, i + 3).map((target, j) => (
          <motion.mesh key={`${i}-${j}`}>
            <motion.line
              points={[new Vector3(...source.position), new Vector3(...target.position)]}
              color={darkMode ? "#ffffff" : "#1e293b"}
              lineWidth={1}
              opacity={0.3}
              transparent
              animate={{
                opacity: [0.1, 0.3, 0.1],
              }}
              transition={{
                repeat: Number.POSITIVE_INFINITY,
                duration: 3,
                delay: i * 0.5,
                ease: "easeInOut",
              }}
            />
          </motion.mesh>
        )),
      )}
    </group>
  )
}

// Floating card with currency flow
function FloatingCard({ darkMode }) {
  return (
    <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.3}>
      <Html transform position={[0, 0, -2]} rotation={[0, 0, 0]} distanceFactor={10} zIndexRange={[100, 0]}>
        <div className="w-[600px] h-[200px] transform -translate-x-1/2 -translate-y-1/2">
          <AdvancedCurrencyFlow darkMode={darkMode} />
        </div>
      </Html>
    </Float>
  )
}

// Main 3D scene
function Scene({ darkMode }) {
  return (
    <>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={0.5} />

      {/* Environment */}
      <Environment preset={darkMode ? "night" : "city"} />

      {/* Floating currency symbols */}
      {currencySymbols.map((item, index) => (
        <CurrencySymbol key={index} symbol={item.symbol} position={item.position} color={item.color} />
      ))}

      {/* Globe */}
      <Globe darkMode={darkMode} />

      {/* Connection lines */}
      <ConnectionLines darkMode={darkMode} />

      {/* Floating card with currency flow */}
      <FloatingCard darkMode={darkMode} />

      {/* Controls */}
      <OrbitControls
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        minPolarAngle={Math.PI / 2.5}
        maxPolarAngle={Math.PI / 1.5}
        minAzimuthAngle={-Math.PI / 4}
        maxAzimuthAngle={Math.PI / 4}
      />
    </>
  )
}

// Main hero section component
export function Hero3D({ darkMode = false }) {
  return (
    <section className={`relative w-full h-screen overflow-hidden ${darkMode ? "bg-slate-900" : "bg-white"}`}>
      <div className="absolute inset-0 z-10">
        <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
          <MotionConfig transition={{ duration: 0.5, type: "spring" }}>
            <Scene darkMode={darkMode} />
          </MotionConfig>
        </Canvas>
      </div>

      <div className="relative z-20 h-full flex flex-col items-center justify-center px-4">
        <div className="max-w-6xl mx-auto w-full pt-32">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              className="flex-1 space-y-6"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="space-y-4">
                <h1
                  className={`text-4xl md:text-6xl font-bold tracking-tight ${darkMode ? "text-white" : "text-slate-900"}`}
                >
                  <motion.span
                    className="block"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    Send Money Across
                  </motion.span>
                  <motion.span
                    className="block"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                  >
                    Borders. No Banks.
                  </motion.span>
                  <motion.span
                    className="block bg-gradient-to-r from-blue-600 via-sky-500 to-teal-500 bg-clip-text text-transparent"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                  >
                    Just Stablecoins.
                  </motion.span>
                </h1>
                <motion.p
                  className={`text-xl ${darkMode ? "text-slate-300" : "text-slate-600"} max-w-2xl`}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  FusionPay lets you move money globally in minutes — powered by Base and AI routing. No wallets. No
                  crypto knowledge needed.
                </motion.p>
              </div>
              <motion.div
                className="flex flex-wrap gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 1 }}
              >
                <AnimatedButton size="lg">Try the Demo</AnimatedButton>
                <AnimatedButton size="lg" variant="outline">
                  See How It Works
                </AnimatedButton>
              </motion.div>
            </motion.div>
            <motion.div
              className="flex-1 relative h-64 md:h-96 flex items-center justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            >
              <DynamicLogo />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
