import {
	useQuery,
	useMutation,
	useQueryClient,
} from '@tanstack/react-query';
import courseService from '@/services/course.service';
import { useAuth } from '@/context/auth-context';

export function useEnrollment(courseId: string | undefined) {
	const { isAuthenticated } = useAuth();
	const queryClient = useQueryClient();

	const queryKey = ['enrollment', courseId];

	const { data: enrollmentStatus, isLoading } = useQuery({
		queryKey,
		queryFn: () => courseService.isEnrolled(courseId!),
		enabled: !!courseId && isAuthenticated,
		staleTime: 1000 * 60 * 5, // 5 minutes
	});

	const enrollMutation = useMutation({
		mutationFn: () => courseService.enrollCourse(courseId!),
		onMutate: async () => {
			// Cancel outgoing refetches
			await queryClient.cancelQueries({ queryKey });

			// Snapshot previous value
			const previousStatus = queryClient.getQueryData(queryKey);

			// Optimistic update
			queryClient.setQueryData(queryKey, {
				enrolled: true,
				enrollment: { progress: 0, completed: false },
			});

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

	const isEnrolled = enrollmentStatus?.enrolled ?? false;
	const enrollment = enrollmentStatus?.enrollment ?? null;
	const isEnrolling = enrollMutation.isPending;

	const enroll = () => {
		if (!courseId) return;
		enrollMutation.mutate();
	};

	return {
		isEnrolled,
		enrollment,
		isLoading,
		isEnrolling,
		enroll,
		isAuthenticated,
	};
}
