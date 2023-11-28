const multer = require('multer');
const path = require('path')
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        // console.log(req.files, req.file, file)
        if (file.fieldname === 'wide' || file.fieldname === 'poster') {
            cb(null, '.\\public\\images') //from app.js
        } else {
            cb(new Error("invalid field name"))
        }

    },
    filename: function (req, file, cb) {
        let ext = path.extname(file.originalname)
        //TODO if a user enters a file name with same name as existing file they could easily over ride it FIXED
        cb(null, `${req.body.name}_${file.fieldname}${ext}`)
    }
})

let uploads = multer({ storage: storage })

module.exports.uploads = uploads;