import CropRecommendation from "../CropRecommendation";

export default function CropRecommendationExample() {
  const mockData = {
    crops: [
      { name: "Milho", icon: "corn" as const, suitability: "high" as const },
      { name: "Feijão", icon: "wheat" as const, suitability: "high" as const },
      { name: "Mandioca", icon: "carrot" as const, suitability: "medium" as const },
    ],
    advice:
      "Boa altura para o milho e feijão. As condições climáticas atuais favorecem o plantio destas culturas. A precipitação esperada nos próximos 7 dias é adequada para o desenvolvimento inicial.",
  };

  return (
    <div className="p-6 max-w-2xl">
      <CropRecommendation {...mockData} />
    </div>
  );
}
