import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  MapPin, Car, Trees, Footprints, HelpCircle, 
  Zap, Calendar, CalendarClock, Clock,
  ArrowRight, ArrowLeft, CheckCircle2, Shield, Phone,
  User, Mail, Loader2, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "@/hooks/use-toast";

type QuizStep = 1 | 2 | 3 | 4;

interface QuizData {
  projectType: string;
  timeline: string;
  zipCode: string;
  firstName: string;
  phone: string;
  email: string;
}

// Phone number formatter: (XXX) XXX-XXXX
const formatPhoneNumber = (value: string): string => {
  const digits = value.replace(/\D/g, '');
  if (digits.length <= 3) return digits;
  if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
};

const Quiz = () => {
  const [step, setStep] = useState<QuizStep>(1);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ firstName?: string; phone?: string }>({});
  const [data, setData] = useState<QuizData>({
    projectType: "",
    timeline: "",
    zipCode: "",
    firstName: "",
    phone: "",
    email: "",
  });

  const getProgressPercentage = () => {
    if (step === 1) return 25;
    if (step === 2) return 50;
    if (step === 3) return 75;
    if (step === 4) return 100;
    return 25;
  };

  // Auto-advance for tile selections
  const handleTileSelect = (field: string, value: string) => {
    setData({ ...data, [field]: value });
  };

  // Auto-advance: Step 1 (Project Type) → Step 2
  useEffect(() => {
    if (step === 1 && data.projectType) {
      setTimeout(() => setStep(2), 250);
    }
  }, [data.projectType, step]);

  // Auto-advance: Step 2 (Timeline) → Step 3
  useEffect(() => {
    if (step === 2 && data.timeline) {
      setTimeout(() => setStep(3), 250);
    }
  }, [data.timeline, step]);

  const handleNext = () => {
    if (step === 3 && data.zipCode.length >= 5) {
      setStep(4);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((step - 1) as QuizStep);
    }
  };

  const getProjectTypeLabel = (type: string): string => {
    switch (type) {
      case "driveway": return "Driveway";
      case "patio": return "Patio";
      case "walkway": return "Walkway";
      case "other": return "Other";
      default: return "";
    }
  };

  const getTimelineLabel = (timeline: string): string => {
    switch (timeline) {
      case "asap": return "ASAP / Right away";
      case "this-month": return "This month";
      case "2-3-months": return "Within 2-3 months";
      case "not-sure": return "Not sure";
      default: return "";
    }
  };

  // Validate form fields
  const validateForm = (): boolean => {
    const newErrors: { firstName?: string; phone?: string } = {};
    
    if (!data.firstName.trim()) {
      newErrors.firstName = "Name is required";
    }
    
    const phoneDigits = data.phone.replace(/\D/g, '');
    if (!phoneDigits) {
      newErrors.phone = "Phone is required";
    } else if (phoneDigits.length < 10) {
      newErrors.phone = "Enter a valid 10-digit phone number";
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsSubmitting(true);

    const phoneDigits = data.phone.replace(/\D/g, '');

    // Build payload with exact GoHighLevel field keys + duplicates for resilience
    const payload = {
      // GHL contact.* format (primary)
      "contact.first_name": data.firstName,
      "contact.email": data.email || "",
      "contact.phone": phoneDigits,
      "contact.what_is_your_zip_code": data.zipCode,
      "contact.what_type_of_project": getProjectTypeLabel(data.projectType),
      "contact.when_do_you_want_to_start": getTimelineLabel(data.timeline),
      // Plain keys (backup/duplicate)
      first_name: data.firstName,
      email: data.email || "",
      phone: phoneDigits,
      zip_code: data.zipCode,
      project_type: getProjectTypeLabel(data.projectType),
      timeline: getTimelineLabel(data.timeline),
    };

    console.log("Quiz payload prepared:", {
      projectType: payload.project_type,
      timeline: payload.timeline,
      zip: payload.zip_code,
      name: payload.first_name,
    });

    // IMMEDIATELY show success UI (mobile-safe: never wait for network)
    setIsSubmitted(true);
    setIsSubmitting(false);

    // Fire Facebook Lead event
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Lead');
    }

    // Send webhook in background (non-blocking)
    const webhookUrl = "https://services.leadconnectorhq.com/hooks/AUs946zIT71gT6ZZInpO/webhook-trigger/4303b213-285a-4588-88df-5909a8baed41";

    // Use fetch with keepalive - proper JSON headers, survives page navigation
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

  const handleStartOver = () => {
    setIsSubmitted(false);
    setStep(1);
    setData({
      projectType: "",
      timeline: "",
      zipCode: "",
      firstName: "",
      phone: "",
      email: "",
    });
  };

  const OptionTile = ({ 
    icon: Icon, 
    label, 
    selected, 
    onClick,
    iconBg = "bg-primary/10",
    iconColor = "text-primary"
  }: { 
    icon: React.ElementType; 
    label: string; 
    selected: boolean; 
    onClick: () => void;
    iconBg?: string;
    iconColor?: string;
  }) => (
    <button
      onClick={onClick}
      className={`quiz-tile flex flex-col items-center justify-center gap-3 p-4 sm:p-5 rounded-xl border-2 bg-white shadow-sm min-h-[100px] sm:min-h-[115px] w-full transition-all duration-300 hover:scale-[1.03] hover:shadow-md active:scale-[0.98] group ${
        selected 
          ? "border-primary bg-gradient-to-b from-primary/10 to-primary/5 shadow-[0_0_25px_-5px_hsl(var(--primary)/0.5)]" 
          : "border-slate-200 hover:border-primary/60"
      }`}
    >
      <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
        selected ? "bg-primary scale-110" : `${iconBg} group-hover:scale-105`
      }`}>
        <Icon className={`w-5 h-5 sm:w-6 sm:h-6 transition-colors duration-200 ${
          selected ? "text-primary-foreground" : iconColor
        }`} />
      </div>
      <span className={`text-sm sm:text-base font-medium text-center leading-tight transition-colors duration-200 ${
        selected ? "text-primary font-semibold" : "text-foreground"
      }`}>
        {label}
      </span>
    </button>
  );

  const slideVariants = {
    enter: { opacity: 0, x: 15 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -15 },
  };

  return (
    <div className="quiz-card-glass rounded-2xl shadow-quiz-glow p-6 sm:p-8 w-full max-w-lg border-2 border-primary/30">
      {/* Header with Program Branding - hide on Step 4 and Thank You */}
      {step < 4 && !isSubmitted && (
        <div className="text-center mb-7">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/20 to-primary/10 text-primary text-xs font-semibold uppercase tracking-wider px-4 py-2 rounded-full border border-primary/20 mb-3">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse"></span>
            Winter Upgrade Program
          </div>
          
        </div>
      )}

      {/* Progress indicator with step labels - hide on Step 4 and Thank You */}
      {!isSubmitted && step < 4 && (
        <div className="mb-6">
          <div className="flex justify-between text-xs text-muted-foreground mb-2 px-1">
            <span className={step >= 1 ? "text-primary font-medium" : ""}>Project</span>
            <span className={step >= 2 ? "text-primary font-medium" : ""}>Timeline</span>
            <span className={step >= 3 ? "text-primary font-medium" : ""}>Location</span>
            <span className={step >= 4 ? "text-primary font-medium" : ""}>Contact</span>
          </div>
          <div className="h-2.5 bg-slate-200 rounded-full overflow-hidden border border-slate-300">
            <div 
              className="progress-fill h-full bg-gradient-to-r from-primary to-primary/80 rounded-full transition-all duration-300"
              style={{ width: `${getProgressPercentage()}%` }}
            />
          </div>
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* Step 1: Project type */}
        {step === 1 && !isSubmitted && (
          <motion.div
            key="step1"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25 }}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6 leading-snug">What type of concrete project do you need?</h3>
            <div className="grid grid-cols-2 gap-4">
              <OptionTile
                icon={Car}
                label="Driveway"
                selected={data.projectType === "driveway"}
                onClick={() => handleTileSelect("projectType", "driveway")}
                iconBg="bg-slate-600/15"
                iconColor="text-slate-600"
              />
              <OptionTile
                icon={Trees}
                label="Patio"
                selected={data.projectType === "patio"}
                onClick={() => handleTileSelect("projectType", "patio")}
                iconBg="bg-amber-500/15"
                iconColor="text-amber-600"
              />
              <OptionTile
                icon={Footprints}
                label="Walkway"
                selected={data.projectType === "walkway"}
                onClick={() => handleTileSelect("projectType", "walkway")}
                iconBg="bg-cyan-500/15"
                iconColor="text-cyan-600"
              />
              <OptionTile
                icon={HelpCircle}
                label="Other"
                selected={data.projectType === "other"}
                onClick={() => handleTileSelect("projectType", "other")}
                iconBg="bg-violet-500/15"
                iconColor="text-violet-500"
              />
            </div>
          </motion.div>
        )}

        {/* Step 2: Timeline */}
        {step === 2 && !isSubmitted && (
          <motion.div
            key="step2"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25 }}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6 leading-snug">When are you looking to get started?</h3>
            <div className="grid grid-cols-2 gap-4 mb-4">
              <OptionTile
                icon={Zap}
                label="ASAP / Right away"
                selected={data.timeline === "asap"}
                onClick={() => handleTileSelect("timeline", "asap")}
                iconBg="bg-orange-500/15"
                iconColor="text-orange-500"
              />
              <OptionTile
                icon={Calendar}
                label="This month"
                selected={data.timeline === "this-month"}
                onClick={() => handleTileSelect("timeline", "this-month")}
                iconBg="bg-amber-500/15"
                iconColor="text-amber-600"
              />
              <OptionTile
                icon={CalendarClock}
                label="Within 2-3 months"
                selected={data.timeline === "2-3-months"}
                onClick={() => handleTileSelect("timeline", "2-3-months")}
                iconBg="bg-teal-500/15"
                iconColor="text-teal-600"
              />
              <OptionTile
                icon={Clock}
                label="Not sure"
                selected={data.timeline === "not-sure"}
                onClick={() => handleTileSelect("timeline", "not-sure")}
                iconBg="bg-slate-400/15"
                iconColor="text-slate-500"
              />
            </div>
            <Button variant="outline" size="lg" onClick={handleBack} className="px-4 h-12">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </motion.div>
        )}

        {/* Step 3: ZIP code */}
        {step === 3 && !isSubmitted && (
          <motion.div
            key="step3"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25 }}
          >
            <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-6 leading-snug">What's your zip code?</h3>
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
                  className="pl-11 h-14 text-base"
                  maxLength={5}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="lg" onClick={handleBack} className="px-4 h-12">
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <Button 
                variant="hero" 
                size="lg" 
                className="flex-1 h-12"
                disabled={data.zipCode.length < 5}
                onClick={handleNext}
              >
                Continue <ArrowRight className="w-5 h-5 ml-1" />
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 4: Contact form */}
        {step === 4 && !isSubmitted && (
          <motion.div
            key="step4"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25 }}
          >
            {/* Celebration Header */}
            <div className="text-center mb-5">
              <div className="text-3xl mb-1">🎉</div>
              <h3 className="text-lg sm:text-2xl font-bold text-foreground mb-1.5">
                Your ZIP Code Qualifies!
              </h3>
              <p className="text-sm text-muted-foreground leading-snug">
                Fill out the form below to schedule your free estimate and claim your $2,000 discount before spots fill up.
              </p>
            </div>

            {/* Social Proof */}
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
                    className={`pl-11 h-12 sm:h-14 text-base transition-all focus:shadow-md ${
                      errors.firstName ? 'border-red-500 focus-visible:ring-red-500' : ''
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
                    className={`pl-11 h-12 sm:h-14 text-base transition-all focus:shadow-md ${
                      errors.phone ? 'border-red-500 focus-visible:ring-red-500' : ''
                    }`}
                    maxLength={14}
                  />
                </div>
                {errors.phone && (
                  <p className="text-xs text-red-500 mt-1 pl-1">{errors.phone}</p>
                )}
              </div>
              <div className="relative">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Email (optional)"
                  value={data.email}
                  onChange={(e) => setData({ ...data, email: e.target.value })}
                  className="pl-11 h-12 sm:h-14 text-base transition-all focus:shadow-md"
                />
              </div>
            </div>

            <div className="flex gap-3 mb-4">
              <Button variant="outline" size="lg" onClick={handleBack} className="px-4 h-11 sm:h-12 flex-shrink-0" disabled={isSubmitting}>
                <ArrowLeft className="w-4 h-4" />
              </Button>
              <Button
                variant="cta" 
                size="lg" 
                className="flex-1 h-11 sm:h-12 text-sm sm:text-base font-semibold transition-all hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg"
                onClick={handleSubmit}
                disabled={isSubmitting}
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
            </div>

            {/* Trust Footer */}
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-0.5 text-[11px] text-muted-foreground pt-3 border-t border-border/50">
              <span className="flex items-center gap-1">🔒 Secure</span>
              <span className="text-muted-foreground/50">·</span>
              <span>Licensed & Insured</span>
              <span className="text-muted-foreground/50">·</span>
              <span>No spam</span>
            </div>
          </motion.div>
        )}

        {/* Thank You / Confirmation Screen */}
        {isSubmitted && (
          <motion.div
            key="submitted"
            variants={slideVariants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.25 }}
          >
            <div className="text-center py-6">
              {/* Animated checkmark with spring effect */}
              <motion.div 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-16 h-16 mx-auto mb-5 rounded-full bg-emerald-100 flex items-center justify-center"
              >
                <CheckCircle2 className="w-8 h-8 text-emerald-600" />
              </motion.div>
              
              {/* Personalized headline */}
              <h3 className="text-xl sm:text-2xl font-bold text-foreground mb-3 leading-snug">
                Thanks, {data.firstName}!
              </h3>
              
              {/* Clear next steps with timeline */}
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-6 max-w-sm mx-auto">
                A local team member will contact you <span className="font-medium text-foreground">within 24 hours</span> to schedule your free estimate.
              </p>
              
              {/* Trust footer */}
              <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground pt-3 border-t border-border/50">
                <Shield className="w-4 h-4" />
                <span>Your information is secure</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Quiz;
