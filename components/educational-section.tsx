"use client"

import { useState } from "react"
import { BookOpen, Users, Lightbulb, HelpCircle, ChevronDown, ChevronRight, Star, Award } from "lucide-react"

export default function EducationalSection() {
  const [activeQuiz, setActiveQuiz] = useState<number | null>(null)
  const [quizAnswers, setQuizAnswers] = useState<{ [key: number]: string }>({})
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)

  const quizQuestions = [
    {
      question: "What undertone do you think you have?",
      options: ["Warm (golden/yellow)", "Cool (pink/blue)", "Neutral", "I'm not sure"],
      correct: 0,
    },
    {
      question: "Which jewelry looks better on you?",
      options: ["Gold", "Silver", "Both look good", "I don't wear jewelry"],
      correct: 0,
    },
    {
      question: "How would you describe your natural hair color?",
      options: ["Warm tones", "Cool tones", "Very dark or very light", "Mixed tones"],
      correct: 0,
    },
  ]

  const faqs = [
    {
      question: "Can I wear colors outside my season?",
      answer:
        "Your seasonal colors are your most flattering choices, but you can wear any color you love. Consider using your seasonal colors as your main pieces and other colors as accents.",
    },
    {
      question: "How accurate is AI color analysis?",
      answer:
        "AI analysis provides a great starting point and is quite accurate for most people. However, lighting conditions and photo quality can affect results. Consider it as guidance rather than absolute rules.",
    },
    {
      question: "What if I don't like my seasonal colors?",
      answer:
        "Color preferences are personal! If you don't connect with your seasonal palette, you can explore adjacent seasons or use the colors in different ways, such as accessories or makeup rather than clothing.",
    },
    {
      question: "Do my colors change over time?",
      answer:
        "Your natural coloring can change slightly due to factors like aging, sun exposure, or hair color changes. It's worth reassessing your colors every few years or after significant changes.",
    },
  ]

  return (
    <div className="max-w-4xl mx-auto space-y-12 animate-fade-in">
      <div className="text-center">
        <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4 animate-gradient">
          Learn About Color Analysis
        </h1>
        <p className="text-xl text-gray-600">Discover the science and art behind finding your perfect colors ✨</p>
      </div>

      {/* Interactive Quiz Section */}
      <section className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-3xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300">
        <div className="flex items-center mb-6">
          <Star className="w-8 h-8 text-yellow-500 mr-3 animate-spin" />
          <h2 className="text-3xl font-bold text-gray-800">Quick Color Quiz</h2>
        </div>
        <p className="text-gray-600 mb-6">Test your color knowledge with this fun interactive quiz!</p>

        <div className="space-y-6">
          {quizQuestions.map((q, index) => (
            <div key={index} className="bg-white rounded-2xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                  {index + 1}
                </div>
                {q.question}
              </h3>
              <div className="grid md:grid-cols-2 gap-3">
                {q.options.map((option, optIndex) => (
                  <button
                    key={optIndex}
                    onClick={() => {
                      setQuizAnswers({ ...quizAnswers, [index]: option })
                      setActiveQuiz(index)
                    }}
                    className={`p-3 rounded-xl text-left transition-all duration-300 transform hover:scale-105 ${
                      quizAnswers[index] === option
                        ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg"
                        : "bg-gray-50 hover:bg-purple-50 text-gray-700"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What is Color Analysis */}
      <section className="bg-white rounded-3xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300">
        <div className="flex items-center mb-6">
          <BookOpen className="w-8 h-8 text-purple-500 mr-3 animate-pulse" />
          <h2 className="text-3xl font-bold text-gray-800">What is Color Analysis?</h2>
        </div>
        <div className="prose max-w-none text-gray-600 space-y-4">
          <p className="text-lg leading-relaxed">
            Color analysis, also known as personal or seasonal color analysis, is a method used in fashion and cosmetics
            to determine which colors best complement an individual's natural features, including skin tone, hair color,
            and eye color.
          </p>
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-2xl p-6">
            <p className="text-lg leading-relaxed">
              The concept gained popularity in the 1980s through Carole Jackson's book "Color Me Beautiful" and has seen
              a resurgence with modern AI-powered tools that make the process more accessible and accurate.
            </p>
          </div>
          <p className="text-lg leading-relaxed">
            By understanding your color season, you can make more confident choices about clothing, makeup, and
            accessories that enhance your natural beauty and make you look more vibrant and healthy.
          </p>
        </div>
      </section>

      {/* The Four Seasons - Enhanced */}
      <section className="bg-white rounded-3xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300">
        <div className="flex items-center mb-6">
          <Users className="w-8 h-8 text-green-500 mr-3 animate-bounce" />
          <h2 className="text-3xl font-bold text-gray-800">The Four Seasons</h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="border-l-4 border-yellow-400 pl-6 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-r-2xl p-4 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-2">🌸</span>
                <h3 className="text-xl font-bold text-gray-800">Spring</h3>
              </div>
              <p className="text-gray-600">
                Bright, warm, and light colors. Springs have warm undertones with light to medium depth. Think coral,
                golden yellow, and mint green.
              </p>
            </div>
            <div className="border-l-4 border-blue-400 pl-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-r-2xl p-4 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-2">🌊</span>
                <h3 className="text-xl font-bold text-gray-800">Summer</h3>
              </div>
              <p className="text-gray-600">
                Soft, cool, and light colors. Summers have cool undertones with light to medium depth. Think pastel
                pink, sky blue, and lavender.
              </p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="border-l-4 border-orange-400 pl-6 bg-gradient-to-r from-orange-50 to-red-50 rounded-r-2xl p-4 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-2">🍂</span>
                <h3 className="text-xl font-bold text-gray-800">Autumn</h3>
              </div>
              <p className="text-gray-600">
                Muted, warm, and rich colors. Autumns have warm undertones with medium to deep depth. Think olive green,
                terracotta, and burnt orange.
              </p>
            </div>
            <div className="border-l-4 border-purple-400 pl-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-r-2xl p-4 transform hover:scale-105 transition-all duration-300">
              <div className="flex items-center mb-2">
                <span className="text-2xl mr-2">❄️</span>
                <h3 className="text-xl font-bold text-gray-800">Winter</h3>
              </div>
              <p className="text-gray-600">
                Bold, cool, and dramatic colors. Winters have cool undertones with high contrast. Think navy blue,
                emerald green, and true red.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works - Enhanced */}
      <section className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-3xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300">
        <div className="flex items-center mb-6">
          <Lightbulb className="w-8 h-8 text-yellow-500 mr-3 animate-pulse" />
          <h2 className="text-3xl font-bold text-gray-800">How Our AI Analysis Works</h2>
        </div>
        <div className="space-y-6">
          {[
            {
              step: 1,
              title: "Image Analysis",
              description:
                "Our AI analyzes your uploaded photo to identify key features like skin tone, hair color, and eye color.",
              icon: "🔍",
            },
            {
              step: 2,
              title: "Feature Extraction",
              description:
                "The system determines your undertones (warm or cool), depth (light to dark), and contrast levels.",
              icon: "🎨",
            },
            {
              step: 3,
              title: "Season Classification",
              description:
                "Based on the analysis, you're classified into one of the four seasons with a personalized color palette.",
              icon: "✨",
            },
          ].map((item, index) => (
            <div
              key={index}
              className="flex items-start bg-white rounded-2xl p-6 shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              <div className="text-3xl mr-4">{item.icon}</div>
              <div className="flex-1">
                <div className="flex items-center mb-2">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full flex items-center justify-center mr-4">
                    <span className="text-white font-bold">{item.step}</span>
                  </div>
                  <h3 className="font-bold text-gray-800 text-lg">{item.title}</h3>
                </div>
                <p className="text-gray-600">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Benefits - Enhanced */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-3xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300">
        <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center flex items-center justify-center">
          <Award className="w-8 h-8 text-yellow-500 mr-3 animate-bounce" />
          Benefits of Color Analysis
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              icon: <Lightbulb className="w-10 h-10 text-purple-600" />,
              title: "Simplifies Shopping",
              description: "Focus on colors that work for you, reducing decision fatigue and shopping mistakes.",
              color: "purple",
            },
            {
              icon: <Users className="w-10 h-10 text-pink-600" />,
              title: "Enhances Appearance",
              description: "Look more vibrant, healthy, and confident by wearing your most flattering colors.",
              color: "pink",
            },
            {
              icon: <BookOpen className="w-10 h-10 text-yellow-600" />,
              title: "Saves Time & Money",
              description: "Build a cohesive wardrobe with pieces that work together and make you look great.",
              color: "yellow",
            },
          ].map((benefit, index) => (
            <div key={index} className="text-center group">
              <div
                className={`w-20 h-20 bg-${benefit.color}-100 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                {benefit.icon}
              </div>
              <h3 className="font-bold text-gray-800 mb-3 text-lg">{benefit.title}</h3>
              <p className="text-gray-600 leading-relaxed">{benefit.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Interactive FAQ */}
      <section className="bg-white rounded-3xl shadow-xl p-8 transform hover:scale-105 transition-all duration-300">
        <div className="flex items-center mb-6">
          <HelpCircle className="w-8 h-8 text-blue-500 mr-3 animate-pulse" />
          <h2 className="text-3xl font-bold text-gray-800">Frequently Asked Questions</h2>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border border-gray-200 rounded-2xl overflow-hidden">
              <button
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
              >
                <h3 className="font-semibold text-gray-800 text-lg">{faq.question}</h3>
                {expandedFaq === index ? (
                  <ChevronDown className="w-5 h-5 text-gray-500 transform rotate-180 transition-transform" />
                ) : (
                  <ChevronRight className="w-5 h-5 text-gray-500 transition-transform" />
                )}
              </button>
              {expandedFaq === index && (
                <div className="px-6 pb-6 animate-fade-in">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
