
export class toggle_logic {
	constructor() {
		this.toggeled = false;
	}
	toggle_true() { this.toggeled = true; }
	toggle_false() { this.toggeled = false; }
	toggle() { this.toggeled = !this.toggeled; }
	is_toggeled() { return this.toggeled; }
}

export class single_select_logic {
	constructor() {
		this.selected = null;
	}
	get_selected() { return this.selected; }
	set_selected(elem) { this.selected = elem; }
}

export class multi_select_logic {
	constructor() {
		this.selected = [];
	}
	get_selected() { return this.selected; }
	add_selected(elem) { this.selected.push(elem); }
	remove_selected(elem, compare_func=(a,b)=>a===b) { this.selected = this.selected.filter(e => !compare_func(e, elem)); }
}

