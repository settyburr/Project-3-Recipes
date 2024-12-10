// import { useQuery } from '@apollo/client';
// import { GET_USER_PROFILE } from '../utils/queries'; 
// import { Navigate, useParams } from 'react-router-dom';
// import Auth from '../utils/auth'; 
// import { useEffect } from 'react';
 
// const Random = () => {
//     const { username } = useParams(); 
//     const { loading, error, data } = useQuery(GET_USER_PROFILE, {
//       variables: { username }, // 
//     });
  
//     useEffect(() => {
//       if (!Auth.loggedIn()) {
//         window.location.replace('/login');
//       }
//     }, []);
  
//     if (loading) return <p>Loading...</p>;
//     if (error) return <p>Error: {error.message}</p>; 
  
//     const { user } = data; 
  
//     return (
//       <div className="profile-container">
//         <h1>{user.username}'s Profile</h1>
//         <div className="profile-details">
//           <p><strong>Username:</strong> {user.username}</p>
//           <p><strong>Email:</strong> {user.email}</p>
//           <p><strong>Joined on:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
//           {user.profilePhoto && (
//             <img src={user.profilePhoto} alt="Profile" />
//           )}
//         </div>
//       </div>
//     );
//   };
  
//   export default Random;



