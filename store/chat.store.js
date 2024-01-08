let channelDB = [
  {
    channel_id: 1,
    community_id: 1,
    channel_code: "channel1",
    channel_name: "채널1",
    channel_img_path: "channel1.png",
    channel_desc: "채널1입니다.",
    channel_state_code: 1,
    reg_date: new Date("2023-12-12 11:11:11").toLocaleString(),
    reg_member_id: 1,
    edit_date: new Date("2023-12-12 11:11:11").toLocaleString(),
    edit_member_id: 1,
    latest_chat: "",
    iconic_color: "red",
  },
  {
    channel_id: 2,
    community_id: 1,
    channel_code: "channel2",
    channel_name: "채널2",
    channel_img_path: "channel2.png",
    channel_desc: "채널2입니다.",
    channel_state_code: 1,
    reg_date: new Date("2023-12-12 11:11:11").toLocaleString(),
    reg_member_id: 1,
    edit_date: new Date("2023-12-12 11:11:11").toLocaleString(),
    edit_member_id: 1,
    latest_chat: "",
    iconic_color: "blue",
  },
];

let channelMemberDB = [
  {
    channel_id: 1,
    member_id: 1,
    nick_name: "멤버1",
    member_type_code: 1,
    active_state_code: 1,
    last_contact_date: new Date("2023-12-12 11:11:11").toLocaleString(),
    member_out_date: new Date("2023-12-12 11:11:11").toLocaleString(),
    connection_id: "connection1",
    ip_address: "1.1.1.1",
    edit_member_id: 1,
    edit_date: new Date("2023-12-12 11:11:11").toLocaleString(),
  },
  {
    channel_id: 1,
    member_id: 2,
    nick_name: "멤버2",
    member_type_code: 1,
    active_state_code: 1,
    last_contact_date: new Date("2023-12-12 11:11:11").toLocaleString(),
    member_out_date: new Date("2023-12-12 11:11:11").toLocaleString(),
    connection_id: "connection2",
    ip_address: "2.2.2.2",
    edit_member_id: 1,
    edit_date: new Date("2023-12-12 11:11:11").toLocaleString(),
  },
  {
    channel_id: 2,
    member_id: 1,
    nick_name: "멤버1",
    member_type_code: 1,
    active_state_code: 1,
    last_contact_date: new Date("2023-12-12 11:11:11").toLocaleString(),
    member_out_date: new Date("2023-12-12 11:11:11").toLocaleString(),
    connection_id: "connection1",
    ip_address: "3.3.3.3",
    edit_member_id: 1,
    edit_date: new Date("2023-12-12 11:11:11").toLocaleString(),
  },
  {
    channel_id: 2,
    member_id: 2,
    nick_name: "멤버2",
    member_type_code: 1,
    active_state_code: 1,
    last_contact_date: new Date("2023-12-12 11:11:11").toLocaleString(),
    member_out_date: new Date("2023-12-12 11:11:11").toLocaleString(),
    connection_id: "connection2",
    ip_address: "4.4.4.4",
    edit_member_id: 1,
    edit_date: new Date("2023-12-12 11:11:11").toLocaleString(),
  },
];

let channelMsgDB = [
  {
    channel_msg_id: 1,
    channel_id: 1,
    member_id: 1,
    nick_name: "멤버1",
    msg_type_code: 1,
    connection_id: "connection1",
    message: "멤버1님이 입장하셨습니다.",
    ip_address: "1.1.1.1",
    top_channel_msg_id: 1,
    msg_state_code: 1,
    msg_date: new Date("2023-12-12 11:11:11").toLocaleString(),
    edit_date: new Date("2023-12-12 11:11:11").toLocaleString(),
    del_date: new Date("2023-12-12 11:11:11").toLocaleString(),
  },
  {
    channel_msg_id: 2,
    channel_id: 1,
    member_id: 1,
    nick_name: "멤버1",
    msg_type_code: 3,
    connection_id: "connection1",
    message: "안녕하세요. 첫 메시지입니다.",
    ip_address: "1.1.1.1",
    top_channel_msg_id: 1,
    msg_state_code: 1,
    msg_date: new Date("2023-12-12 11:11:11").toLocaleString(),
    edit_date: new Date("2023-12-12 11:11:11").toLocaleString(),
    del_date: new Date("2023-12-12 11:11:11").toLocaleString(),
  },
  {
    channel_msg_id: 3,
    channel_id: 1,
    member_id: 2,
    nick_name: "멤버2",
    msg_type_code: 3,
    connection_id: "connection2",
    message: "안녕하세요. 두번째 메시지입니다.",
    ip_address: "2.2.2.2",
    top_channel_msg_id: 1,
    msg_state_code: 1,
    msg_date: new Date("2023-12-12 11:11:11").toLocaleString(),
    edit_date: new Date("2023-12-12 11:11:11").toLocaleString(),
    del_date: new Date("2023-12-12 11:11:11").toLocaleString(),
  },
  {
    channel_msg_id: 4,
    channel_id: 2,
    member_id: 1,
    nick_name: "멤버1",
    msg_type_code: 3,
    connection_id: "connection1",
    message: "안녕하세요. 세번째 메시지입니다.",
    ip_address: "1.1.1.1",
    top_channel_msg_id: 1,
    msg_state_code: 1,
    msg_date: new Date("2023-12-12 11:11:11").toLocaleString(),
    edit_date: new Date("2023-12-12 11:11:11").toLocaleString(),
    del_date: new Date("2023-12-12 11:11:11").toLocaleString(),
  },
  {
    channel_msg_id: 5,
    channel_id: 2,
    member_id: 2,
    nick_name: "멤버2",
    msg_type_code: 3,
    connection_id: "connection2",
    message: "안녕하세요. 네번째 메시지입니다.",
    ip_address: "2.2.2.2",
    top_channel_msg_id: 1,
    msg_state_code: 1,
    msg_date: new Date("2023-12-12 11:11:11").toLocaleString(),
    edit_date: new Date("2023-12-12 11:11:11").toLocaleString(),
    del_date: new Date("2023-12-12 11:11:11").toLocaleString(),
  },
];

function updateLatestChat() {
  // 모든 channelDB를 순회하면서
  // channel_id에 해당하는 channelMsgDB를 가져와서
  // channelMsgDB의 마지막 메시지를 가져와서
  // channelDB의 latest_chat에 저장한다.

  channelDB.forEach((channel) => {
    let channelMsgs = channelMsgDB.filter(
      (channelMsg) => channelMsg.channel_id === channel.channel_id
    );
    channel.latest_chat = channelMsgs[channelMsgs.length - 1].message;
  });
}

updateLatestChat();

function getChannels() {
  return channelDB;
}

function getChannelById(id) {
  id = Number(id);
  return channelDB.find((channel) => channel.channel_id === id);
}

function updateChannel(channel) {
  let index = channelDB.findIndex(
    (c) => c.channel_id === Number(channel.channel_id)
  );
  channelDB[index] = channel;
  return channel;
}

function addChannel(channel) {
  let newChannel = {};

  newChannel.channel_id = channelDB[channelDB.length - 1].channel_id + 1;
  newChannel.community_id = channel.community_id;
  newChannel.channel_code = channel.channel_code;
  newChannel.channel_name = channel.channel_name;
  newChannel.channel_img_path = channel.channel_img_path;
  newChannel.channel_desc = channel.channel_desc;
  newChannel.channel_state_code = channel.channel_state_code;
  newChannel.reg_date = channel.reg_date;
  newChannel.reg_member_id = channel.reg_member_id;
  newChannel.edit_date = channel.edit_date;
  newChannel.edit_member_id = channel.edit_member_id;

  channelDB.push(newChannel);
  return newChannel;
}

function deleteChannel(id) {
  id = Number(id);
  //삭제하기
  const index = channelDB.findIndex((channel) => channel.channel_id === id);

  let data = channelDB[index];

  channelDB.splice(index, 1);
  return data;
}

function getChatMembersbyChannelId(id) {
  return channelMemberDB.filter(
    (channelMember) => channelMember.channel_id === id
  );
}

function getMessagesbyChannelId(id) {
  let chats = channelMsgDB.filter((channelMsg) => channelMsg.channel_id == id);
  return chats;
}

function sendChat(channel_id, member_id, nick_name, message) {
  let newChat = {};

  newChat.channel_msg_id =
    channelMsgDB[channelMsgDB.length - 1].channel_msg_id + 1;
  newChat.channel_id = channel_id;
  newChat.member_id = member_id;
  newChat.nick_name = nick_name;
  newChat.msg_type_code = 3;
  newChat.connection_id = "connection1";
  newChat.message = message;
  newChat.ip_address = "1.1.1.1";
  newChat.top_channel_msg_id = 1;
  newChat.msg_state_code = 1;
  newChat.msg_date = new Date().toLocaleString();
  newChat.edit_date = newChat.msg_date;
  newChat.del_date = newChat.msg_date;

  channelMsgDB.push(newChat);

  updateLatestChat();

  const channelInfo = getChannelById(channel_id);
  const channelMsgs = getMessagesbyChannelId(channel_id);

  const retData = {
    message: "채널 메시지 조회에 성공했습니다.",
    data: {
      channel: channelInfo,
      chats: channelMsgs,
    },
  };

  return retData;
}

module.exports = {
  getChannels,
  getChannelById,
  updateChannel,
  addChannel,
  deleteChannel,
  getChatMembersbyChannelId,
  getMessagesbyChannelId,
  sendChat,
};
