export interface IPage {
	id: number;
	title: string;
	author_id: number;
	collection_id: number;
	page_id: number;
	slug: string;
}

export interface ICategory {
	id: string;
	title: string;
	summary: string;
	pages: IPage[];
}

export interface ITOC {
	categories: ICategory[];
}

export interface ICourse {
	_id: string;
	title: string;
	summary: string;
	brief_summary: string;
	details?: string;
	clos: string[];
	toc: ITOC;
	tags: string[];
	target_audience: string;
	cover_image_serving_url: string;
	url_slug: string;
	read_time: number;
	learner_tags: string[];
	level_one_learner_tags: string[];
	createdAt?: Date;
	updatedAt?: Date;
}

export interface IEnrollment {
	_id: string;
	user_id: string;
	course_id: string | ICourse;
	progress: number;
	completed: boolean;
	enrolledAt: string;
	lastAccessedAt: string;
}
