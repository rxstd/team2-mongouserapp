module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "channel_member",
    {
      channel_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "channel",
          key: "channel_id",
        },
        comment: "채널 ID",
      },
      member_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "member",
          key: "member_id",
        },
        comment: "회원 ID",
      },
      nick_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: "닉네임",
      },
      member_type_code: {
        type: DataTypes.TINYINT,
        allowNull: false,
        comment: "회원 유형 코드",
      },
      active_state_code: {
        type: DataTypes.TINYINT,
        allowNull: false,
        comment: "활성 상태 코드",
      },
      last_contact_date: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: "마지막 연락 일시",
      },
      last_out_date: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: "마지막 로그아웃 일시",
      },
      connection_id: {
        type: DataTypes.STRING(100),
        allowNull: true,
        comment: "연결 ID",
      },
      ip_address: {
        type: DataTypes.STRING(50),
        allowNull: true,
        comment: "IP 주소",
      },
      edit_member_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "수정한 회원 ID",
      },
      edit_date: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: "수정 일시",
      },
    },
    {
      sequelize,
      tableName: "channel_member",
      timestamps: false,
      comment: "채널 멤버 테이블",
      indexes: [
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
