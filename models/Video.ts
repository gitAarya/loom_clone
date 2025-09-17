import mongoose,{Schema,model,models,Types} from "mongoose";
export  interface IVideo {
  _id: string;
  title: string;
  createdAt: Date;
  updatedAt: Date;
  ownerId: Types.ObjectId | IUser; // can be ObjectId OR populated user
  visibility: "public" | "private" | "unlisted";
  videoUrl: string;
  thumbnailUrl: string;
}
declare interface IUser {
  _id: string;
  username: string;
  userImg?: string;
}
const VideoSchema = new Schema<IVideo>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    ownerId: {
      type: mongoose.Types.ObjectId,
      ref: "User",   // reference user
      required: true,
    },
    visibility: {
      type: String,
      enum: ["public", "private", "unlisted"],
      required: true,
    },
    videoUrl: {
      type: String,
      required: true,
    },
    thumbnailUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Video = models.Video || model<IVideo>("Video", VideoSchema);
export default Video;