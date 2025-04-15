import websocket
import time
from threading import Thread

URI = "ws://localhost:8765"

# WebSocket event handlers
def on_message(ws, message):
    print(f"Received: {message}")

def on_error(ws, error):
    print(f"Error: {error}")

def on_close(ws, close_status_code, close_msg):
    print("Connection closed")

def on_open(ws):
    print("Connection opened")
    ws.send("Hello from the client!")
    
    # Keep sending messages periodically
    def run():
        while True:
            try:
                ws.send("Heartbeat from client")  # Keeps the connection alive
                time.sleep(5)
            except websocket.WebSocketConnectionClosedException:
                print("Connection closed, stopping message loop")
                break

    Thread(target=run, daemon=True).start()

# Create WebSocket client
ws = websocket.WebSocketApp(
    URI, on_open=on_open, on_message=on_message, on_error=on_error, on_close=on_close
)

# Run the WebSocket client
ws.run_forever()
