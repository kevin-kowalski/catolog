import { User, UserDocument } from './user.schema';

export async function findUserByEmail(email: string): Promise<UserDocument | null> {
  try {
    return await User.findOne({ email });
  } catch (err) {
    throw err;
  }
};

export async function createUser(email: string, password: string): Promise<UserDocument> {
  try {
    const user = new User({ email, password });
    return await user.save();
  } catch (err) {
    throw err;
  }
};