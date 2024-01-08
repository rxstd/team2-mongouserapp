const adminAuth = (req, res, next) => {
  if (!req.originalUrl.includes("/api/")) {
    if (req.session != undefined) {
      if (!req.session.member_id) {
        return res.redirect("/login");
      }
    } else {
      return res.redirect("/login");
    }
  }
  next();
};

module.exports = adminAuth;
