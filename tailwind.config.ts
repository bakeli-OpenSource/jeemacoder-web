import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial-home": " radial-gradient(circle, rgba(244,126,17,0.804359243697479) 0%, rgba(30,40,67,1) 43%)"
      },
        colors : {
            "base-blue" : "#15548E",
            "blue-muted" : "#D8E8F6",
            "dark-blue" : "rgb(2,6,23)",
            "white" : "#FFFFFE",
            "black" : "#141111",
            "gray-foreground" : "#D9D9D9",
            "muted" : "#F5F5F5",
            "destruction-red" : "#D93842",
            "foreground-green" : "#1E490E",
            // 
            "light-green" : "rgba(98, 217, 56, 0.54)",
            "dark-green" : "#0F4424",
            "dark-green-hover" : "#00AB44",
            "light-orange" : "rgba(237, 159, 87, 0.07)",
            // BASE COLOR QUE L'ON VAS USRT
            "orange" : "#F47E11",
            // green = #579B6F
            "dark" : "#1e2843"

      },
    },
  },
  plugins: [],
};
export default config;
