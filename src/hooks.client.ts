import { COOKIE_OPTIONS } from '$lib/constant';
import { currentUser, pb } from '$lib/pocketbase';

try {
	pb.authStore.loadFromCookie(document.cookie); 
	// get an up-to-date auth store state by veryfing and refreshing the loaded auth model (if any)
	pb.authStore.isValid && (await pb.collection('users').authRefresh());
} catch (_) {
	// clear the auth store on failed refresh
	pb.authStore.clear();
}
pb.authStore.onChange((_, model) => {
	console.log("authstore changed")
	if (pb.authStore.isValid) {
		currentUser.set(model);
		document.cookie = pb.authStore.exportToCookie(COOKIE_OPTIONS);
	}
	else {
		currentUser.set(null);
		document.cookie = pb.authStore.exportToCookie(COOKIE_OPTIONS);
	}
});
