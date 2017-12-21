import mongoose from 'mongoose';

export const User = mongoose.model('User', {
  firstName: String,
  lastName: String,
  email: String,
  password: String,
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
});

export const Block = mongoose.model('Block', {
  name: String,
  context: String,
  tags: [String],
  questions: [String],
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
});

export const Question = mongoose.model('Question', {
  key: String,
  text: String!,
  createdAt: { type: Date, default: Date.now },
  modifiedAt: { type: Date, default: Date.now },
});
