"use client"

import { useRef, useEffect, useState } from "react"
import { motion, useAnimation } from "framer-motion"

// Define node types and their positions
const nodes = [
  {
    id: "sender",
    type: "user",
    position: { x: 5, y: 50 },
    label: "Sender",
  },
  {
    id: "fusionpay",
    type: "central",
    position: { x: 50, y: 50 },
    label: "FusionPay",
  },
  {
    id: "recipient1",
    type: "endpoint",
    position: { x: 85, y: 25 },
    label: "Bank Account",
    icon: "bank",
  },
  {
    id: "recipient2",
    type: "endpoint",
    position: { x: 85, y: 50 },
    label: "Mobile Wallet",
    icon: "mobile",
  },
  {
    id: "recipient3",
    type: "endpoint",
    position: { x: 85, y: 75 },
    label: "Cash Pickup",
    icon: "cash",
  },
]

// Define connections between nodes
const connections = [
  {
    from: "sender",
    to: "fusionpay",
    label: "USD, EUR, GBP",
    color: "from-blue-400 to-blue-600",
  },
  {
    from: "fusionpay",
    to: "recipient1",
    label: "INR, PHP, NGN",
    color: "from-teal-400 to-teal-600",
  },
  {
    from: "fusionpay",
    to: "recipient2",
    label: "MXN, BRL, ARS",
    color: "from-purple-400 to-purple-600",
  },
  {
    from: "fusionpay",
    to: "recipient3",
    label: "ZAR, KES, GHS",
    color: "from-amber-400 to-amber-600",
  },
]

export const CurrencyNetworkVisualization = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [isVisible, setIsVisible] = useState(false)
  const controls = useAnimation()

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          controls.start("visible")
        }
      },
      { threshold: 0.1 },
    )

    if (containerRef.current) {
      observer.observe(containerRef.current)
    }

    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current)
      }
    }
  }, [controls])

  // Animation for pulses along the paths
  const [activePulses, setActivePulses] = useState<
    Array<{
      id: number
      connection: (typeof connections)[0]
      progress: number
      direction: "forward" | "backward"
    }>
  >([])
  const [pulseCounter, setPulseCounter] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    // Start pulse animations after the paths are drawn
    const timeout = setTimeout(() => {
      const interval = setInterval(() => {
        // Randomly select a connection for a new pulse
        const randomConnection = connections[Math.floor(Math.random() * connections.length)]

        setActivePulses((prev) => [
          ...prev,
          {
            id: pulseCounter,
            connection: randomConnection,
            progress: 0,
            direction: Math.random() > 0.2 ? "forward" : "backward", // Mostly forward, occasionally backward
          },
        ])
        setPulseCounter((prev) => prev + 1)
      }, 2000)

      return () => clearInterval(interval)
    }, 1000)

    return () => clearTimeout(timeout)
  }, [isVisible, pulseCounter])

  // Update pulse positions
  useEffect(() => {
    if (!activePulses.length) return

    const interval = setInterval(() => {
      setActivePulses((prev) =>
        prev
          .map((pulse) => ({
            ...pulse,
            progress: pulse.progress + (pulse.direction === "forward" ? 0.02 : -0.02),
          }))
          .filter((pulse) => pulse.progress >= 0 && pulse.progress <= 1),
      )
    }, 50)

    return () => clearInterval(interval)
  }, [activePulses])

  // Get coordinates for a node
  const getNodeCoordinates = (nodeId: string) => {
    const node = nodes.find((n) => n.id === nodeId)
    if (!node) return { x: 0, y: 0 }
    return {
      x: `${node.position.x}%`,
      y: `${node.position.y}%`,
    }
  }

  // Calculate path between two nodes
  const getPath = (fromId: string, toId: string) => {
    const fromNode = nodes.find((n) => n.id === fromId)
    const toNode = nodes.find((n) => n.id === toId)

    if (!fromNode || !toNode) return ""

    const from = fromNode.position
    const to = toNode.position

    // Calculate control points for a curved path
    const midX = (from.x + to.x) / 2
    const midY = (from.y + to.y) / 2

    // Adjust the curve based on the vertical difference
    const curveOffset = Math.abs(to.y - from.y) * 0.5

    return `M ${from.x} ${from.y} C ${midX - curveOffset} ${from.y}, ${midX + curveOffset} ${to.y}, ${to.x} ${to.y}`
  }

  // Get position along a path for pulse animations
  const getPositionAlongPath = (fromId: string, toId: string, progress: number) => {
    const fromNode = nodes.find((n) => n.id === fromId)
    const toNode = nodes.find((n) => n.id === toId)

    if (!fromNode || !toNode) return { x: 0, y: 0 }

    const from = fromNode.position
    const to = toNode.position

    // Simple linear interpolation for position
    return {
      x: from.x + (to.x - from.x) * progress,
      y: from.y + (to.y - from.y) * progress,
    }
  }

  // Render node icon based on type
  const renderNodeIcon = (type: string, icon?: string) => {
    if (type === "user") {
      return (
        <div className="w-5 h-5 text-slate-600">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </div>
      )
    }

    if (type === "central") {
      return (
        <div className="w-6 h-6 text-blue-600">
          <svg viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
          </svg>
        </div>
      )
    }

    if (icon === "bank") {
      return (
        <div className="w-5 h-5 text-teal-600">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="3" y="10" width="18" height="11" rx="2" />
            <path d="M12 2L2 8h20L12 2z" />
          </svg>
        </div>
      )
    }

    if (icon === "mobile") {
      return (
        <div className="w-5 h-5 text-purple-600">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="7" y="2" width="10" height="20" rx="2" />
            <line x1="12" y1="18" x2="12" y2="18.01" />
          </svg>
        </div>
      )
    }

    if (icon === "cash") {
      return (
        <div className="w-5 h-5 text-amber-600">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <rect x="2" y="6" width="20" height="12" rx="2" />
            <circle cx="12" cy="12" r="3" />
            <path d="M6 12h.01M18 12h.01" />
          </svg>
        </div>
      )
    }

    return null
  }

  return (
    <div ref={containerRef} className="w-full h-[400px] relative overflow-hidden">
      <div className="absolute inset-0">
        {/* Connection paths */}
        <svg className="w-full h-full absolute top-0 left-0" viewBox="0 0 100 100" preserveAspectRatio="none">
          {connections.map((connection) => {
            const pathVariants = {
              hidden: { pathLength: 0, opacity: 0 },
              visible: {
                pathLength: 1,
                opacity: 1,
                transition: { duration: 1.5, ease: "easeInOut" },
              },
            }

            return (
              <motion.path
                key={`${connection.from}-${connection.to}`}
                d={getPath(connection.from, connection.to)}
                fill="none"
                strokeWidth="1.5"
                className={`stroke-[1.5] stroke-current text-slate-200`}
                initial="hidden"
                animate={controls}
                variants={pathVariants}
              />
            )
          })}
        </svg>

        {/* Pulse animations along paths */}
        {activePulses.map((pulse) => {
          const { from, to } = pulse.connection
          const position = getPositionAlongPath(
            pulse.direction === "forward" ? from : to,
            pulse.direction === "forward" ? to : from,
            pulse.progress,
          )

          return (
            <motion.div
              key={pulse.id}
              className={`absolute w-3 h-3 rounded-full bg-gradient-to-r ${pulse.connection.color} shadow-lg`}
              style={{
                left: `${position.x}%`,
                top: `${position.y}%`,
                transform: "translate(-50%, -50%)",
              }}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
            />
          )
        })}

        {/* Nodes */}
        {nodes.map((node) => (
          <motion.div
            key={node.id}
            className={`absolute flex flex-col items-center`}
            style={{
              left: `${node.position.x}%`,
              top: `${node.position.y}%`,
              transform: "translate(-50%, -50%)",
            }}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={controls}
            variants={{
              hidden: { opacity: 0, scale: 0.5 },
              visible: {
                opacity: 1,
                scale: 1,
                transition: { duration: 0.5, delay: 0.5 },
              },
            }}
          >
            <div
              className={`flex items-center justify-center rounded-full shadow-md ${
                node.type === "central"
                  ? "w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600"
                  : node.type === "user"
                    ? "w-12 h-12 bg-white border border-slate-200"
                    : "w-12 h-12 bg-white border border-slate-200"
              }`}
            >
              {node.type === "central" ? (
                <svg width="32" height="32" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M30 10C18.954 10 10 18.954 10 30C10 41.046 18.954 50 30 50C41.046 50 50 41.046 50 30C50 18.954 41.046 10 30 10ZM30 15C38.284 15 45 21.716 45 30C45 38.284 38.284 45 30 45C21.716 45 15 38.284 15 30C15 21.716 21.716 15 30 15Z"
                    fill="white"
                  />
                  <path d="M30 20L20 30L30 40L40 30L30 20Z" fill="white" />
                  <circle cx="30" cy="30" r="5" fill="white" />
                </svg>
              ) : (
                renderNodeIcon(node.type, node.icon)
              )}
            </div>
            <div className="mt-2 text-center">
              <span className="text-sm font-medium text-slate-700">{node.label}</span>
              {connections.find((c) => c.from === node.id || c.to === node.id)?.label && (
                <div className="text-xs text-slate-500 mt-1">
                  {connections.find((c) => c.from === node.id)?.label ||
                    connections.find((c) => c.to === node.id)?.label}
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {/* Connection labels */}
        {connections.map((connection) => {
          const fromNode = nodes.find((n) => n.id === connection.from)
          const toNode = nodes.find((n) => n.id === connection.to)

          if (!fromNode || !toNode) return null

          const midX = (fromNode.position.x + toNode.position.x) / 2
          const midY = (fromNode.position.y + toNode.position.y) / 2

          // Adjust label position based on the connection
          const labelOffsetY = connection.from === "fusionpay" ? -10 : 10

          return (
            <motion.div
              key={`label-${connection.from}-${connection.to}`}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-none"
              style={{
                left: `${midX}%`,
                top: `${midY + labelOffsetY}%`,
              }}
              initial={{ opacity: 0 }}
              animate={controls}
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { duration: 0.5, delay: 1.5 },
                },
              }}
            >
              <div className={`px-2 py-1 rounded-full bg-white/80 backdrop-blur-sm shadow-sm text-xs font-medium`}>
                {connection.label}
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}
