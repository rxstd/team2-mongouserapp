var express = require("express");
var router = express.Router();
var dotenv = require("dotenv");

var memberStore = require("../store/member.store");

dotenv.config();

const webTitle = process.env.PROJECT_TITLE;

router.get("/", function (req, res, next) {
  if (req.session.member_id) {
    res.redirect("/chat/");
  } else {
    res.redirect("/login");
  }
});

router.get("/login", function (req, res, next) {
  res.render("auth/sign-in", { title: webTitle, layout: false });
});

router.post("/login", function (req, res, next) {
  let defaultJson = {
    result: true,
    message: "",
    data: {},
  };

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

  const user = memberStore.authUser(username, password);

  console.log(username, password);

  if (user) {
    req.session.member_id = user.member_id;
    req.session.member_nick = user.name;
    defaultJson.message = "로그인에 성공하였습니다.";
    defaultJson.data = user;
  } else {
    defaultJson.result = false;
    defaultJson.message =
      "일치하는 인증 정보가 없습니다.\n이메일 혹은 비밀번호를 확인하십시오.";
  }

  if (defaultJson.result) {
    res.send(`<script>alert("${defaultJson.message}");</script>`);
  } else {
    res.send(
      `<script>alert("${defaultJson.message}");history.back();</script>`
    );
  }
});

router.get("/entry", function (req, res, next) {
  res.render("auth/sign-up", { title: webTitle, layout: false });
});

router.post("/entry", function (req, res, next) {
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
    const user = memberStore.checkUserAlreadyExists(username);

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
        member_id: memberStore.getUsers().length + 1,
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

      memberStore.addUser(newUser);

      defaultJson.message = "회원가입에 성공하였습니다.";
    }
  }

  if (defaultJson.result) {
    res.send(`<script>alert("${defaultJson.message}");</script>`);
  } else {
    res.send(
      `<script>alert("${defaultJson.message}");history.back();</script>`
    );
  }
});

router.get("/logout", function (req, res, next) {
  req.session.destroy();
  res.redirect("/login");
});

router.get("/find", function (req, res, next) {
  res.render("auth/forgot-pw", { title: webTitle, layout: false });
});

router.post("/find", function (req, res, next) {
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

  const user = memberStore.getUserByUsername(username);

  if (user) {
    defaultJson.message =
      "초기화된 비밀번호가 귀하의 이메일로 발송되었습니다. (구현되지 않은 기능)";
  } else {
    defaultJson.result = false;
    defaultJson.message =
      "일치하는 인증 정보가 없습니다.\n가입된 이메일이 맞는지 확인하십시오.";
  }

  if (defaultJson.result) {
    res.send(`<script>alert("${defaultJson.message}");</script>`);
  } else {
    res.send(
      `<script>alert("${defaultJson.message}");history.back();</script>`
    );
  }
});

module.exports = router;
