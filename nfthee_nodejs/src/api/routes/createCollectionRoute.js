const express = require('express');
const {
  Multer: { upload, uploadS3 ,},
  IPFS: { uploadImageTest,uploadMultiples }
} = require('../../utils');
const { imageUpload } = require('../../../server');

const router = express.Router();

const {
  indexAll,
  upload_image,
  createCollectionInfo,
  read_createCollectionInfo,
  update_createCollectionInfo,
  delete_createCollectionInfo,
  getCollectionInfo,
  read_getCollectionInfo,
  update_getCollectionInfo,
  getAllInfo,
  getCollectionByAddress,
  getSingleCollectionByName,
  deleteCollection
} = require('../controller').createCollectionController;

// let uploadMultiple = uploadS3.fields([
//   { name: 'logo_image', maxCount: 1 },
//   { name: 'featured_image', maxCount: 1 },
//   { name: 'banner_image', maxCount: 1 },
// ]);

// let uploadMultiple =  uploadMultiples.fields([
//   { name: 'logo_image', maxCount: 1 },
//   { name: 'featured_image', maxCount: 1 },
//   { name: 'banner_image', maxCount: 1 },
// ]);
// console.log('upload multiple ',uploadMultiple)
router.get('/createCollection/all', indexAll);
router.post('/collectionImage', uploadS3.single('fileName'), upload_image);
router.post('/createCollection', upload.fields([
  { name: 'logo_image', maxCount: 1 },
  { name: 'featured_image', maxCount: 1 },
  { name: 'banner_image', maxCount: 1 },
]),createCollectionInfo);
router.get('/createCollection/read', read_createCollectionInfo);
router.post(
  '/createCollection/update',
 
  update_createCollectionInfo
);
router.post('/deleteCollection', deleteCollection);
// router.post('/uploadImageTest',upload.fields([
//   { name: 'logo_image', maxCount: 1 },
//   { name: 'featured_image', maxCount: 1 },
//   { name: 'banner_image', maxCount: 1 },
// ]),uploadImageTest);
router.post('/createCollection/delete', delete_createCollectionInfo);
router.get('/getAll', getAllInfo);
router.get('/getCollection', getCollectionInfo);
router.get('/getCollection/read', read_getCollectionInfo);
router.get('/getCollection/update', update_getCollectionInfo);
router.post('/getCollectionByAddress', getCollectionByAddress);
router.post('/getSingleCollectionByName', getSingleCollectionByName);

module.exports = router;
