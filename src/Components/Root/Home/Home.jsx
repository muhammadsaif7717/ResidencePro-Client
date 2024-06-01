import { Helmet } from "react-helmet-async";

const Home = () => {
    return (
        <>
            <Helmet>
                <title>Template | Home</title>
            </Helmet>

            <div className="min-h-screen pt-16">
                <h1 className="text-center text-2xl font-bold">This Is Home</h1>
            </div>
        </>
    );
};

export default Home;