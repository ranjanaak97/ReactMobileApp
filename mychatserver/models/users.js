const Users = require("../schemas/users");
let registeruser = async (request) => {
  const query = {name: request.name,phone: request.phone,email: request.email, password: request.password }
  const addquery = new Users(query);
  const userinfo = await addquery.save();
  return userinfo;
}
let loginuser = async (request) => {
  const query = {email: request.email, password: request.password }
  const userinfo =  await Users.find(query);
  return userinfo;
}
let userList = async() => {
	const userinfo = await Users.find()
	return userinfo;
}
module.exports = {
    registeruser,
    loginuser,
    userList
};