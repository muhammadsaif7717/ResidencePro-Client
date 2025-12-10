import { FaDumbbell, FaSwimmingPool, FaParking, FaShieldAlt, FaBuilding, FaLeaf } from 'react-icons/fa';
import { MdRoofing, MdSecurity } from 'react-icons/md';

const AboutBuilding = () => {
    const amenities = [
        {
            icon: <FaDumbbell className="w-8 h-8" />,
            title: "Fitness Center",
            description: "Fully-equipped modern gym"
        },
        {
            icon: <MdRoofing className="w-8 h-8" />,
            title: "Rooftop Terrace",
            description: "Panoramic city views"
        },
        {
            icon: <FaSwimmingPool className="w-8 h-8" />,
            title: "Swimming Pool",
            description: "Resort-style pool area"
        },
        {
            icon: <FaParking className="w-8 h-8" />,
            title: "Private Parking",
            description: "Secure underground parking"
        },
        {
            icon: <MdSecurity className="w-8 h-8" />,
            title: "24/7 Security",
            description: "Round-the-clock safety"
        },
        {
            icon: <FaLeaf className="w-8 h-8" />,
            title: "Green Spaces",
            description: "Sustainable architecture"
        }
    ];

    const stats = [
        { number: "200+", label: "Premium Apartments" },
        { number: "15", label: "Floors" },
        { number: "5000+", label: "Sq Ft Common Area" },
        { number: "100%", label: "Satisfaction Rate" }
    ];

    return (
        <section className="bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 py-20 px-4 transition-colors duration-500">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-16">
                    <div className="inline-block mb-4">
                        <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto hover:rotate-12 transition-transform duration-300">
                            <FaBuilding className="w-8 h-8 text-white" />
                        </div>
                    </div>
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
                        About the Building
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Experience modern urban living at its finest
                    </p>
                </div>

                {/* Main Content */}
                <div className="grid lg:grid-cols-2 gap-12 mb-16">
                    {/* Description */}
                    <div className="space-y-6">
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl transition-shadow duration-300">
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                                Welcome to ResidencePro
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
                                A premier residential building designed for modern urban living. Our building features state-of-the-art amenities, sustainable architecture, and a vibrant community atmosphere.
                            </p>
                            <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                Nestled in a prime location, ResidencePro offers unparalleled access to city conveniences while providing a tranquil retreat from the hustle and bustle. Experience the perfect blend of luxury, comfort, and convenience.
                            </p>
                        </div>

                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl shadow-lg text-white">
                            <h3 className="text-2xl font-bold mb-4">
                                Premium Living Spaces
                            </h3>
                            <p className="leading-relaxed opacity-95">
                                Our building boasts a range of premium apartments, each meticulously designed with high-quality finishes and contemporary layouts. Residents enjoy exclusive access to world-class facilities with 24/7 security and on-site management ensuring a safe and comfortable living environment.
                            </p>
                        </div>
                    </div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 gap-6">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 text-center hover:scale-105 hover:shadow-2xl transition-all duration-300"
                            >
                                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent mb-2">
                                    {stat.number}
                                </div>
                                <div className="text-gray-600 dark:text-gray-400 font-medium">
                                    {stat.label}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Amenities */}
                <div>
                    <h3 className="text-3xl font-bold text-center text-gray-900 dark:text-gray-100 mb-12">
                        World-Class Amenities
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {amenities.map((amenity, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group"
                            >
                                <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 group-hover:rotate-12 transition-transform duration-300">
                                    <div className="text-white">
                                        {amenity.icon}
                                    </div>
                                </div>
                                <h4 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2">
                                    {amenity.title}
                                </h4>
                                <p className="text-gray-600 dark:text-gray-400">
                                    {amenity.description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA Section */}
                <div className="mt-16 text-center">
                    <div className="inline-block bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-4">
                            Ready to Make ResidencePro Your Home?
                        </h3>
                        <p className="text-gray-600 dark:text-gray-400 mb-6 max-w-xl mx-auto">
                            Schedule a tour today and discover why ResidencePro is the perfect place to call home.
                        </p>
                        <div className="flex flex-wrap gap-4 justify-center">
                            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
                                Schedule a Tour
                            </button>
                            <button className="px-8 py-4 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-gray-100 font-semibold rounded-lg border border-gray-300 dark:border-gray-600 transition-all duration-200">
                                View Floor Plans
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutBuilding;