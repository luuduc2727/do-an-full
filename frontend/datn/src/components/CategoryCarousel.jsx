import React, { useEffect, useState } from 'react'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel'
import { Button } from './ui/button'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { setSearchedQuery } from '@/redux/jobSlice'

const category = [
  "Software Engineer",
  "Web Developer",
  "Mobile Developer",
  "UI/UX Designer"
]

const CategoryCarousel = () => {
  const [emblaApi, setEmblaApi] = useState(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const searchJobHandler = (query) => {
    dispatch(setSearchedQuery(query))
    navigate("/browse")
  }

  useEffect(() => {
    if (!emblaApi) return
    const interval = setInterval(() => {
      emblaApi.scrollNext()
    }, 3000)

    return () => clearInterval(interval)
  }, [emblaApi])

  return (
    <div>
      <Carousel
        className="w-full max-w-xl mx-auto my-20"
        setApi={setEmblaApi}
        opts={{ loop: true }}
      >
        <CarouselContent className="-ml-1 gap-2">
          {category.map((cat, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <Button onClick={() => searchJobHandler(cat)}>{cat}</Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  )
}

export default CategoryCarousel
