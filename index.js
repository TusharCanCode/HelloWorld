const io = require("socket.io")(8900, {
  cors: {
    origin: "http://localhost:3000",
  },
});

let users = [];

const addUser = (userId, socketId) => {
  !users.some((user) => user.userId === userId) &&
    users.push({ userId, socketId });
};

const removeUser = (socketId) => {
  users = users.filter((user) => user.socketId !== socketId);
};

const getUser = (userId) => {
  return users.find((user) => user.userId === userId);
};

io.on("connection", (socket) => {
  console.log("a user connected.");

  //Adding a new userId and socketId in user array:
  socket.on("addUser", (userId) => {
    addUser(userId, socket.id);
    console.log("users: ", users);
    io.emit("getOnlineFriends", users);
  });
  
  //Sending and getting messages:
  socket.on("sendMessage", ({ senderId, receiverId, message }) => {
    const user = getUser(receiverId);
    io.to(user.socketId).emit("getMessage", {
      senderID: senderId,
      message,
    });
  });
  
  //Removing disconnected user from user array:
  socket.on("disconnect", () => {
    console.log("a user disconnected!");
    removeUser(socket.id);
    console.log("users: ", users);
    io.emit("getOnlineFriends", users);
  });
});

// const mongoose = require('mongoose');
// const SocketId = require('./SocketId');
// require('dotenv').config();

// const connect = () => {
//   mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
//     console.log(`Connection with database is successful!`);
//   }).catch(() => {
//     console.log(`Connection can't be made with database!`);
//   });
// }

// connect();
// const io = require("socket.io")(8900, {
//   cors: {
//     origin: 'http://localhost:3000'
//   }
// });

// const AddUsers = async (userId, socketId) => {
//   const user = await SocketId.findOne({ userID: userId });
//   try {
//     if (!user)
//       await SocketId.create({ userID: userId, socketID: socketId });
//     else
//       await SocketId.findByIdAndUpdate(user._id, { $set: { socketID: socketId } }, { $new: true })
//   } catch (error) {
//     console.log(error);
//   }
// }

// const ManageMessages = async (senderId, receiverId, message) => {
//   try {
//     const user = await SocketId.findOne({ userID: receiverId });
//     console.log("receiver: ", user);
//     if (user) {
//       io.to(user.socketID).emit("getMessage", {
//         senderID: senderId,
//         message
//       });
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

// const RemoveUser = async (socketId) => {
//   console.log("deleting");
//   try {
//     await SocketId.deleteOne({ socketID: socketId });
//   } catch (error) {
//     console.log(error);
//   }
// }

// const GetOnlineFriends = () => {
//   try {
//     const promise = SocketId.find();
    
//     promise.then(online => {
//       console.log("online: ", online);
//       io.emit("getOnlineFriends", online);
//     })
//   } catch (error) {
//     console.log(error);
//   }
// }

// io.on("connection", (socket) => {
//   console.log("User joined");

//   //Adding a new userId and socketId in user array:
//   socket.on("addUser", (userId) => {
//     AddUsers(userId, socket.id);
//     GetOnlineFriends();
//   })

//   //Sending and getting messages:
//   socket.on("sendMessage", ({ senderId, receiverId, message }) => {
//     ManageMessages(senderId, receiverId, message);
//   })

//   //Removing disconnected user from user array:
//   socket.on("disconnect", () => {
//     RemoveUser(socket.id);
//     GetOnlineFriends();
//     console.log("User disconnected")
//   })
// });