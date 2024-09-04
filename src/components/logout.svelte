<script>
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import { pb } from '$lib/pocketbase';
</script>

<form
	action="/logout"
	method="POST"
	use:enhance={() =>
		async ({ result }) => {
			pb.authStore.clear();
			await invalidateAll();
			await applyAction(result);
		}}
>
	<button type="submit">Logout</button>
</form>
