import React, { useState } from "react";
import {
MainContainer,
ChatContainer,
MessageList,
MessageInput,
Message
} from "@chatscope/chat-ui-kit-react";
import "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";

function CommunityChat() {
const [messages, setMessages] = useState([
    {
    message: "Welcome to the community chat!",
    sentTime: "just now",
    sender: "Moderator"
    }
]);
const [input, setInput] = useState("");

const handleSend = () => {
    if (input.trim() !== "") {
    setMessages([
        ...messages,
        {
        message: input,
        sentTime: "just now",
        sender: "You"
        }
    ]);
    setInput("");
    }
};

return (
    <div style={{ height: "350px", width: "350px" }}>
    <MainContainer>
        <ChatContainer>
        <MessageList>
            {messages.map((msg, idx) => (
            <Message
                key={idx}
                model={{
                message: msg.message,
                sentTime: msg.sentTime,
                sender: msg.sender,
                direction: msg.sender === "You" ? "outgoing" : "incoming"
                }}
            />
            ))}
        </MessageList>
        <MessageInput
            placeholder="Type message here"
            value={input}
            onChange={val => setInput(val)}
            onSend={handleSend}
            attachButton={false}
            sendButton={true}
        />
        </ChatContainer>
    </MainContainer>
    </div>
);
}

export default CommunityChat;
