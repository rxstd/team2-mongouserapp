module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "channel",
    {
      channel_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "채널 아이디",
      },
      community_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "커뮤니티 아이디",
      },
      category_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "카테고리 코드",
      },
      channel_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: "채널 명",
      },
      user_limit: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "사용자 제한 수",
      },
      channel_img_path: {
        type: DataTypes.STRING(200),
        allowNull: true,
        comment: "채널 이미지 경로",
      },
      channel_desc: {
        type: DataTypes.STRING(1000),
        allowNull: true,
        comment: "채널 설명",
      },
      channel_state_code: {
        type: DataTypes.TINYINT,
        allowNull: false,
        comment: "채널 상태 코드",
      },
      reg_date: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "등록 일시",
      },
      reg_member_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "등록한 멤버 ID",
      },
      edit_date: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: "수정 일시",
      },
      edit_member_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "수정한 멤버 ID",
      },
    },
    {
      sequelize,
      tableName: "channel",
      timestamps: false,
      comment: "채널 테이블",
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: ["channel_id"],
        },
      ],
    }
  );
};
