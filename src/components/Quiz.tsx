import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, ChefHat, Bath, Home, HelpCircle, 
  Zap, Calendar, CalendarClock, Clock,
  ArrowRight, ArrowLeft, CheckCircle2, Shield, Phone,
  User, Mail, Loader2, Star, Check, Award, Gem
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

// Trust Bar Component
const TrustBar = () => (
  <div className="bg-slate-50 border border-slate-200 rounded-xl py-2.5 px-3 mb-3">
    {/* Desktop: single row */}
    <div className="hidden sm:flex items-center justify-center gap-4 text-xs text-gray-600">
      <span className="flex items-center gap-1">
        <span className="text-amber-400">★★★★★</span> 200+ Google Reviews
      </span>
      <span className="text-gray-300">|</span>
      <span className="flex items-center gap-1">
        <Award className="w-3.5 h-3.5 text-primary" /> A+ BBB Rated
      </span>
      <span className="text-gray-300">|</span>
      <span className="flex items-center gap-1">
        <Shield className="w-3.5 h-3.5 text-primary" /> Licensed & Insured
      </span>
      <span className="text-gray-300">|</span>
      <span className="flex items-center gap-1">
        <CheckCircle2 className="w-3.5 h-3.5 text-primary" /> 15+ Years in Colorado
      </span>
    </div>
    {/* Mobile: 2 rows */}
    <div className="sm:hidden flex flex-col gap-1.5 text-xs text-gray-600">
      <div className="flex items-center justify-center gap-3">
        <span className="flex items-center gap-1">
          <span className="text-amber-400">★★★★★</span> 200+ Reviews
        </span>
        <span className="text-gray-300">|</span>
        <span>A+ BBB Rated</span>
      </div>
      <div className="flex items-center justify-center gap-3">
        <span>Licensed & Insured</span>
        <span className="text-gray-300">|</span>
        <span>15+ Years</span>
      </div>
    </div>
  </div>
);

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
      case "yes": return "Yes, I know my budget";
      case "not-yet": return "Not yet, need guidance";
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

  // BudgetOptionCard - larger with icon and subtext
  const BudgetOptionCard = ({ 
    icon: Icon, 
    label, 
    subtext,
    selected, 
    onClick 
  }: { 
    icon: React.ElementType;
    label: string;
    subtext: string;
    selected: boolean; 
    onClick: () => void;
  }) => (
    <button
      onClick={onClick}
      className={`relative flex items-center gap-4 p-4 rounded-xl border-2 bg-white w-full min-h-[90px] transition-all duration-300 hover:scale-[1.02] hover:shadow-lg active:scale-[0.98] group ${
        selected 
          ? "border-primary bg-gradient-to-r from-primary/10 to-primary/5 shadow-md" 
          : "border-slate-200 hover:border-primary/50 shadow-sm"
      }`}
    >
      <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 transition-all duration-300 ${
        selected ? "bg-primary" : "bg-slate-100 group-hover:bg-slate-200"
      }`}>
        <Icon className={`w-6 h-6 transition-colors duration-200 ${
          selected ? "text-primary-foreground" : "text-primary"
        }`} />
      </div>
      <div className="text-left">
        <span className={`text-base font-medium block ${selected ? "text-primary" : "text-foreground"}`}>
          {label}
        </span>
        <span className="text-sm text-muted-foreground">{subtext}</span>
      </div>
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
      {/* Trust Bar - Above Progress Dots */}
      {!isSubmitted && <TrustBar />}

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
      <div className="quiz-card-glass rounded-2xl shadow-quiz-glow p-5 sm:p-6 w-full border border-primary/20">

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
              {/* Quiz Header - Step 1 only */}
              <div className="text-center mb-4">
                <p className="text-sm font-semibold text-foreground mb-1">
                  Answer 5 Quick Questions to Claim Your $2,000 Discount
                </p>
                <p className="text-xs text-muted-foreground flex items-center justify-center gap-1">
                  <Clock className="w-3 h-3" /> Takes About 60 Seconds
                </p>
              </div>

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
          {step === 2 && !isSubmitted && (
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
                  badge="Most Popular"
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

          {/* Step 3: Budget - 2 OPTIONS */}
          {step === 3 && !isSubmitted && (
            <motion.div
              key="step3"
              variants={cardVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.25 }}
            >
              <h3 className="text-base sm:text-lg font-medium text-foreground mb-4 text-center leading-tight">
                Do you have a set budget for this project?
              </h3>
              <div className="flex flex-col gap-3 mb-4">
                <BudgetOptionCard
                  icon={Gem}
                  label="Yes, I know my budget"
                  subtext="We'll match your vision to your investment"
                  selected={data.budgetRange === "yes"}
                  onClick={() => handleTileSelect("budgetRange", "yes")}
                />
                <BudgetOptionCard
                  icon={HelpCircle}
                  label="Not yet, need guidance"
                  subtext="We'll help you determine the best investment"
                  selected={data.budgetRange === "not-yet"}
                  onClick={() => handleTileSelect("budgetRange", "not-yet")}
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
                    className="pl-10 h-12 text-[15px] rounded-xl border-2 focus:border-primary"
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
              <div className="text-center mb-4">
                <span className="text-2xl mb-0.5 block">🎉</span>
                <h3 className="text-[15px] sm:text-lg font-semibold text-foreground mb-1.5">
                  CONGRATULATIONS! You Qualify for the $2,000 Discount
                </h3>
                <p className="text-sm text-muted-foreground leading-snug max-w-sm mx-auto mb-3">
                  Complete the form below to reserve your consultation and lock in:
                </p>
                <div className="text-left max-w-xs mx-auto space-y-1 mb-2">
                  <p className="text-sm text-foreground flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    <span><span className="font-semibold text-primary">$2,000 OFF</span> Your Remodeling Project</span>
                  </p>
                  <p className="text-sm text-foreground flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    FREE In-Home Consultation & Estimate
                  </p>
                  <p className="text-sm text-foreground flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                    1-Year Warranty Included
                  </p>
                </div>
                <p className="text-xs font-semibold text-orange-600 flex items-center justify-center gap-1">
                  <Zap className="w-3.5 h-3.5" /> Only 7 spots remaining this month
                </p>
              </div>

              {/* Social Proof Badge */}
              <div className="flex items-center justify-center gap-1.5 mb-4">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-medium text-foreground/70">
                  200+ homeowners
                </span>
              </div>
              
              {/* Form Fields */}
              <div className="space-y-2.5 mb-4">
                <div>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="text"
                      placeholder="First name"
                      value={data.firstName}
                      onChange={(e) => {
                        setData({ ...data, firstName: e.target.value });
                        if (errors.firstName) setErrors({ ...errors, firstName: undefined });
                      }}
                      className={`pl-10 h-12 text-[15px] rounded-xl border-2 transition-all ${
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
                        setData({ ...data, phone: formatPhoneNumber(e.target.value) });
                        if (errors.phone) setErrors({ ...errors, phone: undefined });
                      }}
                      className={`pl-10 h-12 text-[15px] rounded-xl border-2 transition-all ${
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
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      type="email"
                      placeholder="Email"
                      value={data.email}
                      onChange={(e) => {
                        setData({ ...data, email: e.target.value });
                        if (errors.email) setErrors({ ...errors, email: undefined });
                      }}
                      className={`pl-10 h-12 text-[15px] rounded-xl border-2 transition-all ${
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
                  <>
                    <span className="hidden sm:inline">Claim My $2,000 Discount</span>
                    <span className="sm:hidden">Claim Discount</span>
                  </>
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
                🎉 SUCCESS! Your $2,000 Discount is Reserved, {data.firstName}!
              </h3>
              
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 max-w-sm mx-auto">
                We'll be contacting you very soon to schedule your free consultation.
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
