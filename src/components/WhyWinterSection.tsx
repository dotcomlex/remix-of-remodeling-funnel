import { Sparkles, Clock, Sun } from "lucide-react";

const WhyWinterSection = () => {
  const reasons = [
    {
      icon: Sparkles,
      title: "Save $2,000 This Season",
      description: "Take advantage of our Winter Upgrade Program and invest those savings into your home.",
    },
    {
      icon: Sun,
      title: "Ready for Spring",
      description: "Enjoy your beautiful new driveway, patio, or walkway the moment warm weather arrives.",
    },
    {
      icon: Clock,
      title: "Skip the Spring Rush",
      description: "Get started sooner with faster scheduling. Your project starts when it works for you.",
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800 relative overflow-hidden">
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            Smart Timing
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            Why Now Is the <span className="text-primary">Perfect Time</span>
          </h2>
          <p className="text-base sm:text-lg text-slate-300 mb-10 max-w-2xl mx-auto">
            Don't wait until spring when schedules fill up. Get your project done now and be the envy of your neighborhood.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {reasons.map((reason, index) => (
              <div
                key={index}
                className="bg-slate-700/50 backdrop-blur-sm rounded-xl p-6 border border-slate-600/50 shadow-md hover:shadow-lg hover:bg-slate-700/70 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center mb-4 mx-auto">
                  <reason.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{reason.title}</h3>
                <p className="text-sm text-slate-300 leading-relaxed">{reason.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyWinterSection;