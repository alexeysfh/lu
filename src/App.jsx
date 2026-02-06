import { useState } from 'react';
import IntroScreen from './components/IntroScreen';
import QuestionScreen from './components/QuestionScreen';
import RevealScreen from './components/RevealScreen';
import tulips from './assets/tulips.png';
import bike from './assets/bike.png';

function App() {
  const [step, setStep] = useState('intro'); // intro, question, reveal

  return (
    <div className="relative min-h-screen w-full bg-miffy-white overflow-x-hidden font-sans">
      {/* Main Content Area */}
      <main className="relative z-10">
        {step === 'intro' && <IntroScreen onNext={() => setStep('question')} />}
        {step === 'question' && <QuestionScreen onYes={() => setStep('reveal')} />}
        {step === 'reveal' && <RevealScreen />}
      </main>

      {/* Decorative Background Elements */}
      <div className="fixed bottom-0 left-0 w-full pointer-events-none z-0">
        <div className="flex justify-between items-end w-full px-4 md:px-12 pb-2">

          {/* Tulips - Repeated Row or Single Bunch */}
          <img
            src={tulips}
            alt="Tulips"
            className="w-32 md:w-48 opacity-90"
          />

          <img
            src={tulips}
            alt="Tulips"
            className="hidden md:block w-32 md:w-48 opacity-90 mx-auto"
          />

          {/* Bike */}
          <img
            src={bike}
            alt="Bicycle"
            className="w-24 md:w-40 opacity-80 mb-2"
          />
        </div>
        {/* Grass strip */}
        <div className="h-4 bg-miffy-green w-full"></div>
      </div>
    </div>
  );
}

export default App;
