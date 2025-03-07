import { element as Element, get_element_by_id, get_body } from "../Dom.js";
import { on_page_load } from "../Dom.js";

import {local_storage_set} from '../Storage.js';

function click(text) {
	console.log(text);
	get_element_by_id('text').text(text);
	local_storage_set('username', text);
	window.location.href = 'home.html';
}

on_page_load(() =>
{
	let body = get_body();
	body.append_children([
		new Element().add_classes(['row', 'w-25', 'gap-3']).append_children([
			new Element().text('username'),
			new Element('input').id('username'),
			new Element().text('password'),
			new Element('input'),
			new Element('button').text('login').event('click', function(){ click(get_element_by_id('username').get_value()); }),
			new Element('div').id('text').text('')
		])
	]);

});
