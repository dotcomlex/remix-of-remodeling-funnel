import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "What types of concrete projects do you handle?",
    answer:
      "We handle a wide range of concrete projects, including residential and commercial work. This includes driveways, patios, walkways, foundations, slabs, and other concrete installations.",
  },
  {
    question: "What does the free estimate include?",
    answer:
      "Your free estimate includes an on-site walkthrough, measurements, project discussion, and clear upfront pricing. There's no obligation and no pressure.",
  },
  {
    question: "Are you licensed and insured?",
    answer:
      "Yes. We are fully licensed and insured, including liability and workers' compensation. This protects you, your property, and ensures the work meets local requirements.",
  },
  {
    question: "Can concrete be installed during colder months?",
    answer:
      "Yes. Concrete can be installed during colder weather when proper techniques are used. We follow proven methods to ensure durability and long-term performance.",
  },
  {
    question: "When can I schedule my project?",
    answer:
      "Projects can be scheduled year-round, including winter, spring, and summer. In some cases, current promotions may still apply to future scheduled work.",
  },
  {
    question: "How long does a typical concrete project take?",
    answer:
      "Project timelines vary based on size and scope, but many residential and commercial projects are completed within a few days. We'll review timing during your estimate.",
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
