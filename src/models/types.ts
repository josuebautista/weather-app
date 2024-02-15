export type WeatherData = {
    cod:     string;
    message: number;
    cnt:     number;
    list:    List[];
    city:    City;
}

export type City = {
    id:         number;
    name:       string;
    coord:      Coord;
    country:    string;
    population: number;
    timezone:   number;
    sunrise:    number;
    sunset:     number;
}

export type Coord = {
    lat: number;
    lon: number;
}

export type List = {
    dt:         number;
    main:       Main;
    weather:    Weather[];
    clouds:     Clouds;
    wind:       Wind;
    visibility: number;
    pop:        number;
    sys:        Sys;
    dt_txt:     Date;
}

export type Clouds = {
    all: number;
}

export type Main = {
    temp:       number;
    feels_like: number;
    temp_min:   number;
    temp_max:   number;
    pressure:   number;
    sea_level:  number;
    grnd_level: number;
    humidity:   number;
    temp_kf:    number;
}

export type Sys = {
    pod: string;
}

export type Weather = {
    id:          number;
    main:        string;
    description: string;
    icon:        string;
}

export type Wind = {
    speed: number;
    deg:   number;
    gust:  number;
}
