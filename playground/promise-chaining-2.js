require("../src/db/mongoose");
const Task = require("../src/models/task");

// Task.findByIdAndDelete("65627025b0cc64135db333e8")
//   .then((task) => {
//     if(!task)
//         console.log('Task not present already')
//     else
//         console.log("Deleted");
//     return Task.countDocuments({
//       isCompleted: false,
//     });
//   })
//   .then((result) => console.log(result))
//   .catch((err) => console.log(err));

const deleteTaskAndCount = async (id, state) => {
  const task = await Task.findByIdAndDelete(id);
  if (!task) console.log("Task not present already");
  else console.log("Deleted");
  const count = await Task.countDocuments({ isCompleted: state });
  return count;
};
const ans = deleteTaskAndCount("65646f63d6612843999e3f63", false)
  .then((ans) => console.log(ans))
  .catch((err) => console.log(err));
