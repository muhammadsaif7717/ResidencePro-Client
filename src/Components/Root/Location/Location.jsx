import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { FaMapMarkerAlt, FaPhone, FaEnvelope, FaDirections } from 'react-icons/fa';
import { MdLocationOn } from 'react-icons/md';

const Location = () => {
  const position = [23.8103, 90.4125]; // Tejgaon, Dhaka coordinates

  const contactInfo = [
    {
      icon: <MdLocationOn className="w-5 h-5" />,
      title: "Address",
      info: "Tejgaon, Dhaka, Bangladesh"
    },
    {
      icon: <FaPhone className="w-5 h-5" />,
      title: "Phone",
      info: "+880 123 456 7890"
    },
    {
      icon: <FaEnvelope className="w-5 h-5" />,
      title: "Email",
      info: "info@residencepro.com"
    }
  ];

  return (
    <section className="bg-gradient-to-br z-10 from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 py-20 px-4 transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-block mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto hover:rotate-12 transition-transform duration-300">
              <FaMapMarkerAlt className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Our Location
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Visit us at our prime location in the heart of Dhaka
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl shadow-xl text-white">
              <h3 className="text-2xl font-bold mb-2">Visit Us Today</h3>
              <p className="opacity-95">
                Our team is ready to help you find your perfect home. Drop by or schedule an appointment.
              </p>
            </div>

            {contactInfo.map((item, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <div className="text-white">{item.icon}</div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      {item.title}
                    </h4>
                    <p className="text-gray-600 dark:text-gray-400 text-sm break-words">
                      {item.info}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            <button className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200">
              <FaDirections className="w-5 h-5" />
              <span>Get Directions</span>
            </button>
          </div>

          {/* Map */}
          <div className="lg:col-span-2 z-10">
            <div className="bg-white dark:bg-gray-800 p-4 rounded-2xl shadow-xl border border-gray-100 dark:border-gray-700">
              <div className="h-[500px] rounded-xl overflow-hidden">
                <MapContainer 
                  center={position} 
                  zoom={15} 
                  className="h-full w-full"
                  scrollWheelZoom={false}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <Marker position={position}>
                    <Popup>
                      <div className="text-center py-2">
                        <h3 className="font-bold text-lg mb-1">ResidencePro</h3>
                        <p className="text-sm text-gray-600 mb-2">
                          Tejgaon, Dhaka, Bangladesh
                        </p>
                        <p className="text-xs text-gray-500">
                          Your premium residential destination
                        </p>
                      </div>
                    </Popup>
                  </Marker>
                </MapContainer>
              </div>
              
              {/* Map Info Badge */}
              <div className="mt-4 flex items-center justify-between px-4">
                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <MdLocationOn className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                  <span>Tejgaon, Dhaka</span>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-500">
                  Interactive Map
                </span>
              </div>
            </div>

            {/* Quick Info Cards */}
            <div className="grid grid-cols-2 gap-4 mt-6">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 text-center">
                <p className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">5 min</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">To Metro Station</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-md border border-gray-100 dark:border-gray-700 text-center">
                <p className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">24/7</p>
                <p className="text-sm text-gray-600 dark:text-gray-400">Office Hours</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Banner */}
        <div className="mt-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-center text-white shadow-2xl">
          <h3 className="text-2xl md:text-3xl font-bold mb-3">
            Schedule a Visit
          </h3>
          <p className="mb-6 opacity-95 max-w-2xl mx-auto">
            Experience ResidencePro in person. Our team will be happy to show you around and answer all your questions.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button className="px-8 py-4 bg-white text-blue-600 font-semibold rounded-lg hover:bg-gray-100 hover:scale-105 transition-all duration-200 shadow-lg">
              Book a Tour
            </button>
            <button className="px-8 py-4 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white font-semibold rounded-lg border-2 border-white/30 hover:border-white/50 transition-all duration-200">
              Contact Us
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;