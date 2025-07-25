"use client"

import type React from "react"
import { useState, useRef } from "react"
import { Upload, Camera, CheckCircle, Sparkles, Zap, AlertCircle } from "lucide-react"
import type { ColorSeason } from "@/app/page"
import type { ColorAnalysis } from "@/lib/types"

interface ImageUploadProps {
  onAnalysisComplete: (season: ColorSeason, fullAnalysis?: ColorAnalysis) => void
  setProgress: (progress: number) => void
}

export default function ImageUpload({ onAnalysisComplete, setProgress }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false)
  const [uploadedImage, setUploadedImage] = useState<string | null>(null)
  const [analyzing, setAnalyzing] = useState(false)
  const [analysisStep, setAnalysisStep] = useState("")
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const seasons: ColorSeason[] = ["Spring", "Summer", "Autumn", "Winter"]
  const analysisSteps = [
    "Detecting facial features...",
    "Analyzing skin undertones...",
    "Examining hair color...",
    "Assessing eye color...",
    "Determining your season...",
    "Generating your palette...",
  ]

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0])
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0])
    }
  }

  const handleFile = (file: File) => {
    if (file.type.startsWith("image/")) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string)
        setProgress(25)
        setError(null)
      }
      reader.readAsDataURL(file)
    }
  }

  const analyzeImage = async () => {
    if (!uploadedImage) return

    setAnalyzing(true)
    setProgress(30)
    setError(null)

    try {
      // Simulate analysis steps for UI feedback
      for (let i = 0; i < analysisSteps.length; i++) {
        setAnalysisStep(analysisSteps[i])
        setProgress(30 + (i + 1) * 10)
        await new Promise((resolve) => setTimeout(resolve, 800))
      }

      // Convert data URL to base64 and extract mime type
      const base64Data = uploadedImage.split(',')[1]
      const mimeType = uploadedImage.split(',')[0].split(':')[1].split(';')[0]

      // Call the Gemini API
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          base64ImageData: base64Data,
          mimeType: mimeType,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Analysis failed')
      }

      setAnalyzing(false)
      setProgress(100)
      
      // Pass the full analysis data along with the season
      onAnalysisComplete(result.season as ColorSeason, result as ColorAnalysis)
      
    } catch (error) {
      console.error('Analysis error:', error)
      setAnalyzing(false)
      setError(error instanceof Error ? error.message : 'Analysis failed. Please try again.')
      setProgress(0)
    }
  }

  const onButtonClick = () => {
    fileInputRef.current?.click()
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Enhanced Upload Guidelines */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-2xl p-6 mb-8 transform hover:scale-105 transition-all duration-300">
        <h3 className="text-lg font-semibold text-blue-800 mb-3 flex items-center">
          <Camera className="w-5 h-5 mr-2 animate-bounce" />
          Photo Guidelines for Best Results ✨
        </h3>
        <div className="grid md:grid-cols-2 gap-4">
          <ul className="text-blue-700 space-y-2">
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              Take a selfie in natural daylight
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              Face the camera directly
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              Avoid heavy makeup or filters
            </li>
          </ul>
          <ul className="text-blue-700 space-y-2">
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              Ensure your face is clearly visible
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              Remove sunglasses or hats
            </li>
            <li className="flex items-center">
              <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
              Good lighting is essential
            </li>
          </ul>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-2xl animate-fade-in">
          <div className="flex items-center text-red-800">
            <AlertCircle className="w-5 h-5 mr-2" />
            <span className="font-medium">Analysis Error</span>
          </div>
          <p className="text-red-700 mt-1">{error}</p>
        </div>
      )}

      {/* Enhanced Upload Area */}
      <div
        className={`relative border-2 border-dashed rounded-2xl p-8 text-center transition-all duration-300 transform ${
          dragActive
            ? "border-purple-400 bg-purple-50 scale-105 shadow-lg"
            : uploadedImage
              ? "border-green-400 bg-green-50 shadow-lg"
              : "border-gray-300 bg-white hover:border-purple-400 hover:bg-purple-50 hover:scale-105 hover:shadow-lg"
        }`}
        onDragEnter={handleDrag}
        onDragLeave={handleDrag}
        onDragOver={handleDrag}
        onDrop={handleDrop}
      >
        <input ref={fileInputRef} type="file" accept="image/*" onChange={handleChange} className="hidden" />

        {uploadedImage ? (
          <div className="space-y-6 animate-fade-in">
            <div className="relative">
              <img
                src={uploadedImage || "/placeholder.svg"}
                alt="Uploaded selfie"
                className="w-48 h-48 object-cover rounded-full mx-auto border-4 border-white shadow-xl transform hover:scale-110 transition-transform duration-300"
              />
              <div className="absolute -top-2 -right-2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center animate-bounce">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
            </div>
            <div className="flex items-center justify-center text-green-600 animate-pulse">
              <Sparkles className="w-5 h-5 mr-2" />
              <span className="font-medium">Perfect! Ready for analysis</span>
            </div>
            <div className="flex space-x-4 justify-center">
              <button
                onClick={onButtonClick}
                className="px-6 py-3 border-2 border-gray-300 rounded-xl text-gray-700 hover:bg-gray-50 transition-all duration-300 transform hover:scale-105 font-medium"
              >
                Choose Different Photo
              </button>
              <button
                onClick={analyzeImage}
                disabled={analyzing}
                className="px-8 py-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-105 shadow-lg font-medium flex items-center"
              >
                {analyzing ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Analyzing...
                  </>
                ) : (
                  <>
                    <Zap className="w-5 h-5 mr-2" />
                    Analyze My Colors
                  </>
                )}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-fade-in">
            <div className="relative">
              <Upload className="w-20 h-20 text-gray-400 mx-auto animate-bounce" />
              {dragActive && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-24 h-24 border-4 border-purple-400 border-dashed rounded-full animate-ping"></div>
                </div>
              )}
            </div>
            <div>
              <p className="text-2xl font-bold text-gray-700 mb-2">Upload Your Selfie</p>
              <p className="text-gray-500 mb-6">Drag and drop your photo here, or click to browse</p>
              <button
                onClick={onButtonClick}
                className="px-10 py-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-xl hover:from-purple-600 hover:to-pink-600 transition-all duration-300 font-bold text-lg transform hover:scale-105 shadow-lg flex items-center mx-auto"
              >
                <Camera className="w-6 h-6 mr-2" />
                Choose Photo
              </button>
            </div>
          </div>
        )}
      </div>

      {analyzing && (
        <div className="mt-8 text-center animate-fade-in">
          <div className="inline-flex items-center px-8 py-4 bg-white rounded-2xl shadow-xl border">
            <div className="relative mr-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-500"></div>
              <div className="absolute inset-0 animate-ping rounded-full h-8 w-8 border border-purple-300"></div>
            </div>
            <div className="text-left">
              <div className="text-gray-800 font-bold text-lg">AI Analysis in Progress</div>
              <div className="text-purple-600 font-medium animate-pulse">{analysisStep}</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
