import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import { Link } from 'react-router-dom';
import { useCallback, useEffect, useState, useRef } from 'react';
import BannerImg1 from "../../../assets/images/14735.jpg";
import BannerImg2 from "../../../assets/images/2149428028.jpg";
import BannerImg3 from "../../../assets/images/4035.jpg";
import BannerImg4 from "../../../assets/images/39.jpg";
import { FaMapMarkerAlt, FaHome, FaStar } from 'react-icons/fa';
import { HiArrowRight, HiChevronLeft, HiChevronRight } from 'react-icons/hi';

const Banner = () => {
    const slides = [
        {
            image: BannerImg1,
            title: "Find Your Perfect Home",
            subtitle: "Discover premium apartments in prime locations",
            stats: [
                { value: "250+", label: "Properties", icon: FaHome },
                { value: "5-Star", label: "Rating", icon: FaStar },
                { value: "Tejgaon", label: "Location", icon: FaMapMarkerAlt }
            ]
        },
        {
            image: BannerImg2,
            title: "Modern Living Spaces", 
            subtitle: "Experience luxury and comfort with smart home technology",
            stats: [
                { value: "150+", label: "Properties", icon: FaHome },
                { value: "Luxury", label: "Quality", icon: FaStar },
                { value: "Gulshan", label: "Location", icon: FaMapMarkerAlt }
            ]
        },
        {
            image: BannerImg3,
            title: "Your Dream Residence Awaits",
            subtitle: "Elevate your lifestyle with our exclusive property collection",
            stats: [
                { value: "100+", label: "Properties", icon: FaHome },
                { value: "Premium", label: "Quality", icon: FaStar },
                { value: "Dhanmondi", label: "Location", icon: FaMapMarkerAlt }
            ]
        },
        {
            image: BannerImg4,
            title: "Live Where You Love",
            subtitle: "Find apartments that perfectly match your lifestyle",
            stats: [
                { value: "300+", label: "Properties", icon: FaHome },
                { value: "Verified", label: "Quality", icon: FaStar },
                { value: "Uttara", label: "Location", icon: FaMapMarkerAlt }
            ]
        }
    ];

    const autoplay = useRef(Autoplay({ delay: 5000, stopOnInteraction: false }));

    const [emblaRef, emblaApi] = useEmblaCarousel(
        { loop: true, align: 'start', duration: 20 },
        [autoplay.current]
    );

    const [currentSlide, setCurrentSlide] = useState(0);

    const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
    const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);

    useEffect(() => {
        if (!emblaApi) return;
        
        const onSelect = () => setCurrentSlide(emblaApi.selectedScrollSnap());
        emblaApi.on('select', onSelect);
        onSelect();

        return () => emblaApi.off('select', onSelect);
    }, [emblaApi]);

    return (
        <div className="relative overflow-hidden bg-white dark:bg-[#0F172A] h-screen">
            {/* Carousel Container */}
            <div className="embla overflow-hidden h-full" ref={emblaRef}>
                <div className="embla__container flex h-full">
                    {slides.map((slide, index) => (
                        <div key={index} className="embla__slide flex-[0_0_100%] relative min-h-full">
                            {/* Slide Image */}
                            <div className="absolute inset-0">
                                <img 
                                    src={slide.image} 
                                    alt={slide.title}
                                    className="w-full h-full object-cover brightness-[0.65] dark:brightness-50"
                                    loading={index === 0 ? "eager" : "lazy"}
                                />
                                {/* Light mode overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-800/40 to-slate-700/20 dark:from-[#0F172A]/80 dark:via-[#1E293B]/50 dark:to-[#334155]/30" />
                            </div>

                            {/* Content */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-full max-w-6xl mx-auto px-6 md:px-12 text-center">
                                    <div className="space-y-6 md:space-y-8">
                                        {/* Title */}
                                        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white dark:text-[#F8FAFC] leading-tight drop-shadow-2xl">
                                            {slide.title}
                                        </h1>

                                        {/* Subtitle */}
                                        <p className="text-lg md:text-xl lg:text-2xl text-white/95 dark:text-[#CBD5E1] max-w-3xl mx-auto drop-shadow-lg">
                                            {slide.subtitle}
                                        </p>

                                        {/* Stats */}
                                        <div className="flex flex-wrap justify-center gap-4 md:gap-6">
                                            {slide.stats.map((stat, i) => {
                                                const Icon = stat.icon;
                                                return (
                                                    <div 
                                                        key={i} 
                                                        className="bg-white/90 dark:bg-[#1E293B]/80 backdrop-blur-md rounded-xl border border-white/30 dark:border-[#334155] px-6 py-4 min-w-[140px] shadow-xl hover:scale-105 transition-transform duration-300"
                                                    >
                                                        <div className="flex items-center justify-center gap-3">
                                                            <Icon className="w-6 h-6 text-[#2563EB] dark:text-[#3B82F6]" />
                                                            <div className="text-left">
                                                                <div className="text-2xl font-bold text-slate-900 dark:text-[#F8FAFC]">
                                                                    {stat.value}
                                                                </div>
                                                                <div className="text-xs text-slate-600 dark:text-[#64748B]">
                                                                    {stat.label}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                );
                                            })}
                                        </div>

                                        {/* CTA Button */}
                                        <div className="pt-4">
                                            <Link 
                                                to="/apartment"
                                                className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] hover:from-[#1D4ED8] hover:to-[#6D28D9] dark:from-[#3B82F6] dark:to-[#8B5CF6] dark:hover:from-[#2563EB] dark:hover:to-[#7C3AED] text-white font-semibold text-lg rounded-xl shadow-2xl transition-all duration-300 hover:scale-105 active:scale-95"
                                            >
                                                <span>Explore Properties</span>
                                                <HiArrowRight className="w-6 h-6" />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Arrows */}
            <button
                onClick={scrollPrev}
                className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white/80 hover:bg-white dark:bg-[#1E293B]/80 dark:hover:bg-[#334155] backdrop-blur-md rounded-full flex items-center justify-center text-slate-900 dark:text-[#F8FAFC] shadow-xl transition-all duration-300 z-40 hover:scale-110 active:scale-95 border border-white/30 dark:border-[#334155]"
                aria-label="Previous slide"
            >
                <HiChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
            </button>

            <button
                onClick={scrollNext}
                className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white/80 hover:bg-white dark:bg-[#1E293B]/80 dark:hover:bg-[#334155] backdrop-blur-md rounded-full flex items-center justify-center text-slate-900 dark:text-[#F8FAFC] shadow-xl transition-all duration-300 z-40 hover:scale-110 active:scale-95 border border-white/30 dark:border-[#334155]"
                aria-label="Next slide"
            >
                <HiChevronRight className="w-6 h-6 md:w-7 md:h-7" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-2 z-40">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => emblaApi?.scrollTo(index)}
                        className={`transition-all duration-300 ${
                            index === currentSlide 
                                ? 'w-8 h-2 bg-gradient-to-r from-[#2563EB] to-[#7C3AED] dark:from-[#3B82F6] dark:to-[#8B5CF6] rounded-full shadow-lg' 
                                : 'w-2 h-2 bg-white/60 dark:bg-[#64748B] hover:bg-white/80 dark:hover:bg-[#CBD5E1] rounded-full'
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </div>
    );
};

export default Banner;