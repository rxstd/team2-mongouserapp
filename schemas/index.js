const mongoose = require("mongoose");

const connect = () => {
  if (process.env.NODE_ENV !== "production") {
    mongoose.set("debug", true);
  }

  //몽고DB연결정보를 설정합니다.
  mongoose.connect(
    "mongodb://welcome1:wjddlsdls110!@localhost:27017/admin",
    {
      dbName: "modu_chat",
    },
    (error) => {
      if (error) {
        console.log("몽고디비 연결 에러", error);
      } else {
        console.log("몽고디비 연결 성공");
      }
    }
  );
};

mongoose.connection.on("error", (error) => {
  console.error("몽고디비 연결 에러", error);
});

mongoose.connection.on("disconnected", () => {
  console.error("몽고디비 연결이 끊겼습니다. 연결을 재시도합니다.");
  connect();
});

//회원정보 콜렉션 모델을 참조합니다.
require("./member.js");

//게시글 ODM모델 추가
require("./article.js");
require("./admin.js");

//채널정보 콜렉션 모델을 참조합니다.
require("./channel.js");

//채널메시지 콜렉션 모델을 참조합니다.
require("./channelMsg.js");

var Member = mongoose.model("Member");

//기본 테스트 아이디 생성 및 확인, 있으면 업데이트 없으면 생성
//test@gmail.com / 1234
Member.findOne({
  email: "team2@mongo.com",
}).then((user) => {
  if (user) {
    Member.updateOne(
      {
        email: "team2@mongo.com",
      },
      {
        name: "테스트",
        member_password: "1234",
      }
    ).then((result) => {
      console.log(result);
    });
  } else {
    const newMember = {
      email: "team2@mongo.com",
      member_password: "1234",
      name: "김길동",
      telephone: "01023452345",
      entry_type_code: 1,
      use_state_code: 2,
      birth_date: "990202",
      reg_member_id: 1,
      edit_member_id: 1,
      reg_date: "2024-01-04T06:53:17.298Z",
      edit_date: "2024-01-04T06:53:17.298Z",
      member_id: 3,
    };
    Member.create(newMember).then((result) => {
      console.log(result);
    });
  }
});

module.exports = connect;
