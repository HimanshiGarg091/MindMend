// src/components/CommunityChat.js
import React, { useState } from "react";
import { ChatBox } from "react-chatbox-component";
import "react-chatbox-component/dist/style.css";

const initialMessages = [
{
    text: "Welcome to the community chat! Feel free to share and support each other.",
    id: 1,
    sender: {
    name: "Moderator",
    uid: "mod-1",
    avatar: "https://i.pravatar.cc/150?img=1"
    }
}
];

function CommunityChat() {
const [messages, setMessages] = useState(initialMessages);

const onSendMessage = (message) => {
    setMessages([
    ...messages,
    {
        text: message,
        id: messages.length + 1,
        sender: {
        name: "You",
        uid: "user-1",
        avatar: "https://i.pravatar.cc/150?img=2"
        }
    }
    ]);
};

return (
    <div style={{ maxWidth: 400, margin: "0 auto" }}>
    <ChatBox
        messages={messages}
        user={{ uid: "user-1" }}
        onSendMessage={onSendMessage}
    />
    </div>
);
}

export default CommunityChat;
