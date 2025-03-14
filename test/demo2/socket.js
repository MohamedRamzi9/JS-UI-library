import * as dom from "../../DOM.js";
import { websocket } from "../../WebSocket.js";

function on_open() {
	console.log("WebSocket opened");
}
function on_message(event) {
	dom.get_element_by_query('button').text(event.data);
	console.log("WebSocket message: " + event.data);
}
function on_close() {
	console.log("WebSocket closed");
}



dom.on_page_load(() => {
	let ws = websocket('localhost:8765', on_message);

	let body = dom.get_body();

	body.append_child(dom.make_element().text("WebSocket Test"));
	
	let input =	dom.make_element('input');	
	body.append_children([
		input,
		dom.make_element('button').text("send").event('click', () => {
			ws.send(input.get_value());
		})
	]);


});
