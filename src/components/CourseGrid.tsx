import type { ICourse } from "@/types/course.type";
import CourseCard from "./CourseCard";
import { cn } from "@/lib/utils";

interface CourseGridProps {
    courses: ICourse[];
    title?: string;
    className?: string;
}

export default function CourseGrid({
    courses,
    title,
    className,
}: CourseGridProps) {
    return (
        <section
            className={cn("py-8 px-4 bg-gray-50 scroll-mt-24", className)}
            id="courses"
            data-testid="section-course-grid"
        >
            {title && (
                <div className="max-w-7xl mx-auto mb-8">
                    <div
                        className="inline-block bg-primary border-3 border-foreground px-8 py-4"
                        style={{ boxShadow: "var(--shadow-lg)" }}
                    >
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-primary-foreground">
                            {title}
                        </h2>
                    </div>
                </div>
            )}
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {courses.map((course) => (
                    <CourseCard key={course._id} course={course} />
                ))}
            </div>
        </section>
    );
}
