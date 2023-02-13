import multer from 'multer';

const MIME_TYPE_MAP = {
    "application/pdf": "pdf",
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
        cb(error, "attachment/documents");
    },
    fileName: (req, file, cb) => {
        if (file.originalname.includes(".pdf")) {
            name = file.originalname.split(".pdf")[0]
                .toLowerCase()
                .split(" ")
                .join("-");
            ext = "pdf";
        }
        cb(null, name + "-" + Date.now() + "." + ext);
    },
});

export const uploadDocument = multer({storage: storage});