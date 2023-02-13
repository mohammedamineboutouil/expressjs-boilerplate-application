import multer from 'multer';

const MIME_TYPE_MAP = {
    "text/csv": "csv",
    "application/vnd.ms-excel": "xls",
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": "xlsx"
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
        if (file.originalname.includes(".xls")) {
            name = file.originalname.split(".xls")[0]
                .toLowerCase()
                .split(" ")
                .join("-");
            ext = "xls";
        } else if (file.originalname.includes(".xlsx")) {
            name = file.originalname.split(".xlsx")[0]
                .toLowerCase()
                .split(" ")
                .join("-");
            ext = "xlsx";
        } else {
            name = file.originalname.split(".csv")[0]
                .toLowerCase()
                .split(" ")
                .join("-");
            ext = "csv";
        }
        cb(null, name + "-" + Date.now() + "." + ext);
    },
});

export const uploadSheet = multer({storage: storage});