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
      x: direction > 0 ? "20%" : "-20%",
      opacity: 0,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? "20%" : "-20%",
      opacity: 0,
    })
  }

  return (
    <div className="relative w-full h-full flex flex-col">
      {/* Main image carousel */}
      <div className="relative w-full flex-1 flex items-center justify-center overflow-hidden group bg-black">
        <button
          className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 z-20 transition-all opacity-0 group-hover:opacity-100"
          onClick={(e) => { e.preventDefault(); prevSlide(); }}
          aria-label="Previous"
          type="button"
        >
          <i className="fas fa-chevron-left text-2xl"></i>
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
                x: { type: "tween", duration: 0.3 },
                opacity: { duration: 0.3 }
              }}
              className="absolute inset-0"
            >
              <img
                src={images[current]}
                alt={`Slide ${current + 1}`}
                className="w-full h-full object-cover pointer-events-none"
              />
            </motion.div>
          </AnimatePresence>
        </div>

        <button
          className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 hover:bg-black/60 text-white p-2 z-20 transition-all opacity-0 group-hover:opacity-100"
          onClick={(e) => { e.preventDefault(); nextSlide(); }}
          aria-label="Next"
          type="button"
        >
          <i className="fas fa-chevron-right text-2xl"></i>
        </button>
      </div>

      {/* Thumbnails Row - Simplified for Steam Style */}
      <div className="w-full bg-black/60 py-2 overflow-x-auto no-scrollbar">
        <div className="flex gap-1.5 px-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => goToSlide(idx)}
              className={`relative flex-shrink-0 w-24 aspect-video overflow-hidden border transition-all ${
                idx === current 
                ? "border-[#66c0f4] ring-1 ring-[#66c0f4]" 
                : "border-transparent opacity-60 hover:opacity-100"
              }`}
              type="button"
            >
              <img 
                src={img} 
                alt={`Thumb ${idx + 1}`} 
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ImageSlider
