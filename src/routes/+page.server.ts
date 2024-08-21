import type { PageServerLoad } from './$types';
import { getPeriods } from '$lib/db/queries/getPeriods'

export const load: PageServerLoad = async () => {
  const periods = await getPeriods()
	return {
		periods,
	};
};
