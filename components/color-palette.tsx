"use client"

import { useState } from "react"
import { Sparkles, Copy, Heart, Share2 } from "lucide-react"
import type { ColorSeason } from "@/app/page"
import type { ColorPaletteItem } from "@/lib/types"

interface ColorPaletteProps {
  season: ColorSeason
  customPalette?: ColorPaletteItem[]
}

const seasonData = {
  Spring: {
    description: "Bright, warm, and light colors that complement your vibrant natural features",
    characteristics: ["Warm undertones", "Light to medium depth", "Clear and bright colors"],
    emoji: "🌸",
    gradient: "from-yellow-400 to-pink-400",
    colors: [
      { name: "Coral", hex: "#FF7F50" },
      { name: "Golden Yellow", hex: "#FFC107" },
      { name: "Mint Green", hex: "#98FF98" },
      { name: "Peach", hex: "#FFCBA4" },
      { name: "Turquoise", hex: "#40E0D0" },
      { name: "Warm Pink", hex: "#FF69B4" },
      { name: "Light Orange", hex: "#FFB347" },
      { name: "Apple Green", hex: "#8DB600" },
    ],
  },
  Summer: {
    description: "Soft, cool, and light colors that enhance your gentle natural beauty",
    characteristics: ["Cool undertones", "Light to medium depth", "Soft and muted colors"],
    emoji: "🌊",
    gradient: "from-blue-400 to-purple-400",
    colors: [
      { name: "Pastel Pink", hex: "#FFB6C1" },
      { name: "Sky Blue", hex: "#87CEEB" },
      { name: "Lavender", hex: "#E6E6FA" },
      { name: "Soft Yellow", hex: "#FFFFE0" },
      { name: "Rose", hex: "#FF66CC" },
      { name: "Powder Blue", hex: "#B0E0E6" },
      { name: "Mauve", hex: "#E0B0FF" },
      { name: "Seafoam", hex: "#93E9BE" },
    ],
  },
  Autumn: {
    description: "Muted, warm, and rich colors that complement your earthy natural tones",
    characteristics: ["Warm undertones", "Medium to deep depth", "Rich and muted colors"],
    emoji: "🍂",
    gradient: "from-orange-400 to-red-400",
    colors: [
      { name: "Olive Green", hex: "#808000" },
      { name: "Terracotta", hex: "#E2725B" },
      { name: "Burnt Orange", hex: "#CC5500" },
      { name: "Golden Brown", hex: "#996515" },
      { name: "Rust", hex: "#B7410E" },
      { name: "Forest Green", hex: "#355E3B" },
      { name: "Burgundy", hex: "#800020" },
      { name: "Mustard", hex: "#FFDB58" },
    ],
  },
  Winter: {
    description: "Bold, cool, and dramatic colors that match your striking natural contrast",
    characteristics: ["Cool undertones", "High contrast", "Bold and clear colors"],
    emoji: "❄️",
    gradient: "from-blue-600 to-purple-600",
    colors: [
      { name: "Navy Blue", hex: "#000080" },
      { name: "Emerald Green", hex: "#50C878" },
      { name: "True Red", hex: "#FF0000" },
      { name: "Royal Purple", hex: "#7851A9" },
      { name: "Black", hex: "#000000" },
      { name: "Pure White", hex: "#FFFFFF" },
      { name: "Hot Pink", hex: "#FF1493" },
      { name: "Icy Blue", hex: "#99CCFF" },
    ],
  },
}

export default function ColorPalette({ season, customPalette }: ColorPaletteProps) {
  const [selectedColor, setSelectedColor] = useState<string | null>(null)
  const [copiedColor, setCopiedColor] = useState<string | null>(null)
  const [likedColors, setLikedColors] = useState<Set<string>>(new Set())

  if (!season) return null

  const data = seasonData[season]
  const colors = customPalette || data.colors

  const copyToClipboard = (hex: string) => {
    navigator.clipboard.writeText(hex)
    setCopiedColor(hex)
    setTimeout(() => setCopiedColor(null), 2000)
  }

  const toggleLike = (hex: string) => {
    const newLiked = new Set(likedColors)
    if (newLiked.has(hex)) {
      newLiked.delete(hex)
    } else {
      newLiked.add(hex)
    }
    setLikedColors(newLiked)
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-all duration-500 animate-slide-up">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-6">
          <div className="text-6xl mr-4 animate-bounce">{data.emoji}</div>
          <div>
            <h2
              className={`text-5xl font-bold bg-gradient-to-r ${data.gradient} bg-clip-text text-transparent animate-gradient`}
            >
              You are a {season}!
            </h2>
            <div className="flex items-center justify-center mt-2">
              <Sparkles className="w-6 h-6 text-yellow-500 mr-2 animate-pulse" />
              <span className="text-lg text-gray-600">
                {customPalette ? "AI-curated palette just for you" : "Your perfect color palette awaits"}
              </span>
            </div>
          </div>
        </div>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">{data.description}</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12 mb-8">
        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center">
            <div className="w-3 h-3 bg-purple-500 rounded-full mr-3 animate-pulse"></div>
            Your Characteristics
          </h3>
          <div className="space-y-4">
            {data.characteristics.map((char, index) => (
              <div
                key={index}
                className="flex items-center p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl transform hover:scale-105 transition-all duration-300"
              >
                <div className="w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full mr-4 animate-pulse"></div>
                <span className="text-gray-700 font-medium">{char}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <h3 className="text-2xl font-bold text-gray-800 flex items-center">
            <div className="w-3 h-3 bg-pink-500 rounded-full mr-3 animate-pulse"></div>
            {customPalette ? "Your AI-Curated Colors" : "Your Color Palette"}
          </h3>
          <div className="grid grid-cols-4 gap-4">
            {colors.map((color, index) => (
              <div
                key={index}
                className="group relative aspect-square rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer transform hover:scale-110 hover:rotate-3"
                style={{ backgroundColor: color.hex }}
                onClick={() => setSelectedColor(selectedColor === color.hex ? null : color.hex)}
              >
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all rounded-2xl flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-white text-center">
                    <div className="font-bold text-sm">{color.name}</div>
                    <div className="text-xs opacity-90">{color.hex}</div>
                  </div>
                </div>

                {/* Action buttons */}
                <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity flex space-x-1">
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      copyToClipboard(color.hex)
                    }}
                    className="w-6 h-6 bg-white bg-opacity-80 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all"
                  >
                    <Copy className="w-3 h-3 text-gray-700" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleLike(color.hex)
                    }}
                    className="w-6 h-6 bg-white bg-opacity-80 rounded-full flex items-center justify-center hover:bg-opacity-100 transition-all"
                  >
                    <Heart
                      className={`w-3 h-3 ${likedColors.has(color.hex) ? "text-red-500 fill-current" : "text-gray-700"}`}
                    />
                  </button>
                </div>

                {copiedColor === color.hex && (
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded animate-bounce">
                    Copied!
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {selectedColor && (
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6 animate-fade-in">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Selected Color</h3>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full shadow-lg" style={{ backgroundColor: selectedColor }}></div>
                <div>
                  <div className="font-semibold text-gray-800">
                    {colors.find((c) => c.hex === selectedColor)?.name}
                  </div>
                  <div className="text-gray-600">{selectedColor}</div>
                </div>
              </div>
            </div>
            <button
              onClick={() => copyToClipboard(selectedColor)}
              className="px-4 py-2 bg-white rounded-lg shadow hover:shadow-lg transition-all flex items-center space-x-2"
            >
              <Copy className="w-4 h-4" />
              <span>Copy</span>
            </button>
          </div>
        </div>
      )}

      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6 mt-8">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold text-gray-800 mb-2 flex items-center">
              <Sparkles className="w-5 h-5 mr-2 text-yellow-500" />
              How to Use Your Colors
            </h3>
            <p className="text-gray-600">
              {customPalette 
                ? "These AI-selected colors are specifically tailored to complement your unique features. Use them for clothing, makeup, and accessories to enhance your natural beauty!"
                : "These colors will make you look more vibrant and confident. Use them for clothing, makeup, and accessories. You can still wear other colors, but these will be your most flattering choices!"
              }
            </p>
          </div>
          <button className="px-6 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all transform hover:scale-105 flex items-center space-x-2">
            <Share2 className="w-4 h-4" />
            <span>Share</span>
          </button>
        </div>
      </div>
    </div>
  )
}
