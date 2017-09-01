import mongoose from 'mongoose';

export default {
  Query: {
    users: async (parent, args, { User }) => {
      const users = await User.find(args.user);
      return users.map(user => {
        user._id = user._id.toString();
        return user;
      });
    },
    blocks: async (parent, args, { Block }) => {
      const blocks = await Block.find(args.block);
      return blocks.map(block => {
        block._id = block._id.toString();
        return block;
      });
    },
  },
  Mutation: {
    // For creating users
    createUser: async (parent, args, { User }) => {
      const user = await new User(args.user).save();
      user._id = user._id.toString();
      return user;
    },
    createBlock: async (parent, args, { Block }) => {
      const block = await new Block(args.block).save();
      block._id = block._id.toString();
      return block;
    },
    // For update info of a user
    updateUser: async (parent, args, { User }) => {
      args.user.modifiedAt = new Date().toString();
      const user = await User.findOneAndUpdate(
        { _id: mongoose.Types.ObjectId(args.user.id) },
        { $set: args.user },
        { new: true }
      );
      user._id = user._id.toString();
      return user;
    },
  },
};
