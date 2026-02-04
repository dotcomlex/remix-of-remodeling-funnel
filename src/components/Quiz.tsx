import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  MapPin, ChefHat, Bath, Home, HelpCircle, 
  Zap, Calendar, CalendarClock, Clock,
  ArrowRight, ArrowLeft, CheckCircle2, Shield, Phone,
  User, Mail, Loader2, Star, Check, Gem, DollarSign,
  Bookmark, ExternalLink, Images, MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type QuizStep = 1 | 2 | 3 | 4;

interface QuizData {
  projectType: string;
  timeline: string;
  budgetRange: string;
  zipCode: string;
  firstName: string;
  phone: string;
  email: string;
}

const formatPhoneNumber = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
};

// Colorado ZIP code validation - covers ALL Colorado addresses
const isColoradoZipCode = (zip: string): boolean => {
  // Must be exactly 5 digits
  if (zip.length !== 5 || !/^\d{5}$/.test(zip)) {
    return false;
  }
  // Colorado's official USPS range: 80001-81658
  const zipNum = parseInt(zip, 10);
  return zipNum >= 80001 && zipNum <= 81658;
};

// Phone number validation - simplified to allow more numbers through
const isValidPhoneNumber = (phone: string): { valid: boolean; error?: string } => {
  const digits = phone.replace(/\D/g, '');
  
  // Must be exactly 10 digits
  if (digits.length !== 10) {
    return { valid: false, error: "Enter a valid 10-digit phone number" };
  }
  
  // Area code (first 3 digits) cannot start with 0 or 1 - US phone standard
  const areaCode = digits.substring(0, 3);
  if (areaCode[0] === '0' || areaCode[0] === '1') {
    return { valid: false, error: "Please enter a valid US phone number" };
  }
  
  // Exchange code (digits 4-6) cannot start with 0 or 1 - US phone standard
  const exchangeCode = digits.substring(3, 6);
  if (exchangeCode[0] === '0' || exchangeCode[0] === '1') {
    return { valid: false, error: "Please enter a valid US phone number" };
  }
  
  return { valid: true };
};

// Rotating messages for ZIP verification
const CheckingMessages = ({ zipCode }: { zipCode: string }) => {
  const [messageIndex, setMessageIndex] = useState(0);
  
  const messages = [
    `Checking availability in ${zipCode}...`,
    "Verifying service coverage...",
    "Reviewing contractor schedules...",
    "Confirming project capacity...",
    "Finalizing availability check...",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setMessageIndex((prev) => (prev + 1) % messages.length);
    }, 1800);
    
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      key={messageIndex}
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <p className="text-base sm:text-lg font-medium text-foreground">
        {messages[messageIndex]}
      </p>
      <p className="text-sm text-muted-foreground mt-2">
        Please wait a moment...
      </p>
    </motion.div>
  );
};

interface QuizProps {
  onStart?: () => void;
}

const Quiz = ({ onStart }: QuizProps) => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDisqualified, setIsDisqualified] = useState(false);
  const [needsTimelineClarification, setNeedsTimelineClarification] = useState(false);
  const [timelineDisqualified, setTimelineDisqualified] = useState(false);
  const [errors, setErrors] = useState<{ firstName?: string; phone?: string; email?: string }>({});
  const [isCheckingZip, setIsCheckingZip] = useState(false);
  const [data, setData] = useState<QuizData>({
    projectType: "",
    timeline: "",
    budgetRange: "",
    zipCode: "",
    firstName: "",
    phone: "",
    email: "",
  });

  const handleTileSelect = (field: string, value: string) => {
    // Trigger onStart callback when user first interacts (step 1, no project selected yet)
    if (step === 1 && !data.projectType && onStart) {
      onStart();
    }
    setData({ ...data, [field]: value });
  };

  // Auto-advance logic with 300ms delay
  useEffect(() => {
    if (step === 1 && data.projectType) {
      setTimeout(() => setStep(2), 300);
    }
  }, [data.projectType, step]);

  useEffect(() => {
    if (step === 2 && data.timeline && !needsTimelineClarification) {
      // Check if they selected "Not sure yet"
      if (data.timeline === "not-sure") {
        setTimeout(() => setNeedsTimelineClarification(true), 300);
      } else {
        // Skip budget - go directly to ZIP (step 3)
        setTimeout(() => setStep(3), 300);
      }
    }
  }, [data.timeline, step, needsTimelineClarification]);

  // Budget step removed - no auto-advance needed for it

  const handleNext = () => {
    if (step === 3 && data.zipCode.length >= 5 && !isCheckingZip) {
      if (isColoradoZipCode(data.zipCode)) {
        setIsDisqualified(false);
        setIsCheckingZip(true);
        
        // Show loading for 8 seconds, then advance
        setTimeout(() => {
          setIsCheckingZip(false);
          setStep(4);
        }, 8000);
      } else {
        setIsDisqualified(true);
      }
    }
  };

  const handleBack = () => {
    if (step > 1 && step < 4) {
      setStep((step - 1) as QuizStep);
    }
  };

  const getProjectTypeLabel = (type: string): string => {
    switch (type) {
      case "kitchen": return "Kitchen remodel";
      case "bathroom": return "Bathroom remodel";
      case "both": return "Kitchen AND bathroom";
      case "other": return "Other remodeling project";
      default: return "";
    }
  };

  const getTimelineLabel = (timeline: string): string => {
    switch (timeline) {
      case "asap": return "ASAP";
      case "1-2-weeks": return "1-2 weeks";
      case "1-2-months": return "1-2 months";
      case "not-sure": return "Not sure yet";
      default: return "";
    }
  };
  const getBudgetLabel = (budget: string): string => {
    switch (budget) {
      case "5-10k": return "$5,000 - $10,000";
      case "10-20k": return "$10,000 - $20,000";
      case "20-30k": return "$20,000 - $30,000";
      case "40k+": return "$40,000+";
      default: return "";
    }
  };

  const validateForm = (): boolean => {
    const newErrors: { firstName?: string; phone?: string; email?: string } = {};
    
    if (!data.firstName.trim()) {
      newErrors.firstName = "Name is required";
    }
    
    const phoneDigits = data.phone.replace(/\D/g, '');
    if (!phoneDigits) {
      newErrors.phone = "Phone is required";
    } else {
      const phoneValidation = isValidPhoneNumber(data.phone);
      if (!phoneValidation.valid) {
        newErrors.phone = phoneValidation.error || "Enter a valid phone number";
      }
    }
    
    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      newErrors.email = "Enter a valid email address";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);

    const phoneDigits = data.phone.replace(/\D/g, '');

    const payload = {
      "contact.first_name": data.firstName,
      "contact.email": data.email || "",
      "contact.phone": phoneDigits,
      "contact.zip_code": data.zipCode,
      "contact.project_type": getProjectTypeLabel(data.projectType),
      "contact.timeline": getTimelineLabel(data.timeline),
      "contact.budget_range": getBudgetLabel(data.budgetRange),
      first_name: data.firstName,
      email: data.email || "",
      phone: phoneDigits,
      zip_code: data.zipCode,
      project_type: getProjectTypeLabel(data.projectType),
      timeline: getTimelineLabel(data.timeline),
      budget_range: getBudgetLabel(data.budgetRange),
    };

    console.log("Remodeling Quiz payload:", payload);

    setIsSubmitted(true);
    setIsSubmitting(false);

    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead');
    }

    const webhookUrl = "https://services.leadconnectorhq.com/hooks/AUs946zIT71gT6ZZInpO/webhook-trigger/4303b213-285a-4588-88df-5909a8baed41";

    fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      keepalive: true,
    })
      .then((response) => {
        console.log("GHL webhook response:", response.status, response.ok ? "OK" : "FAILED");
      })
      .catch((err) => {
        console.error("GHL webhook error:", err);
      });
  };

  // OptionCard with vertical layout
  const OptionCard = ({ 
    icon: Icon, 
    label, 
    selected, 
    onClick,
    accentColor = "text-primary",
    badge
  }: { 
    icon: React.ElementType; 
    label: string; 
    selected: boolean; 
    onClick: () => void;
    accentColor?: string;
    badge?: string;
  }) => (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center gap-1.5 p-3.5 sm:p-4 rounded-xl border-2 bg-white w-full min-h-[100px] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] group ${
        selected 
          ? "border-primary bg-gradient-to-r from-primary/10 to-primary/5 shadow-md" 
          : "border-slate-200 hover:border-primary/50 shadow-sm"
      }`}
    >
      {badge && (
        <span className="absolute -top-2 right-2 bg-emerald-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
      <div className={`w-10 h-10 sm:w-11 sm:h-11 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
        selected 
          ? "bg-primary" 
          : "bg-slate-100 group-hover:bg-slate-200"
      }`}>
        <Icon className={`w-5 h-5 transition-colors duration-200 ${
          selected ? "text-primary-foreground" : accentColor
        }`} />
      </div>

      <span className={`text-sm font-normal text-center leading-tight transition-colors duration-200 ${
        selected ? "text-primary font-medium" : "text-foreground"
      }`}>
        {label}
      </span>
      
      {selected && (
        <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
          <Check className="w-3 h-3 text-white" />
        </div>
      )}
    </button>
  );

  // BudgetOptionCard - for budget ranges
  const BudgetOptionCard = ({ 
    icon: Icon, 
    label, 
    selected, 
    onClick 
  }: { 
    icon: React.ElementType;
    label: string;
    selected: boolean; 
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-3 p-4 rounded-xl border-2 bg-white w-full min-h-[60px] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] group ${
        selected 
          ? "border-primary bg-gradient-to-r from-primary/10 to-primary/5 shadow-md" 
          : "border-slate-200 hover:border-primary/50 shadow-sm"
      }`}
    >
      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
        selected ? "bg-primary" : "bg-slate-100 group-hover:bg-slate-200"
      }`}>
        <Icon className={`w-5 h-5 transition-colors duration-200 ${
          selected ? "text-primary-foreground" : "text-primary"
        }`} />
      </div>
      <span className={`text-sm font-medium ${selected ? "text-primary" : "text-foreground"}`}>
        {label}
      </span>
      {selected && (
        <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-emerald-500 flex items-center justify-center">
          <Check className="w-3 h-3 text-white" />
        </div>
      )}
    </button>
  );

  // Animation variants - y-axis slide with scale
  const cardVariants = {
    enter: { opacity: 0, y: 20, scale: 0.95 },
    center: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, y: -20, scale: 0.95 },
  };

  return (
    <div className="w-full max-w-lg">
      {/* Quiz Card */}
      <div className="quiz-card-glass rounded-2xl shadow-quiz-glow p-5 sm:p-6 w-full border border-primary/20">
        
        {/* Progress Dots - Inside card */}
        {!isSubmitted && !isDisqualified && !timelineDisqualified && (
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3, 4].map((dotStep) => (
              <div
                key={dotStep}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  dotStep <= step 
                    ? "bg-primary" 
                    : "bg-slate-300"
                }`}
              />
            ))}
          </div>
        )}

        <AnimatePresence mode="wait">
          {/* Step 1: Project Type */}
          {step === 1 && !isSubmitted && (
            <motion.div
              key="step1"
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
            >
              <h3 className="text-base sm:text-lg font-medium text-foreground mb-4 text-center leading-tight">
                Which project are you planning?
              </h3>
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                <OptionCard
                  icon={ChefHat}
                  label="Kitchen remodel"
                  selected={data.projectType === "kitchen"}
                  onClick={() => handleTileSelect("projectType", "kitchen")}
                  accentColor="text-orange-600"
                />
                <OptionCard
                  icon={Bath}
                  label="Bathroom remodel"
                  selected={data.projectType === "bathroom"}
                  onClick={() => handleTileSelect("projectType", "bathroom")}
                  accentColor="text-cyan-600"
                />
                <OptionCard
                  icon={Home}
                  label="Kitchen AND bathroom"
                  selected={data.projectType === "both"}
                  onClick={() => handleTileSelect("projectType", "both")}
                  accentColor="text-violet-600"
                />
                <OptionCard
                  icon={HelpCircle}
                  label="Other remodeling project"
                  selected={data.projectType === "other"}
                  onClick={() => handleTileSelect("projectType", "other")}
                  accentColor="text-slate-600"
                />
              </div>
            </motion.div>
          )}

          {/* Step 2: Timeline */}
          {step === 2 && !isSubmitted && !needsTimelineClarification && !timelineDisqualified && (
            <motion.div
              key="step2"
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
            >
              <h3 className="text-base sm:text-lg font-medium text-foreground mb-4 text-center leading-tight">
                When would you like to get started?
              </h3>
              <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4">
                <OptionCard
                  icon={Zap}
                  label="ASAP"
                  selected={data.timeline === "asap"}
                  onClick={() => handleTileSelect("timeline", "asap")}
                  accentColor="text-red-600"
                />
                <OptionCard
                  icon={Calendar}
                  label="1-2 weeks"
                  selected={data.timeline === "1-2-weeks"}
                  onClick={() => handleTileSelect("timeline", "1-2-weeks")}
                  accentColor="text-orange-600"
                />
                <OptionCard
                  icon={CalendarClock}
                  label="1-2 months"
                  selected={data.timeline === "1-2-months"}
                  onClick={() => handleTileSelect("timeline", "1-2-months")}
                  accentColor="text-teal-600"
                />
                <OptionCard
                  icon={Clock}
                  label="Not sure yet"
                  selected={data.timeline === "not-sure"}
                  onClick={() => handleTileSelect("timeline", "not-sure")}
                  accentColor="text-slate-500"
                />
              </div>
              <button
                onClick={handleBack}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                Go back
              </button>
            </motion.div>
          )}

          {/* Timeline Clarification - Only shows if they selected "not-sure" */}
          {step === 2 && needsTimelineClarification && !timelineDisqualified && !isSubmitted && (
            <motion.div
              key="timeline-clarification"
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
            >
              <div className="text-center mb-5">
                <Clock className="w-10 h-10 text-primary mx-auto mb-3" />
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                  Quick Question
                </h3>
                <p className="text-sm text-muted-foreground">
                  We're currently taking projects that can start within the next 60 days.
                </p>
                <p className="text-sm text-foreground font-medium mt-2">
                  Does that work for your timeline?
                </p>
              </div>

              <div className="space-y-3 mb-4">
                <button
                  onClick={() => {
                    setNeedsTimelineClarification(false);
                    setData({ ...data, timeline: "1-2-months" }); // Set to acceptable timeline
                    setTimeout(() => setStep(3), 300); // Continue to ZIP code
                  }}
                  className="w-full p-4 rounded-xl border-2 border-primary bg-gradient-to-r from-primary/10 to-primary/5 hover:shadow-lg transition-all text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                      <Check className="w-5 h-5 text-primary-foreground" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Yes, that works for me</p>
                      <p className="text-xs text-muted-foreground">Continue to next step</p>
                    </div>
                  </div>
                </button>
                <button
                  onClick={() => {
                    setTimelineDisqualified(true);
                  }}
                  className="w-full p-4 rounded-xl border-2 border-slate-200 hover:border-slate-300 hover:shadow-md transition-all text-left"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-5 h-5 text-slate-500" />
                    </div>
                    <div>
                      <p className="font-medium text-foreground">No, I need more time</p>
                      <p className="text-xs text-muted-foreground">I'm planning further out</p>
                    </div>
                  </div>
                </button>
              </div>

              <button
                onClick={() => {
                  setNeedsTimelineClarification(false);
                  setData({ ...data, timeline: "" }); // Reset timeline
                }}
                className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-1"
              >
                <ArrowLeft className="w-4 h-4" />
                Go back
              </button>
            </motion.div>
          )}

          {/* Timeline Disqualification - Planning too far out */}
          {timelineDisqualified && !isSubmitted && (
            <motion.div
              key="timeline-disqualified"
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="py-4 text-center"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-14 h-14 mx-auto mb-4 rounded-full bg-blue-100 flex items-center justify-center"
              >
                <Calendar className="w-7 h-7 text-blue-600" />
              </motion.div>
              
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 leading-snug">
                Thanks For Your Interest!
              </h3>
              
              <p className="text-sm text-muted-foreground leading-relaxed mb-4 max-w-sm mx-auto">
                We're focusing on projects starting within 60 days right now. We'd love to help when you're ready!
              </p>

              <div className="bg-slate-50 rounded-xl p-4 mb-4 text-left">
                <p className="text-xs font-semibold text-foreground mb-2">Here's what to do:</p>
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span>Save our number: <strong className="text-foreground">(720) 989-9883</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Bookmark className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span>Bookmark: <strong className="text-foreground">14erenovations.com</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-3.5 h-3.5 text-primary flex-shrink-0" />
                    <span>Reach out when your timeline is closer!</span>
                  </div>
                </div>
              </div>

              {/* Single Back to Home button */}
              <Link 
                to="/"
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-3 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
              >
                <ArrowLeft className="w-4 h-4" />
                Back to Home
              </Link>
            </motion.div>
          )}

          {/* Step 3: ZIP Code */}
          {step === 3 && !isSubmitted && !isCheckingZip && !isDisqualified && (
            <motion.div
              key="step4"
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
            >
              <h3 className="text-base sm:text-lg font-medium text-foreground mb-4 text-center leading-tight">
                What's your zip code?
              </h3>
              <div className="mb-4">
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Enter ZIP code"
                    value={data.zipCode}
                    onChange={(e) => setData({ ...data, zipCode: e.target.value.replace(/\D/g, '') })}
                    className="pl-10 h-12 text-base rounded-xl border-2 focus:border-primary"
                    maxLength={5}
                  />
                </div>
              </div>
              <div className="flex items-center justify-between">
                <button
                  onClick={handleBack}
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Go back
                </button>
                <Button
                  onClick={handleNext}
                  disabled={data.zipCode.length < 5}
                  variant="default"
                  size="lg"
                  className="px-6 h-12"
                >
                  Continue <ArrowRight className="w-4 h-4 ml-1" />
                </Button>
              </div>
            </motion.div>
          )}

          {/* ZIP Code Checking Loader */}
          {isCheckingZip && !isSubmitted && !isDisqualified && (
            <motion.div
              key="checking-zip"
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
              className="py-8 text-center"
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-16 h-16 mx-auto mb-6"
              >
                <div className="w-full h-full rounded-full border-4 border-slate-200 border-t-primary" />
              </motion.div>
              
              <CheckingMessages zipCode={data.zipCode} />
            </motion.div>
          )}

          {/* Step 4: Contact Form */}
          {step === 4 && !isSubmitted && (
            <motion.div
              key="step4"
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
            >
              {/* Celebration Header with actual ZIP code */}
              <div className="text-center mb-4">
                <span className="text-2xl mb-1 block">🎉</span>
                <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">
                  Congrats! Your Area ({data.zipCode}) Qualifies!
                </h3>
                <p className="text-sm text-muted-foreground leading-snug max-w-sm mx-auto">
                  Enter your info below to claim your free consultation and lock in your $2,000 discount.
                </p>
              </div>

              
              {/* Form Fields */}
              <div className="space-y-2.5 mb-4">
                <div>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="Name"
                      value={data.firstName}
                      onChange={(e) => {
                        setData(prev => ({ ...prev, firstName: e.target.value }));
                        if (errors.firstName) setErrors({ ...errors, firstName: undefined });
                      }}
                      className={`pl-10 h-12 text-base rounded-xl border-2 transition-all ${
                        errors.firstName ? 'border-red-500 focus:border-red-500' : 'focus:border-primary'
                      }`}
                    />
                  </div>
                  {errors.firstName && (
                    <p className="text-xs text-red-500 mt-1 pl-1">{errors.firstName}</p>
                  )}
                </div>
                
                <div>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="tel"
                      inputMode="tel"
                      placeholder="(555) 123-4567"
                      value={data.phone}
                      onChange={(e) => {
                        setData(prev => ({ ...prev, phone: formatPhoneNumber(e.target.value) }));
                        if (errors.phone) setErrors({ ...errors, phone: undefined });
                      }}
                      className={`pl-10 pr-10 h-12 text-base rounded-xl border-2 transition-all ${
                        errors.phone ? 'border-red-500 focus:border-red-500' : 'focus:border-primary'
                      }`}
                      maxLength={14}
                    />
                    {/* Green checkmark when valid */}
                    {data.phone.replace(/\D/g, '').length === 10 && 
                     isValidPhoneNumber(data.phone).valid && (
                      <div className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
                        <Check className="w-3 h-3 text-emerald-600" />
                      </div>
                    )}
                  </div>
                  {errors.phone ? (
                    <p className="text-xs text-red-500 mt-1 pl-1">{errors.phone}</p>
                  ) : data.phone.replace(/\D/g, '').length === 10 && 
                      isValidPhoneNumber(data.phone).valid ? (
                    <p className="text-[10px] text-emerald-600 mt-1 pl-1">
                      ✓ Looks good!
                    </p>
                  ) : (
                    <p className="text-[10px] text-muted-foreground mt-1 pl-1">
                      📱 Please double-check your number so we can reach you
                    </p>
                  )}
                </div>
                
                <div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Email"
                      value={data.email}
                      onChange={(e) => {
                        setData(prev => ({ ...prev, email: e.target.value }));
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      className={`pl-10 h-12 text-base rounded-xl border-2 transition-all ${
                        errors.email ? 'border-red-500 focus:border-red-500' : 'focus:border-primary'
                      }`}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs text-red-500 mt-1 pl-1">{errors.email}</p>
                  )}
                </div>
              </div>

              {/* Submit Button - Orange Gradient */}
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full h-12 text-[15px] font-semibold bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-500/90 text-white rounded-xl shadow-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Get My Free Consultation"
                )}
              </Button>

              {/* Subtle Testimonial */}
              <div className="mt-3">
                <p className="text-xs text-muted-foreground/80 italic text-center leading-relaxed">
                  "Just finished our kitchen remodel with 14er—would definitely recommend!"
                  <span className="text-muted-foreground/60 not-italic ml-1">- Michael R., Denver</span>
                </p>
              </div>

              {/* Trust Footer - Enhanced */}
              <div className="flex flex-wrap items-center justify-center gap-x-1.5 text-[10px] text-muted-foreground pt-4 mt-4 border-t border-border/50">
                <span className="flex items-center gap-1">
                  <div className="w-4 h-4 rounded-full bg-emerald-100 flex items-center justify-center">
                    <Shield className="w-2.5 h-2.5 text-emerald-600" />
                  </div>
                  Secure
                </span>
                <span className="text-muted-foreground/50">·</span>
                <span>Licensed & Insured</span>
                <span className="text-muted-foreground/50">·</span>
                <span>No spam</span>
              </div>
            </motion.div>
          )}

          {/* Success Screen */}
          {isSubmitted && (
            <motion.div
              key="success"
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="py-6 text-center"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-16 h-16 mx-auto mb-5 rounded-full bg-emerald-100 flex items-center justify-center"
              >
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              </motion.div>
              
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 leading-snug">
                Awesome, {data.firstName.split(' ')[0]}—you're all set! 🎉
              </h3>
              
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4 max-w-sm mx-auto">
                We'll be reaching out very soon to get more details on your project and schedule your free consultation. Talk soon!
              </p>
              
              <p className="text-xs sm:text-sm text-muted-foreground mb-6">
                In the meantime, feel free to check out our website:{' '}
                <a 
                  href="https://14erenovations.com/home" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary hover:underline font-medium"
                >
                  14erenovations.com
                </a>
              </p>
              
              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground pt-3 border-t border-border/50">
                <Shield className="w-4 h-4" />
                <span>Your information is secure</span>
              </div>
            </motion.div>
          )}

          {/* Disqualification Screen - Out of State */}
          {isDisqualified && !isSubmitted && (
            <motion.div
              key="disqualified"
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="py-6 text-center"
            >
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-16 h-16 mx-auto mb-5 rounded-full bg-amber-100 flex items-center justify-center"
              >
                <MapPin className="w-8 h-8 text-amber-600" />
              </motion.div>
              
              <h3 className="text-base sm:text-lg font-semibold text-foreground mb-3 leading-snug">
                We Only Serve Colorado
              </h3>
              
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 max-w-sm mx-auto">
                Thank you for your interest in 14er Renovation! Unfortunately, we currently only serve homeowners in Colorado.
              </p>
              
              <p className="text-xs text-muted-foreground/70 italic">
                Think this is an error? Your ZIP code was: <strong>{data.zipCode}</strong>
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Quiz;
