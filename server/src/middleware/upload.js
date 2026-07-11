const multer = require("multer");

const storage = multer.diskStorage({});

const path = require("path");

const fileFilter = (req, file, cb) => {

    const ext = path.extname(file.originalname).toLowerCase();

    if (ext === ".pdf") {
        return cb(null, true);
    }

    cb(new Error("Only PDF files are allowed"), false);
};
const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024,
    },
    fileFilter,
});

module.exports = upload;