import { Shield, DollarSign, MapPin } from "lucide-react";

const WhyChooseSection = () => {
  const cards = [
    {
      icon: Shield,
      title: "Licensed & Insured",
      description: "Your project is fully protected from start to finish.",
    },
    {
      icon: DollarSign,
      title: "Transparent Pricing",
      description: "Clear, upfront quotes with no hidden fees or surprises.",
    },
    {
      icon: MapPin,
      title: "Local Colorado Crew",
      description: "A trusted team that treats your home like their own.",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-slate-100 via-slate-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <span className="inline-block text-secondary font-semibold text-sm uppercase tracking-wider mb-3">
            Why Homeowners Trust Us
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Quality That <span className="text-primary">Matters</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {cards.map((card, index) => (
            <div
              key={index}
              className="group bg-card rounded-2xl p-6 shadow-card hover:shadow-elevated transition-all duration-300 border border-border/50 hover:-translate-y-1 text-center"
            >
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform mx-auto">
                <card.icon className="w-6 h-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{card.title}</h3>
              <p className="text-sm text-muted-foreground">{card.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseSection;
