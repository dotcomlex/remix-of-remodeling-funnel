import { useState } from "react";
import Quiz from "@/components/Quiz";
import { Shield } from "lucide-react";
import qualifyBgImage from "@/assets/14er-paper-mountain-bg.webp";

const QualifyPage = () => {
  const [quizStarted, setQuizStarted] = useState(false);

  return (
    <div className="min-h-screen relative">
      {/* Background Image - Fixed */}
      <div className="fixed inset-0 z-0">
        <img 
          src={qualifyBgImage} 
          alt="" 
          className="w-full h-full object-cover"
        />
        {/* Dark overlay for better contrast */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">
        {/* Quiz Container */}
        <main className="flex-1 flex items-center justify-center px-4 py-4 sm:py-8">
          <div className="w-full max-w-lg">
            {/* Progress Text */}
            <div className="text-center mb-4">
              {/* Live Activity Indicator - RED badge, ALWAYS visible */}
              <div className="inline-flex items-center gap-2 bg-red-500 text-white text-xs font-bold px-4 py-2 rounded-full mb-4 shadow-xl border-2 border-white/50">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-white"></span>
                </span>
                12 people are checking availability right now
              </div>
              
              {/* Header - HIDES when quiz starts */}
              {!quizStarted && (
                <>
                  <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 mb-2">
                    Check Availability
                  </h1>
                  <p className="text-sm sm:text-base font-medium text-slate-700">
                    Takes less than 30 seconds to complete
                  </p>
                </>
              )}
            </div>

            {/* Quiz Component */}
            <Quiz onStart={() => setQuizStarted(true)} />
          </div>
        </main>

        {/* Simple Footer */}
        <footer className="w-full py-4 px-4 bg-white/80 backdrop-blur-sm border-t border-slate-200">
          <div className="container mx-auto">
            <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
              <Shield className="w-3.5 h-3.5" />
              Your information is secure and will only be used to contact you about your remodeling project
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default QualifyPage;
