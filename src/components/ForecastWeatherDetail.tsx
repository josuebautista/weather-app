import { FC } from 'react'
import Container from './Container'
import WeatherIcon from './WeatherIcon'
import WeatherDetails, { WeatherDetailsProps } from './WeatherDetails'
import { convertKelvinToCelsius } from '@/utils/convertKtoC'

interface ForecastWeatherDetailProps extends WeatherDetailsProps {
  weatherIcon: string
  date: string
  day: string
  temp: number
  feels_like: number
  temp_min: number
  temp_max: number
  description: string
}

const ForecastWeatherDetail: FC<ForecastWeatherDetailProps> = ({
  weatherIcon = '02d',
  date,
  day,
  temp,
  feels_like,
  temp_min,
  temp_max,
  description,
  visibility = '25km',
  humidity = '61%',
  windSpeed = '7 km/h',
  airPressure = '1012 hPa',
  sunrise = '6.20',
  sunset = '18.48'
}) => {
  return (
    <Container className='gap-4'>
      {/* Left */}
      <section className='flex gap-4 items-center px-4'>
        <div className='flex flex-col gap-1 items-center'>
          <WeatherIcon iconName={weatherIcon} />
          <p>{date}</p>
          <p className='text-sm'>{day}</p>
        </div>
        {/*  */}
        <div className='flex flex-col px-4'>
          <span className='text-5xl'>
            {convertKelvinToCelsius(temp)}°
          </span>
          <p className='text-xs space-x-1 whitespace-nowrap'>
            <span>Feels like</span>
            <span>{convertKelvinToCelsius(feels_like)}°</span>
          </p>
          <p className='capitalize'>{description}</p>
        </div>
      </section>
      {/* Right */}
      <section className='overflow-x-auto flex justify-center gap-4 px-4 w-full pr-10'>
        <WeatherDetails
          visibility={visibility}
          humidity={humidity}
          windSpeed={windSpeed}
          airPressure={airPressure}
          sunrise={sunrise}
          sunset={sunset}
        />
      </section>
    </Container>
  )
}

export default ForecastWeatherDetail