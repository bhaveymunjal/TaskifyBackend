// const { MongoClient, ObjectId } = require("mongodb");

// const url = "mongodb+srv://bhavey_munjal:Bhavey%402689@bhavey-mongo-cluster.tkf4d.mongodb.net/";
// const dbName = "task-manager";

// // async function main() {
// //   const user = db.collection("users");
// //   // the following code examples can be pasted here...
// //   const insertResult = await user.insertMany([
// //     { name: "Bhavey", age: 21 },
// //     { name: "Rahul", age: 24 },
// //     { name: "Rohit", age: 19 },
// //   ]);
// //   console.log("Inserted documents =>", insertResult);

// //   return "done.";
// // }
// // main()
// //   .then(console.log)
// //   .catch(console.error)
// //   .finally(() => client.close());

// // const id = new ObjectId();
// // console.log(id);

// // ID in mongodb stands for - GUID (Globally Unique Identifiers) this help to scale mongodb databases
// // The object id in mongodb consist of a 12 byte address
// // Here is reference for more details - https://www.mongodb.com/docs/manual/reference/method/ObjectId/

// // console.log(id.getTimestamp());

// const client = new MongoClient(url);
// const db = client.db(dbName);

// //  client.connect()
// //   .then(() => {
// //     console.log("Connected successfully to server");
// //     db.collection("users").insertOne(
// //       {
// //         _id: id,
// //         name: "Aniket vrvfb Arora fvrvg",
// //         age: 26,
// //       }).then((result)=>{
// //         console.log(result)
// //         // console.log(result.ops);
// //       }).catch((error)=>{
// //         console.log(error);
// //       })

// //   })
// //   .catch((err) => {
// //     console.error("MongoDB Connection Error:", err);
// //   });

// // client
// //   .connect()
// //   .then(() => {
// //     console.log("Connected successfully to server");
// //     db.collection("users")
// // .findOne({
// //   age: 26
// // })
// // .then((user) => {
// //   console.log(user);
// // })
// // .catch((err) => {
// //   console.log(err);
// // });
// // .find({
// //   age: 21,
// // })
// // .toArray()
// // .then((users) => console.log(users))
// // .catch((err) => console.log(err));
// // })
// // .catch((err) => {
// //   console.error("MongoDB Connection Error:", err);
// // });

// // client
// //   .connect()
// //   .then(() => {
// //     console.log("Connected successfully to server");
// //     db.collection("users")
// //       .updateOne(
// //         {
// //           _id: new ObjectId("65624e964dd27b9b164edd0a"),
// //         },
// //         {
// //           $set: {
// //             name: "Rajan",
// //           },
// //         }
// //       )
// //       .then((user) => {
// //         console.log(user);
// //       })
// //       .catch((err) => {
// //         console.log(err);
// //       });


// //     db.collection("users")
// //       .updateOne(
// //         {
// //           _id: new ObjectId("65624e964dd27b9b164edd0a"),
// //         },
// //         {
// //           $inc: {
// //             age: 1,
// //           },
// //         }
// //       )
// //       .then((user) => {
// //         console.log(user);
// //       })
// //       .catch((err) => {
// //         console.log(err);
// //       });


// //     db.collection("users")
// //       .updateMany(
// //         {
// //           age: 21,
// //         },
// //         {
// //           $inc: {
// //             age: 4,
// //           },
// //         }
// //       )
// //       .then((user) => {
// //         console.log(user);
// //       })
// //       .catch((err) => {
// //         console.log(err);
// //       });
// //   })
// //   .catch((err) => {
// //     console.log(err);
// //   });
// client
//   .connect()
//   .then(() => {
//     // db.collection("users")
//     // .deleteMany({
//     //   age: 25,
//     // })
//     // .then((result) => {
//     //   console.log(result);
//     // })
//     // .catch((err) => {
//     //   console.log(err);
//     // });

    
//     db.collection("users")
//       .deleteOne({
//         _id: new ObjectId("655f61987f88e64167dae7ce"),
//       })
//       .then((result) => {
//         console.log(result);
//       })
//       .catch((err) => {
//         console.log(err);
//       });
//   })
//   .catch((err) => {
//     console.log(err);
//   });
