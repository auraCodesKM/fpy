"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useAnimation, AnimatePresence } from "framer-motion"
import { useInView } from "framer-motion"

// Currency types with their symbols and colors
const currencies = [
  { code: "USD", symbol: "$", color: "#3b82f6" },
  { code: "EUR", symbol: "€", color: "#0ea5e9" },
  { code: "GBP", symbol: "£", color: "#6366f1" },
  { code: "USDC", symbol: "₮", color: "#2563eb" },
  { code: "BASE", symbol: "◆", color: "#1d4ed8" },
  { code: "INR", symbol: "₹", color: "#0d9488" },
  { code: "MXN", symbol: "₱", color: "#7c3aed" },
  { code: "NGN", symbol: "₦", color: "#0891b2" },
  { code: "BRL", symbol: "R$", color: "#059669" },
  { code: "ZAR", symbol: "R", color: "#b45309" },
]

// Define the network structure
const network = {
  nodes: [
    { id: "source", x: 5, y: 50, label: "Source", type: "source" },
    { id: "usdc", x: 25, y: 50, label: "USDC", type: "crypto" },
    { id: "base", x: 50, y: 50, label: "BASE", type: "crypto" },
    { id: "dest1", x: 75, y: 25, label: "Destination 1", type: "destination" },
    { id: "dest2", x: 75, y: 50, label: "Destination 2", type: "destination" },
    { id: "dest3", x: 75, y: 75, label: "Destination 3", type: "destination" },
  ],
  paths: [
    { from: "source", to: "usdc", id: "path1" },
    { from: "usdc", to: "base", id: "path2" },
    { from: "base", to: "dest1", id: "path3" },
    { from: "base", to: "dest2", id: "path4" },
    { from: "base", to: "dest3", id: "path5" },
  ],
}

export const MultiPathCurrencyFlow = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(containerRef, { once: false, amount: 0.3 })
  const controls = useAnimation()
  const [activePulses, setActivePulses] = useState<
    Array<{
      id: number
      currency: (typeof currencies)[0]
      path: string[]
      progress: number
      currentPathIndex: number
    }>
  >([])
  const [pulseCounter, setPulseCounter] = useState(0)

  // Start animations when in view
  useEffect(() => {
    if (isInView) {
      controls.start("visible")
    } else {
      controls.start("hidden")
    }
  }, [controls, isInView])

  // Generate pulses at regular intervals
  useEffect(() => {
    if (!isInView) return

    const interval = setInterval(() => {
      // Select a random source currency (USD, EUR, GBP)
      const sourceCurrencies = currencies.slice(0, 3)
      const randomSource = sourceCurrencies[Math.floor(Math.random() * sourceCurrencies.length)]

      // Select a random destination path
      const destinationPaths = [
        ["path1", "path2", "path3"], // To destination 1
        ["path1", "path2", "path4"], // To destination 2
        ["path1", "path2", "path5"], // To destination 3
      ]
      const randomPath = destinationPaths[Math.floor(Math.random() * destinationPaths.length)]

      setActivePulses((prev) => [
        ...prev,
        {
          id: pulseCounter,
          currency: randomSource,
          path: randomPath,
          progress: 0,
          currentPathIndex: 0,
        },
      ])
      setPulseCounter((prev) => prev + 1)
    }, 3000)

    return () => clearInterval(interval)
  }, [isInView, pulseCounter])

  // Update pulse positions
  useEffect(() => {
    if (!activePulses.length) return

    const interval = setInterval(() => {
      setActivePulses(
        (prev) =>
          prev
            .map((pulse) => {
              // Update progress along current path segment
              let newProgress = pulse.progress + 0.02
              let newPathIndex = pulse.currentPathIndex

              // If reached end of current path segment, move to next segment
              if (newProgress >= 1) {
                newProgress = 0
                newPathIndex = pulse.currentPathIndex + 1
              }

              // If we've completed all path segments, remove this pulse
              if (newPathIndex >= pulse.path.length) {
                return null
              }

              return {
                ...pulse,
                progress: newProgress,
                currentPathIndex: newPathIndex,
              }
            })
            .filter(Boolean) as typeof activePulses,
      )
    }, 50)

    return () => clearInterval(interval)
  }, [activePulses])

  // Get node by ID
  const getNode = (id: string) => {
    return network.nodes.find((node) => node.id === id)
  }

  // Get path by ID
  const getPath = (id: string) => {
    const path = network.paths.find((path) => path.id === id)
    if (!path) return null

    const fromNode = getNode(path.from)
    const toNode = getNode(path.to)

    if (!fromNode || !toNode) return null

    return {
      id: path.id,
      from: fromNode,
      to: toNode,
    }
  }

  // Calculate position along a path
  const getPositionAlongPath = (pathId: string, progress: number) => {
    const path = getPath(pathId)
    if (!path) return { x: 0, y: 0 }

    const { from, to } = path

    // Simple linear interpolation
    const x = from.x + (to.x - from.x) * progress
    const y = from.y + (to.y - from.y) * progress

    return { x, y }
  }

  // Get node color based on type
  const getNodeColor = (type: string) => {
    switch (type) {
      case "source":
        return "bg-blue-100 text-blue-600"
      case "crypto":
        return "bg-blue-600 text-white"
      case "destination":
        return "bg-teal-100 text-teal-600"
      default:
        return "bg-slate-100 text-slate-600"
    }
  }

  // Get node icon based on type
  const getNodeIcon = (type: string) => {
    switch (type) {
      case "source":
        return "$€£"
      case "crypto":
        return type === "usdc" ? "₮" : "◆"
      case "destination":
        return "₹₱₦"
      default:
        return "•"
    }
  }

  // Generate SVG path between two nodes
  const generatePath = (fromNode: any, toNode: any) => {
    // For curved paths between nodes
    const midX = (fromNode.x + toNode.x) / 2
    const midY = (fromNode.y + toNode.y) / 2

    // Adjust curve based on vertical difference
    const curveOffset = Math.abs(toNode.y - fromNode.y) * 0.5

    return `M ${fromNode.x} ${fromNode.y} C ${midX - curveOffset} ${fromNode.y}, ${midX + curveOffset} ${toNode.y}, ${toNode.x} ${toNode.y}`
  }

  return (
    <div ref={containerRef} className="w-full h-80 relative overflow-hidden">
      <svg className="w-full h-full absolute" viewBox="0 0 100 100" preserveAspectRatio="none">
        {/* Paths between nodes */}
        {network.paths.map((path) => {
          const fromNode = getNode(path.from)
          const toNode = getNode(path.to)

          if (!fromNode || !toNode) return null

          const pathD = generatePath(fromNode, toNode)

          return (
            <g key={path.id}>
              {/* Base path */}
              <motion.path
                d={pathD}
                fill="none"
                strokeWidth="2"
                className="stroke-slate-200"
                initial="hidden"
                animate={controls}
                variants={{
                  hidden: { pathLength: 0 },
                  visible: {
                    pathLength: 1,
                    transition: { duration: 1.5, ease: "easeInOut" },
                  },
                }}
              />

              {/* Gradient overlay */}
              <motion.path
                d={pathD}
                fill="none"
                strokeWidth="2"
                stroke={`url(#gradient-${path.id})`}
                strokeOpacity="0.6"
                initial="hidden"
                animate={controls}
                variants={{
                  hidden: { pathLength: 0 },
                  visible: {
                    pathLength: 1,
                    transition: { duration: 1.5, ease: "easeInOut", delay: 0.5 },
                  },
                }}
              />

              {/* Define gradient for this path */}
              <defs>
                <linearGradient id={`gradient-${path.id}`} x1="0%" y1="0%" x2="100%" y1="0%" y2="0%">
                  <stop
                    offset="0%"
                    stopColor={path.from === "source" ? "#3b82f6" : path.from === "usdc" ? "#2563eb" : "#1d4ed8"}
                  />
                  <stop
                    offset="100%"
                    stopColor={path.to === "usdc" ? "#2563eb" : path.to === "base" ? "#1d4ed8" : "#0d9488"}
                  />
                </linearGradient>
              </defs>
            </g>
          )
        })}
      </svg>

      {/* Nodes */}
      <div className="absolute inset-0">
        {network.nodes.map((node) => (
          <motion.div
            key={node.id}
            className="absolute flex flex-col items-center"
            style={{
              left: `${node.x}%`,
              top: `${node.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0, scale: 0.5 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { duration: 0.5, ease: "easeOut", delay: 0.2 },
              },
            }}
          >
            <div
              className={`w-12 h-12 rounded-full ${getNodeColor(node.type)} flex items-center justify-center mb-2 shadow-md`}
            >
              <span className="font-bold text-lg">{getNodeIcon(node.type)}</span>
            </div>
            <span className="text-sm font-medium text-slate-700">{node.label}</span>
          </motion.div>
        ))}
      </div>

      {/* Animated pulses */}
      <div className="absolute inset-0 pointer-events-none">
        <AnimatePresence>
          {activePulses.map((pulse) => {
            const currentPathId = pulse.path[pulse.currentPathIndex]
            const position = getPositionAlongPath(currentPathId, pulse.progress)

            return (
              <motion.div
                key={pulse.id}
                className="absolute"
                style={{
                  left: `${position.x}%`,
                  top: `${position.y}%`,
                  transform: "translate(-50%, -50%)",
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.5 }}
              >
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center shadow-lg"
                  style={{ backgroundColor: pulse.currency.color }}
                >
                  <span className="text-white font-bold text-xs">{pulse.currency.symbol}</span>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>
    </div>
  )
}
