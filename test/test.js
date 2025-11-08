import * as dom from '../Dom.js';

class StaticComponent {
	constructor(element = null) {
		this.element = element ? element : dom.div();
		this.parent = null;
		this.children = [];
	}

	get_elem() { return this.element.get_elem(); }
	render() {
		this.element.clear();
		for (let child of this.children) {
			child.render();
			this.element.add_child(child);
		}
	}
	add_child(child) { this.children.push(child); }
}



class MyComponent {
	static value = 1;
	constructor(parent) {
		this.parent = parent;
		this.element = dom.button().event('click', () => {
			MyComponent.value += 1;
			this.parent.render();
		});
	}
	get_elem() { return this.element.get_elem(); }
	render() {
		this.element.text(`Click Me ${MyComponent.value}`);
	}
}

dom.on_page_load(() => {
	let body = dom.get_body();

	let main_component = new StaticComponent(body);
	let component = new MyComponent(main_component);

	main_component.add_child(component);

	main_component.render();
});