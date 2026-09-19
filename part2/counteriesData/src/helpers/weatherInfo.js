const getWeatherInfo = (code, isDay) => {
  if (code === 0) {
    return {
      description: "Clear sky",
      icon: isDay ? "☀️" : "🌙",
    };
  }

  if ([1, 2].includes(code)) {
    return {
      description: "Partly cloudy",
      icon: isDay ? "🌤️" : "☁️",
    };
  }

  if (code === 3) {
    return {
      description: "Overcast",
      icon: "☁️",
    };
  }

  if ([45, 48].includes(code)) {
    return {
      description: "Fog",
      icon: "🌫️",
    };
  }

  if ([51, 53, 55, 56, 57].includes(code)) {
    return {
      description: "Drizzle",
      icon: "🌦️",
    };
  }

  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) {
    return {
      description: "Rain",
      icon: "🌧️",
    };
  }

  if ([71, 73, 75, 77].includes(code)) {
    return {
      description: "Snow",
      icon: "🌨️",
    };
  }

  if ([95, 96, 99].includes(code)) {
    return {
      description: "Thunderstorm",
      icon: "⛈️",
    };
  }

  return {
    description: "Unknown",
    icon: "🌡️",
  };
};
export default getWeatherInfo;
