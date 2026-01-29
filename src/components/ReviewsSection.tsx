import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import heroImage from "@/assets/hero-colorado-home.png";
import { Button } from "@/components/ui/button";
import avatar1 from "@/assets/avatar-1.jpg";
import avatar2 from "@/assets/avatar-2.jpg";
import avatar3 from "@/assets/avatar-3.jpg";
import avatar4 from "@/assets/avatar-4.jpg";
import avatar5 from "@/assets/avatar-5.jpg";
import avatar6 from "@/assets/avatar-6.jpg";
import avatar7 from "@/assets/avatar-7.jpg";
import avatar8 from "@/assets/avatar-8.jpg";
import avatar9 from "@/assets/avatar-9.jpg";

const ReviewsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(1);

  const reviews = [
    {
      name: "Michael R.",
      location: "Denver, CO",
      avatar: avatar1,
      rating: 5,
      text: "Juan and the 14er crew completely transformed our outdated 1980s kitchen into a modern dream space. They ripped out everything - old cabinets, laminate counters, fluorescent lights - and rebuilt it from scratch. New shaker cabinets, quartz countertops, subway tile backsplash, under-cabinet lighting, the works. They were professional, showed up on time every single day at 7:30am, and cleaned up before leaving. The quality is outstanding. We're cooking more than ever now because the kitchen actually makes us want to be in there!",
    },
    {
      name: "Sarah M.",
      location: "Boulder, CO",
      avatar: avatar2,
      rating: 5,
      text: "We had a tiny 1960s bathroom that was basically unusable - old pink tile, cramped shower, no storage. Juan's team gutted it down to the studs and rebuilt everything. They relocated plumbing to fit a walk-in shower with beautiful marble tile, added a floating vanity with tons of storage, installed a heated floor (game changer in winter!), and added recessed lighting. Juan explained every step clearly and his crew was so respectful of our home - they covered everything with plastic, used our side entrance, never tracked dirt. The attention to detail is incredible. It's like having a spa in our house now.",
    },
    {
      name: "James T.",
      location: "Fort Collins, CO",
      avatar: avatar3,
      rating: 5,
      text: "We hired 14er to finish our entire 1200 sq ft basement - framing, drywall, electrical, plumbing, flooring, everything. They built us a full guest bedroom, a 3/4 bathroom, a home theater area, and a small kitchenette. Came in ahead of schedule and under the original estimate because they planned it so well upfront. The craftsmanship is absolutely top-notch - perfectly straight walls, clean electrical work, beautiful tile in the bathroom. Our neighbors have been asking who did the work because it looks so professional. Already had three people at our Super Bowl party ask for Juan's number!",
    },
    {
      name: "Linda K.",
      location: "Littleton, CO",
      avatar: avatar4,
      rating: 5,
      text: "After getting quotes from five different contractors, Juan stood out immediately for his honesty and expertise. We did a combo project - kitchen and master bathroom - and it was a big investment. He never tried to upsell us on things we didn't need, gave us options at different price points, and his quote was extremely detailed so we knew exactly what we were paying for. The work took 9 weeks and they hit every milestone on schedule. Kitchen has white shaker cabinets, gray quartz, stainless appliances, and the bathroom has a gorgeous walk-in shower with floor-to-ceiling tile. Worth every penny and we have zero regrets.",
    },
    {
      name: "David & Rachel P.",
      location: "Aurora, CO",
      avatar: avatar5,
      rating: 5,
      text: "We wanted to convert our garage into a home office/gym space and everyone said it was too complicated. Juan came out, looked at it, and had a plan within a week. His team insulated, drywalled, added heating and AC, built in custom shelving, ran electrical for outlets and overhead lighting, and installed luxury vinyl plank flooring. The whole project took 5 weeks and now we have a beautiful 400 sq ft space that we use every day. From initial consultation to final walkthrough, everything was stress-free. The team was clean, hardworking, and Juan followed up multiple times to make sure we were 100% happy. This is how remodeling should be done!",
    },
    {
      name: "Carlos G.",
      location: "Lakewood, CO",
      avatar: avatar6,
      rating: 5,
      text: "We had our master bathroom completely remodeled in January - tore out old tub, old vanity, old tile, everything. They installed a huge walk-in shower with a rain head and hand spray, double vanity with quartz tops, heated tile floor, and modern fixtures throughout. The tile work alone is museum-quality - perfectly level, tight grout lines, no lippage. It's been over a year now and everything still looks and works perfectly. Juan's team doesn't cut corners. They did things right the first time - proper waterproofing, quality materials, clean plumbing work. True professionals who stand behind their work 100%.",
    },
    {
      name: "Jennifer & Tom H.",
      location: "Castle Rock, CO",
      avatar: avatar7,
      rating: 5,
      text: "Finishing our basement was the best decision we've made for our home. 14er turned our cold, dark, concrete dungeon into a beautiful living space - bedroom, full bathroom, family room, and wet bar. Added egress windows for safety, proper insulation, radiant floor heating, and the tile work in the bathroom is stunning. The space added so much value to our home and it's where our family spends most of our time now. The team was efficient, respectful of our property, and the finished product looks like something out of a magazine. Our realtor said it probably added $60-80k to our home value.",
    },
    {
      name: "Robert S.",
      location: "Arvada, CO",
      avatar: avatar8,
      rating: 5,
      text: "This is our third project with 14er - first was kitchen (5 years ago), then our master bath (3 years ago), now we just had them finish our basement. Same excellent experience every time. Juan treats every single project like it's his own home - he's meticulous about details, uses quality materials, and his crews are professional craftsmen, not just laborers. We've referred probably 10 friends to him at this point and every single one has thanked us. Already planning our next remodel (sunroom addition) and won't even call anyone else. When you find someone this good, you stick with them!",
    },
    {
      name: "Lisa W.",
      location: "Thornton, CO",
      avatar: avatar9,
      rating: 5,
      text: "I was so nervous about doing a major kitchen renovation - I'd heard horror stories from friends about contractors who disappeared, went over budget, left messes. Juan and 14er were the complete opposite. They gutted our old kitchen down to the studs, moved some walls to open it up, installed all new cabinets (soft-close everything!), granite countertops, new appliances, tile backsplash, pendant lighting, and refinished the hardwood floors. Took 7 weeks exactly like they said. They showed up every day, communicated constantly, and left the house clean every night. The quality is exceptional - cabinets are perfectly level, tile is perfectly aligned, everything just works. Our kitchen went from the worst room in the house to the absolute best. Worth every penny!",
    },
    {
      name: "Kevin & Amy D.",
      location: "Centennial, CO",
      avatar: avatar1,
      rating: 5,
      text: "We had two bathrooms that were straight out of the 1970s - harvest gold tile, old fiberglass tubs, terrible lighting. 14er renovated both at the same time over 6 weeks. Both got walk-in showers with beautiful porcelain tile, new vanities, modern mirrors, upgraded lighting, and exhaust fans that actually work. They worked around our schedules (we have three kids so mornings were crazy), protected the rest of the house with plastic barriers, and were so respectful of our space. The attention to detail in the tile work is incredible - you can tell these guys take pride in their craft. Both bathrooms look like spa retreats now. Best home investment we've made!",
    },
    {
      name: "Patricia N.",
      location: "Westminster, CO",
      avatar: avatar2,
      rating: 5,
      text: "Our basement was just cold concrete and storage for 15 years. Juan and his team transformed it into a beautiful 1-bedroom guest suite with full bathroom and living area. They handled everything - framing, electrical, plumbing, drywall, painting, flooring, trim work. Built a proper egress window for code, added a full bathroom with stand-up shower and beautiful tile, installed luxury vinyl throughout, and even built custom closets. The space is so nice that my in-laws actually ask to stay with us now instead of getting a hotel! Project took 8 weeks and they were here every single day making progress. Quality workmanship from start to finish.",
    },
    {
      name: "Marcus B.",
      location: "Highlands Ranch, CO",
      avatar: avatar3,
      rating: 5,
      text: "After interviewing six different contractors and getting wildly different quotes, we chose 14er and couldn't be happier. Our kitchen remodel was extensive - custom white shaker cabinets floor to ceiling, quartz countertops with waterfall edge on the island, subway tile backsplash to the ceiling, new appliances, under-cabinet LED lighting, and we opened up a wall to the living room. The transformation is stunning and the quality of work is exceptional. Juan was extremely communicative throughout - daily updates, photos of progress, never any surprises. His crew were skilled craftsmen who took pride in their work. The cabinets are perfectly level, the tile work is flawless, and every detail was executed perfectly. This is the best money we've ever spent on our home!",
    },
  ];

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) setVisibleCount(3);
      else if (window.innerWidth >= 640) setVisibleCount(2);
      else setVisibleCount(1);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const maxIndex = Math.max(0, reviews.length - visibleCount);

  const nextSlide = () => setCurrentIndex((prev) => Math.min(prev + 1, maxIndex));
  const prevSlide = () => setCurrentIndex((prev) => Math.max(prev - 1, 0));

  const getVisibleReviews = () => reviews.slice(currentIndex, currentIndex + visibleCount);

  return (
    <section className="py-16 lg:py-24 relative overflow-hidden">
      {/* Background image with overlay */}
      <div className="absolute inset-0">
        <img 
          src={heroImage} 
          alt="" 
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/75" />
      </div>
      
      <div className="relative z-10 container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            This Is Why Colorado Homeowners <span className="text-primary">Trust Us With Their Most Important Investment</span>
          </h2>
          <p className="text-base text-white/70 max-w-xl mx-auto">
            Real stories from real families who transformed their homes—and their lives.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {getVisibleReviews().map((review, index) => (
              <div
                key={currentIndex + index}
                className="bg-white rounded-2xl p-6 shadow-lg border border-border/30"
              >
                <Quote className="w-8 h-8 text-primary/20 mb-4" />
                <p className="text-foreground/90 mb-5 text-sm leading-relaxed line-clamp-6">"{review.text}"</p>
                <div className="flex gap-1 mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <div className="flex items-center gap-3 pt-4 border-t border-border/50">
                  <img
                    src={review.avatar}
                    alt={review.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-primary/20"
                    loading="lazy"
                    decoding="async"
                  />
                  <div>
                    <p className="font-semibold text-foreground text-sm">{review.name}</p>
                    <p className="text-xs text-muted-foreground">{review.location}</p>
                  </div>
                </div>
                {/* Verified Badge */}
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground mt-3">
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                  <span>Verified Google Review</span>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="w-10 h-10 rounded-full"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={nextSlide}
              disabled={currentIndex >= maxIndex}
              className="w-10 h-10 rounded-full"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
