import * as React from "react";
import type { ICourse, ICategory } from "@/types/course.type";
import { ChevronUp, ChevronDown, BookOpen, HelpCircle } from "lucide-react";

interface CourseTOCProps {
    course: ICourse;
}

interface ExpandableSectionProps {
    category: ICategory;
    index: number;
    isExpanded: boolean;
    onToggle: () => void;
}

function ExpandableSection({
    category,
    index,
    isExpanded,
    onToggle,
}: ExpandableSectionProps) {
    return (
        <div className="border-b border-gray-200 pb-4 sm:pb-6 mb-4 sm:mb-6 last:border-b-0">
            <div
                className="flex items-center justify-between cursor-pointer"
                onClick={onToggle}
            >
                <div className="flex items-center gap-2 sm:gap-3 flex-1">
                    <span className="text-base sm:text-lg font-semibold text-gray-700 flex-shrink-0">
                        {index}.
                    </span>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 leading-tight">
                        {category.title}
                    </h3>
                </div>
                <div className="flex-shrink-0 ml-2">
                    {isExpanded ? (
                        <ChevronUp className="w-5 h-5 text-gray-500" />
                    ) : (
                        <ChevronDown className="w-5 h-5 text-gray-500" />
                    )}
                </div>
            </div>

            {isExpanded && (
                <div className="mt-4 ml-0 sm:ml-4 lg:ml-8">
                    <p className="text-sm text-gray-600 mb-4 leading-relaxed">
                        {category.summary}
                    </p>
                    <div className="space-y-2">
                        {category.pages.map((page, pageIndex) => (
                            <div
                                key={page.id}
                                className="flex items-start gap-3 py-2 hover:bg-gray-50 rounded-md px-2 -mx-2"
                            >
                                <div className="w-4 h-4 border border-gray-300 rounded-full flex-shrink-0 mt-0.5"></div>
                                <div className="flex items-center gap-2 flex-1 min-w-0">
                                    <BookOpen className="w-4 h-4 text-gray-400 flex-shrink-0" />
                                    <span className="text-sm text-blue-600 hover:text-blue-800 underline cursor-pointer leading-tight">
                                        {page.title}
                                    </span>
                                </div>
                                {pageIndex % 3 === 0 && (
                                    <div className="flex items-center gap-1 text-xs text-gray-500 flex-shrink-0">
                                        <HelpCircle className="w-3 h-3" />
                                        <span className="hidden sm:inline">
                                            Quiz
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default function CourseTOC({ course }: CourseTOCProps) {
    const [expandedSections, setExpandedSections] = React.useState<Set<number>>(
        new Set([0, 1])
    );

    const [isAllExpanded, setIsAllExpanded] = React.useState(false);

    const totalLessons =
        course?.toc.categories.reduce(
            (total, category) => total + category.pages.length,
            0
        ) || 0;

    const totalQuizzes = Math.floor(totalLessons * 0.8);

    const toggleSection = (index: number) => {
        const newExpanded = new Set(expandedSections);
        if (newExpanded.has(index)) {
            newExpanded.delete(index);
        } else {
            newExpanded.add(index);
        }
        setExpandedSections(newExpanded);
    };

    const toggleAllSections = () => {
        if (isAllExpanded) {
            setExpandedSections(new Set());
        } else {
            setExpandedSections(
                new Set(course?.toc?.categories.map((_, index) => index))
            );
        }
        setIsAllExpanded(!isAllExpanded);
    };

    return (
        <div className="bg-white rounded-lg p-4 sm:p-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
                <div>
                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-2">
                        Content
                    </h2>
                    <p className="text-sm text-gray-600">
                        {totalLessons} Lessons • {totalQuizzes} Quizzes
                    </p>
                </div>
                <button
                    onClick={toggleAllSections}
                    className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800 font-medium self-start sm:self-auto"
                >
                    <span>{isAllExpanded ? "Collapse All" : "Expand All"}</span>
                    {isAllExpanded ? (
                        <ChevronUp className="w-4 h-4" />
                    ) : (
                        <ChevronDown className="w-4 h-4" />
                    )}
                </button>
            </div>

            <div className="space-y-0">
                {course?.toc?.categories.map((category, index) => (
                    <ExpandableSection
                        key={category.id}
                        category={category}
                        index={index + 1}
                        isExpanded={expandedSections.has(index)}
                        onToggle={() => toggleSection(index)}
                    />
                ))}
            </div>

            <div className="mt-8 pt-6 border-t border-gray-200">
                <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium text-gray-700">
                        Course Progress
                    </span>
                    <span className="text-sm text-gray-500">0% Complete</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                        className="bg-blue-600 h-2 rounded-full"
                        style={{ width: "0%" }}
                    ></div>
                </div>
            </div>
        </div>
    );
}
