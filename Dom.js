
// this is a wrapper class to create ui elements in javascript
// it is a simple class that wraps around the html element class
export class element {
	// creates a new html element
	// if tagName is null, the element is not initialized
	// else the element is initialized with the tagName
	constructor(tagName='div') {
		if (tagName == null) 
			this._elem = null;
		else
			this._elem = document.createElement(tagName);
	} 
	// sets the inner element to elem
	elem(elem) {
		this._elem = elem;
		return this;
	}
	// sets the id of the element
	id(id) {
		this._elem.id = id;
		return this;
	}
	// gets the id of the element
	get_id() {
		return this._elem.id;
	}

	// sets the text of the element
	text(text) {
		this._elem.innerText = text;
		return this;
	}
	// gets the inner element
	get_elem() {
		return this._elem;
	}
	// appends a child element to the element
	// the child element must be an instance of this class
	append_child(child) {
		this._elem.appendChild(child.get_elem());
		return this;
	}
	
}

export function get_body() {
	return new element(null).elem(document.body);
}

export function on_page_load(func) {
	window.onload = func;
}
	