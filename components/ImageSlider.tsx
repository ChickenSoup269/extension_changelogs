import React, { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface ImageSliderProps {
  images: string[]
  autoPlay?: boolean
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images, autoPlay = true }) => {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const length = images.length

  const nextSlide = useCallback(() => {
    setDirection(1)
    setCurrent((prev) => (prev === length - 1 ? 0 : prev + 1))
  }, [length])
  
  const prevSlide = useCallback(() => {
    setDirection(-1)
    setCurrent((prev) => (prev === 0 ? length - 1 : prev - 1))
  }, [length])

  const goToSlide = (idx: number) => {
    setDirection(idx > current ? 1 : -1)
    setCurrent(idx)
  }

  useEffect(() => {
    if (!autoPlay || isHovered) return
    const timer = setInterval(nextSlide, 5000)
    return () => clearInterval(timer)
  }, [autoPlay, isHovered, nextSlide])

  if (!Array.isArray(images) || images.length === 0) return null

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    })
  }

  return (
    <div 
      className="relative w-full h-full flex flex-col group/slider"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main image carousel */}
      <div className="relative w-full flex-1 flex items-center justify-center overflow-hidden bg-black">
        <button
          className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black/60 to-transparent text-white/50 hover:text-white z-20 transition-all opacity-0 group-hover/slider:opacity-100 flex items-center justify-center"
          onClick={(e) => { e.preventDefault(); prevSlide(); }}
          aria-label="Previous"
          type="button"
        >
          <i className="fas fa-chevron-left text-3xl"></i>
        </button>

        <div className="relative w-full h-full">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={current}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.3 }
              }}
              className="absolute inset-0"
            >
              <img
                src={images[current]}
                alt={`Slide ${current + 1}`}
                className="w-full h-full object-cover select-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black/60 to-transparent text-white/50 hover:text-white z-20 transition-all opacity-0 group-hover/slider:opacity-100 flex items-center justify-center"
          onClick={(e) => { e.preventDefault(); nextSlide(); }}
          aria-label="Next"
          type="button"
        >
          <i className="fas fa-chevron-right text-3xl"></i>
        </button>
      </div>

      {/* Thumbnails Row - Steam Style */}
      <div className="w-full bg-[#1b2838] p-2 overflow-x-auto no-scrollbar border-t border-black/40">
        <div className="flex gap-2 justify-center">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`relative flex-shrink-0 w-16 md:w-20 aspect-video overflow-hidden transition-all duration-300 ${
                idx === current 
                ? "ring-2 ring-[#66c0f4] opacity-100 scale-105 z-10" 
                : "opacity-40 hover:opacity-80"
              }`}
              type="button"
            >
              <img 
                src={img} 
                alt={`Thumb ${idx + 1}`} 
                className="w-full h-full object-cover"
              />
              {/* Progress bar for active slide */}
              {idx === current && autoPlay && !isHovered && (
                <motion.div 
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ duration: 5, ease: "linear" }}
                  className="absolute bottom-0 left-0 h-0.5 bg-[#66c0f4]"
                />
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ImageSlider
