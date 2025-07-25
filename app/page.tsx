"use client"

import { useState } from "react"
import ImageUpload from "@/components/image-upload"
import ColorPalette from "@/components/color-palette"
import Recommendations from "@/components/recommendations"
import EducationalSection from "@/components/educational-section"
import Header from "@/components/header"
import Footer from "@/components/footer"
import Confetti from "@/components/confetti"
import type { ColorAnalysis } from "@/lib/types"

export type ColorSeason = "Spring" | "Summer" | "Autumn" | "Winter" | null

export default function Home() {
  const [currentSeason, setCurrentSeason] = useState<ColorSeason>(null)
  const [analysisComplete, setAnalysisComplete] = useState(false)
  const [activeSection, setActiveSection] = useState<"upload" | "results" | "education">("upload")
  const [showConfetti, setShowConfetti] = useState(false)
  const [userProgress, setUserProgress] = useState(0)
  const [fullAnalysis, setFullAnalysis] = useState<ColorAnalysis | null>(null)

  const handleAnalysisComplete = (season: ColorSeason, analysis?: ColorAnalysis) => {
    setCurrentSeason(season)
    setFullAnalysis(analysis || null)
    setAnalysisComplete(true)
    setActiveSection("results")
    setShowConfetti(true)
    setUserProgress(100)

    // Hide confetti after 3 seconds
    setTimeout(() => setShowConfetti(false), 3000)
  }

  const resetAnalysis = () => {
    setCurrentSeason(null)
    setFullAnalysis(null)
    setAnalysisComplete(false)
    setActiveSection("upload")
    setUserProgress(0)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-purple-200 to-pink-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-blue-200 to-purple-200 rounded-full opacity-20 animate-pulse delay-1000"></div>
      </div>

      {showConfetti && <Confetti />}

      <Header activeSection={activeSection} setActiveSection={setActiveSection} analysisComplete={analysisComplete} />

      <main className="container mx-auto px-4 py-8 relative z-10">
        {activeSection === "upload" && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-6xl font-bold bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 bg-clip-text text-transparent mb-6 animate-gradient">
                Discover Your Perfect Colors
              </h1>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                Upload your photo and let our AI analyze your natural features to find your most flattering color
                palette ✨
              </p>

              {/* Progress indicator */}
              {userProgress > 0 && (
                <div className="mt-8 max-w-md mx-auto">
                  <div className="bg-white rounded-full p-1 shadow-lg">
                    <div
                      className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-1000 ease-out"
                      style={{ width: `${userProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">Analysis Progress: {userProgress}%</p>
                </div>
              )}
            </div>
            <ImageUpload onAnalysisComplete={handleAnalysisComplete} setProgress={setUserProgress} />
          </div>
        )}

        {activeSection === "results" && analysisComplete && currentSeason && (
          <div className="max-w-6xl mx-auto space-y-12 animate-slide-up">
            <div className="text-center">
              <button
                onClick={resetAnalysis}
                className="mb-6 px-6 py-3 text-purple-600 hover:text-purple-800 font-medium bg-white rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                ← Try Another Photo
              </button>
            </div>
            
            {/* Display AI analysis explanation if available */}
            {fullAnalysis?.explanation && (
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-8 border border-purple-200">
                <h3 className="text-2xl font-bold text-purple-800 mb-4">Your Color Analysis</h3>
                <p className="text-gray-700 text-lg leading-relaxed">{fullAnalysis.explanation}</p>
              </div>
            )}
            
            <ColorPalette season={currentSeason} customPalette={fullAnalysis?.palette} />
            <Recommendations season={currentSeason} customRecommendations={fullAnalysis?.recommendations} />
          </div>
        )}

        {activeSection === "education" && <EducationalSection />}
      </main>

      <Footer />
    </div>
  )
}
