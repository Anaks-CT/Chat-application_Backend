import expressAsyncHandler from 'express-async-handler'
import User from "../../model/user.model.js";


const allUsers = expressAsyncHandler(async (req, res) => {
    const keyword = req.query.search
      ? {
          $or: [
            { name: { $regex: req.query.search, $options: "i" } },
            { email: { $regex: req.query.search, $options: "i" } },
          ],
        }
      : {};
        
      // finding all the users which have the regex
      // further give all the users which not equal to ($ne) the current user
    const users = await User.find(keyword).find({ _id: { $ne: req.user._id } });
    res.send(users);
  });

  export default allUsers