import { on_page_load } from "../../Dom.js";
import * as dom from "../../Dom.js";
import { login_component } from "../../Components.js";


	



on_page_load(() => {
	dom.get_head().add_child(dom.style().text(login_component.style));

	let login_form = new login_component();
	login_form.submit_event(() => {
		alert("Login: " + login_form.get_username() + " " + login_form.get_password());
	});
	

	let body = dom.get_body().add_child(
		login_form
	);

});
	