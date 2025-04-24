import React from "react";
import { Link } from "react-router-dom"; // Assuming you're using React Router

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center py-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">About Us</h1>
        <p className="text-lg text-gray-600">
          We’re building tools to make your life easier. Join our community
          today!
        </p>
      </section>

      {/* Mission/Vision */}
      <section className="max-w-4xl mx-auto py-8">
        <div className="bg-white p-8 rounded-lg shadow-sm">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Mission
          </h2>
          <p className="text-gray-600 mb-6">
            To empower users with simple, intuitive tools that solve everyday
            problems.
          </p>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Our Vision
          </h2>
          <p className="text-gray-600">
            A world where technology feels effortless and accessible to
            everyone.
          </p>
        </div>
      </section>

      {/* Team (Optional) */}
      <section className="max-w-4xl mx-auto py-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Meet the Team
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              name: "Hla Hla",
              role: "Lead Developer",
              image:
                "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&auto=format&fit=crop",
              social: {
                twitter: "#",
                linkedin: "#",
              },
            },
            {
              name: "Kyaw Kyaw",
              role: "UX Designer",
              image:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop",
              social: {
                twitter: "#",
                dribbble: "#",
              },
            },
            {
              name: "Mg Mg",
              role: "Product Manager",
              image:
                "https://images.unsplash.com/photo-1593104547489-5cfb3839a3b5?w=200&auto=format&fit=crop",
              social: {
                linkedin: "#",
                github: "#",
              },
            },
          ].map((member, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="flex flex-col items-center">
                {/* Team Member Photo */}
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-32 h-32 object-cover rounded-full border-4 border-white shadow-md mb-4"
                  loading="lazy"
                />

                {/* Name & Role */}
                <h3 className="text-xl font-semibold text-gray-800">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-4">{member.role}</p>

                {/* Social Links */}
                <div className="flex space-x-3">
                  {member.social.twitter && (
                    <a
                      href={member.social.twitter}
                      className="text-blue-400 hover:text-blue-500 transition"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                      </svg>
                    </a>
                  )}
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      className="text-blue-600 hover:text-blue-700 transition"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                      </svg>
                    </a>
                  )}
                  {member.social.github && (
                    <a
                      href={member.social.github}
                      className="text-gray-700 hover:text-black transition"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                    </a>
                  )}
                  {member.social.dribbble && (
                    <a
                      href={member.social.dribbble}
                      className="text-pink-500 hover:text-pink-600 transition"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 24c6.627 0 12-5.373 12-12s-5.373-12-12-12-12 5.373-12 12 5.373 12 12 12zm10-12c0 1.091-.154 2.144-.436 3.146a9.959 9.959 0 01-1.414 3.014 9.987 9.987 0 01-2.45 2.451 9.993 9.993 0 01-3.013 1.414A10.04 10.04 0 0112 22a9.99 9.99 0 01-8.111-4.146 9.999 9.999 0 01-1.414-3.014A9.947 9.947 0 012 12c0-5.514 4.486-10 10-10s10 4.486 10 10zm-6.5 1.5c0-1.933-.5-3.5-1.5-3.5s-1.5 1.567-1.5 3.5.5 3.5 1.5 3.5 1.5-1.567 1.5-3.5zm-3.5-1.5c0-1.933.5-3.5 1.5-3.5s1.5 1.567 1.5 3.5-.5 3.5-1.5 3.5-1.5-1.567-1.5-3.5zm-3-3c0-1.933.5-3.5 1.5-3.5s1.5 1.567 1.5 3.5-.5 3.5-1.5 3.5-1.5-1.567-1.5-3.5zm0 6c0-1.933-.5-3.5-1.5-3.5s-1.5 1.567-1.5 3.5.5 3.5 1.5 3.5 1.5-1.567 1.5-3.5z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-4xl mx-auto py-12 text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Ready to Join?
        </h2>
        <Link
          to="/register" // Link to your register page
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg transition"
        >
          Sign Up Now
        </Link>
      </section>
    </div>
  );
};

export default AboutPage;
