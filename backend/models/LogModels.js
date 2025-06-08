import mongoose from 'mongoose';

const logSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    action: {
      type: String,
      required: true,
      enum: [
        'upload',
        'download',
        'delete',
        'share',
        'view',
        'login',
        'register',
        'aadhaar_link',
        'aadhaar_unlink',
      ],
    },
    document: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Document',
    },
    details: {
      type: String,
    },
    ipAddress: {
      type: String,
    },
  },
  { timestamps: true }
);

const Log = mongoose.model('Log', logSchema);
export default Log;
