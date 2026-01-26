import logo from "@/assets/14er-logo.png";

const Footer = () => {
  return (
    <footer className="py-8 sm:py-10 bg-hero text-hero-foreground/60">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <img src={logo} alt="14er Renovations" className="h-12 sm:h-14 w-auto" />
          
          <p className="text-xs sm:text-sm text-center md:text-left">
            © {new Date().getFullYear()} 14er Renovation. All rights reserved. Serving Colorado homeowners.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
