import User from "../models/user.model.js";
import bcrypt from "bcryptjs";


const updateUserName = async (request, response) => {
  try {
    const { newusername, oldusername } = request.body;
    if (!newusername || !oldusername) {
      return response.status(400).json({
        success: false,
        message: 'Username is missing . Pls give the new username to update it'
      })
    }
    const findUser = await User.findOne({ userName: oldusername });
    if (!findUser) {
      return response.status(404).json({
        success: false,
        message: "User does not exist .Pls provide me a correct username"
      })
    }
    const updateUser = await User.updateOne({ userName: oldusername }, { $set: { userName: newusername } })
    if (!updateUser) {
      return response.status(400).json({
        success: false,
        message: "Failed to update the username of the user"
      })
    }
    const updatedUser = await User.findOne({ userName: newusername })
    return response.status(200).json({
      success: true,
      message: "Username is updated successfully",
      updatedUserData: updatedUser
    })
  }
  catch (error) {
    return response.status(500).json({
      success: false,
      message: "INTERNAL SERVER ERROR "
    })
  }
}

const updateEmail = async (request, response) => {
  try {
    const { username, newEmail } = request.body;
    if (!username || !newEmail) {
      return response.status(400).json({
        success: false,
        message: "Input fields are missing . Pls provide all the input fields"
      })
    }
    const findUser = await User.findOne({ userName: username })
    if (!findUser) {
      return response.status(404).json({
        success: false,
        message: " User does not exist . Pls provide  the correct username"
      })
    }
    const updateEmail = await User.updateOne({ userName: username }, { $set: { email: newEmail } });
    if (!updateEmail) {
      return response.status(400).json({
        success: false,
        message: "Failed to update the email"
      })
    }
    const findUpdatedUser = await User.findOne({
      userName: username
    })
    return response.status(200).json({
      success: true,
      message: "USuccessfully pdated User email",
      updatedUser: findUpdatedUser
    })
  }
  catch {
    return response.status(500).json({
      success: false,
      message: "Internal Server error"
    })
  }
}


const updateUserPassword = async (request, response) => {
  try {
    const { username, oldpassword, newpassword } = request.body;
    if (!username || !oldpassword || !newpassword) {
      return response.status(400).json({
        success: false,
        message: "Input fields are missing . Pls provide with all the fields required ."
      })
    }
    const findUser = await User.findOne({ userName: username });
    if (!findUser) {
      return response.status(404).json({
        success: false,
        message: "User not found. Pls check the username"
      })
    }
    const checkOldPassword = await bcrypt.compare(oldpassword, findUser.userPassword)
    if (!checkOldPassword) {
      return response.status(403).json({
        success: false,
        message: "Given password does not match with the password given"
      })
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newpassword, salt);
    const updatePassword = await User.updateOne({ userName: username }, { $set: { userPassword: hashedPassword } })
    const findUpdatedUser = await User.findOne({ userName: username })
    if (updatePassword) {
      return response.status(200).json({
        success: false,
        message: "Password is updated successfully",
        updatedUser: findUpdatedUser
      })
    }
    else {
      return response.status(400).json({
        success: false,
        message: "FAILED TO UPDATE THE PASSWORD . SOME ERROR TOOK PLACE "
      })
    }
  }
  catch (error) {
    console.log("Internal Server Error")
    return response.status(500).json({
      success: false,
      message: "Internal Server Error"
    })
  }
}


export { updateUserName, updateEmail , updateUserPassword }