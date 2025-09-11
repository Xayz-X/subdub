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
  try {
    if (!req.user) {
      const error = new Error(`User not found`);
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: req.user,
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
    // ("");
    const deletedUser = await authModel.findByIdAndDelete(req.user._id);
    console.log(deletedUser);

    res.status(200).json({
      success: true,
      message: "User has been deleted successfully",
      userId: req.user._id,
    });
  } catch (error) {
    next(error);
  }
};
