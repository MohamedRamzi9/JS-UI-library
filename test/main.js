import * as Dom from '../Dom.js';


Dom.on_page_load(() =>
{
	let body = Dom.get_body();
	body.append_child(
		new Dom.element().text('Hello World').id('hello')
	);


});
