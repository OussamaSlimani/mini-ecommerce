import Carousel from '../components/Carousel';
import Promo from "../components/Promo";
import { Brands } from "../components/Brands";
import ProductWidgetArea from "../components/ProductWidgetArea";

const Home = () => {
  return (
    <div className="container mx-auto py-12 text-center">
      
    <Carousel/>
    <Promo/>
    <Brands/>
    <ProductWidgetArea />
    </div>
  );
};

export default Home;