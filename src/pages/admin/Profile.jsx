import React, { useState } from 'react';
import { User, Mail, Calendar, BookOpen } from 'lucide-react';
import { useAdmin } from '../../context/AdminContext';

function Profile() {
  const { admin } = useAdmin();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: admin?.name || '',
    email: admin?.email || '',
    bio: admin?.bio || 'Passionate learner exploring new technologies and skills.'
  });

  // Get viewed courses from localStorage
  const viewedCourses = JSON.parse(
    localStorage.getItem('viewedCourses') || '[]'
  );

  const handleSave = () => {
    console.log('Saving profile:', profileData);
    setIsEditing(false);
  };

  return (
    <div className="space-y-6">

      {/* Page header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Profile</h1>
        <p className="text-gray-600 mt-2">Manage your account information</p>
      </div>

      {/* Profile card */}
      <div className="bg-white rounded-lg shadow-md p-8">

        {/* Profile header */}
        <div className="flex items-center space-x-6 mb-8">

          {/* Avatar */}
          <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center text-white text-3xl font-bold">
            {admin?.name?.charAt(0).toUpperCase() || 'U'}
          </div>

          {/* User info */}
          <div className="flex-1">
            {isEditing ? (
              <input
                type="text"
                value={profileData.name}
                onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                className="text-2xl font-bold text-gray-800 border-b-2 border-blue-500 focus:outline-none mb-2"
              />
            ) : (
              <h2 className="text-2xl font-bold text-gray-800">{admin?.name}</h2>
            )}
            <p className="text-gray-600">Member since {new Date().getFullYear()}</p>
          </div>

          {/* Edit button */}
          <button
            onClick={() => isEditing ? handleSave() : setIsEditing(true)}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            {isEditing ? 'Save' : 'Edit Profile'}
          </button>
        </div>

        {/* Profile details */}
        <div className="space-y-6">

          {/* Email */}
          <div className="flex items-center space-x-4">
            <Mail className="w-5 h-5 text-gray-500" />
            <div className="flex-1">
              <p className="text-sm text-gray-600">Email</p>
              {isEditing ? (
                <input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  className="text-gray-800 border-b border-gray-300 focus:outline-none focus:border-blue-500"
                />
              ) : (
                <p className="text-gray-800">{admin?.email}</p>
              )}
            </div>
          </div>

          {/* Bio */}
          <div className="flex items-start space-x-4">
            <User className="w-5 h-5 text-gray-500 mt-1" />
            <div className="flex-1">
              <p className="text-sm text-gray-600">Bio</p>
              {isEditing ? (
                <textarea
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  className="w-full text-gray-800 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                />
              ) : (
                <p className="text-gray-800">{profileData.bio}</p>
              )}
            </div>
          </div>

          {/* Member since */}
          <div className="flex items-center space-x-4">
            <Calendar className="w-5 h-5 text-gray-500" />
            <div className="flex-1">
              <p className="text-sm text-gray-600">Member Since</p>
              <p className="text-gray-800">{new Date().toLocaleDateString()}</p>
            </div>
          </div>

          {/* Courses viewed */}
          <div className="flex items-center space-x-4">
            <BookOpen className="w-5 h-5 text-gray-500" />
            <div className="flex-1">
              <p className="text-sm text-gray-600">Courses Viewed</p>
              <p className="text-gray-800">{viewedCourses.length} courses</p>
            </div>
          </div>

        </div>
      </div>

      {/* Learning stats */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Learning Statistics</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Courses viewed */}
          <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-blue-600 text-sm font-medium">Courses Viewed</p>
            <p className="text-3xl font-bold text-blue-700">{viewedCourses.length}</p>
          </div>

          {/* Active days */}
          <div className="bg-green-50 rounded-lg p-4">
            <p className="text-green-600 text-sm font-medium">Active Days</p>
            <p className="text-3xl font-bold text-green-700">
              {Math.min(viewedCourses.length * 2, 30)}
            </p>
          </div>

          {/* Recommendations received */}
          <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-purple-600 text-sm font-medium">AI Recommendations</p>
            <p className="text-3xl font-bold text-purple-700">
              {viewedCourses.length > 0 ? 6 : 0}
            </p>
          </div>

        </div>
      </div>

    </div>
  );
}

export default Profile;