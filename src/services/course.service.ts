import type { AxiosInstance, AxiosRequestConfig } from 'axios';

import { BaseService, baseService } from './base.service';

import type {
	ICourse as CourseType,
	IEnrollment,
} from '@/types/course.type';
import type { ListResponse } from '@/types/list.type';

export class CourseService {
	private static instance: CourseService;
	private readonly api: AxiosInstance;

	private readonly baseService: BaseService;

	constructor(baseService: BaseService) {
		this.baseService = baseService;
		this.api = this.baseService.getClient();
	}

	public static getInstance(baseService: BaseService): CourseService {
		if (!CourseService.instance) {
			CourseService.instance = new CourseService(baseService);
		}
		return CourseService.instance;
	}

	getListAllCourses = async <T extends ListResponse<CourseType>>(
		url = '/courses',
		configs?: AxiosRequestConfig,
	) => {
		const { data } = await this.api.get<T>(url, configs);
		return data;
	};

	getCourseById = async (
		id: string,
		url = `/courses/${id}`,
		configs?: AxiosRequestConfig,
	): Promise<CourseType> => {
		const { data } = await this.api.get(url, configs);
		return data.data;
	};

	// ============= Saved Course Methods =============

	getSavedCourses = async (
		params: { page?: number; limit?: number } = {},
		configs?: AxiosRequestConfig,
	): Promise<ListResponse<CourseType>> => {
		const { data } = await this.api.get('/saved-courses', {
			params,
			...configs,
		});
		return data;
	};

	saveCourse = async (
		courseId: string,
	): Promise<{ saved: boolean }> => {
		const { data } = await this.api.post(
			`/saved-courses/${courseId}`,
		);
		return data.data;
	};

	unsaveCourse = async (
		courseId: string,
	): Promise<{ saved: boolean }> => {
		const { data } = await this.api.delete(
			`/saved-courses/${courseId}`,
		);
		return data.data;
	};

	isCourseSaved = async (
		courseId: string,
	): Promise<{ saved: boolean }> => {
		const { data } = await this.api.get(
			`/saved-courses/${courseId}/status`,
		);
		return data.data;
	};

	// ============= Enrollment Methods =============

	getEnrolledCourses = async (
		params: { page?: number; limit?: number } = {},
		configs?: AxiosRequestConfig,
	): Promise<ListResponse<CourseType>> => {
		const { data } = await this.api.get('/enrollments', {
			params,
			...configs,
		});
		return data;
	};

	enrollCourse = async (
		courseId: string,
	): Promise<{ enrolled: boolean; isNew: boolean }> => {
		const { data } = await this.api.post(`/enrollments/${courseId}`);
		return data.data;
	};

	isEnrolled = async (
		courseId: string,
	): Promise<{ enrolled: boolean; enrollment: IEnrollment }> => {
		const { data } = await this.api.get(
			`/enrollments/${courseId}/status`,
		);
		return data.data;
	};

	getPopularCourses = async (
		params: { limit?: number } = {},
		configs?: AxiosRequestConfig,
	): Promise<ListResponse<CourseType>> => {
		const { data } = await this.api.get('/recommendations/popular', {
			params,
			...configs,
		});
		return data;
	};

	getPersonalizedCourses = async (
		params: { userId: string; limit?: number },
		configs?: AxiosRequestConfig,
	): Promise<ListResponse<CourseType>> => {
		const { data } = await this.api.get(
			`/recommendations/personalized/${params.userId}`,
			{
				params,
				...configs,
			},
		);
		return data;
	};
}

const courseService = CourseService.getInstance(baseService);

export default courseService;
