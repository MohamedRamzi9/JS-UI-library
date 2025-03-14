import * as dom from '../../Dom.js';
import {websocket} from '../../Websocket.js';

let ws = null;

function create_message(json) {
	console.log('Sending message', json);
	return JSON.stringify(json);
}

function make_task(task_id, task_name, done = false) {
	return dom.make_element().add_classes(['row', 'gap-10']).append_children([
		dom.make_element('button').text((done ? 'Undone' : 'Done')).event('click', () => {
			ws.send(create_message({type: 'set_task_done', name: task_name, done: !done}))
		}),
		dom.make_element().text(task_name).add_classes(['width-100']),
		dom.make_element('button').text('Edit'),
		dom.make_element('button').text('Delete').event('click', () => {
			ws.send(create_message({type: 'delete_task', id: task_id}))
		}),
	]);
}



let list_of_tasks = dom.make_element().add_classes(['col', 'gap-10']);
let list_of_done_tasks = dom.make_element().add_classes(['col', 'gap-10']);

function main() {
	console.log('Main function Frontend loaded');
	ws.send(create_message({type: 'get_tasks'}));

	// border 1px solid black
	let body = dom.get_body().add_classes(['col', 'gap-10']);
	
	
	
	let list_of_list_buttons = dom.make_element().add_classes(['row', 'gap-10'])
	.append_children([
		dom.make_element('button').text('List 1').event('click', () => {
			ws.send(create_message({type: 'get_tasks', list: 'list1'}))
		}),
		dom.make_element('button').text('List 2'),
		dom.make_element('button').text('List 3'),
	]);
	let current_list = dom.make_element().text('Current list : List A');


	let task_name_input = dom.make_element('input');
	body.append_children([

		list_of_list_buttons,

		current_list,

		dom.make_element().add_classes(['col', 'gap-10']).append_children([
			dom.make_element().add_classes(['row', 'space-between']).append_children([
				dom.make_element().text('Name'),

				dom.make_element('button').text('Add').event('click', () => {
					ws.send(create_message({type: 'add_task', name: task_name_input.get_value()}))
				})
			]),
			task_name_input,
		]),
		list_of_tasks,

		dom.make_element().text('Done tasks'),

		list_of_done_tasks,


	]);

}

function on_open(ws) {
	console.log('Websocket opened');
	main();
}

dom.on_page_load(() => {
	
	ws = websocket('localhost:8080', 
		(event) => {
			let data = event.data;
			console.log('Message received', data);
			
			if (data[0] === '{') {
				let json = JSON.parse(data);

				list_of_tasks.clear();
				list_of_done_tasks.clear();

				json.tasks.forEach(task => {
					if (task.done)
						list_of_done_tasks.append_child(make_task(task.id, task.name, task.done));
					else
						list_of_tasks.append_child(make_task(task.id, task.name, task.done));
				});
			}
		}, 
		() => {on_open(ws)},
	);



});

