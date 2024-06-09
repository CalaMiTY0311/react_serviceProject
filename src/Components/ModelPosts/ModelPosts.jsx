// import React, { useEffect } from "react";
// import { useParams } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import ModelCard from "./ModelCards";
// import { Button } from "@material-tailwind/react";
// import {
//   Menu,
//   MenuHandler,
//   MenuList,
//   MenuItem,
// } from "@material-tailwind/react";
// import Error from "../Error/Error";
// import {
//   filterProducts,
//   filterGender,
//   sortByPrice,
//   filterByColor,
//   filterBySize,
// } from "../../features/slices/productsSlice";

// import firebase from "../../config/firebase-config";
// import { modelPosts } from "../../context/modelPostsContext";

// import { Link, useNavigate } from "react-router-dom";
// // import { AuthContext } from "../../config/authProvider";

// const ModelPosts = () => {

//   const navigate = useNavigate();

//   const {state, dispatch} = React.useContext(modelPosts);

//   const getPosts = async() => {
//     let _posts = [];
//     const postArray = await firebase.getPosts().catch(err => {
//       console.log(err);
//       return err;
//     })
//     postArray.forEach(doc => {
//       _posts.push({id:doc.id, data:doc.data});
//     })
//     return dispatch({
//       type:"FETCH_POSTS",
//       payload:_posts
//     })
//   }

//   useEffect(()=>{
//     getPosts();
//   }, [])

//   const products = useSelector((state) => state.products.filteredProducts);
//   const error = useSelector((state) => state.products.error);
//   const { type } = useParams();
//   const genderButtons = ["male", "female"];
//   const colorButtons = [
//     "red",
//     "green",
//     "purple",
//     "yellow",
//     "orange",
//     "blue",
//     "black",
//     "brown",
//   ];
//   const sizeButtons = ["S", "M", "L", "XL"];
//   // const dispatch = useDispatch();

//   return (
//     <div className="">
//       <div className="pt-16">
//         <div className="pl-14">
//           <h1 className="text-gray-600 text-4xl font-inter font-bold tracking-normal leading-none">
//             Models
//           </h1>
//           <div className="flex items-center justify-between py-8 ">
//             <div className="flex items-center">
//               {genderButtons.map((item, index) => {
//                 return (
//                   <div key={index}>
//                     <Button
//                       color="gray"
//                       size="lg"
//                       variant="outlined"
//                       ripple={true}
//                       className="text-black hover:bg-gray-300 duration-300 ease-in-out mr-4"
//                       onClick={() => dispatch(filterGender(item))}
//                     >
//                       {item}
//                     </Button>
//                   </div>
//                 );
//               })}
//               <Menu>
//                 <MenuHandler>
//                   <Button
//                     color="gray"
//                     size="lg"
//                     variant="outlined"
//                     ripple={true}
//                     className="text-black hover:bg-gray-300 duration-300 ease-in-out mr-4"
//                   >
//                     Select a color
//                   </Button>
//                 </MenuHandler>
//                 <MenuList>
//                   {colorButtons.map((item, index) => {
//                     return (
//                       <MenuItem
//                         style={{ color: item }}
//                         key={index}
//                         onClick={() => dispatch(filterByColor(item))}
//                       >
//                         {item}
//                       </MenuItem>
//                     );
//                   })}
//                 </MenuList>
//               </Menu>
//               <Button
//                 color="gray"
//                 size="lg"
//                 variant="outlined"
//                 ripple={true}
//                 className="text-black hover:bg-gray-300 duration-300 ease-in-out mr-4"
//                 onClick={() => dispatch(sortByPrice())}
//               >
//                 High Price
//               </Button>
//             </div>
//             <div className="pr-14">
//               <Button
//                               color="gray"
//                               size="lg"
//                               variant="outlined"
//                               ripple={true}
//                               className="text-black hover:bg-gray-300 duration-300 ease-in-out mr-4"
//               >
//                 <Link to="/post">Post</Link>
//               </Button>
//               <Button
//                 color="gray"
//                 size="lg"
//                 variant="outlined"
//                 ripple={true}
//                 className="text-black hover:bg-gray-300 duration-300 ease-in-out mr-4"
//                 onClick={() => dispatch(filterProducts(type))}
//               >
//                 Clear Filter
//               </Button>
//             </div>
//           </div>
//         </div>
//           <div className="grid grid-cols-4 justify-items-center py-8 gap-12 ">
//                     {/* <PostsCard
//                       // id={product.id}
//                       // name={product.name}
//                       // text={product.text}
//                       // img={product.img}
//                       // price={product.price}
//                       // colors={product.color}
//                     ></PostsCard> */}
//                   </div>
//           </div>
        
//       </div>
//   );
// };

// export default ModelPosts;
