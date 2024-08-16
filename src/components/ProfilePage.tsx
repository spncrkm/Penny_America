// import { useAuth0 } from "@auth0/auth0-react";
// import NavBar from "./navbar/NavBar.";

// const ProfilePage = () => {
//   const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
//   if (!user) {
//     return <div>No user profile found</div>;
//   }

//   if (!isAuthenticated) {
//     return <div>User not authenticated</div>;
//   }

//   getAccessTokenSilently().then((token) => console.log(token));

//   return (
//     <div>
//       <NavBar />
//       <img src={user?.picture} alt={user?.nickname} />
//       <h2>{user?.nickname}</h2>
//       <p>{user?.email}</p>
//     </div>
//   );
// };

// export default ProfilePage;
