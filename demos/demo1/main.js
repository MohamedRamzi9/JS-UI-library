
import * as dom from '../../Dom.js';


class Task {
	constructor(name, description, parent) {
		this.name = name;
		this.description = description;
		this.parent = parent;
	}

	get_elem() {
		let task = dom.make_element('task-container');
		task.append_children([
			dom.make_element().text(this.name),
			dom.make_element().text(this.description),
		]);
		task.append_child(dom.make_element("button").text("Delete").event("click", () => {
			this.parent.remove_child(task);
		}));
		return task.get_elem();
	}
}



dom.on_page_load(() => {

	dom.get_body().append_children([
		dom.make_element("h1").text("Tasks"),
		dom.make_element("input").id("task_name"),
		dom.make_element("input").id("task_description"),
		dom.make_element("button").text("Add Task").event("click", () => {
			let name = dom.get_element_by_id("task_name").get_value();
			let description = dom.get_element_by_id("task_description").get_value();
			let task = new Task(name, description, dom.get_body());
			dom.get_body().append_child(task);
		})
	]);
});