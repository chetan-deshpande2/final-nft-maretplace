const express = require('express');
const { Multer: {upload, uploadS3 }, ApiAuth: { auth }, IPFS:{uploadImageTest,uploadMultiples} } = require('../../utils');

const router = express.Router(); 
const {
    adminBlog,
    all_blog,
    adminUpdate,
    blog_delete,
    single_blog,
    loginUser,
    changePassword,registerAdmin,updateAdmin,upload_image
} = require('../controller').adminController;

router.post("/uploadImageTest",  upload.single('uploadFile'), uploadImageTest);


router.post("/blog",auth, adminBlog);
router.get("/blog/all",auth, all_blog)
router.post("/blog/modify",auth, adminUpdate)
router.post("/blog/delete",auth,  blog_delete)
router.get("/singleBlog",auth,  single_blog)

//login api

router.post("/user/login",loginUser)
router.post("/registerAdmin",registerAdmin)
router.post("/updateAdmin",upload.single('uploadFile'),updateAdmin)


//change password
router.post("/user/changePassword",auth,  changePassword)
module.exports = router;