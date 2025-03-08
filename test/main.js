import { element as Element, get_element_by_id, get_body } from "../Dom.js";
import { on_page_load } from "../Dom.js";

import {local_storage_set} from '../Storage.js';

on_page_load(() => {

	let body = get_body();
	let name = body.get_element_by_query('[name="name"]');
	name.text('Welcome');

});
