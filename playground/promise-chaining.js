require("../src/db/mongoose");
const User = require("../src/models/user");

// 65626befbde37944fe7ec497

// User.findByIdAndUpdate("65626ce6e80b8c007d3718cb", {
//   age: 5,
// })
//   .then((user) => {
//     console.log(user);
//     return User.countDocuments({ age: 5 });
//   })
//   .then((result) => console.log(result))
//   .catch((err) => console.log(err));

const updateAgeAndCount = async (id, age) =>{
  const user = await User.findByIdAndUpdate(id, {age})
  console.log(user)
  const result = await User.countDocuments({age})
  console.log(result);
}
updateAgeAndCount('65626ce6e80b8c007d3718cb', 30);
