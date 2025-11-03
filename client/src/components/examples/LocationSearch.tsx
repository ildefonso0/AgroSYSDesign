import LocationSearch from "../LocationSearch";

export default function LocationSearchExample() {
  return (
    <div className="p-6 max-w-2xl">
      <LocationSearch
        onSearch={(location, lat, lon) => {
          console.log("Search triggered:", { location, lat, lon });
        }}
      />
    </div>
  );
}
