import React, { useState } from "react";
import {
  FaEdit,
  FaSignOutAlt,
  FaTwitter,
  FaGithub,
  FaLinkedin,
} from "react-icons/fa";
import { MdEmail, MdLocationOn, MdWork } from "react-icons/md";

const ProfilePage: React.FC = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: "Alex Johnson",
    bio: "Product Designer & Developer",
    location: "San Francisco, CA",
    company: "TechCorp",
    email: "alex@example.com",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  });

  const stats = [
    { label: "Posts", value: 42 },
    { label: "Followers", value: 1024 },
    { label: "Following", value: 86 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      {/* Profile Header */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="relative">
          {/* Cover Photo */}
          <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>

          {/* Profile Info */}
          <div className="px-6 pb-6 relative -mt-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between">
              <div className="flex items-end">
                <img
                  className="h-24 w-24 rounded-full border-4 border-white bg-white"
                  src={profile.avatar}
                  alt={profile.name}
                />
                <div className="ml-4">
                  <h1 className="text-2xl font-bold text-gray-800">
                    {profile.name}
                  </h1>
                  <p className="text-gray-600">{profile.bio}</p>
                </div>
              </div>

              <div className="mt-4 sm:mt-0 flex space-x-3">
                <button
                  onClick={() => setIsEditing(true)}
                  className="flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition"
                >
                  <FaEdit className="mr-2" />
                  Edit Profile
                </button>
                <button className="p-2 text-gray-500 hover:text-red-500 rounded-full transition">
                  <FaSignOutAlt className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="mt-6 grid grid-cols-3 divide-x divide-gray-200 text-center">
              {stats.map((stat, index) => (
                <div key={index} className="px-4 py-2">
                  <p className="text-xl font-semibold text-gray-800">
                    {stat.value}
                  </p>
                  <p className="text-sm text-gray-500">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Details Section */}
        <div className="border-t border-gray-200 px-6 py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="flex items-center">
                <MdEmail className="text-gray-400 mr-3" size={20} />
                <span className="text-gray-600">{profile.email}</span>
              </div>
              <div className="flex items-center">
                <MdLocationOn className="text-gray-400 mr-3" size={20} />
                <span className="text-gray-600">{profile.location}</span>
              </div>
              <div className="flex items-center">
                <MdWork className="text-gray-400 mr-3" size={20} />
                <span className="text-gray-600">{profile.company}</span>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <a
                href="#"
                className="text-blue-400 hover:text-blue-500 transition"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="#"
                className="text-gray-700 hover:text-gray-900 transition"
              >
                <FaGithub size={20} />
              </a>
              <a
                href="#"
                className="text-blue-600 hover:text-blue-700 transition"
              >
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Activity Section */}
      <div className="max-w-4xl mx-auto mt-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">
          Recent Activity
        </h2>
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className={`p-4 ${item !== 3 ? "border-b border-gray-200" : ""}`}
            >
              <div className="flex">
                <div className="flex-shrink-0 mr-3">
                  <div className="h-10 w-10 rounded-full bg-gray-200"></div>
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-800">You</span>{" "}
                    posted an update
                  </p>
                  <p className="text-xs text-gray-500 mt-1">2 days ago</p>
                </div>
              </div>
              <p className="mt-2 text-gray-700">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit...
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Edit Profile</h3>
              <button
                onClick={() => setIsEditing(false)}
                className="text-gray-400 hover:text-gray-500"
              >
                ✕
              </button>
            </div>

            <form>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Name
                  </label>
                  <input
                    type="text"
                    value={profile.name}
                    onChange={(e) =>
                      setProfile({ ...profile, name: e.target.value })
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    value={profile.bio}
                    onChange={(e) =>
                      setProfile({ ...profile, bio: e.target.value })
                    }
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
