// article_id == integer
// board_type_code == integer
// title == varchar(200)
// article_type_code == integer
// contents == varchar(4000)
// view_count == integer
// ip_address == varchar(50)
// is_display_code == integer
// reg_date == datetime
// reg_member_id == integer
// edit_date == datetime
// edit_member_id == integer

//2023-01-01 15:32:55
//2023-03-22 12:12:44
//2023-05-15 04:56:05
//2023-08-30 18:41:07
//2023-12-12 11:11:11

let articleDB = [
  {
    article_id: 1,
    board_type_code: 1,
    title: "첫 게시글",
    article_type_code: 1,
    contents: "안녕하세요. 첫 게시글입니다.",
    view_count: 1,
    ip_address: "1.1.1.1",
    is_display_code: 1,
    reg_date: "2023-01-01 15:32:55",
    reg_member_id: 1,
    edit_date: "2023-01-01 15:32:55",
    edit_member_id: 1,
  },
  {
    article_id: 2,
    board_type_code: 1,
    title: "두번째 게시글",
    article_type_code: 1,
    contents: "안녕하세요. 두번째 게시글입니다.",
    view_count: 1,
    ip_address: "2.2.2.2",
    is_display_code: 1,
    reg_date: "2023-03-22 12:12:44",
    reg_member_id: 1,
    edit_date: "2023-03-22 12:12:44",
    edit_member_id: 1,
  },
  {
    article_id: 3,
    board_type_code: 1,
    title: "세번째 게시글",
    article_type_code: 1,
    contents: "안녕하세요. 세번째 게시글입니다.",
    view_count: 1,
    ip_address: "3.3.3.3",
    is_display_code: 1,
    reg_date: "2023-05-15 04:56:05",
    reg_member_id: 1,
    edit_date: "2023-05-15 04:56:05",
    edit_member_id: 1,
  },
  {
    article_id: 4,
    board_type_code: 1,
    title: "네번째 게시글",
    article_type_code: 1,
    contents: "안녕하세요. 네번째 게시글입니다.",
    view_count: 1,
    ip_address: "4.4.4.4",
    is_display_code: 1,
    reg_date: "2023-08-30 18:41:07",
    reg_member_id: 1,
    edit_date: "2023-08-30 18:41:07",
    edit_member_id: 1,
  },
  {
    article_id: 5,
    board_type_code: 1,
    title: "다섯번째 게시글",
    article_type_code: 1,
    contents: "안녕하세요. 다섯번째 게시글입니다.",
    view_count: 1,
    ip_address: "5.5.5.5",
    is_display_code: 1,
    reg_date: "2023-12-12 11:11:11",
    reg_member_id: 1,
    edit_date: "2023-12-12 11:11:11",
    edit_member_id: 1,
  },
];

function getArticles() {
  return articleDB;
}

function getArticleById(id) {
  return articleDB.find((article) => article.id === id);
}

function addArticle(article) {
  article.id = articleDB[articleDB.length - 1].id + 1;
  articleDB.push(article);
  return article;
}

function updateArticle(article) {
  let index = articleDB.findIndex((a) => a.id === article.id);
  articleDB[index] = article;
  return articleDB[index];
}

function deleteArticle(id) {
  let index = articleDB.findIndex((article) => article.id === id);
  articleDB.splice(index, 1);
  return articleDB;
}

module.exports = {
  getArticles,
  getArticleById,
  addArticle,
  updateArticle,
  deleteArticle,
};
