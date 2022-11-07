const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        if (file.fieldname == 'avatar') {
            cb(null, './public/uploads/avatar');
        } else {
            cb(null, './public/uploads/product');
        }
        
    },
    filename: (req, file, cb) => {
        const date = new Date().toJSON().slice(0, 10);
        const extension = `.${file.originalname.split(".")[1]}`;
        const name = req.body.nombre + extension;
        let filename;

        if (req.body.nombre) {
            if (file.fieldname == 'imagen') {
                filename = `${date} - ${Math.floor(Math.random() * (15 - 1 + 1) + 1)} - ${name}`;
            } else {
                filename = `${date} - ${name}`;
            }
        } else {
            if (file.fieldname == 'imagen') {
                filename = `${date} - ${Math.floor(Math.random() * (15 - 1 + 1) + 1)} - ${file.originalname}`;
            } else {
                filename = `${date} - ${file.originalname}`;
            }
        }

        
        
        cb(null, filename);
    }
});
const fileUpload = multer({storage});

module.exports = {
    fileUpload
};
