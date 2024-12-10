import { Navigate, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
// import {dog} from '../assets/dog.jpg'

import { QUERY_USER, QUERY_ME } from '../utils/queries';

import Auth from '../utils/auth';

const Profile = () => {
  const { username: userParam } = useParams();

  const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
    variables: { username: userParam },
  });

  const user = data?.me || data?.user || {};
  console.log(user)
  // This if condition checks if the user is logged in and if the logged-in user's username matches the userParam.
  if (Auth.loggedIn() && Auth.getProfile()?.data?.username === userParam) {
    // If the condition is true, it navigates to the "/me" route, which is likely the user's profile page.
    return <Navigate replace to="/me" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  // console.log("useParams output:", useParams());
  // console.log("Query Data", data); //testing if the queries returns a user
  // console.log("Is user logged in?", Auth.loggedIn()); // testing if user logged in is true or false
  // console.log("User profile:", Auth.getProfile());
  // console.log("User parameter:", userParam);
  // console.log("Auth profile data:", Auth.getProfile()); //checking if auth.getProfile is failing

  const button = {
    backgroundColor: 'black',
    color: 'white',
    borderRadius: '25px',
    padding: '10px 20px',
    border: 'none',
    cursor: 'pointer',
    fontSize: '16px',
    margin: '5px'
  }
  const buttonContainer = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  };
  // const pStyle = {
  //   marginRight: '20px', 
  // }
  const followersContainer = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: '20px',
    gap: '20px'
  };
  const recipe = {
    textAlign: 'center',
    marginTop: '200px'
  }
const cook = {
  fontSize: '15px',
  color: 'rgba(0, 0, 0, 0.5)'
}
const food ={
listStyleType: 'none',
  fontSize: '30px',
  textAlign: 'center',
  marginTop: '50px'
}
  if (!user?.username) {
    return (
      <div>
        <h1>
          Hello {user.username}
        </h1>
        <p><strong>Email:</strong> {user.email || 'Email not provided'}</p>
        <img src="/assets/dog.jpg" />
        <div style={buttonContainer}>
          <button style={button}>Follow</button>
          <button style={button}>Message</button>
        </div>

        <div style={followersContainer}>
          <p>500 Following</p>
          <p>10k Followers</p>
        </div>
        <h1 style = {cook}>Anyone can cook! 
        Cooking and discovering new recipes bring me a sense of joy and fulfillment. There's something incredibly satisfying about experimenting with ingredients, trying new flavors, and creating a dish from scratch. Each recipe is an opportunity to learn and express creativity in the kitchen. The process of preparing a meal, whether simple or complex, allows me to unwind, focus, and connect with my senses. Ultimately, the happiness comes not just from the delicious results, but from the experience of cooking and sharing it with others.</h1>

        <h2 style= {recipe} >You can check out some of our favorite recipes here!</h2>
      
        <li style = {food}>Cajun Pasta</li>
        <li style = {food}>Spaghetti Carbonara</li>
        <li style = {food}>Pizza Margherita</li>
        <li style = {food}>Pad Thai</li>
        <li style = {food}>Gumbo</li>
        <li style = {food}>Garfield Lasagna</li>
       
      </div>



    );
  }

  return (
    <div>
      <h1>this works</h1>
    </div>
  );
};

export default Profile;
