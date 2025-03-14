import time


# async def handler(websocket):  # Remove 'path' parameter
#     try:
#         async for message in websocket:
#             print(f"Received: {message}")
#             await websocket.send(f"Server says: {message}")

#     except websockets.exceptions.ConnectionClosed:
#         print("Client disconnected")


# async def main():
#     async with websockets.serve(handler, "localhost", 8765):  # No need to pass 'path'
#         print("WebSocket server started on ws://localhost:8765")
#         await asyncio.Future()  # Keep running forever

# if __name__ == "__main__":
#     # Create a new thread and execute the main function
#     server_thread = threading.Thread(target=asyncio.run, args=(main(),))
#     server_thread.start()
    
#     while True:
#         print("Main thread is running")
#         # sleep for 1 second
#         time.sleep(1)

    # asyncio.run(main())  # Ensure proper event loop management


# import socket

# def handle_client(client_socket):
#     try:
#         while True:
#             message = client_socket.recv(1024).decode('utf-8')
#             if not message:
#                 break
#             print(f"Received: {message}")
#             client_socket.send(f"Server says: {message}".encode('utf-8'))
#     except ConnectionResetError:
#         print("Client disconnected")
#     finally:
#         client_socket.close()

# def main():
#     server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
#     server.bind(("localhost", 8765))
#     server.listen(5)
#     print("Socket server started on localhost:8765")

#     try:
#         while True:
#             client_socket, addr = server.accept()
#             print(f"Accepted connection from {addr}")
#             handle_client(client_socket)
#     except KeyboardInterrupt:
#         print("Server shutting down")
#     finally:
#         server.close()

# if __name__ == "__main__":
#     main()


from websocket_server import WebsocketServer
from websocket import WebSocketApp
import websocket
from threading import Thread

clients = []

URI = "ws://localhost:8765"

# Callback when a new client connects
def new_client(client, server):
    print(f"New client connected: {client['id']}")
    clients.append(client)
    server.send_message(client, "Welcome to the WebSocket server!")

# Callback when a client sends a message
def message_received(client, server, message):
    print(f"Received: {message}")
    for c in clients:
        server.send_message(c, f"Server says: {message}")

# Start the WebSocket server (without asyncio)
server = WebsocketServer(host="localhost", port=8765)
server.set_fn_new_client(new_client)
server.set_fn_message_received(message_received)
print("WebSocket server started on ws://localhost:8765")
# run the server in a separate thread
server_thread = Thread(target=server.run_forever)
server_thread.start()

print("Server is running")