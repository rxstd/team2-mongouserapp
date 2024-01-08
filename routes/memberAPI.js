var express = require("express");
var router = express.Router();
var dotenv = require("dotenv");

const db = require("../models/index");

dotenv.config();

const webTitle = process.env.PROJECT_TITLE;

var userMiddleware = require("../middleware/user.middleware");

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

    const auth = await db.Member.findOne({
      where: {
        email: username,
        member_password: password,
      },
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

router.get("/all", userMiddleware, async function (req, res, next) {
  try {
    const memberList = await db.Member.findAll();
    res.json({ message: "회원 목록 조회에 성공했습니다.", data: memberList });
  } catch (error) {
    res.json({ message: "회원 목록 조회에 실패했습니다.", data: {} });
  }
});

router.post("/modify", userMiddleware, async function (req, res, next) {
  const member_id = req.body.member_id;
  const password = req.body.password;
  const name = req.body.name;
  const telephone = req.body.telephone;
  const birthDate = req.body.birthDate;

  const memberData = {
    password,
    name,
    telephone,
    birthDate,
  };

  let where = {
    member_id: member_id,
  };

  const member = await db.Member.update(memberData, where);

  if (member) {
    res.json({ message: "회원정보 수정에 성공했습니다.", data: member });
  } else {
    res.json({ message: "회원정보 수정에 실패했습니다.", data: {} });
  }
});

// 신규 회원정보 데이터 등록 등록 - 이미 회원가입에서 구현하여 일단 패스

router.post("/delete", userMiddleware, async function (req, res, next) {
  const member_id = req.body.member_id;

  let userInfo = await db.Member.findOne({
    where: {
      member_id: member_id,
    },
  });

  if (!userInfo) {
    res.json({ message: "회원정보 삭제에 실패했습니다.", data: {} });
  }

  const deleteUser = await db.Member.destroy({
    where: {
      member_id: member_id,
    },
  });

  const member = await db.Member.findAll();

  res.json({ message: "회원정보 삭제에 성공했습니다.", data: member });
});

router.get("/:mid", userMiddleware, async function (req, res, next) {
  const member_id = req.params.mid;

  const member = await db.Member.findOne({
    where: {
      member_id: member_id,
    },
  });

  if (member) {
    res.json({ message: "회원 조회에 성공했습니다.", data: member });
  } else {
    res.json({
      message: "회원 조회에 실패했습니다. 올바른 회원인지 확인하십시오.",
      data: {},
    });
  }
});

module.exports = router;
