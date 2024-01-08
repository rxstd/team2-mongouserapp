var express = require("express");
var router = express.Router();
var dotenv = require("dotenv");

var userMiddleware = require("../middleware/user.middleware");

dotenv.config();

const Channel = require("../schemas/channel");
const ChannelMsg = require("../schemas/channelMsg");

const webTitle = process.env.PROJECT_TITLE;

const md5 = require("md5");

router.get("/all", userMiddleware, async function (req, res, next) {
  try {
    const channelList = await Channel.find({});

    let newChannelList = [];

    //각 object마다 latest_chat과 latest_chat_date를 추가해준다.
    for (let i = 0; i < channelList.length; i++) {
      console.log(channelList[i]);
      const channel_id = channelList[i].channel_id;

      // msg_date를 기준으로 최근 메시지를 가져온다.
      const latest_chat_data = await ChannelMsg.findOne({ channel_id }).sort({
        msg_date: -1,
      });

      let latest_chat = "최근 메시지가 없습니다.";

      if (latest_chat_data) {
        latest_chat = latest_chat_data.message;
      }

      let latest_chat_date = channelList[i].reg_date;

      if (latest_chat_data) {
        latest_chat_date = latest_chat_data.msg_date;
      }

      //latest_chat_date를 *일 *시간 *분 *초 전으로 바꿔주기
      const now = new Date();
      const diff = now - latest_chat_date;

      const diff_second = Math.floor(diff / 1000);
      const diff_minute = Math.floor(diff_second / 60);
      const diff_hour = Math.floor(diff_minute / 60);
      const diff_day = Math.floor(diff_hour / 24);

      //timestamp로 바꿔주기
      let latest_chat_timestamp = latest_chat_date.getTime();

      if (diff_second < 60) {
        latest_chat_date = `${diff_second}초 전`;
      } else if (diff_minute < 60) {
        latest_chat_date = `${diff_minute}분 전`;
      } else if (diff_hour < 24) {
        latest_chat_date = `${diff_hour}시간 전`;
      } else {
        latest_chat_date = `${diff_day}일 전`;
      }

      // _id값을 가지고 iconic_color 만들기 (red,green,blue,yellow 중 하나)
      // _id를 가지고 md5로 변환한다음 regex로 숫자만 추출해서 4로 나눈 나머지를 iconic_color로 사용하기
      const cid = channelList[i]._id;
      const encoded_cid = md5(cid);
      const regex = /\d+/g;
      const num = encoded_cid.match(regex)[0];
      const iconic_color = ["red", "green", "blue", "yellow"][num % 4];

      newChannelList.push({
        ...channelList[i]._doc,
        latest_chat,
        iconic_color,
        latest_chat_date,
        latest_chat_timestamp,
      });
    }

    //latest_chat_timestamp를 기준으로 내림차순 정렬
    newChannelList.sort((a, b) => {
      return b.latest_chat_timestamp - a.latest_chat_timestamp;
    });

    res.json({
      message: "채널 목록 조회에 성공했습니다.",
      data: newChannelList,
    });
  } catch (error) {
    res.json({ message: "채널 목록 조회에 실패했습니다.", data: {} });
  }
});

router.get("/all/three", userMiddleware, async function (req, res, next) {
  const channelList = await Channel.find({}).limit(3);
  try {
    res.json({
      message: "Recent 채널 목록 조회에 성공했습니다.",
      data: channelList,
    });
  } catch (error) {
    res.json({ message: "Recent 채널 목록 조회에 실패했습니다.", data: {} });
  }
});

router.post("/create", userMiddleware, async function (req, res, next) {
  const community_id = req.body.community_id;
  const channel_code = req.body.channel_code;
  const channel_name = req.body.channel_name;
  const channel_img_path = req.body.channel_img_path;
  const channel_desc = req.body.channel_desc;
  const channel_state_code = req.body.channel_state_code;
  const reg_member_id = req.body.reg_member_id;
  const edit_member_id = req.body.edit_member_id;

  const channelInfo = {
    community_id,
    channel_code,
    channel_name,
    channel_img_path,
    channel_desc,
    channel_state_code,
    reg_member_id,
    edit_member_id,
  };

  const channel = await Channel.create(channelInfo);

  if (channel) {
    res.json({ message: "채널정보 등록에 성공했습니다.", data: channel });
  } else {
    res.json({ message: "채널정보 등록에 실패했습니다.", data: {} });
  }
});

router.post("/modify", userMiddleware, async function (req, res, next) {
  const channel_id = req.body.channel_id;
  const community_id = req.body.community_id;
  const channel_code = req.body.channel_code;
  const channel_name = req.body.channel_name;
  const channel_img_path = req.body.channel_img_path;
  const channel_desc = req.body.channel_desc;
  const channel_state_code = req.body.channel_state_code;
  const edit_member_id = req.body.edit_member_id;

  const channel = await Channel.findOneAndUpdate(
    { channel_id },
    {
      community_id,
      channel_code,
      channel_name,
      channel_img_path,
      channel_desc,
      channel_state_code,
      edit_member_id,
    },
    { new: true }
  );

  if (channel) {
    res.json({ message: "채널정보 수정에 성공했습니다.", data: channel });
  } else {
    res.json({ message: "채널정보 수정에 실패했습니다.", data: {} });
  }
});

router.post("/delete", userMiddleware, async function (req, res, next) {
  const channel_id = Number(req.body.channel_id);

  const channel = Channel.findOneAndDelete({ channel_id });

  if (channel) {
    res.json({ message: "채널정보 삭제에 성공했습니다.", data: channel });
  } else {
    res.json({ message: "채널정보 삭제에 실패했습니다.", data: {} });
  }
});

router.get("/:cid", userMiddleware, async function (req, res, next) {
  const channel_id = Number(req.params.cid);

  const channel = await Channel.findOne({ channel_id });

  if (channel) {
    res.json({ message: "채널 조회에 성공했습니다.", data: channel });
  } else {
    res.json({
      message: "채널 조회에 실패했습니다. 올바른 채널인지 확인하십시오.",
      data: {},
    });
  }
});

router.get("/:cid/messages", userMiddleware, async function (req, res, next) {
  const channel_id = Number(req.params.cid);

  const channel = await Channel.find({ channel_id });

  const channelMsgs = await ChannelMsg.find({ channel_id }).sort({
    reg_date: -1,
  });

  if (channelMsgs) {
    res.json({
      message: "채널 메시지 조회에 성공했습니다.",
      data: {
        channel: channel[0],
        chats: channelMsgs,
      },
    });
  } else {
    res.json({
      message: "채널 메시지 조회에 실패했습니다.",
      data: {},
    });
  }
});

router.post("/:cid/send", userMiddleware, async function (req, res, next) {
  const channel_id = Number(req.params.cid);
  const message = req.body.message;
  const member_id = req.session.member_id;
  const member_nick = req.session.member_nick;

  if (req.session.member_id === undefined) {
    res.json({
      message: "로그인이 필요합니다.",
      data: {},
    });
    return;
  }

  let newChat = {};

  newChat.channel_id = channel_id;
  newChat.member_id = member_id;
  newChat.nick_name = member_nick;
  newChat.msg_type_code = 3;
  newChat.connection_id = "connection1";
  newChat.message = message;
  newChat.ip_address = "1.1.1.1";
  newChat.top_channel_msg_id = 1;
  newChat.msg_state_code = 1;
  newChat.msg_date = new Date();
  newChat.edit_date = new Date();
  newChat.del_date = new Date();

  const sendChat = await ChannelMsg.create(newChat);

  const channelInfo = await Channel.findOne({ channel_id });
  const channelMsgs = await ChannelMsg.find({ channel_id }).sort({
    reg_date: -1,
  });

  const retData = {
    message: "채널 메시지 조회에 성공했습니다.",
    data: {
      channel: channelInfo,
      chats: channelMsgs,
    },
  };

  if (sendChat) {
    res.json(retData);
  } else {
    res.json({
      message: "채널 메시지 조회에 실패했습니다.",
      data: {},
    });
  }
});

module.exports = router;
