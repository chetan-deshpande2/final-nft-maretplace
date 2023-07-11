const express = require('express');
const { Multer: {upload, uploadS3 }, ApiAuth: { auth }, IPFS:{uploadImageTest,uploadMultiples} } = require('../../utils');

const router = express.Router();
const { addBlockchain, getBlockchain, editBlockchain, deleteBlockchain } =
  require('../controller').blockchainController;
  router.post("/uploadImageTest",  upload.single('uploadFile'), uploadImageTest);

router.post('/addBlockchain',addBlockchain);
router.get('/getBlockchain', getBlockchain);
router.post('/editBlockchain', editBlockchain);
router.get(
  '/deleteBlockchain',
  auth,
  uploadS3.single('icon'),
  deleteBlockchain
);

module.exports = router;
