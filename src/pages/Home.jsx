import { Brands } from "../components/home/Brands";
import EmblaCarousel from "../components/home/Carousel";
import Promo from "../components/home/Promo";
import ProductWidgetArea from "../components/home/ProductWidgetArea";

const Home = () => {
  return (
    <div className="container mx-auto py-12 text-center"> 
    <EmblaCarousel/>
    <Promo/>
    <Brands/>
    <ProductWidgetArea />
    </div>
  );
};

export default Home;