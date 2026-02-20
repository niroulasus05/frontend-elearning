import React, { useState, useEffect, useContext } from 'react';
import { BookOpen, Users, Star, TrendingUp } from 'lucide-react';
import { getAllCourses } from '../../services/courseService';
import { getPopularCourses, getSimilarCourses } from '../../services/recommendationService';
import AdminContext from '../../context/AdminContext'; 
import CourseCard from "../../components/CourseCard";

function Home() {

  const [courses, setCourses] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const { viewedCourses = [] } = useContext(AdminContext);

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewedCourses]);

  const loadData = async () => {
    setLoading(true);
    try {
      const allCourses = await getAllCourses();
      setCourses(allCourses);

      const recs = await generateRecommendations(allCourses);
      setRecommendations(recs);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const generateRecommendations = async (allCourses) => {
    const results = [];

    // Step 1: Popular courses
    const popular = await getPopularCourses(allCourses);
    popular.slice(0, 2).forEach(course => {
      results.push({
        course,
        reason: 'Recommended based on high popularity and enrollment numbers across the platform'
      });
    });

    if (viewedCourses.length > 0) {
      const lastViewed = viewedCourses[viewedCourses.length - 1];
      const similar = await getSimilarCourses(lastViewed, allCourses);

      similar.slice(0, 2).forEach(course => {
        if (!results.find(r => r.course.id === course.id)) {
          results.push({
            course,
            reason: 'Recommended based on similarity to your previously viewed courses and learning patterns'
          });
        }
      });
    }

    const categories = ['Programming', 'Design', 'Business'];
    categories.forEach(cat => {
      const catCourse = allCourses.find(c =>
        c.category === cat &&
        !results.find(r => r.course.id === c.id)
      );

      if (catCourse && results.length < 6) {
        results.push({
          course: catCourse,
          reason: `Trending in ${cat} category - matches your learning interests`
        });
      }
    });

    return results.slice(0, 6);
  };

  const avgRating =
    courses.length > 0
      ? (
          courses.reduce((sum, c) => sum + c.rating, 0) / courses.length
        ).toFixed(1)
      : 0;

  const stats = {
    totalCourses: courses.length,
    totalEnrollments: courses.reduce((sum, c) => sum + c.enrollments, 0),
    avgRating,
    recommendations: recommendations.length
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-xl text-gray-600">Loading recommendations...</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-800">Dashboard</h1>
        <p className="text-gray-600 mt-2">
          Welcome to your personalized learning dashboard
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Courses</p>
              <p className="text-3xl font-bold text-gray-800">
                {stats.totalCourses}
              </p>
            </div>
            <BookOpen className="w-12 h-12 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Total Enrollments</p>
              <p className="text-3xl font-bold text-gray-800">
                {stats.totalEnrollments.toLocaleString()}
              </p>
            </div>
            <Users className="w-12 h-12 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">Average Rating</p>
              <p className="text-3xl font-bold text-gray-800">
                {stats.avgRating}
              </p>
            </div>
            <Star className="w-12 h-12 text-yellow-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm">AI Recommendations</p>
              <p className="text-3xl font-bold text-gray-800">
                {stats.recommendations}
              </p>
            </div>
            <TrendingUp className="w-12 h-12 text-purple-500" />
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            AI-Recommended Courses
          </h2>
          <div className="bg-purple-100 px-4 py-2 rounded-lg">
            <p className="text-sm text-purple-800 font-medium">
              Powered by AI Algorithm
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendations.map((rec, index) => (
            <div key={index}>
              <CourseCard course={rec.course} />
              <p className="text-sm text-gray-500 mt-2">
                {rec.reason}
              </p>
            </div>
          ))}
        </div>

        {recommendations.length === 0 && (
          <div className="bg-gray-100 rounded-lg p-8 text-center">
            <p className="text-gray-600">
              Start viewing courses to get personalized AI recommendations!
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
