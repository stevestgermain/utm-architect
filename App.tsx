import React, { useEffect, useState } from "react";
import { Link2 } from "lucide-react";
import { UTMForm } from "./components/UTMForm";

export type Theme = "light" | "dark";

export default function App() {
  const [theme, setTheme] = useState<Theme>(() =>
    document.documentElement.classList.contains("dark") ? "dark" : "light"
  );

  // Keep <html> in sync with theme
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  // Listen for parent window postMessage
  useEffect(() => {
    function handleMessage(event: MessageEvent) {
      const data = event.data || {};
      if (
        (data.type === "THEME_CHANGE" || data.type === "THEME_RESPONSE") &&
        (data.theme === "light" || data.theme === "dark")
      ) {
        setTheme(data.theme);
      }
    }

    window.addEventListener("message", handleMessage);
    return () => window.removeEventListener("message", handleMessage);
  }, []);

  return (
    <div className="min-h-screen w-full font-sans bg-white text-gray-900 pt-6 pb-12 px-4 flex justify-center items-start dark:bg-[#050706] dark:text-white">
      <div className="w-full max-w-[460px] mx-auto flex flex-col">
        {/* Signature Header - Centered */}
        <header className="mb-8 text-center">
          <div className="w-14 h-14 bg-blue-600 dark:bg-blue-500 rounded-2xl shadow-lg shadow-blue-600/10 dark:shadow-blue-500/20 mb-5 text-white transform -rotate-6 hover:scale-105 duration-300 flex items-center justify-center mx-auto">
            <Link2 className="w-7 h-7" strokeWidth={2.5} />
          </div>

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-3 tracking-tight">
            UTM Architect
          </h1>

          <p className="text-[13px] text-gray-500 dark:text-gray-300 max-w-[420px] mx-auto font-normal leading-relaxed">
            Construct reliable tracking links for your campaigns. A precise tool
            for measuring traffic sources without the clutter.
          </p>
        </header>

        {/* Main Content */}
        <div className="mt-2">
          <UTMForm />
        </div>
      </div>
    </div>
  );
}
