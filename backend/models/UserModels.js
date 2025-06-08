import mongoose from "mongoose";
const userSchema =new mongoose.Schema({
  name: {
    type: String,
    required: [true,'name is required'],
    trim: true

  },
  email : {
    type: String,
    required: [true,'email is required'],
    unique: true,
    lowerCase: true,
    trim: true
  },
  password: {
    type: String,
    required: [true,'password is required'],
  
  },
  aadhaar: {
    type: String,
    unique: true,
    sparse: true,
    minlength: 12,
    maxlength: 12,
    trim: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user'
  },
  documents: [
    {
    type:mongoose.Schema.types.ObjectId,
    ref: 'Document'

  },
],

},{
  timestamps: true,
}
);

const User = mongoose.model('User', userSchema);
export default User;