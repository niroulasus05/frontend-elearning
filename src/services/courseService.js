// Mock course service
let mockCourses = [
  {
    id: 1,
    title: "Complete Python Bootcamp",
    platform: "Udemy",
    category: "Programming",
    rating: 4.6,
    enrollments: 125000,
    description:
      "Learn Python from scratch with hands-on projects and exercises.",
    keywords: ["python", "programming", "backend"],
    similarityScore: 95,
  },
  {
    id: 2,
    title: "React - The Complete Guide",
    platform: "Udemy",
    category: "Programming",
    rating: 4.7,
    enrollments: 98000,
    description: "Master React.js with hooks, context, and modern patterns.",
    keywords: ["react", "javascript", "frontend"],
    similarityScore: 92,
  },
  {
    id: 3,
    title: "UI/UX Design Fundamentals",
    platform: "Coursera",
    category: "Design",
    rating: 4.5,
    enrollments: 67000,
    description:
      "Learn the principles of user interface and user experience design.",
    keywords: ["design", "ui", "ux", "figma"],
    similarityScore: 88,
  },
  {
    id: 4,
    title: "Digital Marketing Masterclass",
    platform: "Udemy",
    category: "Marketing",
    rating: 4.4,
    enrollments: 82000,
    description: "Complete guide to digital marketing, SEO, and social media.",
    keywords: ["marketing", "seo", "social media"],
    similarityScore: 85,
  },
  {
    id: 5,
    title: "Machine Learning A-Z",
    platform: "Udemy",
    category: "Data Science",
    rating: 4.8,
    enrollments: 156000,
    description:
      "Hands-on Python & R in data science with real-world projects.",
    keywords: ["machine learning", "python", "data science"],
    similarityScore: 94,
  },
  {
    id: 6,
    title: "JavaScript: The Advanced Concepts",
    platform: "Udemy",
    category: "Programming",
    rating: 4.7,
    enrollments: 73000,
    description: "Deep dive into advanced JavaScript concepts and patterns.",
    keywords: ["javascript", "programming", "advanced"],
    similarityScore: 91,
  },
  {
    id: 7,
    title: "Business Strategy Fundamentals",
    platform: "Coursera",
    category: "Business",
    rating: 4.6,
    enrollments: 54000,
    description: "Learn strategic thinking and business planning techniques.",
    keywords: ["business", "strategy", "management"],
    similarityScore: 86,
  },
  {
    id: 8,
    title: "Graphic Design Bootcamp",
    platform: "Skillshare",
    category: "Design",
    rating: 4.5,
    enrollments: 61000,
    description: "Master Adobe Photoshop, Illustrator, and design principles.",
    keywords: ["design", "graphics", "adobe"],
    similarityScore: 89,
  },
  {
    id: 9,
    title: "Data Science with Python",
    platform: "edX",
    category: "Data Science",
    rating: 4.7,
    enrollments: 92000,
    description:
      "Complete data science course with pandas, numpy, and visualization.",
    keywords: ["data science", "python", "analytics"],
    similarityScore: 93,
  },
  {
    id: 10,
    title: "Web Development Bootcamp 2024",
    platform: "Udemy",
    category: "Programming",
    rating: 4.8,
    enrollments: 143000,
    description:
      "Full-stack web development with HTML, CSS, JavaScript, Node, and React.",
    keywords: ["web development", "fullstack", "javascript"],
    similarityScore: 96,
  },
];

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getAllCourses() {
  await delay(800);
  return [...mockCourses];
}

export async function getCourseById(id) {
  await delay(500);
  const course = mockCourses.find((c) => c.id === id);
  if (!course) {
    throw new Error("Course not found");
  }
  return course;
}

export async function addCourse(courseData) {
  await delay(800);

  const newId = Math.max(...mockCourses.map((c) => c.id), 0) + 1;

  const newCourse = {
    id: newId,
    ...courseData,
    keywords: courseData.title.toLowerCase().split(" ").slice(0, 3),
    similarityScore: Math.floor(Math.random() * 20) + 80, // Random 80-100
  };

  mockCourses.push(newCourse);
  return newCourse;
}

export async function updateCourse(id, courseData) {
  await delay(800);

  const index = mockCourses.findIndex((c) => c.id === id);
  if (index === -1) {
    throw new Error("Course not found");
  }

  mockCourses[index] = {
    ...mockCourses[index],
    ...courseData,
  };

  return mockCourses[index];
}

export async function deleteCourse(id) {
  await delay(500);

  const initialLength = mockCourses.length;
  mockCourses = mockCourses.filter((c) => c.id !== id);

  if (mockCourses.length === initialLength) {
    throw new Error("Course not found");
  }

  return { success: true };
}
