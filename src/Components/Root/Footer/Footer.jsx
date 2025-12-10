import { Link } from "react-router-dom";
import { FaTwitter, FaYoutube, FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa";
import { MdEmail, MdPhone, MdLocationOn } from "react-icons/md";
import { HiHome } from "react-icons/hi";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    company: [
      { name: "About Us", path: "/about" },
      { name: "Our Team", path: "/team" },
      { name: "Careers", path: "/careers" },
      { name: "Press Kit", path: "/press" },
    ],
    support: [
      { name: "Help Center", path: "/help" },
      { name: "Contact Us", path: "/contact" },
      { name: "FAQs", path: "/faq" },
      { name: "Privacy Policy", path: "/privacy" },
    ],
    services: [
      { name: "Apartments", path: "/apartment" },
      { name: "Property Management", path: "/management" },
      { name: "Payments", path: "/payments" },
      { name: "Agreements", path: "/agreements" },
    ],
  };

  const socialLinks = [
    { icon: <FaFacebookF />, href: "https://facebook.com", label: "Facebook", color: "hover:bg-blue-600" },
    { icon: <FaTwitter />, href: "https://twitter.com", label: "Twitter", color: "hover:bg-sky-500" },
    { icon: <FaInstagram />, href: "https://instagram.com", label: "Instagram", color: "hover:bg-pink-600" },
    { icon: <FaLinkedinIn />, href: "https://linkedin.com", label: "LinkedIn", color: "hover:bg-blue-700" },
    { icon: <FaYoutube />, href: "https://youtube.com", label: "YouTube", color: "hover:bg-red-600" },
  ];

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-gray-300">
      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4 group">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform duration-300">
                <HiHome className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                ResidencePro
              </span>
            </Link>
            <p className="text-gray-400 mb-6 leading-relaxed">
              Your trusted partner in property management. We provide modern solutions for finding and managing your perfect home.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <MdLocationOn className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <span>Tejgaon, Dhaka, Bangladesh</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MdEmail className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a href="mailto:info@residencepro.com" className="hover:text-blue-400 transition-colors">
                  info@residencepro.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MdPhone className="w-5 h-5 text-blue-400 flex-shrink-0" />
                <a href="tel:+8801234567890" className="hover:text-blue-400 transition-colors">
                  +880 123 456 7890
                </a>
              </div>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200 inline-block hover:translate-x-1 transform"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Support</h3>
            <ul className="space-y-3">
              {footerLinks.support.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200 inline-block hover:translate-x-1 transform"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-lg">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link, index) => (
                <li key={index}>
                  <Link
                    to={link.path}
                    className="text-gray-400 hover:text-blue-400 transition-colors duration-200 inline-block hover:translate-x-1 transform"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="bg-gradient-to-r from-blue-600/10 to-purple-600/10 rounded-2xl p-6 mb-8 border border-blue-500/20">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h3 className="text-white font-semibold text-lg mb-1">Stay Updated</h3>
              <p className="text-gray-400 text-sm">Subscribe to our newsletter for latest updates</p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-500 flex-1 md:w-64"
              />
              <button className="px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-medium rounded-lg transition-all duration-200 hover:shadow-lg whitespace-nowrap">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center gap-4 mb-8">
          {socialLinks.map((social, index) => (
            <a
              key={index}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className={`w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 ${social.color} hover:text-white transition-all duration-300 transform hover:scale-110 hover:-translate-y-1`}
            >
              {social.icon}
            </a>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-400">
            <p>
              © {currentYear} <span className="text-blue-400 font-semibold">ResidencePro</span>. All rights reserved.
            </p>
            <div className="flex gap-6">
              <Link to="/terms" className="hover:text-blue-400 transition-colors">
                Terms of Service
              </Link>
              <Link to="/privacy" className="hover:text-blue-400 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/cookies" className="hover:text-blue-400 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;