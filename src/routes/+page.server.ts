import type { PageServerLoad } from './$types';
import { periodsRepo } from '$lib/db/periods'

export const load: PageServerLoad = async () => {
  const periods = await periodsRepo.getPeriods()
	return {
		periods,
	};
};
