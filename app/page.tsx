'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

// Italian Brainrot Characters
const BRAINROT_CHARACTERS = [
  { name: 'Bombardiro Coccodrillo', emoji: '🐊💣', catchphrase: 'BOMBARDINO!', color: '#ff6b6b' },
  { name: 'Tralalero Tralala', emoji: '🎵🕺', catchphrase: 'TRA LA LA LERO!', color: '#4ecdc4' },
  { name: 'Lirili Larila', emoji: '🎶✨', catchphrase: 'LIRILI LARILAAAA!', color: '#ffe66d' },
  { name: 'Tung Tung Tung Sahur', emoji: '🥁🌙', catchphrase: 'TUNG TUNG TUNG!', color: '#95e1d3' },
  { name: 'Bombombini Gusini', emoji: '🦆💥', catchphrase: 'BOMBOMBINI!', color: '#f38181' },
  { name: 'Cappuccino Assassino', emoji: '☕🔪', catchphrase: 'ASSASSINO!', color: '#aa96da' },
  { name: 'Brr Brr Patapim', emoji: '❄️👋', catchphrase: 'PATAPIM PATAPAM!', color: '#a8e6cf' },
  { name: 'Chimpanzini Bananini', emoji: '🐵🍌', catchphrase: 'BANANINI!', color: '#ffd93d' },
  { name: 'Spaghettini Macaronini', emoji: '🍝🤌', catchphrase: 'MAMA MIA!', color: '#ff9a76' },
  { name: 'Pizzarello Mozzarello', emoji: '🍕🧀', catchphrase: 'MOZZARELLO!', color: '#f5cac3' },
  { name: 'Gelato Tremendo', emoji: '🍦😱', catchphrase: 'TREMENDOOO!', color: '#dcedc1' },
  { name: 'Espressino Violentino', emoji: '☕💪', catchphrase: 'VIOLENTINO!', color: '#6c5b7b' },
]

// Italian phrases for subtitles
const ITALIAN_PHRASES = [
  'Mamma mia che disastro! 🤌',
  'Porco dio! È incredibile!',
  'Che casino tremendo!',
  'Madonna santa!',
  'Porca miseria!',
  'Che schifo magnifico!',
  'Bellissimo caos!',
  'Fantastico assurdo!',
  'Incredibile follia!',
  'Pazzesco totale!',
  'Minchia che roba!',
  'Dio cane pazzo!',
]

// Background patterns
const BACKGROUNDS = [
  'linear-gradient(45deg, #009246 25%, #ffffff 25%, #ffffff 50%, #ce2b37 50%, #ce2b37 75%, #009246 75%)',
  'radial-gradient(circle, #ff6b6b, #4ecdc4, #ffe66d)',
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  'linear-gradient(to right, #fc5c7d, #6a82fb)',
  'linear-gradient(to right, #00c6ff, #0072ff)',
  'conic-gradient(from 0deg, #009246, #ffffff, #ce2b37, #009246)',
]

// Sound effects simulation
const SOUNDS = ['💥 BOOM', '🎵 DING', '🔔 BOING', '💫 WOOSH', '🎺 HONK', '🥁 DRUM']

export default function ItalianBrainrotGenerator() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [currentScene, setCurrentScene] = useState(0)
  const [selectedCharacters, setSelectedCharacters] = useState<typeof BRAINROT_CHARACTERS>([])
  const [generatedScript, setGeneratedScript] = useState<string[]>([])
  const [currentText, setCurrentText] = useState('')
  const [currentEmoji, setCurrentEmoji] = useState('')
  const [currentSound, setCurrentSound] = useState('')
  const [videoProgress, setVideoProgress] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [background, setBackground] = useState(BACKGROUNDS[0])
  const [effect, setEffect] = useState('')
  const [intensity, setIntensity] = useState(5)
  const [duration, setDuration] = useState(15)
  const [generationHistory, setGenerationHistory] = useState<string[]>([])
  const videoRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  // Generate random brainrot script
  const generateScript = useCallback(() => {
    const chars = [...BRAINROT_CHARACTERS].sort(() => Math.random() - 0.5).slice(0, 3 + Math.floor(Math.random() * 3))
    setSelectedCharacters(chars)
    
    const script: string[] = []
    chars.forEach((char, index) => {
      script.push(`${char.emoji} ${char.name} appears!`)
      script.push(`"${char.catchphrase}"`)
      if (index < chars.length - 1) {
        script.push(ITALIAN_PHRASES[Math.floor(Math.random() * ITALIAN_PHRASES.length)])
      }
    })
    script.push('🎬 FINE! 🇮🇹')
    setGeneratedScript(script)
    return { chars, script }
  }, [])

  // Simulate video generation
  const startGeneration = useCallback(() => {
    setIsGenerating(true)
    setVideoProgress(0)
    setCurrentScene(0)
    const { chars, script } = generateScript()
    
    let progress = 0
    let sceneIndex = 0
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    
    intervalRef.current = setInterval(() => {
      progress += 2
      setVideoProgress(progress)
      
      if (progress % 15 === 0 && sceneIndex < script.length) {
        setCurrentScene(sceneIndex)
        setCurrentText(script[sceneIndex])
        setCurrentEmoji(chars[sceneIndex % chars.length]?.emoji || '🇮🇹')
        setCurrentSound(SOUNDS[Math.floor(Math.random() * SOUNDS.length)])
        setBackground(BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)])
        setEffect(['shake', 'flash', 'animate-wiggle', 'animate-glitch'][Math.floor(Math.random() * 4)])
        sceneIndex++
      }
      
      if (progress >= 100) {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
        setIsGenerating(false)
        setGenerationHistory(prev => [...prev, `Video ${prev.length + 1}: ${chars.map(c => c.name).join(' vs ')}`])
      }
    }, duration * 10)
  }, [duration, generateScript])

  // Play generated video
  const playVideo = useCallback(() => {
    if (generatedScript.length === 0) return
    
    setIsPlaying(true)
    setCurrentScene(0)
    let sceneIndex = 0
    
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    
    intervalRef.current = setInterval(() => {
      if (sceneIndex < generatedScript.length) {
        setCurrentScene(sceneIndex)
        setCurrentText(generatedScript[sceneIndex])
        setCurrentEmoji(selectedCharacters[sceneIndex % selectedCharacters.length]?.emoji || '🇮🇹')
        setCurrentSound(SOUNDS[Math.floor(Math.random() * SOUNDS.length)])
        setBackground(BACKGROUNDS[Math.floor(Math.random() * BACKGROUNDS.length)])
        setEffect(['shake', 'flash', 'animate-wiggle', 'animate-glitch'][Math.floor(Math.random() * 4)])
        sceneIndex++
      } else {
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
        setIsPlaying(false)
      }
    }, (duration / generatedScript.length) * 1000)
  }, [generatedScript, selectedCharacters, duration])

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white">
      {/* Header */}
      <header className="italian-gradient p-1">
        <div className="bg-gray-900 p-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between">
            <motion.h1 
              className="text-2xl md:text-4xl font-bold brainrot-text neon-text"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              🇮🇹 Italian Brainrot Generator 🧠
            </motion.h1>
            <div className="flex gap-2 text-2xl">
              <span className="animate-bounce">🤌</span>
              <span className="animate-spin-slow">🍕</span>
              <span className="animate-pulse">☕</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-4 md:p-8">
        <div className="grid md:grid-cols-2 gap-8">
          {/* Video Preview Panel */}
          <div className="space-y-4">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span className="animate-pulse">📺</span> Video Preview
            </h2>
            
            <div 
              ref={videoRef}
              className="video-container w-full max-w-sm mx-auto shadow-2xl shadow-purple-500/30"
              style={{ background }}
            >
              {/* Video Content */}
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                <AnimatePresence mode="wait">
                  {(isGenerating || isPlaying) && (
                    <motion.div
                      key={currentScene}
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      exit={{ scale: 0, rotate: 180 }}
                      className={`text-center ${effect}`}
                    >
                      <motion.div 
                        className="text-6xl md:text-8xl mb-4"
                        animate={{ 
                          scale: [1, 1.5, 1],
                          rotate: [0, 10, -10, 0]
                        }}
                        transition={{ repeat: Infinity, duration: 0.5 }}
                      >
                        {currentEmoji}
                      </motion.div>
                      <motion.p 
                        className="text-xl md:text-2xl font-bold brainrot-text text-outline text-white"
                        animate={{ y: [0, -10, 0] }}
                        transition={{ repeat: Infinity, duration: 0.3 }}
                      >
                        {currentText}
                      </motion.p>
                      <motion.div 
                        className="mt-4 text-lg font-bold text-yellow-300"
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{ repeat: Infinity, duration: 0.5 }}
                      >
                        {currentSound}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {!isGenerating && !isPlaying && generatedScript.length === 0 && (
                  <div className="text-center">
                    <div className="text-6xl mb-4">🎬</div>
                    <p className="text-lg opacity-80">Click Generate to create brainrot!</p>
                  </div>
                )}

                {!isGenerating && !isPlaying && generatedScript.length > 0 && (
                  <div className="text-center">
                    <div className="text-6xl mb-4">✅</div>
                    <p className="text-lg font-bold">Video Ready!</p>
                    <p className="text-sm opacity-80">Click Play to watch</p>
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              {isGenerating && (
                <div className="absolute bottom-0 left-0 right-0 h-2 bg-black/50">
                  <motion.div 
                    className="h-full bg-gradient-to-r from-green-500 via-white to-red-500"
                    style={{ width: `${videoProgress}%` }}
                  />
                </div>
              )}

              {/* Italian Flag Overlay */}
              <div className="absolute top-2 right-2 flex gap-1">
                <div className="w-4 h-6 bg-green-600 rounded-l" />
                <div className="w-4 h-6 bg-white" />
                <div className="w-4 h-6 bg-red-600 rounded-r" />
              </div>
            </div>

            {/* Video Controls */}
            <div className="flex justify-center gap-4">
              <motion.button
                onClick={startGeneration}
                disabled={isGenerating || isPlaying}
                className="px-6 py-3 bg-gradient-to-r from-green-500 to-green-700 rounded-lg font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isGenerating ? '⏳ Generating...' : '🎬 Generate'}
              </motion.button>
              
              <motion.button
                onClick={playVideo}
                disabled={isGenerating || isPlaying || generatedScript.length === 0}
                className="px-6 py-3 bg-gradient-to-r from-red-500 to-red-700 rounded-lg font-bold text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                {isPlaying ? '▶️ Playing...' : '▶️ Play'}
              </motion.button>
            </div>
          </div>

          {/* Control Panel */}
          <div className="space-y-6">
            <h2 className="text-xl font-bold flex items-center gap-2">
              <span>⚙️</span> Brainrot Settings
            </h2>

            {/* Intensity Slider */}
            <div className="bg-gray-800/50 rounded-xl p-4 backdrop-blur">
              <label className="block text-sm font-medium mb-2">
                🔥 Brainrot Intensity: {intensity}
              </label>
              <input
                type="range"
                min="1"
                max="10"
                value={intensity}
                onChange={(e) => setIntensity(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-red-500"
              />
              <div className="flex justify-between text-xs mt-1 opacity-60">
                <span>Mild 🙂</span>
                <span>MAXIMUM BRAINROT 🤯</span>
              </div>
            </div>

            {/* Duration Slider */}
            <div className="bg-gray-800/50 rounded-xl p-4 backdrop-blur">
              <label className="block text-sm font-medium mb-2">
                ⏱️ Video Duration: {duration}s
              </label>
              <input
                type="range"
                min="5"
                max="60"
                value={duration}
                onChange={(e) => setDuration(Number(e.target.value))}
                className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
              />
            </div>

            {/* Character Selection */}
            <div className="bg-gray-800/50 rounded-xl p-4 backdrop-blur">
              <h3 className="font-bold mb-3">🎭 Brainrot Characters</h3>
              <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                {BRAINROT_CHARACTERS.map((char, index) => (
                  <motion.div
                    key={index}
                    className="p-2 rounded-lg text-sm cursor-pointer transition-all"
                    style={{ 
                      backgroundColor: selectedCharacters.includes(char) ? char.color + '40' : 'rgba(0,0,0,0.3)',
                      borderLeft: `4px solid ${char.color}`
                    }}
                    whileHover={{ scale: 1.02, x: 5 }}
                  >
                    <span className="mr-1">{char.emoji}</span>
                    <span className="font-medium">{char.name}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Generated Script */}
            {generatedScript.length > 0 && (
              <div className="bg-gray-800/50 rounded-xl p-4 backdrop-blur">
                <h3 className="font-bold mb-3">📝 Generated Script</h3>
                <div className="space-y-2 max-h-40 overflow-y-auto text-sm">
                  {generatedScript.map((line, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`p-2 rounded ${currentScene === index && (isGenerating || isPlaying) ? 'bg-yellow-500/30' : 'bg-black/20'}`}
                    >
                      {line}
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Features Section */}
        <section className="mt-12 grid md:grid-cols-3 gap-6">
          <motion.div 
            className="bg-gradient-to-br from-green-600/20 to-green-800/20 rounded-xl p-6 border border-green-500/30"
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="text-4xl mb-4">🤖</div>
            <h3 className="text-xl font-bold mb-2">AI Generated</h3>
            <p className="text-gray-400">Automatic script generation with authentic Italian brainrot characters and phrases.</p>
          </motion.div>

          <motion.div 
            className="bg-gradient-to-br from-white/10 to-white/5 rounded-xl p-6 border border-white/20"
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="text-4xl mb-4">🎬</div>
            <h3 className="text-xl font-bold mb-2">Video Export</h3>
            <p className="text-gray-400">Generate shareable video content perfect for YouTube Shorts and TikTok.</p>
          </motion.div>

          <motion.div 
            className="bg-gradient-to-br from-red-600/20 to-red-800/20 rounded-xl p-6 border border-red-500/30"
            whileHover={{ scale: 1.02, y: -5 }}
          >
            <div className="text-4xl mb-4">🇮🇹</div>
            <h3 className="text-xl font-bold mb-2">100% Italian</h3>
            <p className="text-gray-400">Authentic Italian brainrot memes with classic characters and catchphrases!</p>
          </motion.div>
        </section>

        {/* Character Gallery */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-center brainrot-text">
            🎭 Meet the Brainrot Cast 🎭
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {BRAINROT_CHARACTERS.map((char, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/50 rounded-xl p-4 text-center backdrop-blur"
                style={{ borderBottom: `4px solid ${char.color}` }}
                whileHover={{ 
                  scale: 1.1, 
                  rotate: [0, -5, 5, 0],
                  transition: { rotate: { repeat: Infinity, duration: 0.3 } }
                }}
              >
                <div className="text-4xl mb-2">{char.emoji}</div>
                <div className="font-bold text-sm">{char.name}</div>
                <div className="text-xs text-gray-400 mt-1">&quot;{char.catchphrase}&quot;</div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Generation History */}
        {generationHistory.length > 0 && (
          <section className="mt-12">
            <h2 className="text-xl font-bold mb-4">📜 Generation History</h2>
            <div className="bg-gray-800/50 rounded-xl p-4 backdrop-blur">
              <div className="space-y-2">
                {generationHistory.map((item, index) => (
                  <div key={index} className="flex items-center gap-2 text-sm">
                    <span className="text-green-500">✓</span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="mt-12 italian-gradient p-1">
        <div className="bg-gray-900 p-6 text-center">
          <p className="text-gray-400">
            Made with 🤌 and maximum brainrot energy
          </p>
          <p className="text-sm text-gray-500 mt-2">
            BOMBARDIRO COCCODRILLO • TRA LA LA LERO • LIRILI LARILA
          </p>
        </div>
      </footer>
    </div>
  )
}
