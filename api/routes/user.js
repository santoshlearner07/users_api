const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling GET req",
  });
});

router.post("/", (req, res, next) => {
  res.status(200).json({
    message: "Handling POST req",
  });
});

router.get('/:userId',(req,res,next)=>{
    const id = req.params.userId;
    
})

module.exports = router;