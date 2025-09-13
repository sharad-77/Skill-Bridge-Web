import multer from 'multer';
import { storage } from '../config/cloudinary.js';

const uploadImage = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only Image Files Allowed'), false);
    }
  }
}).single('profileImage');


export default uploadImage;
