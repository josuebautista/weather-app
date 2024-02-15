'use client'

import Container from "@/components/Container";
import ForecastWeatherDetail from "@/components/ForecastWeatherDetail";
import Navbar from "@/components/Navbar";
import WeatherDetails from "@/components/WeatherDetails";
import WeatherIcon from "@/components/WeatherIcon";
import { WeatherData } from "@/models/types";
import { convertKelvinToCelsius } from "@/utils/convertKtoC";
import { convertWindSpeed } from "@/utils/convertSpeed";
import { getDayOrNightIcon } from "@/utils/dayNightIcon";
import { metersToKilometers } from "@/utils/mToKm";
import axios from "axios";
import { format, fromUnixTime, parseISO } from "date-fns";
import { useQuery } from "react-query";
import { loadingCityAtom, placeAtom } from "./atomic";
import { useAtom } from "jotai";
import { useEffect } from "react";
import { PrimitiveAtom } from "jotai/vanilla";
import { WeatherSkeleton } from "@/components/Skeletons/WeatherSkeleton";

export default function Home() {
  const [place, setPlace] = useAtom<PrimitiveAtom<string>>(placeAtom)
  const [loading, setLoading] = useAtom<PrimitiveAtom<boolean>>(loadingCityAtom)
  const { isLoading, error, data, refetch } = useQuery<WeatherData>('repoData', async () => {
    const { data } = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?q=${place}&appid=${process.env.NEXT_PUBLIC_WEATHER_API_KEY}`)
    return data;
  })

  useEffect(() => {
    refetch()

  }, [place, refetch])


  if (isLoading) return (
    <div className="flex items-center min-h-screen justify-center">
      <p className="animate-bounce">Loading...</p>
    </div>
  )
  const firstData = data?.list[0]
  // console.log(data)
  // console.log(firstData?.dt_txt)

  const uniqueDates = [
    ...new Set(data?.list.map((entry, i) => new Date(entry.dt * 1000).toISOString().split('T')[0]))
  ]

  const firstDataForEachDate = uniqueDates.map((date) => {
    return data?.list.find((entry) => {
      const entryDate = new Date(entry.dt * 1000).toISOString().split('T')[0]
      const entryTime = new Date(entry.dt * 1000).getHours()
      return entryDate === date && entryTime >= 6
    })
  })
  return (
    <div className="flex flex-col gap-4 bg-gray-100 min-h-screen">
      <Navbar location={data?.city.name} />
      <main className="px-3 max-w-7xl flex flex-col w-full pb-10 pt-4">
        {loading ? (
          <WeatherSkeleton />
        ) : (
          <>
            {/* Today data */}
            <section className="space-y-4">
              <div className="space-y-2">
                <h2 className="flex gap-1 text-2xl items-end">
                  <div>
                    {format(firstData?.dt_txt || '', 'EEEE')}
                  </div>
                  <div className="text-lg">
                    {format(firstData?.dt_txt || '', 'dd.MM.yyyy')}
                  </div>
                </h2>
                <Container className='gap-10 px-6 items-center'>
                  {/* Tempeture */}
                  <div className="flex flex-col px-4 ">
                    <span className="text-5xl">
                      {firstData?.main.temp && convertKelvinToCelsius(firstData?.main.temp)}°
                    </span>
                    <p className="text-xs space-x-1 whitespace-nowrap">
                      <span></span>
                    </p>
                    <p className="text-xs space-x-2">
                      <span>
                        {firstData?.main.temp && convertKelvinToCelsius(firstData?.main.temp_min)}°↓
                      </span>
                      <span>
                        {firstData?.main.temp && convertKelvinToCelsius(firstData?.main.temp_max)}°↑
                      </span>
                    </p>
                  </div>
                  {/* time and weather icon */}
                  <div className="flex gap-10 sm:gap-16 overflow-x-auto w-full justify-between pr-3">
                    {data?.list.map((d, index) => (
                      <div key={index}
                        className="flex flex0col justify-between gap-2 items-center text-xs font-semibold"
                      >
                        <p className="whitespace-nowrap">
                          {format(d.dt_txt, 'h:mm-a').replace('-', '')}
                        </p>
                        <div>
                          <WeatherIcon iconName={getDayOrNightIcon(d.weather[0].icon, d.dt_txt)} />
                          {convertKelvinToCelsius(d.main.temp ?? 0)}°
                        </div>
                      </div>
                    ))}
                  </div>
                </Container>
              </div>
              <div className="flex gap-4">
                {/* left */}
                <Container className="w-fit justify-center flex-col px-4 items-center">
                  <p className="capitalize text-center">
                    {firstData?.weather[0].description}
                  </p>
                  {firstData &&
                    <WeatherIcon iconName={getDayOrNightIcon(firstData?.weather[0].icon, firstData.dt_txt)} />
                  }
                </Container>
                {/* right */}
                <Container className="bg-yellow-300/50 px-6 gap-4 justify-between overflow-x-auto">
                  {firstData && data &&
                    <WeatherDetails
                      visibility={metersToKilometers(firstData.visibility)}
                      airPressure={`${firstData.main.pressure} hPa`}
                      humidity={`${firstData.main.humidity}%`}
                      sunrise={format(fromUnixTime(data.city.sunrise ?? 1702949452), "H:mm")}
                      sunset={format(fromUnixTime(data.city.sunset ?? 1702517657), "H:mm")}
                      windSpeed={convertWindSpeed(firstData.wind.speed ?? 1.64)}
                    />
                  }
                </Container>
              </div>
            </section>
            {/* 7 day forecast data */}
            <section className="flex w-full flex-col gap-4">
              <p className="text-2xl">Forecast(7 days)</p>
              {firstDataForEachDate.map((d, index) => (
                <div key={index}>
                  {d &&
                    <ForecastWeatherDetail
                      description={d?.weather[0].description ?? ""}
                      weatherIcon={d?.weather[0].icon ?? "01d"}
                      date={format(d.dt_txt, "dd.MM")}
                      day={format(d.dt_txt, "EEEE")}
                      feels_like={d?.main.feels_like ?? 0}
                      temp={d?.main.temp ?? 0}
                      temp_max={d?.main.temp_max ?? 0}
                      temp_min={d?.main.temp_min ?? 0}
                      airPressure={`${d?.main.pressure} hPa `}
                      humidity={`${d?.main.humidity}% `}
                      sunrise={format(
                        fromUnixTime(data?.city.sunrise ?? 1702517657),
                        "H:mm"
                      )}
                      sunset={format(
                        fromUnixTime(data?.city.sunset ?? 1702517657),
                        "H:mm"
                      )}
                      visibility={`${metersToKilometers(d?.visibility ?? 10000)} `}
                      windSpeed={`${convertWindSpeed(d?.wind.speed ?? 1.64)} `}
                    />
                  }
                </div>
              ))}
            </section>
          </>
        )}

      </main>
    </div>
  );
}
