import MobilePhoneMockup from "../MobilePhoneMockup";

export default function MobilePhoneMockupExample() {
  return (
    <div className="p-6">
      <MobilePhoneMockup
        temperature={29}
        condition="Céu limpo, sem chuva prevista"
        crops="Milho e feijão"
      />
    </div>
  );
}
