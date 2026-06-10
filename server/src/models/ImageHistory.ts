import mongoose, { InferSchemaType, Schema } from 'mongoose';

const imageHistorySchema = new Schema(
  {
    prompt: {
      type: String,
      required: true,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: false,
    },
    imageBase64: {
      type: String,
      required: false,
    },
    mimeType: {
      type: String,
      required: false,
      default: 'image/png',
    },
    provider: {
      type: String,
      required: true,
      enum: ['gemini'],
      default: 'gemini',
    },
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
    versionKey: false,
  },
);

export type ImageHistoryDocument = InferSchemaType<typeof imageHistorySchema>;

export const ImageHistory = mongoose.model<ImageHistoryDocument>('ImageHistory', imageHistorySchema);
