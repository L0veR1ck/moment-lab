import Marquee from "react-fast-marquee";

function ClientsSection() {
  return (
    <div className="p-4 bg-gray-100">
      <Marquee 
        className="text-lg font-semibold text-blue-600" 
        pauseOnHover={true} 
        speed={50}
      >
        Я - бегущая строка на React с Tailwind CSS! Могу содержать любой контент.
      </Marquee>
    </div>
  );
};

export default ClientsSection;