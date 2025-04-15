import { on_page_load, get_body, div, button} from "../../Dom.js";

class Menu {
	constructor() {
		this.selected = null;
		this.container = div();
	}
	add_choice(choice) {
		console.log(choice);
		this.container.append_child(choice);
	}

	get_elem() {
		return this.container.get_elem();
	}
}

class Option {
	constructor(text) {
		this.text_elem = div().text(text);
		this.check_elem = button().text('X');
		this.container = div().append_children([this.text_elem, this.check_elem]);
	}
	menu(menu) {
		this.check_elem.event('click', () => menu.selected = this);
		return this;
	}
	get_text() {
		return this.text_elem.get_text();
	}
	get_elem() {
		return this.container.get_elem();
	}
}


on_page_load(() => {
	let body  = get_body();
	let menu = new Menu();

	let choices = ['choice1', 'choice2', 'choice3'];
	choices.forEach(choice => {
		let option = new Option(choice).menu(menu);
		menu.add_choice(option);
	})

	
	let selected = div().text('Selected: None');
	body.append_child(menu);
	body.append_child(selected.event('click', () => {
		selected.text(`Selected: ${menu.selected.get_text()}`);
	}));
});