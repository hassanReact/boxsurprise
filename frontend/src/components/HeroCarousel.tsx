"use client"
import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
// No Swiper CSS imports

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

      {/* Custom styles to replace Swiper CSS */}
      <style>{`
        /* Base Swiper styles */
        .swiper {
          margin-left: auto;
          margin-right: auto;
          position: relative;
          overflow: hidden;
          list-style: none;
          padding: 0;
          z-index: 1;
        }
        
        .swiper-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          z-index: 1;
          display: flex;
          transition-property: transform;
          box-sizing: content-box;
        }
        
        .swiper-slide {
          flex-shrink: 0;
          width: 100%;
          height: 100%;
          position: relative;
          transition-property: transform;
        }
        
        /* Fade effect */
        .swiper-fade .swiper-slide {
          pointer-events: none;
          transition-property: opacity;
        }
        
        .swiper-fade .swiper-slide-active {
          pointer-events: auto;
        }
        
        /* Navigation buttons */
        .swiper-button-prev,
        .swiper-button-next {
          position: absolute;
          top: 50%;
          width: 50px;
          height: 50px;
          margin-top: -25px;
          z-index: 10;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          background-color: #2563eb;
          color: white;
          border-radius: 50%;
        }
        
        .swiper-button-prev {
          left: 20px;
        }
        
        .swiper-button-next {
          right: 20px;
        }
        
        .swiper-button-prev:hover,
        .swiper-button-next:hover {
          background-color: #1e40af;
        }
        
        .swiper-button-prev:after,
        .swiper-button-next:after {
          font-family: swiper-icons;
          font-size: 20px;
          text-transform: none !important;
          letter-spacing: 0;
          font-feature-settings: normal;
          font-variant: normal;
          line-height: 1;
        }
        
        .swiper-button-prev:after {
          content: 'prev';
        }
        
        .swiper-button-next:after {
          content: 'next';
        }
        
        /* Pagination */
        .swiper-pagination {
          position: absolute;
          text-align: center;
          transition: 300ms opacity;
          transform: translate3d(0, 0, 0);
          z-index: 10;
          bottom: 20px;
          left: 0;
          width: 100%;
        }
        
        .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          display: inline-block;
          border-radius: 50%;
          background: white;
          opacity: 0.5;
          margin: 0 5px;
          cursor: pointer;
        }
        
        .swiper-pagination-bullet-active {
          opacity: 1;
          background: #2563eb;
        }

        /* Animation */
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}

export default HeroCarousel;