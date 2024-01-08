var express = require("express");

const Member = require("../schemas/member");

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
router.post("/login", async function (req, res, next) {
  let defaultJson = {
    result: true,
    message: "",
    data: {},
  };

  try {
    const username = req.body.username;

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(username)) {
      defaultJson.result = false;
      defaultJson.message = "이메일 형식이 올바르지 않습니다.";
    }

    if (username === undefined || username === "") {
      defaultJson.result = false;
      defaultJson.message = "이메일이 공란이어서는 안됩니다.";
    }

    const password = req.body.password;

    if (password === undefined || password === "") {
      defaultJson.result = false;
      defaultJson.message = "비밀번호가 공란이어서는 안됩니다.";
    }

    const auth = await Member.findOne({
      email: username,
      member_password: password,
    });

    if (auth) {
      req.session.member_id = auth.member_id;
      req.session.member_nick = auth.name;
      defaultJson.message = "로그인에 성공하였습니다.";
      defaultJson.data = auth;
    } else {
      defaultJson.result = false;
      defaultJson.message =
        "일치하는 인증 정보가 없습니다.\n이메일 혹은 비밀번호를 확인하십시오.";
    }

    res.json(defaultJson);
  } catch (error) {
    console.log(error);
    res.json({ message: "로그인에 실패했습니다.", data: {} });
  }
});

router.post("/entry", async function (req, res, next) {
  try {
    const username = req.body.username;
    const password = req.body.password1;
    const passwordConfirm = req.body.password2;
    const name = req.body.name;
    const telephone = req.body.telephone;
    const birthDate = req.body.birth;

    let defaultJson = {
      result: true,
      message: "",
      data: {},
    };

    if (
      username === undefined ||
      (username === "" && defaultJson.result != false)
    ) {
      defaultJson.result = false;
      defaultJson.message = "이메일이 공란이어서는 안됩니다.";
    }

    const emailRegex = /\S+@\S+\.\S+/;
    if (!emailRegex.test(username)) {
      defaultJson.result = false;
      defaultJson.message = "이메일 형식이 올바르지 않습니다.";
    }

    if (
      password === undefined ||
      (password === "" && defaultJson.result != false)
    ) {
      defaultJson.result = false;
      defaultJson.message = "비밀번호가 공란이어서는 안됩니다.";
    }

    if (
      passwordConfirm === undefined ||
      (passwordConfirm === "" && defaultJson.result != false)
    ) {
      defaultJson.result = false;
      defaultJson.message = "비밀번호 확인이 공란이어서는 안됩니다.";
    }

    if (password !== passwordConfirm && defaultJson.result != false) {
      defaultJson.result = false;
      defaultJson.message = "비밀번호가 일치하지 않습니다.";
    }

    if (defaultJson.result != false) {
      const user = await db.Member.findOne({
        where: {
          email: username,
        },
      });

      const birth = birthDate.split("-").join("").substring(2);

      const nowTime = new Date();
      const year = nowTime.getFullYear();
      const month = nowTime.getMonth() + 1;
      const date = nowTime.getDate();
      const hour = nowTime.getHours();
      const minute = nowTime.getMinutes();
      const second = nowTime.getSeconds();
      const nowTimeStr = `${year}-${month}-${date} ${hour}:${minute}:${second}`;

      if (user) {
        defaultJson.result = false;
        defaultJson.message = "이미 존재하는 이메일입니다.";
      } else {
        const newUser = {
          email: username,
          member_password: password,
          member_name: name,
          telephone: telephone,
          entry_type_code: "1",
          user_state_code: "1",
          birth_date: birth,
          reg_date: nowTimeStr,
          reg_member_id: "1",
          edit_date: nowTimeStr,
          edit_member_id: "1",
        };

        await db.Member.create(newUser);

        defaultJson.message = "회원가입에 성공하였습니다.";
      }
    }

    res.json(defaultJson);
  } catch (error) {
    console.log(error);
    res.json({ message: "회원가입에 실패했습니다.", data: {} });
  }
});

router.post("/find", async function (req, res, next) {
  try {
    const username = req.body.username;

    let defaultJson = {
      result: true,
      message: "",
      data: {},
    };

    if (username === undefined || username === "") {
      defaultJson.result = false;
      defaultJson.message = "이메일이 공란이어서는 안됩니다.";
    }

    const user = await db.Member.findOne({
      where: {
        email: username,
      },
    });

    //Todo : 이메일 발송 기능 구현

    if (user) {
      defaultJson.message =
        "초기화된 비밀번호가 귀하의 이메일로 발송되었습니다. (구현되지 않은 기능)";
    } else {
      defaultJson.result = false;
      defaultJson.message =
        "일치하는 인증 정보가 없습니다.\n가입된 이메일이 맞는지 확인하십시오.";
    }

    res.json(defaultJson);
  } catch (error) {
    console.log(error);
    res.json({ message: "비밀번호 초기화에 실패했습니다.", data: {} });
  }
});

router.get("/all", async (req, res, next) => {
  try {
    const members = await Member.find({});
    res.json(members);
  } catch (err) {
    console.error(err);
    next(err);
  }
});

router.post("/create", async (req, res, next) => {
  try {
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
      edit_member_id,
    } = req.body;

    var memberdata = {
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
      edit_member_id,
    };
    const member = await Member.create(memberdata);
    res.json(member);
  } catch (err) {
    console.error(err);
    next(err);
  }
});
router.post("/modify", async (req, res) => {
  const {
    member_id,
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
    edit_member_id,
  } = req.body;

  try {
    updatedData = {
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
      edit_date: Date.now(),
      edit_member_id,
    };
    const result = await Member.updateOne({ member_id }, updatedData);
    res.json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});
//http://localhost:3000/api/member/delete?member_id=1
router.get("/delete", async (req, res, next) => {
  try {
    const memberId = req.query.member_id;
    const result = await Member.deleteOne({ member_id: memberId });
    res.json(result);
  } catch (err) {
    console.error(err);
    next(err);
  }
});
router.get("/:mid", async (req, res, next) => {
  const memberIdx = req.params.mid;
  try {
    var members = await Member.findOne({ member_id: memberIdx });
    res.json(members);
  } catch (err) {
    console.error(err);
    next(err);
  }
});
module.exports = router;
