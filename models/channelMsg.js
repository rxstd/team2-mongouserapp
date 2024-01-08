module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "channel_msg",
    {
      channel_msg_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "채널 메시지 고유번호",
      },
      channel_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "channel",
          key: "channel_id",
        },
        comment: "채널 고유번호",
      },
      member_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "member",
          key: "member_id",
        },
        comment: "회원 고유번호",
      },
      nick_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: "닉네임",
      },
      msg_type_code: {
        type: DataTypes.TINYINT,
        allowNull: false,
        comment: "메시지 유형 코드",
      },
      connection_id: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: "연결 ID",
      },
      message: {
        type: DataTypes.STRING(1000),
        allowNull: true,
        comment: "메시지 내용",
      },
      ip_address: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: "IP 주소",
      },
      top_channel_msg_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "상위 채널 메시지 ID",
      },
      msg_state_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "메시지 상태 코드",
      },
      msg_date: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "메시지 등록 일시",
      },
      edit_date: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: "메시지 수정 일시",
      },
      del_date: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: "메시지 삭제 일시",
      },
    },
    {
      sequelize,
      tableName: "channel_msg",
      timestamps: false,
      comment: "채널 메시지 테이블",
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: ["channel_msg_id"],
        },
        {
          name: "fk_channel_id",
          using: "BTREE",
          fields: ["channel_id"],
        },
        {
          name: "fk_member_id",
          using: "BTREE",
          fields: ["member_id"],
        },
      ],
    }
  );
};
