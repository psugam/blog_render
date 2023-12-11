import React from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const About = () => {
  return (
    <>
    <Navbar />
    <div className="container mx-auto p-6">
      <div className="max-w-2xl mx-auto bg-white p-8 rounded shadow-md">
        <h2 className="text-3xl font-bold mb-6">About Me</h2>
        <p className="text-gray-700 mb-6">
          Hi there! I'm Sugam, a passionate and creative software developer.
          I love turning ideas into reality through the power of code.
          I love history (especially ancient history) and sometimes write here about things that seem interesting to me.
        </p>

        <div className="mb-6">
          <h3 className="text-2xl font-bold mb-3">Skills</h3>
          <ul className="list-disc pl-6">
            <li>JavaScript (ES6+)</li>
            <li>React.js</li>
            <li>Node.js</li>
            <li>HTML5 / CSS3</li>
            <li>Git / Version Control</li>
            {/* Add more skills as needed */}
          </ul>
        </div>

        <div className="mb-6">
          <h3 className="text-2xl font-bold mb-3">Contact</h3>
          <p className="text-gray-700">
            If you're interested in working together or just want to say hi,
            feel free to reach out to me at{' '}
            <a href="mailto:pokharelsugam19@gmail.com" className="text-blue-500">
              pokharelsugam19@gmail.com
            </a>
            .
          </p>
        </div>

        <div className="flex space-x-4">
          <a
            href="https://github.com/psugam"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/yourusername"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-500"
          >
            LinkedIn
          </a>
          {/* Add more social media links as needed */}
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default About;
