import Document  from "../models/DocumentModels.js";
import asyncHandler from "../utils/asyncHandler.js";
import User from "../models/UserModels.js";
import crypto from 'crypto';

// POST /api/share/:docId

export const shareDocumentWithUser = asyncHandler(async (req, res) => {
      const {docId} = req.params;
      const {recipientEmail} = req.body;

      const recipient  = await User.findOne({ email: recipientEmail });
      if(!recipient){
        return res.status(404).json({ message: 'Recipient user not found' });
      }

      const document = await Document.findOne({_id: docId, user : req.user._id})
      if(!document){
        return res.status(404).json({ message: 'Document not found or not owned by the you' });

       
      }
       // prevent duplicate sharing
        if(!document.sharedWith.includes(recipient._id)){
          document.sharedWith.push(recipient._id);
          await document.save();
        }
        res.json({ message: `Document shared with ${recipient.email} successfully`});
});

// GET Document Shared with User
export const getSharedDocuments = asyncHandler(async (req, res) => {
    const documents = await Document.find({ sharedWith: req.user._id }).sort({ createdAt: -1 });
    res.json(documents);
});

export const generateShareLink = asyncHandler(async (req, res) => {
    const { docId } = req.params;
    const {expiresInMinutes} = req.body; // Optional, default to 60 minutes
    const document = await Document.findOne ({ _id: docId, user: req.user._id });

    if(!document){
        return res.status(404).json({ message: 'Document not found or not owned by you' });
    }

    // Generate a secure token
    const token = crypto.randomBytes(16).toString('hex');
    const expiresAt = new Date(Date.now() + (expiresInMinutes || 60) * 60 * 1000); // Default to 60 minutes
    document.shareToken = token;
    document.expiresAt = expiresAt;
    await document.save();

    const link = `${process.env.Base_URL}/api/share/link/${token}`;
    res.json({link, expiresAt})
})

//GET Document by Share Token

export const accessSharedDocument = asyncHandler(async (req, res) => {
  const { token } = req.params;
  const document = await Document.findOne({ shareToken: token, expiresAt: { $gt: new Date() } });
  if (!document) {
    return res.status(404).json({ message: 'Document not found or token expired' });
  }
  res.json(document);
})