const mongoose = require("mongoose");
const fs = require("fs");
const jwt = require("jsonwebtoken");
const { createToken, Mail } = require("../../utils");
const { verificationModel } = require("../../models");
const { credentials } = require("../../config").constantCredentials;
const {
  Multer: { upload, uploadS3 ,},
  IPFS: { uploadImageTest,uploadMultiples }
} = require('../../utils');
/**
 * @function admin data
 * @description using this function to generate refercode for user
 * @param {mobile}
 * @author Rinku sain
 */
exports.addVerification = async (req, res) => {
  try {
    // console.log("req.files", req.files);
    let resp = await uploadMultiples(req);
    console.log("res",resp)
    let body = req.body;
    let find = await verificationModel.findOne({
      project_name: body.project_name,
    });
    console.log(find);
    if (find) {
      return {
        message: "Project Name Already Exist.",
        status: false,
        data: {},
      };
    }
   
    // const art_draft = req.files.art_draft[0].location;
    // const project_icon = req.files.project_icon[0].location;
    // const project_banner = req.files.project_banner[0].location;
    // const project_logo = req.files.project_logo[0].location;

    // console.log(req.files);

    const upadate_data = {
      project_icon: resp[0].project_icon,
      project_banner: resp[1].project_banner,
      project_logo: resp[2].project_logo,
      art_draft: resp[3].art_draft,
      project_name: req.body.project_name,
      contract_address: req.body.contract_address,
      choose_blockchain: req.body.choose_blockchain,
      about: req.body.about,
      project_status: req.body.project_status,
      website: req.body.website,
      twitter: req.body.twitter,
      discord: req.body.discord,
      description: req.body.description,
      royalty_fee_distribution: req.body.royalty_fee_distribution,
      royalty_fee_rate: req.body.royalty_fee_rate,
      json_accessible: req.body.json_accessible,
      email: req.body.email,
      currentOwner: req.body.currentOwner,
      original: req.body.original,
      inspired_from: req.body.inspired_from,
    };
    let addPartner = await verificationModel.create(upadate_data);
    console.log("::::::::::::>>>>", addPartner);
    return {
      message: "Verification added successfully.",
      status: true,
      data: addPartner,
    };
  } catch (error) {
    throw error;
  }
};
exports.getAllVerification = async (req, res) => {
    try {
      let findData = await verificationModel.find().sort({ createdAt: -1 });
      return {
        message: "Getting All Verification listing.",
        status: true,
        data: findData,
      };
    } catch (error) {
      throw error;
    }
  };
exports.getVerification = async (req, res) => {
  try {
    let id=req.body.id;
    let findData = await verificationModel.find({_id:id}).sort({ createdAt: -1 });
    return {
      message: "Getting Verification listing.",
      status: true,
      data: findData,
    };
  } catch (error) {
    throw error;
  }
};
exports.deleteVerification = async (req, res) => {
    try {
      let id=req.body.id;
      let findData = await verificationModel.findByIdAndDelete({_id:id}).sort({ createdAt: -1 });
      return {
        message: "Delete Verification ",
        status: true,
        data: findData,
      };
    } catch (error) {
      throw error;
    }
  };

exports.createPageToken = async (req, res) => {
  try {
    const token = jwt.sign(req.body, credentials.SECRET_TOKEN, {
      expiresIn: "10m",
    });
    return {
      message: "Getting token.",
      status: true,
      data: token,
    };
  } catch (error) {
    throw error;
  }
};
