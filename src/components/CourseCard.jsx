import React from "react";
import Button from "./Button";

const CourseCard = ({ course, onEdit, onDelete, showActions = true }) => {
    if (!course) return null;

    return (
        <div className="course-card">
            {/* Course Thumbnail */}
            <div className="course-card-image">
                <img
                    src={course.thumbnail || "/placeholder.png"}
                    alt={course.title || "Course"}
                />
                {course.level && (
                    <span
                        className={`course-badge course-badge-${course.level.toLowerCase()}`}
                    >
                        {course.level}
                    </span>
                )}
            </div>

            {/* Course Details */}
            <div className="course-card-content">
                <div className="course-card-header">
                    <h3 className="course-title">{course.title}</h3>
                    <span className="course-category">{course.category}</span>
                </div>

                <p className="course-description">{course.description}</p>

                <div className="course-meta">
                    <div className="course-meta-item">
                        <span className="icon">👤</span>
                        <span>{course.instructor}</span>
                    </div>
                    <div className="course-meta-item">
                        <span className="icon">⭐</span>
                        <span>{course.rating}</span>
                    </div>
                    <div className="course-meta-item">
                        <span className="icon">👥</span>
                        <span>
                            {course.enrollments
                                ? course.enrollments.toLocaleString()
                                : 0}
                        </span>
                    </div>
                    <div className="course-meta-item">
                        <span className="icon">⏱️</span>
                        <span>{course.duration}</span>
                    </div>
                </div>

                {/* Footer */}
                <div className="course-card-footer">
                    <div className="course-price">
                        ${course.price ?? 0}
                    </div>

                    {showActions && (
                        <div className="course-actions">
                            <button
                                className="btn-icon btn-edit"
                                onClick={() => onEdit && onEdit(course)}
                                title="Edit course"
                            >
                                ✏️
                            </button>
                            <button
                                className="btn-icon btn-delete"
                                onClick={() => onDelete && onDelete(course.id)}
                                title="Delete course"
                            >
                                🗑️
                            </button>
                        </div>
                    )}

                    <Button
                        onClick={() =>
                            console.log(`Enrolled in ${course.title}`)
                        }
                        variant="primary"
                    >
                        Enroll
                    </Button>
                </div>
            </div>
        </div>
    );
};

/**
 * Recommendation Card Component
 */
export const RecommendationCard = ({ course }) => {
    if (!course) return null;

    const { similarityScore, recommendationType, reason } = course;

    return (
        <div className="recommendation-card">
            <div className="recommendation-badge">
                {recommendationType === "popular" && "🔥 Popular"}
                {recommendationType === "top-rated" && "⭐ Top Rated"}
                {recommendationType === "similar" && "🎯 Similar"}
                {recommendationType === "trending" && "📈 Trending"}
                {recommendationType === "personalized" && "💎 For You"}
            </div>

            <div className="course-card-image">
                <img
                    src={course.thumbnail || "/placeholder.png"}
                    alt={course.title || "Course"}
                />
            </div>

            <div className="course-card-content">
                <h3 className="course-title">{course.title}</h3>

                {similarityScore && (
                    <div className="similarity-score">
                        <div className="similarity-bar">
                            <div
                                className="similarity-fill"
                                style={{
                                    width: `${similarityScore * 100}%`,
                                }}
                            ></div>
                        </div>
                        <span className="similarity-text">
                            {(similarityScore * 100).toFixed(0)}% match
                        </span>
                    </div>
                )}

                <div className="recommendation-reason">
                    <span className="reason-icon">💡</span>
                    <span className="reason-text">{reason}</span>
                </div>

                <div className="course-meta-compact">
                    <span>⭐ {course.rating}</span>
                    <span>
                        👥{" "}
                        {course.enrollments
                            ? course.enrollments.toLocaleString()
                            : 0}
                    </span>
                    <span>${course.price ?? 0}</span>
                </div>
            </div>
        </div>
    );
};

export default CourseCard;
