import { FC, ReactNode } from 'react'
import { LuEye, LuSunrise, LuSunset } from 'react-icons/lu'
import { FiDroplet } from 'react-icons/fi'
import { MdAir } from 'react-icons/md'
import { ImMeter } from 'react-icons/im'

export interface WeatherDetailsProps {
  visibility: string
  humidity: string
  windSpeed: string
  airPressure: string
  sunrise: string
  sunset: string
}

const WeatherDetails: FC<WeatherDetailsProps> = ({ visibility = '25km', humidity = '61%', windSpeed = '7 km/h', airPressure = '1012 hPa', sunrise = '6.20', sunset = '18.48' }) => {
  
  return (
    <>
      <SingleWeatherDetail
        icon={<LuEye />}
        information='Visibility'
        value={visibility}
      />
      <SingleWeatherDetail
        icon={<FiDroplet />}
        information='Humidity'
        value={humidity}
      />
      <SingleWeatherDetail
        icon={<MdAir />}
        information='WindSpeed'
        value={windSpeed}
      />
      <SingleWeatherDetail
        icon={<ImMeter />}
        information='AirPressure'
        value={airPressure}
      />
      <SingleWeatherDetail
        icon={<LuSunrise />}
        information='Sunrise'
        value={sunrise}
      />
      <SingleWeatherDetail
        icon={<LuSunset />}
        information='Sunset'
        value={sunset}
      />
    </>
  )
}

interface SingleWeatherDetailProps {
  information: string
  icon: ReactNode
  value: string
}

const SingleWeatherDetail: FC<SingleWeatherDetailProps> = ({ information, icon, value }) => {
  return (
    <div className='flex flex-col justify-between gap-2 items-center text-xs font-semibold text-black/80'>
      <p className='whitespace-nowrap'>
        {information}
      </p>
      <div className='text-3xl'>
        {icon}
      </div>
      <p>{value}</p>
    </div>
  )
}

export default WeatherDetails