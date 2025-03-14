
import threading
import websocket_server
import json


class Task:
	id = 0
	def __init__(self, name):
		self.name = name
		self.done = False
		self.id = Task.id
		Task.id += 1

	def is_done(self):
		return self.done
	
	def __eq__(self, value: object) -> bool:
		if isinstance(value, Task):
			return self.id == value.id
		elif isinstance(value, str):
			return self.name == value
		elif isinstance(value, int):
			return self.id == value
		return False


	def __repr__(self):
		return f"Task id {self.id} '{self.name}' is '{'done' if self.done else 'not done'}'"

tasks = []

def get_json(message):
	return json.loads(message)

def dispatch(json):

	def get_tasks():
		print(f"Get tasks {tasks}")
		tasks_json = [{'id': task.id, 'name': task.name, 'done': task.done} for task in tasks]
		return {'tasks': tasks_json}
	

	if json['type'] == 'get_tasks':
		return get_tasks()

	elif json['type'] == 'add_task':
		print("Add task")
		tasks.append(Task(json['name']))
		return get_tasks()

	elif json['type'] == 'delete_task':
		print(f"Delete task {json['id']}")
		tasks.pop(tasks.index(json['id']))
		return get_tasks()

	elif json['type'] == 'set_task_done':
		print(f"Set task {json['name']} to {json['done']}")
		for task in tasks:
			if task.name == json['name']:
				task.done = json['done']
				break
		return get_tasks()

def new_client(client, server):
	print("New client connected and was given id %d" % client['id'])
	for c in server.clients:
		if c != client:
			server.send_message(c, "You have been disconnected")
			server.client_left(c)

	server.send_message_to_all("Hey, new client has joined us")

def on_message(client, server, message):
	message = get_json(message)
	print("Received message: ", message)
	response = dispatch(message)
	if response is not None:
		server.send_message(client, json.dumps(response))

server = websocket_server.WebsocketServer(host='localhost', port=8080)
server.set_fn_new_client(new_client)
server.set_fn_message_received(on_message)
threading.Thread(target=server.run_forever).start()
print("Server started")
