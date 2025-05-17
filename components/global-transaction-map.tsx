"use client"

import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Globe, ArrowRight, Info, RefreshCw, DollarSign, PieChart, Zap, Clock, Layers } from "lucide-react"
import { useTheme } from "next-themes"
import { Map, Source, Layer, Marker, Popup, NavigationControl, useMap } from 'react-map-gl'
import { FlyToInterpolator } from '@deck.gl/core'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

// Define transaction data type
type Transaction = {
  source: {
    country: string
    coordinates: [number, number]
  }
  destination: {
    country: string
    coordinates: [number, number]
  }
  amount: number
  currency: string
  savings: number
  timeStamp: number
}

// Real-time transaction data generator
const generateRealTimeTransactions = (): Transaction[] => {
  // Base transaction data
  const baseTransactions: Transaction[] = [
    {
      source: {
        country: "United States",
        coordinates: [37.0902, -95.7129]
      },
      destination: {
        country: "India",
        coordinates: [20.5937, 78.9629]
      },
      amount: 1000,
      currency: "USD",
      savings: 45,
      timeStamp: new Date().getTime() - Math.floor(Math.random() * 60000)
    },
    {
      source: {
        country: "United Kingdom",
        coordinates: [55.3781, -3.4360]
      },
      destination: {
        country: "Nigeria",
        coordinates: [9.0820, 8.6753]
      },
      amount: 850,
      currency: "GBP",
      savings: 38,
      timeStamp: new Date().getTime() - Math.floor(Math.random() * 60000)
    },
    {
      source: {
        country: "Canada",
        coordinates: [56.1304, -106.3468]
      },
      destination: {
        country: "Philippines",
        coordinates: [12.8797, 121.7740]
      },
      amount: 1200,
      currency: "CAD",
      savings: 52,
      timeStamp: new Date().getTime() - Math.floor(Math.random() * 60000)
    },
    {
      source: {
        country: "Australia",
        coordinates: [-25.2744, 133.7751]
      },
      destination: {
        country: "Indonesia",
        coordinates: [-0.7893, 113.9213]
      },
      amount: 750,
      currency: "AUD",
      savings: 33,
      timeStamp: new Date().getTime() - Math.floor(Math.random() * 60000)
    },
    {
      source: {
        country: "Germany",
        coordinates: [51.1657, 10.4515]
      },
      destination: {
        country: "Turkey",
        coordinates: [38.9637, 35.2433]
      },
      amount: 900,
      currency: "EUR",
      savings: 40,
      timeStamp: new Date().getTime() - Math.floor(Math.random() * 60000)
    },
    {
      source: {
        country: "Japan",
        coordinates: [36.2048, 138.2529]
      },
      destination: {
        country: "Vietnam",
        coordinates: [14.0583, 108.2772]
      },
      amount: 70000,
      currency: "JPY",
      savings: 3100,
      timeStamp: new Date().getTime() - Math.floor(Math.random() * 60000)
    },
    {
      source: {
        country: "Brazil",
        coordinates: [-14.2350, -51.9253]
      },
      destination: {
        country: "Portugal",
        coordinates: [39.3999, -8.2245]
      },
      amount: 2500,
      currency: "BRL",
      savings: 112,
      timeStamp: new Date().getTime() - Math.floor(Math.random() * 60000)
    },
    {
      source: {
        country: "South Korea",
        coordinates: [35.9078, 127.7669]
      },
      destination: {
        country: "Thailand",
        coordinates: [15.8700, 100.9925]
      },
      amount: 1500000,
      currency: "KRW",
      savings: 67500,
      timeStamp: new Date().getTime() - Math.floor(Math.random() * 60000)
    },
    {
      source: {
        country: "France",
        coordinates: [46.2276, 2.2137]
      },
      destination: {
        country: "Morocco",
        coordinates: [31.7917, -7.0926]
      },
      amount: 1200,
      currency: "EUR",
      savings: 54,
      timeStamp: new Date().getTime() - Math.floor(Math.random() * 60000)
    },
    {
      source: {
        country: "Mexico",
        coordinates: [23.6345, -102.5528]
      },
      destination: {
        country: "Colombia",
        coordinates: [4.5709, -74.2973]
      },
      amount: 15000,
      currency: "MXN",
      savings: 675,
      timeStamp: new Date().getTime() - Math.floor(Math.random() * 60000)
    }
  ];
  
  // Randomize the transaction amounts slightly for real-time effect
  return baseTransactions.map(transaction => {
    const variationFactor = 0.9 + Math.random() * 0.2; // 0.9 to 1.1
    const newAmount = Math.round(transaction.amount * variationFactor);
    const newSavings = Math.round(transaction.savings * variationFactor);
    
    return {
      ...transaction,
      amount: newAmount,
      savings: newSavings,
      timeStamp: new Date().getTime() - Math.floor(Math.random() * 300000) // Random timestamp within last 5 minutes
    };
  });
};

// Generate initial transactions
const initialTransactions = generateRealTimeTransactions();

// Define the ViewState type with transitionDuration outside the component
type ViewStateType = {
  latitude: number;
  longitude: number;
  zoom: number;
  bearing: number;
  pitch: number;
  transitionDuration?: number;
};

export function GlobalTransactionMap() {
  // Theme context
  const { theme } = useTheme()
  
  // All state hooks must be declared at the top level
  const [mounted, setMounted] = useState(false)
  const [activeTransaction, setActiveTransaction] = useState<Transaction | null>(null)
  const [visibleTransactions, setVisibleTransactions] = useState<Transaction[]>([])
  const [allTransactions, setAllTransactions] = useState<Transaction[]>(initialTransactions)
  const [isRealtime, setIsRealtime] = useState(true)
  const [viewState, setViewState] = useState<ViewStateType>({
    latitude: 20,
    longitude: 0,
    zoom: 1.5,
    bearing: 0,
    pitch: 0
  })
  
  // All refs must be declared after state hooks
  const mapRef = useRef<HTMLDivElement>(null)
  
  // Derived state must be calculated after all hooks
  const isDarkMode = mounted && theme === "dark"
  
  // All useEffect hooks must be declared in the same order on every render
  
  // 1. Hydration mismatch effect
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // 2. Transaction cycling and real-time updates effect - split into multiple effects to avoid dependency loops
  
  // 2a. Initialize transactions on mount
  useEffect(() => {
    if (!mounted) return
    
    // Start with first transaction
    if (allTransactions.length > 0) {
      setVisibleTransactions([allTransactions[0]])
      setActiveTransaction(allTransactions[0])
    }
  }, [mounted, allTransactions.length])
  
  // 2b. Add new transactions periodically
  useEffect(() => {
    if (!mounted) return
    
    // Add a new transaction every 3 seconds
    const transactionInterval = setInterval(() => {
      setVisibleTransactions(prev => {
        if (prev.length >= allTransactions.length) {
          return prev
        }
        return [...prev, allTransactions[prev.length]]
      })
    }, 3000)
    
    return () => clearInterval(transactionInterval)
  }, [mounted, allTransactions.length])
  
  // 2c. Cycle through active transaction
  useEffect(() => {
    if (!mounted) return
    
    const cycleInterval = setInterval(() => {
      setActiveTransaction(prev => {
        if (!prev || allTransactions.length === 0) return allTransactions[0] || null
        
        const currentIndex = allTransactions.findIndex(t => 
          t.source.country === prev.source.country && 
          t.destination.country === prev.destination.country
        )
        
        if (currentIndex === -1 || currentIndex === allTransactions.length - 1) {
          return allTransactions[0]
        }
        
        return allTransactions[currentIndex + 1]
      })
    }, 5000)
    
    return () => clearInterval(cycleInterval)
  }, [mounted, allTransactions])
  
  // 2d. Update with new real-time data
  useEffect(() => {
    if (!mounted || !isRealtime) return
    
    const updateInterval = setInterval(() => {
      const newTransactions = generateRealTimeTransactions()
      setAllTransactions(newTransactions)
    }, 10000)
    
    return () => clearInterval(updateInterval)
  }, [mounted, isRealtime])
  
  // 3. Fly to active transaction effect
  useEffect(() => {
    if (activeTransaction && mounted) {
      // Calculate center point between source and destination
      const sourceLat = activeTransaction.source.coordinates[0];
      const sourceLng = activeTransaction.source.coordinates[1];
      const destLat = activeTransaction.destination.coordinates[0];
      const destLng = activeTransaction.destination.coordinates[1];
      
      const centerLat = (sourceLat + destLat) / 2;
      const centerLng = (sourceLng + destLng) / 2;
      
      // Calculate appropriate zoom level based on distance
      const latDiff = Math.abs(sourceLat - destLat);
      const lngDiff = Math.abs(sourceLng - destLng);
      const maxDiff = Math.max(latDiff, lngDiff);
      
      // Adjust zoom based on distance
      let zoom = 1.5;
      if (maxDiff < 20) zoom = 3;
      else if (maxDiff < 50) zoom = 2.5;
      else if (maxDiff < 100) zoom = 2;
      
      // Update viewState with new coordinates - don't spread the existing viewState to avoid loops
      setViewState({
        latitude: centerLat,
        longitude: centerLng,
        zoom,
        bearing: 0,
        pitch: 0,
        transitionDuration: 2000
      });
    }
  }, [activeTransaction, mounted]) // Remove viewState from dependencies
  
  // Convert lat/long to x/y coordinates in the map container
  const coordinatesToPosition = (lat: number, lng: number): [number, number] => {
    if (!mapRef.current) return [0, 0]
    
    const mapWidth = mapRef.current.clientWidth
    const mapHeight = mapRef.current.clientHeight
    
    // Simple mercator projection
    const x = (lng + 180) * (mapWidth / 360)
    const latRad = lat * Math.PI / 180
    const mercN = Math.log(Math.tan((Math.PI / 4) + (latRad / 2)))
    const y = (mapHeight / 2) - (mapWidth * mercN / (2 * Math.PI))
    
    return [x, y]
  }
  
  // Calculate control points for curved lines
  const getCurvedPath = (startX: number, startY: number, endX: number, endY: number): string => {
    const midX = (startX + endX) / 2
    const midY = (startY + endY) / 2 - Math.abs(endX - startX) / 4
    
    return `M ${startX} ${startY} Q ${midX} ${midY} ${endX} ${endY}`
  }
  
  // Calculate control points for curved lines (moved up from previous position)

  // Set up Mapbox style based on theme
  const mapStyle = isDarkMode 
    ? 'mapbox://styles/mapbox/dark-v11'
    : 'mapbox://styles/mapbox/light-v11';

  // Generate arc data for Mapbox visualization
  const generateArcData = () => {
    if (visibleTransactions.length === 0) {
      // Return empty feature collection if no transactions
      return {
        type: 'FeatureCollection',
        features: []
      };
    }
    
    return {
      type: 'FeatureCollection',
      features: visibleTransactions.map((transaction, index) => {
        // Create a copy of coordinates to avoid mutating the original data
        const sourceLng = transaction.source.coordinates[1];
        const sourceLat = transaction.source.coordinates[0];
        const destLng = transaction.destination.coordinates[1];
        const destLat = transaction.destination.coordinates[0];
        
        // Create curved line between points
        const pointCount = 100;
        const arcFeatures: Array<{
          type: string;
          properties: {
            time: number;
            isActive: boolean;
          };
          geometry: {
            type: string;
            coordinates: [number, number];
          };
        }> = [];
        
        for (let i = 0; i <= pointCount; i++) {
          const t = i / pointCount;
          
          // Create an arc by interpolating between the points
          // with a quadratic curve
          const lng = sourceLng + (destLng - sourceLng) * t;
          const lat = sourceLat + (destLat - sourceLat) * t;
          
          // Add curvature based on distance
          const curveHeight = 0.2;
          const arc = Math.sin(Math.PI * t) * curveHeight;
          
          arcFeatures.push({
            type: 'Feature',
            properties: {
              time: t,
              isActive: transaction === activeTransaction
            },
            geometry: {
              type: 'Point',
              coordinates: [lng, lat + arc]
            }
          });
        }
        
        return {
          type: 'Feature',
          properties: {
            id: index,
            source: transaction.source.country,
            destination: transaction.destination.country,
            amount: transaction.amount,
            currency: transaction.currency,
            savings: transaction.savings,
            isActive: transaction === activeTransaction
          },
          geometry: {
            type: 'LineString',
            coordinates: arcFeatures.map(f => f.geometry.coordinates)
          }
        };
      })
    };
  };

  // Arc layer style for Mapbox
  const arcLayer: any = {
    id: 'transaction-arcs',
    type: 'line',
    paint: {
      'line-color': [
        'case',
        ['boolean', ['get', 'isActive'], false],
        isDarkMode ? '#3b82f6' : '#2563eb',
        isDarkMode ? '#64748b' : '#94a3b8'
      ],
      'line-width': [
        'case',
        ['boolean', ['get', 'isActive'], false],
        3,
        1.5
      ],
      'line-opacity': [
        'case',
        ['boolean', ['get', 'isActive'], false],
        0.8,
        0.5
      ]
    }
  };

  // Define point data type
  type PointData = {
    id: string;
    longitude: number;
    latitude: number;
    isSource: boolean;
    isActive: boolean;
    country: string;
    transaction: Transaction;
  };

  // Generate point data for source and destination markers
  const generatePointData = (): PointData[] => {
    const points: PointData[] = [];
    
    visibleTransactions.forEach(transaction => {
      const isActive = transaction === activeTransaction;
      
      // Add source point
      points.push({
        id: `source-${transaction.source.country}`,
        longitude: transaction.source.coordinates[1],
        latitude: transaction.source.coordinates[0],
        isSource: true,
        isActive,
        country: transaction.source.country,
        transaction
      });
      
      // Add destination point
      points.push({
        id: `dest-${transaction.destination.country}`,
        longitude: transaction.destination.coordinates[1],
        latitude: transaction.destination.coordinates[0],
        isSource: false,
        isActive,
        country: transaction.destination.country,
        transaction
      });
    });
    
    return points;
  };

  // We no longer need this type as we've defined ViewStateType above

  // This useEffect has been moved to the top of the component to maintain hook order

  return (
    <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-slate-200 dark:border-slate-700 transition-all hover:shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Globe className="h-6 w-6 text-blue-500 dark:text-blue-400 mr-2" />
          <h3 className="text-xl font-medium text-slate-900 dark:text-white">
            Global Transaction Map
          </h3>
        </div>
        
        <div className="flex items-center space-x-2">
          <button 
            className={`flex items-center px-3 py-1 rounded-full text-xs font-medium ${isRealtime ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' : 'bg-slate-100 text-slate-600 dark:bg-slate-700 dark:text-slate-400'}`}
            onClick={() => setIsRealtime(!isRealtime)}
          >
            <RefreshCw className={`h-3 w-3 mr-1 ${isRealtime ? 'animate-spin' : ''}`} />
            {isRealtime ? 'Live Data' : 'Paused'}
          </button>
          
          <motion.button
            className="flex items-center p-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setAllTransactions(generateRealTimeTransactions())}
          >
            <RefreshCw className="h-4 w-4" />
          </motion.button>
          
          <motion.button
            className="flex items-center p-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-600"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              // Reset view to global view
              setViewState({
                latitude: 20,
                longitude: 0,
                zoom: 1.5,
                bearing: 0,
                pitch: 0,
                transitionDuration: 1000
              });
            }}
          >
            <Layers className="h-4 w-4" />
          </motion.button>
        </div>
      </div>
      
      <div className="flex items-center justify-between mb-6">
        <p className="text-sm text-slate-600 dark:text-slate-400">
          Watch real-time FusionPay transactions flow across the globe
        </p>
        
        <div className="flex items-center text-xs text-slate-500 dark:text-slate-400">
          <Clock className="h-3 w-3 mr-1" />
          <span>Updated: {new Date().toLocaleTimeString()}</span>
        </div>
      </div>
      
      <div 
        ref={mapRef}
        className="relative w-full h-[400px] bg-slate-100 dark:bg-slate-700 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-600"
      >
        <Map
          {...viewState}
          onMove={(evt) => setViewState(evt.viewState)}
          mapStyle={mapStyle}
          mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
          attributionControl={false}
          interactive={true}
          dragRotate={true}
          scrollZoom={true}
          doubleClickZoom={true}
          style={{ width: '100%', height: '100%' }}
        >
          <NavigationControl position="top-right" showCompass={false} />
          
          {/* Transaction arcs */}
          <Source id="transactions" type="geojson" data={generateArcData() as any}>
            <Layer {...arcLayer} />
          </Source>
          
          {/* Transaction points */}
          {generatePointData().map(point => (
            <Marker
              key={point.id}
              longitude={point.longitude}
              latitude={point.latitude}
              anchor="center"
            >
              <motion.div
                className={`rounded-full ${point.isSource 
                  ? (point.isActive ? 'bg-blue-500 dark:bg-blue-400' : 'bg-slate-400 dark:bg-slate-500') 
                  : (point.isActive ? 'bg-green-500 dark:bg-green-400' : 'bg-slate-400 dark:bg-slate-500')}`}
                style={{ 
                  width: point.isActive ? (point.isSource ? 12 : 16) : (point.isSource ? 8 : 10),
                  height: point.isActive ? (point.isSource ? 12 : 16) : (point.isSource ? 8 : 10),
                }}
                animate={point.isActive && !point.isSource ? {
                  scale: [1, 1.2, 1]
                } : {}}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatDelay: 0.5
                }}
                onClick={() => setActiveTransaction(point.transaction)}
              />
            </Marker>
          ))}
        </Map>
        
        {/* Active transaction info */}
        {activeTransaction && (
          <motion.div
            className="absolute bottom-4 right-4 bg-white dark:bg-slate-900 rounded-lg shadow-lg p-4 max-w-[280px] border border-slate-200 dark:border-slate-700"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            key={`${activeTransaction.source.country}-${activeTransaction.destination.country}`}
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center text-sm font-medium text-slate-900 dark:text-white">
                <span>{activeTransaction.source.country}</span>
                <ArrowRight className="h-3 w-3 mx-1" />
                <span>{activeTransaction.destination.country}</span>
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">
                {new Date(activeTransaction.timeStamp).toLocaleTimeString()}
              </div>
            </div>
            
            <div className="bg-slate-50 dark:bg-slate-800 rounded-md p-2 mb-2">
              <div className="flex justify-between items-center mb-1">
                <span className="text-xs text-slate-600 dark:text-slate-400">Transfer Amount:</span>
                <span className="text-sm font-medium text-slate-900 dark:text-white">
                  {activeTransaction.currency} {activeTransaction.amount.toLocaleString()}
                </span>
              </div>
              
              <div className="h-1.5 w-full bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-blue-500 dark:bg-blue-600 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: '100%' }}
                  transition={{ duration: 1.5 }}
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="bg-green-50 dark:bg-green-900/20 rounded-md p-2">
                <div className="text-slate-600 dark:text-slate-400 mb-1">Savings</div>
                <div className="font-medium text-green-600 dark:text-green-400 text-sm">
                  {activeTransaction.currency} {activeTransaction.savings.toLocaleString()}
                </div>
                <div className="text-green-600 dark:text-green-500 text-[10px] mt-1">
                  {Math.round((activeTransaction.savings / activeTransaction.amount) * 100)}% less fees
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-md p-2">
                <div className="text-slate-600 dark:text-slate-400 mb-1">Time Saved</div>
                <div className="font-medium text-blue-600 dark:text-blue-400 text-sm">3-5 days</div>
                <div className="text-blue-600 dark:text-blue-500 text-[10px] mt-1">
                  1,440x faster transfer
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {/* Transaction Statistics */}
        <motion.div
          className="absolute top-4 left-4 bg-white/90 dark:bg-slate-900/90 backdrop-blur-sm rounded-lg shadow-lg p-3 max-w-[200px] border border-slate-200 dark:border-slate-700"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3, delay: 0.5 }}
        >
          <h4 className="text-xs font-medium text-slate-900 dark:text-white mb-2 flex items-center">
            <PieChart className="h-3 w-3 mr-1 text-blue-500" />
            Global Statistics
          </h4>
          
          <div className="space-y-2 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Active Users:</span>
              <motion.span 
                className="font-medium text-slate-900 dark:text-white"
                animate={{ opacity: [1, 0.7, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {(Math.floor(Math.random() * 1000) + 9000).toLocaleString()}
              </motion.span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Daily Transfers:</span>
              <span className="font-medium text-slate-900 dark:text-white">
                {(Math.floor(Math.random() * 5000) + 10000).toLocaleString()}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Avg. Savings:</span>
              <span className="font-medium text-green-600 dark:text-green-400">4.2%</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-slate-600 dark:text-slate-400">Countries:</span>
              <span className="font-medium text-slate-900 dark:text-white">180+</span>
            </div>
          </div>
        </motion.div>
        
        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white/80 dark:bg-slate-900/80 rounded-md p-2 text-xs">
          <div className="flex items-center mb-1">
            <div className="w-3 h-3 rounded-full bg-blue-500 dark:bg-blue-400 mr-2"></div>
            <span className="text-slate-700 dark:text-slate-300">Sender</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-green-500 dark:bg-green-400 mr-2"></div>
            <span className="text-slate-700 dark:text-slate-300">Recipient</span>
          </div>
        </div>
        
        <div className="absolute top-4 right-4 flex items-center bg-white/80 dark:bg-slate-900/80 rounded-md p-2 text-xs">
          <Info className="h-3 w-3 mr-1 text-slate-500 dark:text-slate-400" />
          <span className="text-slate-700 dark:text-slate-300">Live transactions</span>
        </div>
      </div>
      
      <div className="mt-4 text-center">
        <p className="text-sm text-blue-600 dark:text-blue-400 font-medium">
          FusionPay processes over 10,000 cross-border transactions daily
        </p>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
          Saving users an average of 4.2% in fees and 3-5 days in transfer time
        </p>
      </div>
    </div>
  )
}
