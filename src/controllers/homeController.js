const connection = require("../config/database");
const { getAllUsers,getUserById,updateUserById,createUser,deleteUserById } = require("../services/CRUDService");

const getHomePage = async (req, res) => {
  let results = await getAllUsers();
  return res.render("home.ejs", { listUsers: results });
};

const getABC = (req, res) => {
  res.send("<h1>Check abc<h1>");
};

const getSample = (req, res) => {
  res.render("sample.ejs");
};

const postCreateUser = async (req, res) => {
  let email = req.body.email;
  let name = req.body.myName;
  let city = req.body.city;
  // connection.query(
  //   `INSERT INTO
  //   Users (email, name, city) VALUES (?, ?, ?)`,
  //   [email, name, city],
  //   function(err, results) {
  //     res.send('Created user succeed!');
  //   }
  // );
  await createUser(email, name, city);
  //res.send("Created user succeed!");
  res.redirect('/');
};

const getCreatePage = (req, res) => {
  res.render("create.ejs");
};

const getUpdatePage = async (req, res) => {
  const userId = req.params.id;
  let user = await getUserById(userId);
  res.render("edit.ejs", { userEdit: user }); // x <- y
};

const postUpdateUser = async (req, res) => {
  let email = req.body.email;
  let name = req.body.myName;
  let city = req.body.city;
  let userId = req.body.userId;
  await updateUserById(email, name, city, userId);
  //res.send("Updated user successfully!");
  res.redirect('/');
};

const postDeleteUser = async (req,res) => {
  const userId = req.params.id;
  let user = await getUserById(userId);
  res.render('delete.ejs', { userEdit: user });
}

const postHandleRemoveUser = async (req, res) => {
    const id = req.body.userId;
    await deleteUserById(id);
  
    res.redirect('/');
}

module.exports = {
  getHomePage,
  getABC,
  getSample,
  postCreateUser,
  getCreatePage,
  getUpdatePage,
  postUpdateUser,
  postDeleteUser,
  postHandleRemoveUser
};
