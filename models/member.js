module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "member",
    {
      member_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "회원 ID",
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: "회원 이메일",
      },
      member_password: {
        type: DataTypes.STRING(500),
        allowNull: false,
        comment: "회원 비밀번호",
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: "회원 이름",
      },
      profile_img_path: {
        type: DataTypes.STRING(300),
        allowNull: true,
        comment: "프로필 이미지 경로",
      },
      telephone: {
        type: DataTypes.STRING(20),
        allowNull: true,
        comment: "회원 전화번호",
      },
      entry_type_code: {
        type: DataTypes.TINYINT,
        allowNull: true,
        comment: "가입 유형 코드",
      },
      use_state_code: {
        type: DataTypes.TINYINT,
        allowNull: true,
        comment: "사용 상태 코드",
      },
      birth_date: {
        type: DataTypes.STRING(6),
        allowNull: true,
        comment: "회원 생년월일",
      },
      reg_date: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: "등록 일시",
      },
      reg_member_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "등록 회원 ID",
      },
      edit_date: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: "수정 일시",
      },
      edit_member_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "수정 회원 ID",
      },
    },
    {
      sequelize,
      tableName: "member",
      timestamps: false,
      comment: "회원 테이블",
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: ["member_id"],
        },
      ],
    }
  );
};
