import { useState, useEffect } from "react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
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
      text: "Juan and the 14er crew were fantastic from start to finish. They showed up on time every single day, kept the job site spotless, and the communication was top notch. Our new driveway looks absolutely incredible. I'm genuinely proud to pull into it now. Can't recommend them highly enough!",
    },
    {
      name: "Sarah M.",
      location: "Boulder, CO",
      avatar: avatar2,
      rating: 5,
      text: "I was nervous about the whole process, but Juan put my mind at ease right away. Super professional, explained everything clearly, and his team was friendly and respectful of our property. The patio turned out even better than I imagined. Worth every penny!",
    },
    {
      name: "James T.",
      location: "Fort Collins, CO",
      avatar: avatar3,
      rating: 5,
      text: "What impressed me most was how organized and efficient they were. Juan gave us a fair quote with no surprises, and the crew finished ahead of schedule. Our neighbors keep asking who did the work. We've already referred three families to them!",
    },
    {
      name: "Linda K.",
      location: "Littleton, CO",
      avatar: avatar4,
      rating: 5,
      text: "After getting quotes from several contractors, 14er Renovations stood out for their honesty and transparency. Juan took time to walk us through options and never pushed us. The walkway is beautiful and so much safer for our elderly parents. Highly recommend!",
    },
    {
      name: "David P.",
      location: "Aurora, CO",
      avatar: avatar5,
      rating: 5,
      text: "From the first phone call to the final walkthrough, the experience was stress free. The team was punctual, hardworking, and cleaned up perfectly every day. Juan even followed up a week later to make sure we were happy. This is how contractors should operate!",
    },
    {
      name: "Carlos G.",
      location: "Lakewood, CO",
      avatar: avatar1,
      rating: 5,
      text: "We had our driveway done in January and were worried about the cold weather. Juan explained their winter techniques and the results speak for themselves — it's been almost a year and it still looks brand new. Great crew, great communication, great results!",
    },
    {
      name: "Jennifer & Tom H.",
      location: "Castle Rock, CO",
      avatar: avatar2,
      rating: 5,
      text: "Best home improvement decision we've made. The team was respectful, efficient, and the finished patio exceeded our expectations. Our backyard is now our favorite spot. The whole family thanks 14er!",
    },
    {
      name: "Robert S.",
      location: "Arvada, CO",
      avatar: avatar3,
      rating: 5,
      text: "Second time using 14er — first for our driveway, now for the walkway. Same excellent experience both times. Juan remembers his customers and treats every project like it's his own home. Already planning to have them do our back patio next spring!",
    },
    {
      name: "Lisa W.",
      location: "Thornton, CO",
      avatar: avatar6,
      rating: 5,
      text: "I was so nervous about doing a concrete project in winter, but 14er Renovation proved the other contractors wrong. They explained everything, showed me their process, and the driveway came out better than I imagined. It's smooth, solid, and I love the look. Worth every penny.",
    },
    {
      name: "Kevin & Amy D.",
      location: "Centennial, CO",
      avatar: avatar7,
      rating: 5,
      text: "We had a cracked old driveway that got worse every winter. The crew came out quickly, gave us a free estimate, and explained the winter concrete techniques. The installation was fast and clean, and they finished ahead of schedule. Our neighbors keep asking who did it!",
    },
    {
      name: "Patricia N.",
      location: "Westminster, CO",
      avatar: avatar8,
      rating: 5,
      text: "The team was professional, on time, and super friendly. They handled everything — tear out, prep, pour, and clean-up. They even worked around our holiday schedule. I was worried about winter conditions, but they knew exactly what to do. I'd recommend them to anyone.",
    },
    {
      name: "Marcus B.",
      location: "Highlands Ranch, CO",
      avatar: avatar9,
      rating: 5,
      text: "I shopped around and most contractors avoided winter work. These guys embraced it and explained why. The driveway looks amazing, it handles Colorado freeze-thaw cycles perfectly, and our garage access is so much safer now. Best decision we made this year.",
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
    <section className="py-16 lg:py-24 section-gradient-dark">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-block text-primary font-semibold text-sm uppercase tracking-wider mb-3">
            50+ Five-Star Reviews
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4">
            Why Colorado Homeowners <span className="text-primary">Trust Us</span>
          </h2>
          <p className="text-base text-white/70 max-w-xl mx-auto">
            Hear from families who transformed their homes with 14er
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