module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "admin_member",
    {
      admin_member_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "관리자 멤버 ID",
      },
      company_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "회사 코드",
      },
      admin_id: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: "관리자 ID",
      },
      admin_password: {
        type: DataTypes.STRING(500),
        allowNull: false,
        comment: "관리자 비밀번호",
      },
      admin_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: "관리자 이름",
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: "관리자 이메일",
      },
      telephone: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: "관리자 전화번호",
      },
      dept_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: "부서명",
      },
      used_yn_code: {
        type: DataTypes.TINYINT,
        allowNull: false,
        comment: "사용 여부 코드",
      },
      reg_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "등록자 ID",
      },
      edit_date: {
        type: DataTypes.DATE,
        allowNull: true,
        comment: "수정 일시",
      },
      reg_date: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "등록 일시",
      },
    },
    {
      sequelize,
      tableName: "admin_member",
      timestamps: false,
      comment: "관리자 멤버 테이블",
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: ["admin_member_id"],
        },
      ],
    }
  );
};
