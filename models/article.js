module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "article",
    {
      article_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "게시글 ID",
      },
      board_type_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "게시판 유형 코드",
      },
      title: {
        type: DataTypes.STRING(200),
        allowNull: false,
        comment: "제목",
      },
      article_type_code: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "게시글 유형 코드",
      },
      contents: {
        type: DataTypes.TEXT,
        allowNull: true,
        comment: "내용",
      },
      view_count: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "조회수",
      },
      ip_address: {
        type: DataTypes.STRING(50),
        allowNull: false,
        comment: "작성자 IP 주소",
      },
      is_display_code: {
        type: DataTypes.TINYINT,
        allowNull: false,
        comment: "게시 여부 코드",
      },
      reg_date: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "등록 일시",
      },
      reg_member_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
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
      tableName: "article",
      timestamps: false,
      comment: "게시글 테이블",
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: ["article_id"],
        },
      ],
    }
  );
};
