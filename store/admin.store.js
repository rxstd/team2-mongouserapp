let adminDB = [
  {
    admin_member_id: 1,
    company_code: 1,
    admin_id: "admin1",
    admin_password: "1234",
    admin_name: "관리자1",
    email: "admin1@gmail.com",
    telephone: "010-1234-5678",
    dept_name: "개발팀",
    used_yn_code: "N",
    reg_user_id: 1,
    edit_user_id: 1,
    edit_date: "2021-08-15 12:00:00",
    reg_date: "2021-08-15 12:00:00",
  },
  {
    admin_member_id: 2,
    company_code: 1,
    admin_id: "admin2",
    admin_password: "1234",
    admin_name: "관리자2",
    email: "admin2@gmail.com",
    telephone: "010-2323-4422",
    dept_name: "영업팀",
    used_yn_code: "Y",
    reg_user_id: 1,
    edit_user_id: 1,
    edit_date: "2021-08-15 12:00:00",
    reg_date: "2021-08-15 12:00:00",
  },
];

function getAdmins() {
  return adminDB;
}

function getAdminById(id) {
  let admin = adminDB.find((admin) => admin.admin_id === id);

  return admin;
}

function getAdminByUsername(username) {
  return adminDB.find((admin) => admin.username === username);
}

function updateAdmin(admin) {
  let index = adminDB.findIndex((a) => a.id === admin.id);
  adminDB[index] = admin;
  return adminDB[index];
}

function authAdmin(username, password) {
  let admin = false;

  adminDB.forEach((a) => {
    if (a.admin_id === username && a.admin_password === password) {
      admin = a;
    }
  });

  return admin;
}

module.exports = {
  adminDB,
  getAdmins,
  getAdminById,
  getAdminByUsername,
  updateAdmin,
  authAdmin,
};
