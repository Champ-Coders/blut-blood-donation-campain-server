import { IGenericErrorMessage } from './error';

export type IGenericErrorResponse = {
	statusCode: number;
	success: boolean;
	message: string;
	errorMessages: IGenericErrorMessage[];
}

// Pagination Response
export type IGenericResponse<T> = {
	meta: {
		page: number;
		limit: number;
		total: number;
	};
	data: T;
}
