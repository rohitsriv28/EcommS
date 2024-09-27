import { useState, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import AOS from "aos";
import Review from "../Review";
import Electronics from "../ElectronicSection";
import Mobiles from "../MobileSection";
import Collection from "../Collection";
import Shop from "../Shop";
import Home from "../Home";
import { getProducts } from "../../api/prdoucts.api";
import Fashion from "../FashionSection";
import HealthBeauty from "../HealthBeauty";
import HomeKitchen from "../HomeKitchen";
import GotoTop from "../GoToTop";

function MainPage() {
  const [data, setData] = useState([]);

  useEffect(() => {
    (async () => {
      const resData = await getProducts();
      setData(resData);
    })();
    AOS.init({ duration: 800, offset: 100 });
  }, []);

  return (
    <>
      <div className="overflow-x-hidden">
        <section
          id="home"
          data-aos="fade-down"
          data-aos-duration="600"
          data-aos-easing="ease-in-out"
        >
          <Home />
        </section>
        <section data-aos="fade-right" data-aos-easing="ease-in-out" id="shop">
          <Shop products={data} />
        </section>
        <section data-aos="fade-left" data-aos-easing="ease-in-out">
          <Collection />
        </section>
        <section
          id="mobiles"
          data-aos="fade-right"
          data-aos-easing="ease-in-out"
        >
          <Mobiles products={data} />
        </section>
        <section
          id="electronics"
          data-aos="fade-left"
          data-aos-easing="ease-in-out"
        >
          <Electronics products={data} />
        </section>
        <section
          id="fashion"
          data-aos="fade-right"
          data-aos-easing="ease-in-out"
        >
          <Fashion products={data} />
        </section>
        <section
          id="health_beauty"
          data-aos="fade-left"
          data-aos-easing="ease-in-out"
        >
          <HealthBeauty products={data} />
        </section>
        <section
          id="home_kitchen"
          data-aos="fade-right"
          data-aos-offset="200"
          data-aos-easing="ease-in-out"
        >
          <HomeKitchen products={data} />
        </section>
        <section
          id="review"
          className="overflow-hidden hideScroll"
          data-aos="zoom-in"
          data-aos-easing="ease-in-out"
          data-aos-offset="400"
        >
          <Review />
        </section>
      </div>
      <Toaster position="bottom-center" />
    </>
  );
}

export default MainPage;
