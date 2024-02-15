import { cn } from '@/utils/cn'
import Image from 'next/image'
import { FC } from 'react'

interface WeatherIconProps {
  iconName: string
  className?: string
}

const WeatherIcon: FC<WeatherIconProps> = ({ iconName, className }) => {
  return (
    <div className={cn('relative h-20 w-20', className)}>
      <Image
        width={100}
        height={100}
        className='absolute h-full w-full'
        src={`https://openweathermap.org/img/wn/${iconName}@4x.png`}
        alt='weather-icon'
        priority
      />
    </div>
  )
}

export default WeatherIcon