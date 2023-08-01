import asyncHandler from 'express-async-handler'
import Chat from '../../model/chat.model.js';
import User from '../../model/user.model.js';

// for creating or fetching a user chat
const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;

  // return 400 if there is no userid provided
  if (!userId) {
    console.log("UserId param not sent with request");
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: req.user._id } } },
      { users: { $elemMatch: { $eq: userId } } },
    ],
  })

    // populating the user field
    .populate("users", "-password")
    // populating the message field in the latestmessage
    .populate("latestMessage");

  // populating the userfield inside the above pupulated latest message field
  isChat = await User.populate(isChat, {
    path: "latestMessage.sender",
    select: "name pic email",
  });

  // if chat exists we send the chat
  if (isChat.length > 0) {
    res.send(isChat[0]);
  }
  // or we create a new chat for the users
  else {
    var chatData = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    // creating a new chat in the data base
    try {
      const createdChat = await Chat.create(chatData);
      // sendint the created chat to the user
      const FullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).json(FullChat);
    } catch (error) {
      console.log(error)
      res.status(400);
      throw new Error(error.message);
    }
  }
});

export default accessChat;
