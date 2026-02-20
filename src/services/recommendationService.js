const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function getPopularCourses(courses) {
  await delay(600);

  const sorted = [...courses].sort((a, b) => b.enrollments - a.enrollments);

  return sorted.map((course) => ({
    ...course,
    similarityScore: calculatePopularityScore(course, sorted[0]),
  }));
}

export async function getSimilarCourses(courseId, allCourses) {
  await delay(800);

  const referenceCourse = allCourses.find((c) => c.id === courseId);
  if (!referenceCourse) {
    return [];
  }

  const coursesWithScores = allCourses
    .filter((c) => c.id !== courseId)
    .map((course) => ({
      ...course,
      similarityScore: calculateSimilarity(referenceCourse, course),
    }));

  const sorted = coursesWithScores.sort(
    (a, b) => b.similarityScore - a.similarityScore
  );

  return sorted;
}

function calculateSimilarity(course1, course2) {
  let score = 0;

  if (course1.category === course2.category) {
    score += 40;
  }

  if (course1.platform === course2.platform) {
    score += 20;
  }

  const ratingDiff = Math.abs(course1.rating - course2.rating);
  score += Math.max(0, 20 - ratingDiff * 10);

  if (course1.keywords && course2.keywords) {
    const commonKeywords = course1.keywords.filter((k) =>
      course2.keywords.includes(k)
    );
    score +=
      (commonKeywords.length / Math.max(course1.keywords.length, 1)) * 20;
  }
  return Math.min(100, Math.round(score));
}

function calculatePopularityScore(course, topCourse) {
  const enrollmentRatio = course.enrollments / topCourse.enrollments;

  const ratingFactor = course.rating / 5;

  const score = (enrollmentRatio * 0.7 + ratingFactor * 0.3) * 100;

  return Math.round(score);
}

export async function getPersonalizedRecommendations(
  viewedCourseIds,
  allCourses
) {
  await delay(1000);

  if (viewedCourseIds.length === 0) {
    return getPopularCourses(allCourses);
  }

  const viewedCourses = allCourses.filter((c) =>
    viewedCourseIds.includes(c.id)
  );

  const categoryCount = {};
  viewedCourses.forEach((course) => {
    categoryCount[course.category] = (categoryCount[course.category] || 0) + 1;
  });
  const preferredCategory = Object.keys(categoryCount).reduce((a, b) =>
    categoryCount[a] > categoryCount[b] ? a : b
  );

  const recommendations = allCourses
    .filter((c) => !viewedCourseIds.includes(c.id))
    .filter((c) => c.category === preferredCategory)
    .map((course) => ({
      ...course,
      similarityScore: 85 + Math.floor(Math.random() * 15), // 85-100
    }))
    .sort((a, b) => b.rating - a.rating);

  return recommendations;
}
