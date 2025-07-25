export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12 mt-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
              <span className="text-xl font-bold">ColorMe</span>
            </div>
            <p className="text-gray-400">Discover your perfect colors with AI-powered color analysis.</p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-gray-400">
              <li>AI Color Analysis</li>
              <li>Personal Color Palette</li>
              <li>Style Recommendations</li>
              <li>Educational Resources</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Learn</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Color Theory</li>
              <li>Seasonal Analysis</li>
              <li>Style Tips</li>
              <li>FAQ</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-400">
              <li>Help Center</li>
              <li>Contact Us</li>
              <li>Privacy Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 ColorMe. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
