import { element as Element, get_element_by_id, get_body, get_elements_by_class, get_elements_by_tag, get_elements_by_name } from "../Dom.js";
import { on_page_load } from "../Dom.js";

import {local_storage_set} from '../Storage.js';

on_page_load(() => {

	let body = get_body();
	let elems = body.get_elements_by_tag("div")
		.map(elem => elem.);

});
