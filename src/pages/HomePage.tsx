import house from "../assets/images/stock_photo_house.png";
import "../components/homepage.css";

export default function HomePage() {
  return (
    <div className="home-content">
      <img src={house} alt="house" />
    </div>
  );
}
