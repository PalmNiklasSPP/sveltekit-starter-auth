import type { PageServerLoad } from './$types';

export const load = (async ({ locals }) => {
	try {
		const sampleData = await locals.pb.collection('sampledata').getList(1, 10);
		return { sampleData: structuredClone(sampleData) };
	} catch (err) { /* empty */ }
}) satisfies PageServerLoad;
