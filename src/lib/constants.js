// Application constants
export const API_ENDPOINTS = {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    COURSES: '/courses',
    RECOMMENDATIONS: '/recommendations',
    PROFILE: '/profile'
  };
  
  export const COURSE_CATEGORIES = [
    'Programming',
    'Design',
    'Business',
    'Marketing',
    'Data Science'
  ];
  
  export const COURSE_PLATFORMS = [
    'Udemy',
    'Coursera',
    'edX',
    'Skillshare',
    'LinkedIn Learning'
  ];
  
  export const RECOMMENDATION_TYPES = {
    POPULAR: 'popularity',
    SIMILAR: 'similarity',
    PERSONALIZED: 'personalized'
  };
  
  export const ITEMS_PER_PAGE = 12;
  export const MAX_RECOMMENDATIONS = 6;
  
  export const STORAGE_KEYS = {
    ADMIN: 'adminUser',
    VIEWED_COURSES: 'viewedCourses',
    PREFERENCES: 'userPreferences'
  };