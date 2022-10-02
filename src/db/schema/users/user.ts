import { Schema, model } from "mongoose";

export interface DBUser {
  username: string;
  authId: string;
}

const schema = new Schema<DBUser>({
  username: { type: String, required: true },
  authId: { type: String, required: true },
});

schema.index({ username: 1 }, { unique: true });
schema.index({ authId: 1 }, { unique: true });

const UserModel = model<DBUser>("User", schema);
export default UserModel;
