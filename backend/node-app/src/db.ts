import mongoose from "mongoose";

mongoose.connect(
  "mongodb+srv://admin:ShahbazRoxx%40123@cluster0.cwvzgop.mongodb.net/brainlyDB"
);

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

export const User = mongoose.model("usertb", UserSchema);

const LinkSchema = new mongoose.Schema({
  hash: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: User,
    required: true,
    unique:true  // link schema will have only one entry(only one hash) for a user  
  },
});

export const Link = mongoose.model("linktb", LinkSchema);

const tagSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true }
});

export const Tag = mongoose.model('Tag', tagSchema)

const contentSchema = new mongoose.Schema({
  link: { 
    type: String,
    required: true 
    },
  type:{
    type:String,
    required:true
  },
  title: { 
    type: String, 
    required: true 
    },
  tags: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: Tag,
    },
  ],
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: User, required: true 
  },
});

export const Content = mongoose.model('contenttb',contentSchema)