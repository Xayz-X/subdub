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
    const user = await authModel.findById(req.params.id).select("-password");
    if (!user) {
      const error = new Error(`User not found`);
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};
