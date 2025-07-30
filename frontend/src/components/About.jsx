import React from 'react';


const About = () => {
  return (
    <section id="about" className="bg-gray-50 py-16 px-6 scroll-mt-16">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        
        {/* Left Side - Text */}
        <div>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">About Our Central Library</h2>
          <p className="text-gray-700 text-lg leading-relaxed mb-4">
            The Central Library is the heart of our academic community, providing access to a vast collection of books, journals, and digital resources. It serves as a hub for learning, research, and collaboration, fostering a culture of knowledge and intellectual curiosity.
          </p>
          <p className="text-gray-700 text-lg leading-relaxed">
            With quiet reading spaces, digital access terminals, and dedicated sections for every stream, our library empowers students and faculty alike with resources that enrich their educational journey.
          </p>
        </div>

        {/* Right Side - SVG */}
        <div className="flex justify-center md:justify-end">
          {/* Replace this with your actual SVG */}
          <img 
            src="/images/illustration.svg"
            alt="Library illustration"
            className="w-full max-w-md"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
