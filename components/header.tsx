"use client"

interface HeaderProps {
  activeSection: "upload" | "results" | "education"
  setActiveSection: (section: "upload" | "results" | "education") => void
  analysisComplete: boolean
}

export default function Header({ activeSection, setActiveSection, analysisComplete }: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
            <span className="text-xl font-bold text-gray-800">ColorMe</span>
          </div>

          <div className="flex space-x-6">
            <button
              onClick={() => setActiveSection("upload")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeSection === "upload" ? "bg-purple-100 text-purple-700" : "text-gray-600 hover:text-purple-600"
              }`}
            >
              Analysis
            </button>

            {analysisComplete && (
              <button
                onClick={() => setActiveSection("results")}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeSection === "results" ? "bg-purple-100 text-purple-700" : "text-gray-600 hover:text-purple-600"
                }`}
              >
                My Results
              </button>
            )}

            <button
              onClick={() => setActiveSection("education")}
              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                activeSection === "education" ? "bg-purple-100 text-purple-700" : "text-gray-600 hover:text-purple-600"
              }`}
            >
              Learn More
            </button>
          </div>
        </nav>
      </div>
    </header>
  )
}
