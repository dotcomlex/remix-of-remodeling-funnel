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
      "The $2,000 discount applies to any remodeling project - kitchens, bathrooms, basements, or combinations. Projects must be scheduled by January 31st to qualify for this limited-time offer.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-12 sm:py-16 bg-muted/50">
      <div className="container max-w-3xl px-4">
        <h2 className="text-xl sm:text-2xl font-semibold text-center mb-6 sm:mb-8">
          Frequently Asked Questions
        </h2>
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={`item-${index}`} className="border-border/50">
              <AccordionTrigger className="text-left text-sm sm:text-base font-medium hover:no-underline py-3 sm:py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-sm text-muted-foreground pb-3 sm:pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
