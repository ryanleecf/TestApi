const express = require('express')
var cors = require('cors');
const fileUpload = require('express-fileupload');
const path = require('path');
const fs = require('fs');
const { dir } = require('console');
const playerData = require('./manutd.json');


const app = express()
const port = process.env.PORT || 5000;
app.use(fileUpload());
app.use(cors());

/* =============FUNCTIONS=================== */
var ID = function () {
    // Math.random should be unique because of its seeding algorithm.
    // Convert it to base 36 (numbers + letters), and grab the first 9 characters
    // after the decimal.
    return '_' + Math.random().toString(36).substr(2, 9);
};

/* =============================ENDPOINTS===================================*/
//Upload endpoint
app.post('/upload', (req, res) => {
    if (req.files === null) {
        return res.status(400).json({ msg: 'No file was uploaded' });
    }

    const file = req.files.file;

    /* DEVELOPMENT */
    // const directory = `${__dirname}/public/video/uploads/`;
    // if (!fs.existsSync(directory)) {
    //     fs.mkdirSync(directory, { recursive: true }, err => { console.log("hi") })
    // }

    // file.mv(`${directory}${file.name}`, err => {
    //     if (err) {
    //         console.error(err);
    //         return res.status(500).send(err);
    //     }
    //     res.json({ fileName: file.name, filePath: `${directory}${file.name}` });
    // });

    /* PRODUCTION */
    const directory = `${__dirname}/build/video/uploads/`;
    if (!fs.existsSync(directory)) {
        fs.mkdirSync(directory, { recursive: true }, err => { console.log("hi") })
    }
    file.mv(`${directory}${file.name}`, err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        res.json({ fileName: file.name, filePath: `${directory}${file.name}` });
    });
});

//Save Recorded Video
app.post('/save', (req, res) => {
    // console.log(req.body);
    // console.log(req.files);

    const file = req.files.file;
    const filename = file.name;
    const newFileName = ID(filename);
    const fileType = req.files.file.mimetype;
    const splitType = fileType.split('/');
    const FileNameNew = newFileName + '.' + splitType[1];

    /* DEVELOPMENT */
    // const directory1 = `${__dirname}/video/recorded/`;
    // if (!fs.existsSync(directory1)) {
    //     fs.mkdirSync(directory1, { recursive: true }, err => { console.log("hi") })
    // }
    // file.mv(`${directory1}${file.name}.${FileNameNew}`, err => {
    //     if (err) {
    //         console.error(err);
    //         return res.status(500).send(err);
    //     }
    //     res.json({ fileName: file.name, filePath: `${directory1}${FileNameNew}` });
    // });

    /* PRODUCTION */
    const directory1 = `${__dirname}/build/video/recorded/`;
    if (!fs.existsSync(directory1)) {
        fs.mkdirSync(directory1, { recursive: true }, err => { console.log("hi") })
    }
    file.mv(`${directory1}${file.name}.${FileNameNew}`, err => {
        if (err) {
            console.error(err);
            return res.status(500).send(err);
        }
        res.json({ fileName: file.name, filePath: `${directory1}${FileNameNew}` });
    });
});


//Test Get Api
app.get('/', (req, res) => {
    res.send("Upload Recorded Vid");
})


app.listen(port, () => console.log(`Server Started at port: ${port}`));