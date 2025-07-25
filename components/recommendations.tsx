import { Shirt, Palette, Gem } from "lucide-react"
import type { ColorSeason } from "@/app/page"
import type { Recommendations as RecommendationsType } from "@/lib/types"

interface RecommendationsProps {
  season: ColorSeason
  customRecommendations?: RecommendationsType
}

const recommendationsData = {
  Spring: {
    clothing: [
      "Coral blazers and dresses",
      "Golden yellow tops and accessories",
      "Mint green blouses and scarves",
      "Peach sweaters and cardigans",
      "Turquoise jewelry and bags",
    ],
    makeup: [
      "Peach or coral blush",
      "Warm brown or golden eyeshadow",
      "Coral or pink lipstick",
      "Golden highlighter",
      "Warm brown mascara and eyeliner",
    ],
    accessories: [
      "Gold jewelry and watches",
      "Warm-toned handbags",
      "Coral or mint scarves",
      "Golden yellow belts",
      "Turquoise statement pieces",
    ],
  },
  Summer: {
    clothing: [
      "Pastel pink blouses and dresses",
      "Sky blue shirts and skirts",
      "Lavender cardigans and tops",
      "Soft yellow summer dresses",
      "Rose-colored evening wear",
    ],
    makeup: [
      "Soft pink blush",
      "Cool gray or lavender eyeshadow",
      "Rose or berry lipstick",
      "Pearl highlighter",
      "Cool brown or gray eyeliner",
    ],
    accessories: [
      "Silver jewelry and accessories",
      "Cool-toned handbags",
      "Pastel scarves and wraps",
      "Lavender or blue belts",
      "Pearl or silver statement pieces",
    ],
  },
  Autumn: {
    clothing: [
      "Olive green jackets and pants",
      "Terracotta sweaters and tops",
      "Burnt orange dresses and scarves",
      "Golden brown coats and blazers",
      "Rust-colored accessories",
    ],
    makeup: [
      "Warm peach or bronze blush",
      "Golden brown or copper eyeshadow",
      "Warm red or brown lipstick",
      "Golden bronze highlighter",
      "Warm brown eyeliner and mascara",
    ],
    accessories: [
      "Gold or copper jewelry",
      "Warm brown leather goods",
      "Olive or rust scarves",
      "Golden brown belts",
      "Amber or wooden accessories",
    ],
  },
  Winter: {
    clothing: [
      "Navy blue suits and dresses",
      "Emerald green blouses and tops",
      "True red statement pieces",
      "Royal purple evening wear",
      "Black and white classics",
    ],
    makeup: [
      "Cool pink or berry blush",
      "Navy, silver, or purple eyeshadow",
      "True red or berry lipstick",
      "Silver or icy highlighter",
      "Black or dark brown eyeliner",
    ],
    accessories: [
      "Silver or platinum jewelry",
      "Black or navy handbags",
      "Bold colored scarves",
      "Black or silver belts",
      "Statement gemstone pieces",
    ],
  },
}

export default function Recommendations({ season, customRecommendations }: RecommendationsProps) {
  if (!season) return null

  const data = customRecommendations || recommendationsData[season]

  return (
    <div className="bg-white rounded-2xl shadow-lg p-8">
      <h2 className="text-3xl font-bold text-gray-800 text-center mb-8">
        {customRecommendations ? "Your AI-Powered Recommendations" : "Your Personalized Recommendations"}
      </h2>
      
      {customRecommendations && (
        <div className="text-center mb-6">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-purple-100 to-pink-100 rounded-full">
            <Palette className="w-4 h-4 text-purple-600 mr-2" />
            <span className="text-purple-700 font-medium">Tailored specifically for your features</span>
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-3 gap-8">
        <div className="space-y-4">
          <div className="flex items-center mb-4">
            <Shirt className="w-6 h-6 text-purple-500 mr-3" />
            <h3 className="text-xl font-semibold text-gray-800">Clothing Colors</h3>
          </div>
          <ul className="space-y-3">
            {data.clothing.map((item, index) => (
              <li key={index} className="flex items-start">
                <div className="w-2 h-2 bg-purple-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <div className="flex items-center mb-4">
            <Palette className="w-6 h-6 text-pink-500 mr-3" />
            <h3 className="text-xl font-semibold text-gray-800">Makeup Shades</h3>
          </div>
          <ul className="space-y-3">
            {data.makeup.map((item, index) => (
              <li key={index} className="flex items-start">
                <div className="w-2 h-2 bg-pink-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4">
          <div className="flex items-center mb-4">
            <Gem className="w-6 h-6 text-yellow-500 mr-3" />
            <h3 className="text-xl font-semibold text-gray-800">Accessories</h3>
          </div>
          <ul className="space-y-3">
            {data.accessories.map((item, index) => (
              <li key={index} className="flex items-start">
                <div className="w-2 h-2 bg-yellow-500 rounded-full mr-3 mt-2 flex-shrink-0"></div>
                <span className="text-gray-600">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-2">
          {customRecommendations ? `Your Personalized ${season} Style Guide` : `Shopping Tips for ${season}s`}
        </h3>
        <p className="text-gray-600">
          {customRecommendations 
            ? "These recommendations are based on your unique features analyzed by AI. They're designed to enhance your natural beauty and complement your personal color season."
            : "When shopping, look for these colors first. They'll make you appear more vibrant and confident. Remember, you can still wear other colors as accents, but these should be your go-to choices for the most flattering look."
          }
        </p>
      </div>
    </div>
  )
}
