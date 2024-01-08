var express = require("express");
var router = express.Router();
var dotenv = require("dotenv");

var userMiddleware = require("../middleware/user.middleware");
var chatStore = require("../store/chat.store");

dotenv.config();

const webTitle = process.env.PROJECT_TITLE;

router.get("/all", userMiddleware, function (req, res, next) {
  const channelList = chatStore.getChannels();
  try {
    res.json({ message: "채널 목록 조회에 성공했습니다.", data: channelList });
  } catch (error) {
    res.json({ message: "채널 목록 조회에 실패했습니다.", data: {} });
  }
});

router.get("/all/three", userMiddleware, function (req, res, next) {
  const channelList = chatStore.getChannelsMaximumThree();
  try {
    res.json({
      message: "Recent 채널 목록 조회에 성공했습니다.",
      data: channelList,
    });
  } catch (error) {
    res.json({ message: "Recent 채널 목록 조회에 실패했습니다.", data: {} });
  }
});

router.post("/create", userMiddleware, function (req, res, next) {
  const community_id = req.body.community_id;
  const channel_code = req.body.channel_code;
  const channel_name = req.body.channel_name;
  const channel_img_path = req.body.channel_img_path;
  const channel_desc = req.body.channel_desc;
  const channel_state_code = req.body.channel_state_code;
  const reg_member_id = req.body.reg_member_id;
  const edit_member_id = req.body.edit_member_id;

  const channel = chatStore.addChannel({
    community_id,
    channel_code,
    channel_name,
    channel_img_path,
    channel_desc,
    channel_state_code,
    reg_member_id,
    edit_member_id,
  });

  if (channel) {
    res.json({ message: "채널정보 등록에 성공했습니다.", data: channel });
  } else {
    res.json({ message: "채널정보 등록에 실패했습니다.", data: {} });
  }
});

router.post("/modify", userMiddleware, function (req, res, next) {
  const channel_id = req.body.channel_id;
  const community_id = req.body.community_id;
  const channel_code = req.body.channel_code;
  const channel_name = req.body.channel_name;
  const channel_img_path = req.body.channel_img_path;
  const channel_desc = req.body.channel_desc;
  const channel_state_code = req.body.channel_state_code;
  const edit_member_id = req.body.edit_member_id;

  const channel = chatStore.updateChannel({
    channel_id,
    community_id,
    channel_code,
    channel_name,
    channel_img_path,
    channel_desc,
    channel_state_code,
    edit_member_id,
  });

  if (channel) {
    res.json({ message: "채널정보 수정에 성공했습니다.", data: channel });
  } else {
    res.json({ message: "채널정보 수정에 실패했습니다.", data: {} });
  }
});

router.post("/delete", userMiddleware, function (req, res, next) {
  const channel_id = Number(req.body.channel_id);

  const channel = chatStore.deleteChannel(channel_id);

  if (channel) {
    res.json({ message: "채널정보 삭제에 성공했습니다.", data: channel });
  } else {
    res.json({ message: "채널정보 삭제에 실패했습니다.", data: {} });
  }
});

router.get("/:cid", userMiddleware, function (req, res, next) {
  const channel_id = Number(req.params.cid);

  const channel = chatStore.getChannelById(channel_id);

  if (channel) {
    res.json({ message: "채널 조회에 성공했습니다.", data: channel });
  } else {
    res.json({
      message: "채널 조회에 실패했습니다. 올바른 채널인지 확인하십시오.",
      data: {},
    });
  }
});

router.get("/:cid/messages", userMiddleware, function (req, res, next) {
  const channel_id = Number(req.params.cid);

  const channel = chatStore.getChannelById(channel_id);

  const channelMsgs = chatStore.getMessagesbyChannelId(channel_id);

  if (channelMsgs) {
    res.json({
      message: "채널 메시지 조회에 성공했습니다.",
      data: {
        channel,
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

router.post("/:cid/send", userMiddleware, function (req, res, next) {
  const channel_id = Number(req.params.cid);
  const message = req.body.message;
  const member_id = req.session.member_id;
  const member_nick = req.session.member_nick;

  const sendChat = chatStore.sendChat(
    channel_id,
    member_id,
    member_nick,
    message
  );

  if (sendChat) {
    res.json(sendChat);
  } else {
    res.json({
      message: "채널 메시지 조회에 실패했습니다.",
      data: {},
    });
  }
});

module.exports = router;
