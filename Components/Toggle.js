
export class toggle_component {
	constructor() {
		this.element = null;
		this.toggeled = false;
	}

	toggle_true() { this.toggeled = true; }
	toggle_false() { this.toggeled = false; }
	toggle() { this.toggeled = !this.toggeled; }
	is_toggeled() { return this.toggeled; }
	
	set_element(element) { return this.element = element; }
	get_element() { return this.element; }
	get_elem() { return this.element.get_elem(); }

}