const Disclaimer = () => {
  return (
    <div className="max-w-5xl mx-auto p-10">
      <h1 className="text-4xl font-bold mb-6 text-[#eb442c]">
        Disclaimer
      </h1>

      <p className="text-gray-700 mb-4">
        This website is created and maintained by <strong>Aiwedia team</strong>,
        a software engineer, with the purpose of helping users easily
        discover, manage, and access multiple websites and online tools
        from a single platform.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">
        Third-Party Websites
      </h2>

      <p className="text-gray-700 mb-4">
        All third-party websites, tools, services, logos, and trademarks
        displayed or linked on this platform are the property of their
        respective owners.
      </p>

      <p className="text-gray-700 mb-4">
        This website does <strong>not claim ownership</strong> of any
        third-party content. The listings are provided solely for
        informational and convenience purposes.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">
        Permissions & Fair Use
      </h2>

      <p className="text-gray-700 mb-4">
        Links, names, and logos are used under fair use principles
        for identification and reference purposes only.
        No affiliation, endorsement, or partnership is implied unless
        explicitly stated.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">
        External Links
      </h2>

      <p className="text-gray-700 mb-4">
        This website may contain links to external websites.
        We are not responsible for the content, accuracy,
        or availability of these external sites.
      </p>

      <h2 className="text-2xl font-semibold mt-8 mb-3">
        Removal Requests
      </h2>

      <p className="text-gray-700 mb-4">
        If you are a website owner and believe that your content,
        logo, or link should not be displayed on this platform,
        please contact us. We will review and remove the content
        promptly if required.
      </p>

      <p className="text-gray-700 mt-6">
        📧 Contact Email:{" "}
        <a
          href="mailto:your-email@example.com"
          className="text-[#eb442c] font-semibold hover:underline"
        >
         websonesolutions@gmail.com
        </a>
      </p>
    </div>
  );
};

export default Disclaimer;
