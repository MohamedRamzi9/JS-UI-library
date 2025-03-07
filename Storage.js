
export function local_storage_set(key, value) {
	localStorage.setItem(key, value);
}

export function local_storage_get(key) {
	return localStorage.getItem(key);
}

export function local_storage_remove(key) {
	localStorage.removeItem(key);
}

