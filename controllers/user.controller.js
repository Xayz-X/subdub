import bcrypt from "bcryptjs";
import authModel from "../models/auth.model.js";

export const getUsers = async (req, res, next) => {
  try {
    const users = await authModel.find();

    res.status(200).json({
      success: true,
      data: users,
    });
  } catch (error) {
    next(error);
  }
};

export const getUser = async (req, res, next) => {
  let loggedInUser = req.user;
  try {
    const userId = req.params.id || loggedInUser._id;
    if (userId != loggedInUser._id) {
      // we have to fetch the user from database, it's a admin reqested for a user.
      loggedInUser = await authModel.findById(req.params.id);
    }
    if (!loggedInUser) {
      // mns we did not get the user from database maybe invalid id
      return res.status(404).json({
        success: false,
        message: "Not Found",
        error: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      data: loggedInUser,
    });
  } catch (error) {
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  try {
    let hashedPassword;
    const { name, email, password } = req.body;

    if (password) {
      const salt = await bcrypt.genSalt();
      hashedPassword = await bcrypt.hash(password, salt);
    }

    await authModel.updateOne(
      { _id: req.user._id },
      {
        name: name || req.user.name,
        email: email || req.user.email,
        password: hashedPassword || req.user.password,
      }
    );

    res.status(200).json({
      success: true,
      message: "User has been updated successfully",
      userId: req.user._id,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  try {
    await authModel.findByIdAndDelete(req.user._id);
    // we dont need any checks here that user deleted or not
    // bcz if user deleted cant send same req, as it will go through authorize middleware first
    res.status(200).json({
      success: true,
      message: "User has been deleted successfully",
      userId: req.user._id,
    });
  } catch (error) {
    next(error);
  }
};
