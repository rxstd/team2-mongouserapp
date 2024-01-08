var express = require('express');

const Member = require('../schemas/member');

var router = express.Router();
// router.post('/login',async(req,res)=>{
// var apiResult = {
//   code:200,
//   data:null,
//   result:''
// }
// try{
// const {email,member_password} = req.body;
// const member = await Member.findOne({email,member_password})
// apiResult.code=200,
// apiResult.data = member
// apiResult.result ='ok'
// }catch(err){
//   apiResult.code=500,
//   apiResult.data = null
//   apiResult.result ='관리자 문의'
// }
// })
// router.post('/entry',async(req,res)=>{
  
// })
// router.post('/find',async(req,res)=>{
  
// })
router.get('/all', async (req, res, next) => {
  try {
    const members = await Member.find({});
    res.json(members);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post('/create',async(req,res,next)=>{
  try{
    const {
      
      email,
      member_password,
      name,
      profile_img_path,
      telephone,
      entry_type_code,
      use_state_code,
      birth_date,
      reg_date,
      reg_member_id,
      edit_date,
      edit_member_id}
      = req.body;
      
      var memberdata={
      
      email,
      member_password,
      name,
      profile_img_path,
      telephone,
      entry_type_code,
      use_state_code,
      birth_date,
      reg_date,
      edit_date,
      reg_member_id,
      edit_member_id

    }
    const member = await Member.create(memberdata)
    res.json(member)
  }catch(err){
    console.error(err);
    next(err);
  }

})
router.post('/modify',async(req,res)=>{
  
  const {member_id,
    email,
    member_password,
    name,
    profile_img_path,
    telephone,
    entry_type_code,
    use_state_code,
    birth_date,
    reg_date,
    reg_member_id,
    edit_member_id}
    = req.body; 
    
  try{  updatedData={
    email,
    member_password,
    name,
    profile_img_path,
    telephone,
    entry_type_code,
    use_state_code,
    birth_date,
    reg_date,
    reg_member_id,
    edit_date:Date.now(),
    edit_member_id
  }
  const result = await Member.updateOne({member_id},updatedData)
res.json(result)
  }catch(err){
    console.error(err);
    next(err);
  }
})
//http://localhost:3000/api/member/delete?member_id=1
router.get('/delete',async(req,res,next)=>{
  try{
  const memberId= req.query.member_id
  const result = await Member.deleteOne({member_id:memberId})
  res.json(result)
  }catch(err){
    console.error(err);
    next(err);
  }
})
router.get('/:mid',async(req,res,next)=>{
  const memberIdx = req.params.mid
  try{
    var members= await Member.findOne({member_id:memberIdx})
    res.json(members)
  }catch(err){
    console.error(err);
    next(err);
  }
})
module.exports = router;