module.exports = function (sequelize, DataTypes) {
  return sequelize.define(
    "article_file",
    {
      article_file_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
        comment: "게시글 파일 고유번호",
      },
      article_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "article",
          key: "article_id",
        },
        comment: "게시글 고유번호",
      },
      file_name: {
        type: DataTypes.STRING(100),
        allowNull: false,
        comment: "파일명",
      },
      file_size: {
        type: DataTypes.INTEGER,
        allowNull: true,
        comment: "파일 크기",
      },
      file_path: {
        type: DataTypes.STRING(500),
        allowNull: true,
        comment: "파일 경로",
      },
      file_type: {
        type: DataTypes.STRING(50),
        allowNull: true,
        comment: "파일 타입",
      },
      reg_date: {
        type: DataTypes.DATE,
        allowNull: false,
        comment: "등록 일시",
      },
      reg_member_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        comment: "파일을 등록한 회원의 고유번호",
      },
    },
    {
      sequelize,
      tableName: "article_file",
      timestamps: false,
      comment: "게시글에 첨부된 파일 정보를 저장하는 테이블",
      indexes: [
        {
          name: "PRIMARY",
          unique: true,
          using: "BTREE",
          fields: ["article_file_id"],
        },
        {
          name: "fk_article_id",
          using: "BTREE",
          fields: ["article_id"],
        },
      ],
    }
  );
};
