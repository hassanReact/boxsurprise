import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import User from "../models/User";
import Post from "../models/PostSection";

export const postComment = asyncHandler(async (req: Request, res: Response) => {
  const { email, comment, tag, title } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user || !user.partOfReferral) {
       res.status(400).json({ message: "User not found or not eligible" });
    }

    if (!comment || !title) {
       res.status(400).json({ message: "Comment and title are required" });
    }

    const tagUser = await User.findOne({ referralId: tag });
    if (!tagUser) {
       res.status(400).json({ message: "Tagged user not found" });
    }

    const commentOfUser = await Post.create({
      user: user?._id,
      title: title,
      tags: [tagUser?._id],
      comments: [
        {
          user: user?._id,
          comment: comment,
          createdAt: new Date(),
        },
      ],
    });

     res.status(200).json({
      success: true,
      message: "Comment posted successfully",
      commentOfUser,
    });
  } catch (error) {
     res.status(500).json({
      message: error instanceof Error ? error.message : "An unexpected error occurred",
    });
  }
});

export const likeComment = asyncHandler(async (req : Request, res: Response) => {
    const {idOfComment , email} = req.body
    try {
        const comment = await Post.findOne({ _id : idOfComment })
        if(!comment){
            res.status(402).json({message : "Comment not Found"});
            return;
        }

        const user = await User.findOne({ email })
        if(!user){
             res.status(401).json({message : "User not Found, Kindly Login"});
             return;
        }

        if (comment?.likes.includes(user._id)) {
             res.status(200).json({ success: true, message: "Comment liked Already" });
             return;
        }
    
        comment?.likes.push(user._id)
        await comment?.save()

        res.status(200).json({
            message : "Like Comment Successfully"
        });
        return;
    } catch (error) {
        res.status(500).json({
            message: error instanceof Error ? error.message : "An unexpected error occurred",
        });
    }
})

export const getAllComments = asyncHandler(async (req: Request, res: Response) => {
    try {
      const posts = await Post.find()
        .sort({ createdAt: -1 }); 
  
        const comments = posts.map((item) => item.comments)
       res.status(200).json({
        success: true,
        comments,
      });
      return;
    } catch (error) {
       res.status(500).json({
        message: error instanceof Error ? error.message : "An unexpected error occurred",
      });
      return;
    }
  });
  