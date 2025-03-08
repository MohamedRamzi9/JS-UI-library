
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
	// gets the inner element
	get_elem() {
		return this._elem;
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
	// gets the text of the element
	get_text() {
		return this._elem.innerText;
	}

	// sets the value of the element
	value(value) {
		this._elem.value = value;
		return this;
	}
	// gets the value of the element
	get_value() {
		return this._elem.value;
	}

	// clears the inner html of the element
	clear() {
		this._elem.innerHTML = '';
		return this;
	}

	// adds an event listener to the element
	event(event, func) {
		this._elem.addEventListener(event, func);
		return this;
	}

	// appends a child element to the element
	// the child element must be an instance of this class
	append_child(child) {
		this._elem.appendChild(child.get_elem());
		return this;
	}
	pop_child() {
		this._elem.removeChild(this._elem.lastChild);
		return this;
	}
	// appends a list of children to the element
	// the children must be instances of this class
	append_children(children) {
		for (let child of children) {
			this.append_child(child);
		}
		return this;
	}

	// adds a class to the element
	add_class(className) {
		this._elem.classList.add(className);
		return this;
	}

	// adds a list of classes to the element
	add_classes(classNames) {
		for (let className of classNames) {
			this.add_class(className);
		}
		return this;
	}

	// gets the first child of the element that matches the query
	get_element_by_query(query) {
		return new element(null).elem(this._elem.querySelector(query));
	}
	
}

export function get_body() {
	return new element(null).elem(document.body);
}

export function get_element_by_id(id) {
	return new element(null).elem(document.getElementById(id));
}
export function get_element_by_query(query) {
	return new element(null).elem(document.querySelector(query));
}

export function on_page_load(func) {
	window.onload = func;
}
	