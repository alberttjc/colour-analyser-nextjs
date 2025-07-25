export interface ColorPaletteItem {
  hex: string;
  name: string;
}

export interface Recommendations {
  clothing: string[];
  makeup: string[];
  accessories: string[];
}

export interface ColorAnalysis {
  season: string;
  palette: ColorPaletteItem[];
  explanation: string;
  recommendations: Recommendations;
}
