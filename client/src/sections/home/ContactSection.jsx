import { motion } from "framer-motion";
import contact_img from "../../assets/images/contact_img.png";

const ContactSection = () => {
  return (
    <div id="contact" className="px-6 md:px-16 py-10 bg-gray-200">
      <div className="flex flex-col md:flex-row items-center justify-center h-auto md:h-[500px] rounded-lg overflow-hidden">
        
        {/* Left Side - Full Height Image */}
        <div className="relative w-full md:w-1/2 h-[500px]">
          <img
            src={contact_img}
            alt="Contact Us"
            className="w-full h-full object-cover"
          />

          {/* Text Overlay */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="absolute top-1/4 left-6 md:left-10 bg-blue-900 bg-opacity-80 p-4 md:p-5 rounded-lg text-white max-w-sm"
          >
            <h2 className="text-2xl md:text-3xl font-bold">Need Help?</h2>
            <p className="text-base md:text-lg mt-2">
              Reach out to us for any concerns about Overwatch, your AI-powered cyber-monitoring solution.
            </p>
          </motion.div>
        </div>

        {/* Right Side - Contact Form in a Card */}
        <div className="w-full md:w-1/2 flex justify-center">
          <div className="bg-white shadow-lg rounded-lg p-6 md:p-10 w-full max-w-lg">
            <h2 className="text-xl md:text-2xl font-bold text-blue-900 mb-4 md:mb-5">Send us a message</h2>
            <form className="space-y-4">
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-full md:w-1/2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-full md:w-1/2 p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <input
                type="email"
                placeholder="Email"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <textarea
                placeholder="Type your message here"
                rows="4"
                className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              ></textarea>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition"
              >
                Submit
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ContactSection;
