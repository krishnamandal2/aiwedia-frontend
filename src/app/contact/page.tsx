const ContactUs = () => {
  return (
    <div className="max-w-4xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-6 text-[#eb442c]">
        Contact Us
      </h1>

      <p className="text-lg text-gray-700 mb-6">
        Have questions, suggestions, or feedback?  
        I’d love to hear from you.
      </p>

      <div className="space-y-4 text-gray-700">
     

        <p>
          <strong>Email:</strong>{" "}
          <a
            href="mailto:your-email@example.com"
            className="text-[#eb442c] font-semibold hover:underline"
          >
          websonesolutions@gmail.com
          </a>
        </p>

        <p>
          This platform was built to solve the problem of managing and accessing
          many websites and tools from a single place.
        </p>
      </div>
    </div>
  );
};

export default ContactUs;
