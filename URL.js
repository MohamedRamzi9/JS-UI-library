

// return a the encoded url as a string from a json object
export function to_string(json) {
	return new URLSearchParams(json).toString();
}

// return a json object from an encoded url string
export function to_json(string) {
	return Object.fromEntries(new URLSearchParams(string).entries());
}

// return the pathhname of the current url without the leading slash
export function get_pathname(url) {
	return location.pathname.replaceAll("/", '');
}

// set the pathhname of the current url without the leading slash
export function set_pathname(pathname) {
	location.pathname = '/' + pathname;
}