import { Star, Shield, Award, MapPin, BadgeCheck } from "lucide-react";

const TrustBadgesCarousel = () => {
  const badges = [
    {
      icon: Star,
      text: "Google ★★★★★",
      subtext: "5-Star Rated",
    },
    {
      icon: Award,
      text: "BBB Accredited",
      subtext: "A+ Rating",
    },
    {
      icon: Shield,
      text: "Licensed & Insured",
      subtext: "Fully Protected",
    },
    {
      icon: MapPin,
      text: "Trusted in Colorado",
      subtext: "Local Crew",
    },
    {
      icon: BadgeCheck,
      text: "1-Year Warranty",
      subtext: "Guaranteed",
    },
  ];

  // Double the badges for seamless loop
  const allBadges = [...badges, ...badges];

  return (
    <div className="py-4 overflow-hidden">
      <div className="flex animate-scroll">
        {allBadges.map((badge, index) => (
          <div
            key={index}
            className="flex items-center gap-3 px-6 sm:px-8 whitespace-nowrap"
          >
            <div className="w-10 h-10 rounded-full bg-hero-foreground/10 flex items-center justify-center flex-shrink-0">
              <badge.icon className="w-5 h-5 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-hero-foreground">{badge.text}</span>
              <span className="text-xs text-hero-foreground/60">{badge.subtext}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrustBadgesCarousel;
