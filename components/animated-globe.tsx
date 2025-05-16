"use client"

import { useRef, useEffect, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, useTexture, Html, Line } from "@react-three/drei"
import { motion } from "framer-motion-3d"
import { Vector3, MathUtils } from "three"

// Sample transaction data for visualization
const transactions = [
  { from: [0.5, 0.5], to: [-0.5, 0.3], amount: 100, currency: "USD", toCurrency: "INR" },
  { from: [-0.3, 0.7], to: [0.7, -0.2], amount: 200, currency: "EUR", toCurrency: "MXN" },
  { from: [0.1, -0.8], to: [-0.6, -0.4], amount: 150, currency: "GBP", toCurrency: "NGN" },
  { from: [-0.7, -0.1], to: [0.3, 0.6], amount: 300, currency: "USD", toCurrency: "PHP" },
  { from: [0.6, 0.1], to: [-0.2, -0.7], amount: 250, currency: "EUR", toCurrency: "ZAR" },
]

// Convert lat/long to 3D coordinates on a sphere
function latLongToVector3(lat, long, radius) {
  const phi = (90 - lat) * (Math.PI / 180)
  const theta = (long + 180) * (Math.PI / 180)

  const x = -(radius * Math.sin(phi) * Math.cos(theta))
  const z = radius * Math.sin(phi) * Math.sin(theta)
  const y = radius * Math.cos(phi)

  return new Vector3(x, y, z)
}

// Animated transaction marker
function TransactionMarker({ position, amount, currency, active, darkMode }) {
  const size = MathUtils.mapLinear(amount, 100, 300, 0.05, 0.1)
  const color = active ? "#3b82f6" : darkMode ? "#94a3b8" : "#64748b"

  return (
    <motion.mesh
      position={position}
      initial={{ scale: 0 }}
      animate={{ scale: active ? 1.2 : 1 }}
      transition={{ duration: 0.5 }}
    >
      <sphereGeometry args={[size, 16, 16]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} />
      <Html distanceFactor={10}>
        <div
          className={`px-2 py-1 rounded-full text-xs font-medium ${
            darkMode ? "bg-slate-800 text-slate-300" : "bg-white text-slate-700"
          } shadow-md whitespace-nowrap`}
        >
          {amount} {currency}
        </div>
      </Html>
    </motion.mesh>
  )
}

// Animated transaction arc
function TransactionArc({ from, to, active, darkMode }) {
  const arcHeight = from.distanceTo(to) * 0.5
  const midPoint = new Vector3().addVectors(from, to).multiplyScalar(0.5)
  midPoint.normalize().multiplyScalar(from.length() + arcHeight)

  const points = []
  const numPoints = 20

  for (let i = 0; i < numPoints; i++) {
    const t = i / (numPoints - 1)
    const pt = new Vector3().lerpVectors(from, midPoint, t)
    pt.normalize().multiplyScalar(2.1) // Keep points on the surface
    points.push(pt)
  }

  for (let i = 0; i < numPoints; i++) {
    const t = i / (numPoints - 1)
    const pt = new Vector3().lerpVectors(midPoint, to, t)
    pt.normalize().multiplyScalar(2.1) // Keep points on the surface
    points.push(pt)
  }

  return (
    <Line
      points={points}
      color={active ? "#3b82f6" : darkMode ? "#475569" : "#cbd5e1"}
      lineWidth={active ? 2 : 1}
      opacity={active ? 1 : 0.5}
    />
  )
}

// Animated pulse along transaction arc
function TransactionPulse({ from, to, active, darkMode }) {
  const ref = useRef()
  const arcHeight = from.distanceTo(to) * 0.5
  const midPoint = new Vector3().addVectors(from, to).multiplyScalar(0.5)
  midPoint.normalize().multiplyScalar(from.length() + arcHeight)

  const points = []
  const numPoints = 40

  for (let i = 0; i < numPoints; i++) {
    const t = i / (numPoints - 1)
    const pt = new Vector3().lerpVectors(from, midPoint, t)
    pt.normalize().multiplyScalar(2.1) // Keep points on the surface
    points.push(pt)
  }

  for (let i = 0; i < numPoints; i++) {
    const t = i / (numPoints - 1)
    const pt = new Vector3().lerpVectors(midPoint, to, t)
    pt.normalize().multiplyScalar(2.1) // Keep points on the surface
    points.push(pt)
  }

  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (active) {
      setProgress(0)
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 1) {
            clearInterval(interval)
            return 0
          }
          return prev + 0.01
        })
      }, 50)

      return () => clearInterval(interval)
    }
  }, [active])

  const currentPoint = Math.floor(progress * points.length)

  if (!active || currentPoint === 0) return null

  return (
    <mesh position={points[currentPoint]} ref={ref}>
      <sphereGeometry args={[0.05, 16, 16]} />
      <meshStandardMaterial color="#3b82f6" emissive="#3b82f6" emissiveIntensity={2} />
    </mesh>
  )
}

// Earth globe component
function Earth({ darkMode }) {
  const earthRef = useRef()
  const texture = useTexture("/assets/3d/texture_earth.jpg")
  const [activeTransaction, setActiveTransaction] = useState(0)
  const [hoverTransaction, setHoverTransaction] = useState(null)

  // Rotate the earth slowly
  useFrame(({ clock }) => {
    if (earthRef.current) {
      earthRef.current.rotation.y = clock.getElapsedTime() * 0.05
    }
  })

  // Change active transaction every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveTransaction((prev) => (prev + 1) % transactions.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  // Convert 2D coordinates to 3D positions on the globe
  const transactionPoints = transactions.map((t) => ({
    ...t,
    fromPosition: latLongToVector3(t.from[0] * 90, t.from[1] * 180, 2),
    toPosition: latLongToVector3(t.to[0] * 90, t.to[1] * 180, 2),
  }))

  return (
    <group>
      {/* Earth sphere */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[2, 64, 64]} />
        <meshStandardMaterial
          map={texture}
          emissive={darkMode ? "#1e293b" : "#ffffff"}
          emissiveIntensity={darkMode ? 0.1 : 0}
        />
      </mesh>

      {/* Transaction arcs and markers */}
      {transactionPoints.map((transaction, index) => {
        const isActive = index === activeTransaction || index === hoverTransaction

        return (
          <group key={index}>
            <TransactionArc
              from={transaction.fromPosition}
              to={transaction.toPosition}
              active={isActive}
              darkMode={darkMode}
            />

            <TransactionMarker
              position={transaction.fromPosition}
              amount={transaction.amount}
              currency={transaction.currency}
              active={isActive}
              darkMode={darkMode}
            />

            <TransactionMarker
              position={transaction.toPosition}
              amount={
                transaction.amount *
                (transaction.toCurrency === "INR"
                  ? 83.12
                  : transaction.toCurrency === "MXN"
                    ? 16.72
                    : transaction.toCurrency === "NGN"
                      ? 1450.25
                      : transaction.toCurrency === "PHP"
                        ? 56.78
                        : 18.15)
              }
              currency={transaction.toCurrency}
              active={isActive}
              darkMode={darkMode}
            />

            <TransactionPulse
              from={transaction.fromPosition}
              to={transaction.toPosition}
              active={isActive}
              darkMode={darkMode}
            />
          </group>
        )
      })}

      {/* Transaction info panel */}
      <Html position={[0, 3, 0]}>
        <div
          className={`px-4 py-2 rounded-lg ${
            darkMode ? "bg-slate-800 text-slate-300" : "bg-white text-slate-700"
          } shadow-lg border ${darkMode ? "border-slate-700" : "border-slate-200"} min-w-[200px]`}
        >
          <div className="text-sm font-medium mb-1">Active Transaction</div>
          <div className="flex justify-between text-xs">
            <span>From:</span>
            <span>
              {transactions[activeTransaction].amount} {transactions[activeTransaction].currency}
            </span>
          </div>
          <div className="flex justify-between text-xs">
            <span>To:</span>
            <span>
              {transactions[activeTransaction].amount *
                (transactions[activeTransaction].toCurrency === "INR"
                  ? 83.12
                  : transactions[activeTransaction].toCurrency === "MXN"
                    ? 16.72
                    : transactions[activeTransaction].toCurrency === "NGN"
                      ? 1450.25
                      : transactions[activeTransaction].toCurrency === "PHP"
                        ? 56.78
                        : 18.15
                ).toFixed(2)}{" "}
              {transactions[activeTransaction].toCurrency}
            </span>
          </div>
        </div>
      </Html>
    </group>
  )
}

// Main globe visualization component
export function AnimatedGlobe({ darkMode = false }) {
  return (
    <div className={`w-full h-[500px] ${darkMode ? "bg-slate-900" : "bg-slate-50"} rounded-xl overflow-hidden`}>
      <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
        <ambientLight intensity={darkMode ? 0.3 : 0.5} />
        <pointLight position={[10, 10, 10]} intensity={darkMode ? 0.5 : 1} />

        <Earth darkMode={darkMode} />

        <OrbitControls
          enableZoom={true}
          enablePan={false}
          enableRotate={true}
          minDistance={4}
          maxDistance={10}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  )
}
