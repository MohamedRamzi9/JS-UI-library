import * as dom from '../Dom.js';
import { toggle_component } from "../Components/Logics.js";

dom.on_page_load(() => {
	let body = dom.get_body();
	
	const toggle_element = new toggle_component();
	dom.elem("toggle").parent(body).text("Toggle").event("click", () => {
		toggle_element.toggle();
		console.log("Toggled: ", toggle_element.is_toggeled());
	});
	
});