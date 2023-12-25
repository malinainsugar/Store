from fastapi import APIRouter, Depends, WebSocket
from fastapi.responses import HTMLResponse

router = APIRouter()

html = """
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>WebSocket Chat</title>
    <style>
        body {
            font-family: 'Arial', sans-serif;
            background-color: #121118;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
        }

        h1 {
            color: #fff;
        }

        form {
            display: flex;
            margin-top: 20px;
        }

        input {
            padding: 8px;
            font-size: 14px;
            border: 1px solid #ccc;
            border-radius: 4px;
            margin-right: 5px;
        }

        button {
            padding: 8px 12px;
            font-size: 14px;
            background-color: #A558FF;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
        }

        button:hover {
            background-color: #8E2EFF;
        }

        ul {
            list-style-type: none;
            padding: 0;
        }

        li {
            background-color: #fff;
            padding: 10px;
            margin-top: 5px;
            border-radius: 4px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
        }
    </style>
</head>
<body>
    <h1>WebSocket Chat</h1>
    <form action="" onsubmit="sendMessage(event)">
        <input type="text" id="messageText" autocomplete="off"/>
        <button>Send</button>
    </form>
    <ul id='messages'></ul>
    <script>
        var ws = new WebSocket("ws://localhost:8000/ws/chat");
        ws.onmessage = function(event) {
            var messages = document.getElementById('messages')
            var message = document.createElement('li')
            var content = document.createTextNode(event.data)
            message.appendChild(content)
            messages.appendChild(message)
        };
        function sendMessage(event) {
            var input = document.getElementById("messageText")
            ws.send(input.value)
            input.value = ''
            event.preventDefault()
        }
    </script>
</body>
</html>
"""


@router.get("/")
async def get():
    return HTMLResponse(html)


@router.websocket("/ws/chat")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    while True:
        data = await websocket.receive_text()
        await websocket.send_text(f"{data}")


