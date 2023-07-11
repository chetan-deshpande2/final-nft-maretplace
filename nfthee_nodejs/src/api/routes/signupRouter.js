const express = require('express');
const router = express.Router();

const {
  register,
  login,
  signupData,
  updateProfile,
  signupDataAll,
  loginOne,
  updateAccountAddress,
  userCollections,
  userItems,
  userFollow,
  userUnFollow,
  addLoginToken,
  notificationSend,
  followingList,
  updateAccountAdrs,
  notificationFetch,
  messageDelete,
  addWalletToken,
  updateUserStatus,
  readUser,
  checkWalletAddress
} = require('../controller').signupController;
const {
  Multer: { upload, uploadS3 },
  ApiAuth:{signupAuth}
} = require('../../utils');

let uploadMultiple = uploadS3.fields([
  { name: 'profile_image', maxCount: 1 },
  { name: 'banner_image', maxCount: 1 },
]); 

router.post('/signup', register);
router.get('/signup/all', signupDataAll);
router.get('/signup/read', signupData);
router.get('/login/email', login);
// router.post('/updateProfile', uploadMultiple, updateProfile);
router.post('/updateProfile', upload.fields([
  { name: 'profile_image', maxCount: 1 },
  { name: 'banner_image', maxCount: 1 },
]), updateProfile);
router.post('/updateAddress', updateAccountAddress);
router.get('/userCollections',signupAuth, userCollections);
// router.get('/userCollections',signupAuth, userCollections);
router.get('/userItems',signupAuth, userItems);
router.get('/followingList', followingList);
router.put('/userFollow',signupAuth, userFollow);
router.put('/userUnFollow',signupAuth, userUnFollow);
router.put('/messageDelete', messageDelete);
router.post('/addLoginToken', addLoginToken);
router.post('/updateAccountAdrs', updateAccountAdrs);
router.post('/notificationSend', notificationSend);
router.post('/notificationFetch', notificationFetch);
router.post('/addWalletToken', addWalletToken);
router.get('/updateUserStatus', updateUserStatus);
router.get('/readUser', readUser);
router.post('/checkWalletAddress', checkWalletAddress);
/* Implement Logout Endpoint */
router.post('/logout', async (req, res) => {
  if (req.isAuthenticated()) {
    await magic.users.logoutByIssuer(req.user.issuer);
    req.logout();
    return res.status(200).end();
  } else {
    return res.status(401).end(`User is not logged in.`);
  }
});
// router.post("/reg", SignUp)

module.exports = router;
