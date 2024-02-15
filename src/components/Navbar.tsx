'use client'

import { FC, useState } from 'react'
import { MdWbSunny, MdMyLocation, MdOutlineLocationOn } from 'react-icons/md'
import SearchBox from './SearchBox'
import axios from 'axios'
import { loadingCityAtom, placeAtom } from '@/app/atomic'
import { useAtom } from 'jotai'
import { PrimitiveAtom } from 'jotai/vanilla'

interface NavbarProps {
  location?: string
}

const Navbar: FC<NavbarProps> = ({ location }) => {
  const [city, setCity] = useState<string>('')
  const [error, setError] = useState<string>('')
  const [suggestions, setSuggestions] = useState<string[]>([])
  const [showSuggestions, setShowSuggestions] = useState<boolean>(false)
  const [place, setPlace] = useAtom<PrimitiveAtom<string>>(placeAtom)
  const [loading, setLoading] = useAtom<PrimitiveAtom<boolean>>(loadingCityAtom)

  const handleInputChange = async (value: string) => {
    setCity(value)
    if (value.length >= 3) {
      try {
        const response = await axios.get(`https://api.openweathermap.org/data/2.5/find?q=${value}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`)
        const suggestions_resp = response.data.list.map((item: any) => item.name)
        setSuggestions(suggestions_resp)
        setShowSuggestions(true)
      } catch (error) {
        setSuggestions([])
        setShowSuggestions(false)
      }
    } else {
      setSuggestions([])
      setShowSuggestions(false)
    }
  }
  const handleSuggestionClick = (value: string) => {
    setCity(value)
    setShowSuggestions(false)
  }

  const handleSubmitSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    if (suggestions.length == 0) {
      setError('Location not found')
      setLoading(false)
    } else {
      setError('')
      setTimeout(() => {
        setLoading(false)
        setPlace(city)
        setShowSuggestions(false)
      }, 500)
    }
  }

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords
        try {
          setLoading(true)
          const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`)
          setTimeout(() => {
            setLoading(false)
            setPlace(response.data.name);
          }, 500)
        } catch (error) {
          setLoading(false)
        }
      })
    }
  }
  return (
    <>
      <nav className='shadow-sm sticky top-0 left-0 z-50 bg-white'>
        <div className='h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto'>
          <div className='flex items-center justify-center gap-2'>
            <h2 className='text-gray-500 text-3xl'>Weather</h2>
            <MdWbSunny className='text-3xl mt-1 text-yellow-300' />
          </div>
          <section className='flex gap-2 items-center'>
            <MdMyLocation
              className='text-2xl text-gray-400 hover:opacity-80 cursor-pointer'
              title='Your Current Location'
              onClick={handleCurrentLocation}
            />
            <MdOutlineLocationOn className='text-3xl' />
            <p className='text-slate-900/80 text-sm'>{location ? location : 'CDMX, Mexico'}</p>
            <div className='relative hidden md:flex'>
              <SearchBox
                value={city}
                onChange={(e) => handleInputChange(e.target.value)}
                onSubmit={(e) => handleSubmitSearch(e)}
              />
              <SuggestionBox
                error={error}
                handleSuggestionClick={handleSuggestionClick}
                suggestions={suggestions}
                showSuggestions={showSuggestions}
              />
            </div>
          </section>
        </div>
      </nav>
      <section className='flex max-w-7xl px-3 md:hidden'>
        <div className='relative'>
          <SearchBox
            value={city}
            onChange={(e) => handleInputChange(e.target.value)}
            onSubmit={(e) => handleSubmitSearch(e)}
          />
          <SuggestionBox
            error={error}
            handleSuggestionClick={handleSuggestionClick}
            suggestions={suggestions}
            showSuggestions={showSuggestions}
          />
        </div>
      </section>
    </>
  )
}

interface SuggestionBoxProps {
  showSuggestions: boolean
  suggestions: string[]
  handleSuggestionClick: (item: string) => void
  error: string
}

const SuggestionBox: FC<SuggestionBoxProps> = ({
  showSuggestions, suggestions, handleSuggestionClick, error
}) => {
  return (
    <>
      {(showSuggestions && suggestions.length > 1 || error) &&
        <ul className='mb-4 bg-white absolute border-top-[44px] left-0 border-gray-300 rounded-md min-w-[200px] flex flex-col gap-1 py-2 px-2'>
          {error && suggestions.length < 1 &&
            <li className='text-red-500 p-1'>
              {error}
            </li>
          }
          {suggestions.map((item, index) => (
            <li
              key={index}
              className='cursor-pointer p-1 rounded hover:bg-gray-200'
              onClick={() => handleSuggestionClick(item)}
            >
              {item}
            </li>
          ))}
          <li className='cursor-pointer p-1 rounded hover:bg-gray-200 '>

          </li>
        </ul>
      }
    </>
  )
}

export default Navbar