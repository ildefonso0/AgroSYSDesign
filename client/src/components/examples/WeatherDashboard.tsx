import WeatherDashboard from "../WeatherDashboard";

export default function WeatherDashboardExample() {
  const mockData = {
    location: "Luanda, Angola",
    temperature: 29,
    humidity: 75,
    windSpeed: 18,
    precipitation: 2.5,
    forecast: [
      { day: "Seg", temp: 28, rain: 0 },
      { day: "Ter", temp: 30, rain: 5 },
      { day: "Qua", temp: 29, rain: 12 },
      { day: "Qui", temp: 27, rain: 8 },
      { day: "Sex", temp: 28, rain: 3 },
      { day: "Sáb", temp: 31, rain: 0 },
      { day: "Dom", temp: 30, rain: 2 },
    ],
  };

  return (
    <div className="p-6 max-w-4xl">
      <WeatherDashboard data={mockData} />
    </div>
  );
}
