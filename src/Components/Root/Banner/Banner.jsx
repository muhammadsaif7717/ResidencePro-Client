import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import BannerImg1 from "../../../assets/images/14735.jpg";
import BannerImg2 from "../../../assets/images/2149428028.jpg";
import BannerImg3 from "../../../assets/images/4035.jpg";
import BannerImg4 from "../../../assets/images/39.jpg";



const Banner = () => {
    return (
        <Carousel >
                <div>
                    <img src={BannerImg1} className="brightness-90"/>
                </div>
                <div>
                    <img src={BannerImg2} className="brightness-90"/>
                </div>
                <div>
                    <img src={BannerImg3} className="brightness-90"/>
                </div>
                <div>
                    <img src={BannerImg4} className="brightness-90"/>
                </div>
            </Carousel>
    );
};

export default Banner;