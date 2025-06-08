import mongoose from 'mongoose';

const documentSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    fileUrl: {
      type: String,
      required: true,
    },
    fileName: {
      type: String,
      required: true,
    },
    fileType: {
      type: String,
      required: true,
      enum: ['pdf', 'jpg', 'png', 'doc', 'docx', 'other'],
      default: 'other',
    },
    category: {
      type: String,
      enum: ['education', 'health', 'id', 'travel', 'other'],
      default: 'other',
    },
    tags: [String],
    sharedWith: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    expiresAt: Date, // For expirable shares
  },
  { timestamps: true }
);

const Document = mongoose.model('Document', documentSchema);
export default Document;
