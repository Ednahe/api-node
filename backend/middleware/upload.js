const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    dest: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`)
    }
});

const fileFilter = (req, file, cb) => {
    const fileTypes = /mp3|mpeg|wav/;
    const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = fileTypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Seuls les fichiers audio sont autorisés.')
    }
};

const upload = multer({
    storage: storage,
    limits: { fileSize: 20 * 1024 * 1024},
    fileFilter: fileFilter,
});

module.exports = upload;