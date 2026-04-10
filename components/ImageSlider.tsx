import React, { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface ImageSliderProps {
  images: string[]
}

const ImageSlider: React.FC<ImageSliderProps> = ({ images }) => {
  const [current, setCurrent] = useState(0)
  const [direction, setDirection] = useState(0)
  const length = images.length

  const nextSlide = () => {
    setDirection(1)
    setCurrent(current === length - 1 ? 0 : current + 1)
  }
  
  const prevSlide = () => {
    setDirection(-1)
    setCurrent(current === 0 ? length - 1 : current - 1)
  }

  const goToSlide = (idx: number) => {
    setDirection(idx > current ? 1 : -1)
    setCurrent(idx)
  }

  if (!Array.isArray(images) || images.length === 0) return null

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 300 : -300,
      opacity: 0,
      scale: 0.95
    })
  }

  return (
    <div className="relative w-full flex flex-col items-center justify-center gap-8">
      {/* Main image carousel */}
      <div className="relative w-full h-[300px] md:h-[500px] flex items-center justify-center overflow-hidden rounded-2xl group">
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 rounded-full p-3 z-20 shadow-xl border border-white/20 transition-all hover:scale-110 active:scale-95 opacity-0 group-hover:opacity-100"
          onClick={prevSlide}
          aria-label="Previous"
          type="button"
        >
          <i className="fas fa-chevron-left text-lg"></i>
        </button>

        <div className="relative w-full h-full flex items-center justify-center bg-black/5">
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
                opacity: { duration: 0.4 },
                scale: { duration: 0.4 }
              }}
              className="absolute w-full h-full flex items-center justify-center p-2"
            >
              <img
                src={images[current]}
                alt={`Slide ${current + 1}`}
                className="max-w-full max-h-full object-contain rounded-xl shadow-2xl pointer-events-none"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 rounded-full p-3 z-20 shadow-xl border border-white/20 transition-all hover:scale-110 active:scale-95 opacity-0 group-hover:opacity-100"
          onClick={nextSlide}
          aria-label="Next"
          type="button"
        >
          <i className="fas fa-chevron-right text-lg"></i>
        </button>
      </div>

      {/* Thumbnails Row */}
      <div className="w-full max-w-full overflow-x-auto pb-4 no-scrollbar">
        <div className="flex gap-4 justify-center px-4">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`relative flex-shrink-0 w-20 h-14 md:w-32 md:h-20 rounded-xl overflow-hidden border-2 transition-all duration-300 transform ${
                idx === current 
                ? "border-[var(--accent)] scale-110 ring-4 ring-[var(--accent-glow)] z-10" 
                : "border-transparent opacity-50 hover:opacity-100 hover:scale-105"
              }`}
              type="button"
            >
              <img 
                src={img} 
                alt={`Thumb ${idx + 1}`} 
                className="w-full h-full object-cover"
              />
              {idx === current && (
                <div className="absolute inset-0 bg-[var(--accent)]/10" />
              )}
            </button>
          ))}
        </div>
      </div>
      
      {/* Hidden preloader for all images */}
      <div className="hidden">
        {images.map((img, i) => (
          <img key={i} src={img} alt="preload" />
        ))}
      </div>
    </div>
  )
}

export default ImageSlider
