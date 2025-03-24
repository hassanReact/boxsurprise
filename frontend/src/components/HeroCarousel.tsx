import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/effect-fade';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';

const HeroCarousel: React.FC = () => {
  const slides = [
    {
      image: "https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&q=80&w=2940",
      title: "Build Your Network",
      subtitle: "Create a Successful MLM Business",
      description: "Join thousands of successful entrepreneurs in our growing network marketing community."
    },
    {
      image: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80&w=2940",
      title: "Earn Rewards",
      subtitle: "Maximize Your Earnings",
      description: "Unlock multiple income streams and earn attractive bonuses through our rewarding compensation plan."
    },
    {
      image: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=2940",
      title: "Grow Together",
      subtitle: "Expert Training & Support",
      description: "Get access to comprehensive training materials and 24/7 support to help you succeed."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-100">
      <Swiper
        modules={[Autoplay, EffectFade, Navigation, Pagination]}
        effect="fade"
        navigation
        pagination={{ clickable: true }}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="h-[600px] relative"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="relative h-full w-full">
              {/* Background Image with Overlay */}
              <div 
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${slide.image})` }}
              >
                <div className="absolute inset-0 bg-black/50" />
              </div>

              {/* Content */}
              <div className="relative h-full flex items-center">
                <div className="container mx-auto px-4">
                  <div className="max-w-3xl mx-auto text-center text-white">
                    <h3 className="text-2xl md:text-3xl font-semibold text-blue-600 mb-4 opacity-0 animate-[slideUp_0.5s_ease-out_0.2s_forwards]">
                      {slide.subtitle}
                    </h3>
                    <h2 className="text-4xl md:text-6xl font-bold mb-6 opacity-0 animate-[slideUp_0.5s_ease-out_0.4s_forwards]">
                      {slide.title}
                    </h2>
                    <p className="text-xl md:text-2xl leading-relaxed mb-8 opacity-0 animate-[slideUp_0.5s_ease-out_0.6s_forwards]">
                      {slide.description}
                    </p>
                    <div className="space-x-4 opacity-0 animate-[slideUp_0.5s_ease-out_0.8s_forwards]">
                      <button className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-semibold transition-all transform hover:scale-105">
                        Get Started
                      </button>
                      <button className="px-8 py-3 bg-white hover:bg-gray-100 text-blue-900 rounded-full font-semibold transition-all transform hover:scale-105">
                        Learn More
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      {/* Custom Navigation Button Styles */}
      <style>
        {`
        .swiper-button-prev,
        .swiper-button-next {
          background-color: #2563eb; /* bg-blue-600 */
          color: white;
          width: 50px;
          height: 50px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .swiper-button-prev:hover,
        .swiper-button-next:hover {
          background-color: #1e40af; /* Darker blue */
        }
        `}
      </style>
    </div>
  );
}

export default HeroCarousel;