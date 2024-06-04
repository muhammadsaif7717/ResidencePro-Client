import { Helmet } from "react-helmet-async";
import Banner from "../Banner/Banner";
import AboutBuilding from "../AboutBuilding/AboutBuilding";
import CouponSection from "../CouponSection/CouponSection";
import Location from "../Location/Location";

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Template | Home</title>
            </Helmet>

            <div className="min-h-screen">
                <Banner></Banner>
                <AboutBuilding></AboutBuilding>
                <CouponSection></CouponSection>
                <Location></Location>
            </div>
        </>
    );
};

export default Home;