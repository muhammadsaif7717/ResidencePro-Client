
import { Helmet } from "react-helmet-async";
import { NavLink } from "react-router-dom";

const About = () => {
  const features = [
    {
      icon: "💳",
      title: "Secure Payments",
      desc: "Stripe-powered payment processing"
    },
    {
      icon: "🔥",
      title: "Real-time Updates",
      desc: "Firebase backend integration"
    },
    {
      icon: "🗺️",
      title: "Interactive Maps",
      desc: "Explore properties with Leaflet"
    },
    {
      icon: "⚡",
      title: "Lightning Fast",
      desc: "Built with modern React & Vite"
    }
  ];

  const stats = [
    { value: "20+", label: "Dependencies" },
    { value: "React 18", label: "Framework" },
    { value: "100%", label: "Modern Stack" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-slate-800 dark:to-gray-900 transition-colors duration-500">
      <Helmet>
        <title>ResidencePro | About</title>
      </Helmet>

      <div className="container mx-auto px-4 py-16">
         {/* Hero Section */}
        <div className="text-center mb-16 animate-fadeIn">
          <div className="inline-block mb-4">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto transform hover:rotate-12 transition-transform duration-300">
              <span className="text-4xl">🏠</span>
            </div>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
            Welcome to ResidencePro
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8 leading-relaxed">
            A modern property management platform powered by cutting-edge technologies. 
            We combine React 18, Firebase, Stripe payments, and interactive maps to deliver 
            an exceptional real estate experience.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 mb-12">
            {stats.map((stat, index) => (
              <div 
                key={index}
                className="text-center transform hover:scale-110 transition-transform duration-300"
              >
                <div className="text-3xl md:text-4xl font-bold text-blue-600 dark:text-blue-400">
                  {stat.value}
                </div>
                <div className="text-sm text-gray-600 dark:text-gray-400">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 border border-gray-100 dark:border-gray-700 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Tech Stack Section */}
        <div className="bg-white dark:bg-gray-800 rounded-3xl p-8 md:p-12 shadow-xl mb-16 border border-gray-100 dark:border-gray-700">
          <h2 className="text-3xl font-bold text-center mb-8 text-gray-900 dark:text-gray-100">
            Powered By Modern Tech
          </h2>
          
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {['React', 'Vite', 'Tailwind', 'Firebase', 'Stripe', 'Leaflet', 'React Router', 'Axios'].map((tech, index) => (
              <span
                key={index}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full font-medium shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                {tech}
              </span>
            ))}
          </div>

          <div className="text-center">
            <p className="text-gray-700 dark:text-gray-300 mb-2">
              <strong className="text-gray-900 dark:text-gray-100">Located at:</strong> Tejgaon, Dhaka
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              Building the future of property management
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-500 dark:to-purple-500 rounded-3xl p-12 shadow-2xl">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-blue-100 mb-8 text-lg max-w-2xl mx-auto">
              Join thousands of users managing their properties with ResidencePro
            </p>
            <NavLink to="/">
              <button className="px-8 py-4 bg-white text-blue-600 font-bold rounded-xl hover:bg-gray-100 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl">
                Get Started Now →
              </button>
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;