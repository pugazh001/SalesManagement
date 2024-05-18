
const express=require('express');
const { getAllUser } = require('../controller/user-controller');
const { getAllLead, createInformation, updateLead, getById, deleteLead, getByUserId } = require('../controller/leadController');
//const { createInformation } = require('../controller/leadController');

const router=express.Router();

router.get('/',getAllLead);
router.post('/add',createInformation);
router.put("/update/:id",updateLead);
router.get("/:id",getById);
router.delete("/:id",deleteLead);
router.get("/user/:id",getByUserId);


module.exports=router;