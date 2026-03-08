import type { ICourse } from "@/types/course.type";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Clock, BarChart3, BookOpen } from "lucide-react";

interface CourseCardProps {
    course: ICourse;
}

export default function CourseCard({ course }: CourseCardProps) {
    const getSkillLevel = () => {
        if (course.target_audience.includes("advanced")) return "Advanced";
        if (course.target_audience.includes("intermediate"))
            return "Intermediate";
        if (course.target_audience.includes("beginner")) return "Beginner";
        return "Intermediate";
    };

    return (
        <Link
            to={`/courses/${course._id}`}
            data-testid={`link-course-${course._id}`}
        >
            <div className="bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer">
                <div className="p-6 space-y-4">
                    {/* Course Badge */}
                    <div className="flex items-start justify-between">
                        <Badge
                            variant="secondary"
                            className="bg-purple-100 text-purple-800 border-0 px-3 py-1 text-xs font-medium flex items-center gap-1"
                            data-testid={`badge-category-${course._id}`}
                        >
                            <BookOpen aria-hidden="true" className="w-3 h-3" />
                            Course
                        </Badge>
                    </div>

                    {/* Course Title */}
                    <h3
                        className="text-lg font-bold text-gray-900 leading-tight"
                        data-testid={`text-title-${course._id}`}
                    >
                        {course.title}
                    </h3>

                    {/* Course Description */}
                    <p
                        className="text-sm text-gray-600 line-clamp-3 leading-relaxed"
                        data-testid={`text-summary-${course._id}`}
                    >
                        {course.brief_summary}
                    </p>

                    {/* Course Meta Info */}
                    <div className="flex items-center justify-between text-sm text-gray-500">
                        <div className="flex items-center gap-1">
                            <Clock aria-hidden="true" className="w-4 h-4" />
                            <span data-testid={`text-duration-${course._id}`}>
                                {course.read_time} h
                            </span>
                        </div>
                        <div className="flex items-center gap-1">
                            <BarChart3
                                aria-hidden="true"
                                className="w-4 h-4"
                            />
                            <span
                                data-testid={`text-skill-level-${course._id}`}
                            >
                                {getSkillLevel()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
}
