import { element as Element, get_element_by_id, get_body } from "../Dom.js";
import { on_page_load } from "../Dom.js";
import {local_storage_get, local_storage_remove} from '../Storage.js';

on_page_load(() =>
{
	let body = get_body();
	body.append_child(
		new Element().text(local_storage_get('username')),
		new Element().text('Welcome')

	);
	local_storage_remove('username');

});