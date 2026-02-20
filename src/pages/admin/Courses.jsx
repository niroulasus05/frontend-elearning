import React, { useState, useEffect, useContext } from 'react';
import { Plus, Edit, Trash2, X } from 'lucide-react';
import Button from '../../components/Button';
import SearchFilter from '../../components/SearchFilter';
import { getAllCourses, addCourse, updateCourse, deleteCourse } from '../../services/courseService';
import { AdminContext } from '../../context/AdminContext';

function Courses() {

  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    platform: '',
    category: 'Programming',
    rating: 4.0,
    enrollments: 0,
    description: ''
  });

  const { addViewedCourse } = useContext(AdminContext);

  useEffect(() => { loadCourses(); }, []);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => { filterCourses(); }, [searchTerm, selectedCategory, courses]);

  const loadCourses = async () => {
    setLoading(true);
    try {
      const data = await getAllCourses();
      setCourses(data);
    } catch (error) {
      console.error('Error loading courses:', error);
    } finally {
      setLoading(false);
    }
  };

  const filterCourses = () => {
    let filtered = courses;
    if (selectedCategory !== 'All') filtered = filtered.filter(c => c.category === selectedCategory);
    if (searchTerm) {
      filtered = filtered.filter(c =>
        c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        c.platform.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    setFilteredCourses(filtered);
  };

  const handleAdd = () => {
    setEditingCourse(null);
    setFormData({
      title: '',
      platform: '',
      category: 'Programming',
      rating: 4.0,
      enrollments: 0,
      description: ''
    });
    setShowModal(true);
  };

  const handleEdit = (course) => {
    setEditingCourse(course);
    setFormData({
      title: course.title,
      platform: course.platform,
      category: course.category,
      rating: course.rating,
      enrollments: course.enrollments,
      description: course.description
    });
    setShowModal(true);
  };

  const handleDelete = async (courseId) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      try {
        await deleteCourse(courseId);
        loadCourses();
      } catch (error) {
        console.error('Error deleting course:', error);
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingCourse) {
        await updateCourse(editingCourse.id, formData);
      } else {
        await addCourse(formData);
      }
      setShowModal(false);
      loadCourses();
    } catch (error) {
      console.error('Error saving course:', error);
    }
  };

  const handleCourseClick = (courseId) => addViewedCourse(courseId);

  const handleSearch = (term) => setSearchTerm(term);
  const handleFilter = (category) => setSelectedCategory(category);

  const categories = ['All', ...new Set(courses.map(c => c.category))];

  if (loading) return (
    <div className="flex justify-center items-center h-64">
      <div className="text-xl text-gray-600">Loading courses...</div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Page header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-800">Course Management</h1>
          <p className="text-gray-600 mt-2">Browse and manage available courses</p>
        </div>

        {/* Reusable Button for Add Course */}
        <Button onClick={handleAdd} variant="primary" className="flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Add Course</span>
        </Button>
      </div>

      {/* Search and Filter Section */}
      <SearchFilter
        onSearch={handleSearch}
        onFilterChange={handleFilter}
        categories={categories} // pass categories for dropdown if your component uses it
      />

      {/* Courses grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredCourses.map(course => (
          <div
            key={course.id}
            onClick={() => handleCourseClick(course.id)}
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
          >
            <h3 className="text-lg font-bold text-gray-800 mb-2">{course.title}</h3>
            <p className="text-sm text-gray-600 mb-3">{course.platform}</p>
            <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full mb-3">
              {course.category}
            </span>
            <div className="flex justify-between text-sm text-gray-600 mb-4">
              <span>⭐ {course.rating}</span>
              <span>👥 {course.enrollments.toLocaleString()}</span>
            </div>
            <p className="text-sm text-gray-700 mb-4 line-clamp-2">{course.description}</p>
            <div className="flex space-x-2">
              <button
                onClick={(e) => { e.stopPropagation(); handleEdit(course); }}
                className="flex-1 flex items-center justify-center space-x-1 bg-yellow-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-600"
              >
                <Edit className="w-4 h-4" /><span>Edit</span>
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); handleDelete(course.id); }}
                className="flex-1 flex items-center justify-center space-x-1 bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600"
              >
                <Trash2 className="w-4 h-4" /><span>Delete</span>
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredCourses.length === 0 && (
        <div className="bg-gray-100 rounded-lg p-8 text-center">
          <p className="text-gray-600">No courses found matching your criteria</p>
        </div>
      )}

      {/* Add/Edit Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-2xl font-bold text-gray-800">
                {editingCourse ? 'Edit Course' : 'Add New Course'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-6 h-6" />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {/* Form fields */}
              {/* Submit buttons */}
              <div className="flex space-x-4">
                <Button type="submit" variant="primary" className="flex-1">
                  {editingCourse ? 'Update Course' : 'Add Course'}
                </Button>
                <Button type="button" variant="secondary" className="flex-1" onClick={() => setShowModal(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Courses;
