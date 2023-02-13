import multer from 'multer';

const MIME_TYPE_MAP = {
    "image/png": "csv",
    "image/jpg": "jpg",
    "image/jpeg": "jpeg"
};
let ext = "";
let name = "";
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const isValid = MIME_TYPE_MAP[file.mimetype];
        let error = new Error("Invalid mime type");
        if (isValid) {
            error = null;
        }
        cb(error, "attachment/images");
    },
    filename: (req, file, cb) => {
        if (file.originalname.includes(".jpeg")) {
            name = file.originalname.split(".jpeg")[0]
                .toLowerCase()
                .split(" ")
                .join("-");
            ext = "jpeg";
        } else if (file.originalname.includes(".jpg")) {
            name = file.originalname.split(".jpg")[0]
                .toLowerCase()
                .split(" ")
                .join("-");
            ext = "jpg";
        } else {
            name = file.originalname.split(".png")[0]
                .toLowerCase()
                .split(" ")
                .join("-");
            ext = "png";
        }
        cb(null, name + "-" + Date.now() + "." + ext);
    },
});

export const uploadImages = multer({storage: storage});