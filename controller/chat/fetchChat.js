import asyncHandler from 'express-async-handler'
import Chat from '../../model/chat.model.js';
import User from '../../model/user.model.js';

const fetchChats = asyncHandler(async (req, res) => {
    // returning all the chats where is the user is a part of 
    try {
      Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
        // populating the user details except the password
        .populate("users", "-password")
        // populating the admin details except the password
        .populate("groupAdmin", "-password")
        // populating the latest message details
        .populate("latestMessage")
        // getting the lastest messge in order
        .sort({ updatedAt: -1 })
        .then(async (results) => {
          results = await User.populate(results, {
            path: "latestMessage.sender",
            select: "name pic email", 
          });
          res.status(200).send(results);
        });
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  });

  export default fetchChats