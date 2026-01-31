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
            <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-3 py-1 rounded-full mb-3">
              Qualification Form
            </span>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-2">
              See if you qualify for $2,000 off
            </h1>
            <p className="text-sm text-muted-foreground">
              Answer a few quick questions to check your eligibility
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
