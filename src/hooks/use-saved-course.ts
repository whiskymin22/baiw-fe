import {
	useQuery,
	useMutation,
	useQueryClient,
} from '@tanstack/react-query';
import courseService from '@/services/course.service';
import { useAuth } from '@/context/auth-context';

export function useSavedCourse(courseId: string | undefined) {
	const { isAuthenticated } = useAuth();
	const queryClient = useQueryClient();

	const queryKey = ['saved-course', courseId];

	const { data: savedStatus, isLoading } = useQuery({
		queryKey,
		queryFn: () => courseService.isCourseSaved(courseId!),
		enabled: !!courseId && isAuthenticated,
		staleTime: 1000 * 60 * 5, // 5 minutes
	});

	const saveMutation = useMutation({
		mutationFn: () => courseService.saveCourse(courseId!),
		onMutate: async () => {
			// Cancel outgoing refetches
			await queryClient.cancelQueries({ queryKey });

			// Snapshot previous value
			const previousStatus = queryClient.getQueryData(queryKey);

			// Optimistic update
			queryClient.setQueryData(queryKey, { saved: true });

			return { previousStatus };
		},
		onError: (_err, _variables, context) => {
			// Rollback on error
			queryClient.setQueryData(queryKey, context?.previousStatus);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey });
		},
	});

	const unsaveMutation = useMutation({
		mutationFn: () => courseService.unsaveCourse(courseId!),
		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey });
			const previousStatus = queryClient.getQueryData(queryKey);
			queryClient.setQueryData(queryKey, { saved: false });
			return { previousStatus };
		},
		onError: (_err, _variables, context) => {
			queryClient.setQueryData(queryKey, context?.previousStatus);
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey });
		},
	});

	const isSaved = savedStatus?.saved ?? false;
	const isToggling =
		saveMutation.isPending || unsaveMutation.isPending;

	const toggleSave = () => {
		if (!courseId) return;

		if (isSaved) {
			unsaveMutation.mutate();
		} else {
			saveMutation.mutate();
		}
	};

	return {
		isSaved,
		isLoading,
		isToggling,
		toggleSave,
		isAuthenticated,
	};
}
