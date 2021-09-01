const express = require('express');
const router = express.Router();
const Post = require("../models/moneyPost");


const checkRepeatsAndUpdate = async (payer, payee, amount)=>{
    const post = new Post({
        payer: payer,
        payee: payee,
        amount: amount,
    });
    const result1 = await Post.findOneAndDelete({payer: post.payer,payee: post.payee}).exec();
    const result2 = await Post.findOneAndDelete({payer: post.payee,payee: post.payer}).exec();
    if(result1){
        post.amount += result1.toJSON().amount;
    }
    else if(result2){
        if(post.amount > result2.toJSON().amount){
            post.amount -= result2.toJSON().amount;
            post.save();
        }
        else if(post.amount < result2.toJSON().amount){
            post.payer = result2.toJSON().payer;
            post.payee = result2.toJSON().payee;
            post.amount = result2.toJSON().amount - post.amount;
            post.save();
        }
    }
    else{
        post.save();
    }
}
router.get("/upload", (req, res) => {
    const list = req.query.names;
    const owner = req.query.owner;
    console.log(req.query);
    const amount =  req.query.amount / list.length;
    list.forEach(name =>{
        checkRepeatsAndUpdate(name, owner, amount);
    })
    res.send({
        state: 'success'
    })
    .catch(console.log("Error"));
    console.log("upload successful")
});
  
router.get("/all", async (req, res) => {
    const result = await Post.find().exec();
    res.send(result);
    console.log("get successful")
  });
  
router.delete("/delete", (req, res) => {
    Post.findOneAndDelete({payer: req.query.payer ,payee: req.query.payee}).exec()
    .then(res.send({
        state: "success"
    }));
    console.log("delete successful")

  });

module.exports = router;