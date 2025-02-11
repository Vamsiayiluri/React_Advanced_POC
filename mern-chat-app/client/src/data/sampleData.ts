export const users = [
    { id: "u1", name: "John Doe", avatar: "", status: "online" },
    { id: "u2", name: "Jane Smith", avatar: "https://i.pravatar.cc/40?img=2", status: "offline" },
  ];
  
  export const chats = [
    { id: "chat1", participants: ["u1", "u2"], lastMessage: "Hey there!", updatedAt: "10:05 AM" },
  ];
  
  export const messages = {
    chat1: [
      { id: "m1", chatId: "chat1", senderId: "u1", text: "Hey!", timestamp: "10:01 AM", status: "sent" },
      { id: "m2", chatId: "chat1", senderId: "u2", text: "Hello!", timestamp: "10:02 AM", status: "read" },
    ],
  };
  