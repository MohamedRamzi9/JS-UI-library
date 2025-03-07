import * as Dom from '../Dom.js';

function click(text) {
	console.log(text);
	Dom.get_element_by_id('text').text(text);
	Dom.get_element_by_id('username').value('ghgh');
}

Dom.on_page_load(() =>
{
	let body = Dom.get_body();
	body.append_children([
		new Dom.element().text('username'),
		new Dom.element('input').id('username'),
		new Dom.element().text('password'),
		new Dom.element('input'),
		new Dom.element('button').text('login').event('click', function(){ click(Dom.get_element_by_id('username').get_value()); }),
		new Dom.element('div').id('text').text('')
	]);


});
