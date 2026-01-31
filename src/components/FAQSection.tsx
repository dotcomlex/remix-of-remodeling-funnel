import { Link } from "react-router-dom";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What types of remodeling projects do you handle?",
    answer:
      "We specialize in kitchens, bathrooms, basements, home additions, and whole-home remodels. Whether it's a single room refresh or a complete transformation, we handle projects of all sizes.",
  },
  {
    question: "What does the free in-home consultation include?",
    answer:
      "Your free in-home consultation includes an on-site walkthrough, detailed project discussion, design recommendations, material options, and a clear upfront quote. There's no obligation and no pressure.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "Yes. We are fully licensed and insured, including liability and workers' compensation. This protects you, your property, and ensures all work meets local building codes and requirements.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "We serve major cities throughout Colorado including Denver, Boulder, Fort Collins, Colorado Springs, Aurora, Lakewood, Arvada, and surrounding areas. If you're located in Colorado, we can likely help - just enter your zip code in our qualification form to confirm.",
  },
  {
    question: "Can you help with design and material selection?",
    answer:
      "Absolutely! During your free consultation, we'll provide design recommendations, show you material samples, and help you choose options that fit your style and budget. We can also create mockup designs so you can see exactly how your project will look before we start. We'll guide you through every decision to ensure you love the final result.",
  },
  {
    question: "What does the $2,000 Winter Upgrade Program discount apply to?",
    answer:
      "The $2,000 discount applies to any remodeling project - kitchens, bathrooms, basements, or combinations.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-white to-slate-50">
      <div className="container max-w-4xl px-4">
        {/* Header */}
        <div className="text-center mb-10 lg:mb-14">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-semibold mb-4">
            <MessageCircle className="w-4 h-4" />
            Common Questions
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Everything you need to know about working with 14er Renovation
          </p>
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white rounded-xl shadow-sm border border-slate-100 px-6 transition-shadow hover:shadow-md"
            >
              <AccordionTrigger className="text-left text-base sm:text-lg font-semibold text-slate-800 hover:text-primary hover:no-underline py-5">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-base text-slate-600 pb-5 leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Inline CTA - matches hero button style */}
        <div className="flex justify-center mt-10 sm:mt-12">
          <motion.div className="animate-subtle-rock">
            <Link to="/qualify">
              <Button 
                variant="cta" 
                size="xl" 
                className="group shadow-2xl text-lg px-8 py-6 animate-cta-glow"
              >
                Check Availability Now
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
