import logoNahb from "@/assets/logo-nahb.png";
import logoHomeadvisor from "@/assets/logo-homeadvisor-elite.png";
import logoQualifiedRemodeler from "@/assets/logo-qualified-remodeler.png";
import logoInstallationMasters from "@/assets/logo-installation-masters.png";
import logoEnergyStar from "@/assets/logo-energy-star.png";
import logoBbb from "@/assets/logo-bbb.png";

const TrustBadgesSection = () => {
  const logos = [
    { src: logoNahb, alt: "NAHB Member" },
    { src: logoHomeadvisor, alt: "HomeAdvisor Elite Service" },
    { src: logoBbb, alt: "BBB A+ Rated" },
    { src: logoQualifiedRemodeler, alt: "Qualified Remodeler Top 500 2025" },
    { src: logoInstallationMasters, alt: "Installation Masters" },
    { src: logoEnergyStar, alt: "Energy Star Partner" },
  ];

  // Double the logos for seamless loop
  const allLogos = [...logos, ...logos];

  return (
    <section className="py-6 bg-gray-50/80 border-y border-gray-100 overflow-hidden">
      <p className="text-center text-xs text-muted-foreground uppercase tracking-widest mb-4 font-medium">
        Trusted & Certified
      </p>
      <div className="flex w-max animate-scroll">
        {allLogos.map((logo, index) => (
          <div
            key={`${logo.alt}-${index}`}
            className="flex-shrink-0 flex items-center justify-center px-8 sm:px-12 min-w-[140px] sm:min-w-[180px]"
          >
            <img
              src={logo.src}
              alt={logo.alt}
              className="h-14 sm:h-18 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
              loading="lazy"
              decoding="async"
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TrustBadgesSection;
