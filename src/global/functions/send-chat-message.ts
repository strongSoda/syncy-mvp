import API from "global/constants/api";

  // sendChatMessage /stream-chat-send-message POST
const sendChatMessage = async (channelId: string, userId: string | undefined, message: string | undefined) => {
const response = await fetch(`${API}/stream-chat-send-message`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({
    channelId: channelId,
    message: message,
    userId: userId,
    })
});

const data = await response.json();
console.log('sendChatMessage', data);
}

export default sendChatMessage;
