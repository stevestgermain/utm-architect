import React from 'react';
import { Link2 } from 'lucide-react';
import { UTMForm } from './components/UTMForm';

function App() {
  return (
    <div className="min-h-screen w-full bg-white pt-6 pb-12 px-4 flex justify-center items-start">
      <div className="w-full max-w-[460px] mx-auto flex flex-col">
        
        {/* Signature Header - Centered */}
        <header className="mb-8 text-center">
          <div className="w-14 h-14 bg-blue-600 rounded-2xl shadow-lg shadow-blue-600/10 mb-5 text-white transform -rotate-6 hover:scale-105 duration-300 flex items-center justify-center mx-auto">
            <Link2 className="w-7 h-7" strokeWidth={2.5} />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-3 tracking-tight">
            UTM Architect
          </h1>
          
          <p className="text-[13px] text-gray-500 max-w-[420px] mx-auto font-normal leading-relaxed">
            Construct reliable tracking links for your campaigns. A precise tool for measuring traffic sources without the clutter.
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

export default App;