const express = require('express');
const {
  Multer: { upload, uploadS3 },
  IPFS: { uploadImageTest ,uploadMultiples},
  ApiAuth:{signupAuth}
} = require('../../utils');



const { imageUpload } = require('../../../server');
const { nftIteams } = require('../../models');

const router = express.Router();

const {
  index,
  nftStore,
  upload_image,
  read_nftStore,
  upadte_nftStore,
  delete_nftStore,
  getAllItemInfo,
  getItemInfo,
  read_getItemInfo,
  update_getItemInfo,
  insert_likes,
  remove_likes,
  userLikes,
  getPrice,
  uploadData,
  collectionNft,
  collectionActivity,
  viewCounts,
  buyNft,
  totalNft,totalNftOwners,nftRemoveAuction,updateListing
} = require('../controller').nftteamsController;

let uploadMultiple = upload.fields([
  { name: 'logo_image', maxCount: 1 },
  { name: 'featured_image', maxCount: 1 },
  { name: 'banner_image', maxCount: 1 },
]);

router.get('/all', index);
router.post('/store',upload.single('uploadFile'),nftStore);
router.get('/read', read_nftStore);
router.get('/collectionNft', collectionNft);
router.get('/collectionActivity', collectionActivity);
router.post('/update', uploadS3.single('uploadFile'), upadte_nftStore);
router.post('/delete', delete_nftStore);
router.get('/admin/getAllItem', getAllItemInfo);
router.get('/getItem', getItemInfo);
router.get('/getItem/read', read_getItemInfo);
router.get('/getItem/update', update_getItemInfo);
router.post('/like', insert_likes);
router.get('/userLikes', userLikes);
router.post('/unlike', remove_likes);
router.post('/buyNft', buyNft);
router.post('/posts/:postId/views', viewCounts);
router.get('/totalNft', totalNft);
router.get('/totalNftOwners', totalNftOwners);
router.post('/nftRemoveAuction', nftRemoveAuction);
router.post('/updateListing', updateListing);
// router.post('/writeImage', uploadS3.single('testImage'), upload_image);

router.post('/image', upload.single("fileName",),uploadImageTest);
// router.post('/image', upload.single('fileName'), upload_image);
// router.post('/uploadImageTest', upload.single("nftFile"),uploadImageTest);
// router.post('/uploadImageTest', upload.(),uploadImageTest);
router.post('/uploadMultiples', upload.fields([
  { name: 'logo_image', maxCount: 1 },
  { name: 'featured_image', maxCount: 1 },
  { name: 'banner_image', maxCount: 1 },
]),uploadMultiples);

router.get('/getPrice', getPrice);

router.post('/uploadData', uploadS3.single('img_url'), uploadData);

module.exports = router;
