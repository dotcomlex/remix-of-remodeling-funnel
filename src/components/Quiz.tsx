import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, ChefHat, Bath, Home, HelpCircle, 
  Zap, Calendar, CalendarClock, Clock,
  ArrowRight, ArrowLeft, CheckCircle2, Shield, Phone,
  User, Mail, Loader2, Star, Sparkles, Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type QuizStep = 1 | 2 | 3 | 4 | 5;

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

const Quiz = () => {
  const [step, setStep] = useState(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ firstName?: string; phone?: string; email?: string }>({});
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
    setData({ ...data, [field]: value });
  };

  // Auto-advance logic with 300ms delay
  useEffect(() => {
    if (step === 1 && data.projectType) {
      setTimeout(() => setStep(2), 300);
    }
  }, [data.projectType, step]);

  useEffect(() => {
    if (step === 2 && data.timeline) {
      setTimeout(() => setStep(3), 300);
    }
  }, [data.timeline, step]);

  useEffect(() => {
    if (step === 3 && data.budgetRange) {
      setTimeout(() => setStep(4), 300);
    }
  }, [data.budgetRange, step]);

  const handleNext = () => {
    if (step === 4 && data.zipCode.length >= 5) {
      setStep(5);
    }
  };

  const handleBack = () => {
    if (step > 1 && step < 5) {
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
      case "asap": return "Within 2 weeks (ASAP)";
      case "30-days": return "Within 30 days";
      case "1-3-months": return "1-3 months";
      case "exploring": return "Not Sure";
      default: return "";
    }
  };

  const getBudgetLabel = (budget: string): string => {
    switch (budget) {
      case "under-25k": return "Under $25,000";
      case "25k-50k": return "$25,000 - $50,000";
      case "50k-plus": return "$50,000+";
      case "not-sure": return "Not sure yet";
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
    } else if (phoneDigits.length < 10) {
      newErrors.phone = "Enter a valid 10-digit phone number";
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

  // OptionCard with horizontal layout, accent colors, and checkmark indicator
  const OptionCard = ({ 
    icon: Icon, 
    label, 
    selected, 
    onClick,
    accentColor = "text-primary"
  }: { 
    icon: React.ElementType; 
    label: string; 
    selected: boolean; 
    onClick: () => void;
    accentColor?: string;
  }) => (
    <button
      onClick={onClick}
      className={`relative flex flex-col items-center justify-center gap-2 p-3 sm:p-4 rounded-xl border-2 bg-white w-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] group ${
        selected 
          ? "border-primary bg-gradient-to-r from-primary/10 to-primary/5 shadow-md" 
          : "border-slate-200 hover:border-primary/50 shadow-sm"
      }`}
    >
      <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
        selected 
          ? "bg-primary" 
          : "bg-slate-100 group-hover:bg-slate-200"
      }`}>
        <Icon className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-200 ${
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

  // BudgetCard - simple text-only cards
  const BudgetCard = ({ 
    label, 
    value,
    selected, 
    onClick 
  }: { 
    label: string;
    value: string;
    selected: boolean; 
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`relative flex items-center justify-center p-3 sm:p-4 rounded-xl border-2 bg-white w-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] ${
        selected 
          ? "border-primary bg-gradient-to-r from-primary/10 to-primary/5 shadow-md" 
          : "border-slate-200 hover:border-primary/50 shadow-sm"
      }`}
    >
      <span className={`text-base sm:text-lg font-medium transition-colors duration-200 ${
        selected ? "text-primary" : "text-foreground"
      }`}>
        {label}
      </span>
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
      {/* Simple Progress Dots */}
      {!isSubmitted && (
        <div className="flex justify-center gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((dotStep) => (
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

      {/* Quiz Card */}
      <div className="quiz-card-glass rounded-2xl shadow-quiz-glow p-4 sm:p-6 w-full border-2 border-primary/30">

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
              <h3 className="text-lg sm:text-xl font-medium text-foreground mb-5 text-center leading-snug">
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
          {step === 2 && !isSubmitted && (
            <motion.div
              key="step2"
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
            >
              <h3 className="text-lg sm:text-xl font-medium text-foreground mb-5 text-center leading-snug">
                When do you want to start?
              </h3>
              <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4">
                <OptionCard
                  icon={Zap}
                  label="Within 2 weeks (ASAP)"
                  selected={data.timeline === "asap"}
                  onClick={() => handleTileSelect("timeline", "asap")}
                  accentColor="text-red-600"
                />
                <OptionCard
                  icon={Calendar}
                  label="Within 30 days"
                  selected={data.timeline === "30-days"}
                  onClick={() => handleTileSelect("timeline", "30-days")}
                  accentColor="text-orange-600"
                />
                <OptionCard
                  icon={CalendarClock}
                  label="1-3 months"
                  selected={data.timeline === "1-3-months"}
                  onClick={() => handleTileSelect("timeline", "1-3-months")}
                  accentColor="text-teal-600"
                />
                <OptionCard
                  icon={Clock}
                  label="Not Sure"
                  selected={data.timeline === "exploring"}
                  onClick={() => handleTileSelect("timeline", "exploring")}
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

          {/* Step 3: Budget - 4 OPTIONS */}
          {step === 3 && !isSubmitted && (
            <motion.div
              key="step3"
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
            >
              <h3 className="text-lg sm:text-xl font-medium text-foreground mb-5 text-center leading-snug">
                What's your budget range?
              </h3>
              <div className="grid grid-cols-2 gap-2 sm:gap-3 mb-4">
                <BudgetCard
                  label="Under $25,000"
                  value="under-25k"
                  selected={data.budgetRange === "under-25k"}
                  onClick={() => handleTileSelect("budgetRange", "under-25k")}
                />
                <BudgetCard
                  label="$25,000 - $50,000"
                  value="25k-50k"
                  selected={data.budgetRange === "25k-50k"}
                  onClick={() => handleTileSelect("budgetRange", "25k-50k")}
                />
                <BudgetCard
                  label="$50,000+"
                  value="50k-plus"
                  selected={data.budgetRange === "50k-plus"}
                  onClick={() => handleTileSelect("budgetRange", "50k-plus")}
                />
                <BudgetCard
                  label="Not sure yet"
                  value="not-sure"
                  selected={data.budgetRange === "not-sure"}
                  onClick={() => handleTileSelect("budgetRange", "not-sure")}
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

          {/* Step 4: ZIP Code */}
          {step === 4 && !isSubmitted && (
            <motion.div
              key="step4"
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
            >
              <h3 className="text-lg sm:text-xl font-medium text-foreground mb-5 text-center leading-snug">
                What's your zip code?
              </h3>
              <div className="mb-5">
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    placeholder="Enter ZIP code"
                    value={data.zipCode}
                    onChange={(e) => setData({ ...data, zipCode: e.target.value.replace(/\D/g, '') })}
                    className="pl-12 h-14 text-lg rounded-xl border-2 focus:border-primary"
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

          {/* Step 5: Contact Form */}
          {step === 5 && !isSubmitted && (
            <motion.div
              key="step5"
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
            >
              {/* Celebration Header */}
              <div className="text-center mb-5">
                <span className="text-3xl mb-1 block">🎉</span>
                <h3 className="text-base sm:text-xl font-semibold text-foreground mb-1.5">
                  Your ZIP Code Qualifies!
                </h3>
                <p className="text-sm text-muted-foreground leading-snug max-w-sm mx-auto">
                  Fill out the form below to schedule your free estimate and claim your{" "}
                  <span className="font-semibold text-primary">$2,000 discount</span> before spots fill up.
                </p>
              </div>

              {/* Social Proof Badge */}
              <div className="flex items-center justify-center gap-1.5 mb-5">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-medium text-foreground/70">
                  200+ Colorado homeowners
                </span>
              </div>
              
              {/* Form Fields */}
              <div className="space-y-3 mb-5">
                <div>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="First name"
                      value={data.firstName}
                      onChange={(e) => {
                        setData({ ...data, firstName: e.target.value });
                        if (errors.firstName) setErrors({ ...errors, firstName: undefined });
                      }}
                      className={`pl-12 h-14 text-base rounded-xl border-2 transition-all ${
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
                    <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="tel"
                      inputMode="tel"
                      placeholder="(555) 123-4567"
                      value={data.phone}
                      onChange={(e) => {
                        setData({ ...data, phone: formatPhoneNumber(e.target.value) });
                        if (errors.phone) setErrors({ ...errors, phone: undefined });
                      }}
                      className={`pl-12 h-14 text-base rounded-xl border-2 transition-all ${
                        errors.phone ? 'border-red-500 focus:border-red-500' : 'focus:border-primary'
                      }`}
                      maxLength={14}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-xs text-red-500 mt-1 pl-1">{errors.phone}</p>
                  )}
                </div>
                
                <div>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Email"
                      value={data.email}
                      onChange={(e) => {
                        setData({ ...data, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      className={`pl-12 h-14 text-base rounded-xl border-2 transition-all ${
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
                className="w-full h-14 text-base font-semibold bg-gradient-to-r from-primary to-orange-500 hover:from-primary/90 hover:to-orange-500/90 text-white rounded-xl shadow-lg"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  "Get My Free Estimate"
                )}
              </Button>

              {/* Back Button */}
              <button
                onClick={handleBack}
                disabled={isSubmitting}
                className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors flex items-center justify-center gap-1 mt-3"
              >
                <ArrowLeft className="w-4 h-4" />
                Go back
              </button>

              {/* Trust Footer - Enhanced */}
              <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-[11px] text-muted-foreground pt-4 mt-4 border-t border-border/50">
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
              
              <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-3 leading-snug">
                Thanks, {data.firstName}!
              </h3>
              
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 max-w-sm mx-auto">
                A local team member will contact you{" "}
                <span className="font-medium text-foreground">within 24 hours</span> to schedule your free consultation.
              </p>
              
              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground pt-3 border-t border-border/50">
                <Shield className="w-4 h-4" />
                <span>Your information is secure</span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Quiz;
