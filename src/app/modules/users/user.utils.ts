// import { TUser } from './user.interface';
// import { User } from './user.model';

// //Generate User ID
// const findLastUserId = async () => {
//   const lastUserId = await User.findOne(
//     {
//       role: 'user',
//     },
//     {
//       id: 1,
//       _id: 0,
//     },
//   )
//     .sort({
//       createdAt: -1,
//     })
//     .lean();

//     return lastUserId?.id ? lastUserId.id : undefined;
// };

// //id will generate by following: year & four digit number

// export const generateUserId = async () => {
//     let currentId = (0).toString();

//     const lastUserId = await findLastUserId();

//     if(lastUserId){
//         currentId = lastUserId.substring(2);
//     }

//     let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

//     incrementId = `U-${incrementId}`;

//     return incrementId;
// }

// //Generate Admin ID

// export const findLastAdminId = async() => {
//     const lastAdmin = await User.findOne(
//         {
//             role: 'admin'
//         },
//         {
//             id: 1,
//             _id: 0,
//         }
//     );

//     return lastAdmin?.id ? lastAdmin.id.substring(2) : undefined;
// }

// export const generateAdminid = async () => {
//     let currentId = (0).toString();
//     const lastAdminId = await findLastAdminId();

//     if(lastAdminId){
//         currentId = lastAdminId.substring(2);
//     }

//     let incrementId = (Number(currentId) + 1).toString().padStart(4, '0');

//     incrementId = `A-${incrementId}`;

//     return incrementId;
// }


