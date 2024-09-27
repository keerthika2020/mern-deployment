var express = require('express');
var router = express.Router();
const { Mongodb,MongoClient,ObjectId} = require('mongodb');
var router = express.Router();
// Mongodb.ObjectID
const mongodbUrl = 'mongodb+srv://programmerpraveenkumar:SuPcrULSyxtz4iV7@cluster0.twdnbua.mongodb.net/';
const mongoDb = new MongoClient(mongodbUrl);
// http://localhost:8080/admin/login
router.post("/login",(req,res)=>{
let{email,password} = req.body;

})

// http://localhost:8080/admin/getUnApprovedList
router.get("/getUnApprovedList",async(req,res)=>{
    const db = mongoDb.db('product-review');
   let list = await  db.collection("product").find({"isApproved":"0"}).toArray();//to show the product which is not approved by the admin
    res.json(list);
    
})

// http://localhost:8080/admin/approveReview

router.post("/approvedReview",async(req,res)=>{
    try{
        let{id} = req.body;
    const db = mongoDb.db('product-review');
     await  db.collection("product").updateOne({"_id":ObjectId.createFromHexString(id)},{$set:{"isApproved":"1"}});
    res.json({"msg":"approved!!!"}) //if admin wants to approve it the isApprovd becomes 1
    
    }catch(e){
    res.json({"msg":e})
    } //the application will not be stopped even if error occurs so use try and catch block
})

module.exports = router;