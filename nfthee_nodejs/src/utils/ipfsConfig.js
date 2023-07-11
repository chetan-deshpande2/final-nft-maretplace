const dotenv = require('dotenv');
const { Web3Storage, getFilesFromPath } = require('web3.storage');
const { GridFsStorage } = require('multer-gridfs-storage');
const multer = require('multer');
const { credentials } = require('../config').constantCredentials;

const storage3 = new GridFsStorage({
  url: credentials.DB_URL,

  file: (req, file) => {
    match = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    if (match.indexOf(file.mimetype) === -1) {
      const filename = file.originalname;
      return filename;
    }
    return filename;
  },
});

exports.uploadImageTest = async (req, res) => {
 

  const token = credentials.WEB_STORAGE_TOKEN;

  if (!token) {
    return res.send('Token Not Found');
  }
  const storage = new Web3Storage({ token });
  const files = await getFilesFromPath(req.file.path); //!image path
  const cid = await storage.put(files);
  console.log('Content added with CID:', cid);
  const result = `http://${cid}.ipfs.w3s.link/${req.file.filename}`;
  console.log(`http://${cid}.ipfs.w3s.link/${req.file.filename}`);
  return res.send(result);
};


exports.uploadMultiples = async (req, res, next) => {
  console.log("-------",req)
  const token = credentials.WEB_STORAGE_TOKEN;

  if (!token) {
    return res.send('Token Not Found');
  }

  const storage = new Web3Storage({ token });
  const urls = [];

  for (const fieldname in req.files) {
    const file = req.files[fieldname][0];
    const param = req.files[fieldname][0].fieldname;
    const files = await getFilesFromPath(file.path);
    const cid = await storage.put(files);
    const url = `http://${cid}.ipfs.w3s.link/${file.filename}`;
    var innerObj = {};
    innerObj[param] = url;
    
    urls.push(innerObj);
    innerObj ={}
  }

  console.log('Content added with CIDs:', urls);
  return  urls;
  next();
};
