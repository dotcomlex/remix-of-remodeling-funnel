import Quiz from "@/components/Quiz";
import { ArrowLeft, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "@/assets/14er-logo.png";

const QualifyPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white flex flex-col">
      {/* Simple Header */}
      <header className="w-full py-4 px-4 border-b border-border/30 bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto flex items-center justify-between">
          <Link 
            to="/" 
            className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <Link to="/">
            <img src={logo} alt="14er Renovations" className="h-10 sm:h-12 w-auto" />
          </Link>
        </div>
      </header>

      {/* Quiz Container */}
      <main className="flex-1 flex items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-lg">
          {/* Progress Text */}
          <div className="text-center mb-6">
            {/* Live Activity Indicator */}
            <div className="inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 text-xs font-medium px-3 py-1.5 rounded-full mb-4">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              12 people are checking availability right now
            </div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
              Check Availability
            </h1>
            <p className="text-sm text-muted-foreground">
              Takes less than 30 seconds to complete
            </p>
          </div>

          {/* Quiz Component */}
          <Quiz />
        </div>
      </main>

      {/* Simple Footer */}
      <footer className="w-full py-4 px-4 border-t border-border/30 bg-white/50">
        <div className="container mx-auto">
          <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground">
            <Shield className="w-3.5 h-3.5" />
            Your information is secure and will only be used to contact you about your remodeling project
          </div>
        </div>
      </footer>
    </div>
  );
};

export default QualifyPage;
