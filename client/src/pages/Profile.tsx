import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';



import {  QUERY_ME } from '../utils/queries';

// import Auth from '../utils/auth';

const Profile = () => {
  // const { username: userParam } = useParams();

  // const { loading, data } = useQuery(userParam ? QUERY_USER : QUERY_ME, {
  //   variables: { username: userParam },
  // });

  const { loading, data } = useQuery(QUERY_ME);

  const user = data?.me || data?.user || {};
  
  // This if condition checks if the user is logged in and if the logged-in user's username matches the userParam.

  // if (Auth.loggedIn() && Auth.getProfile()?.data?.username === userParam) {
  //   // If the condition is true, it navigates to the "/me" route, which is likely the user's profile page.
  //   return <Navigate replace to="/me" />;
  // }

  //if (Auth.loggedIn() && Auth.getProfile().data.username === userParam) {
    // If the condition is true, it navigates to the "/me" route, which is likely the user's profile page.
   // return <Navigate to="/me" />;
  //}


  if (loading) {
    return <div>Loading...</div>;
  }

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
  const followersContainer = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    marginTop: '20px',
    gap: '20px'
  };
  const recipe = {
    textAlign: 'center' as "center",
    marginTop: '100px'
  }
  const cook = {
    fontSize: '15px',
    color: 'rgba(0, 0, 0, 0.5)'
  }
  const food = {
    listStyleType: 'none',
    fontSize: '30px',
    textAlign: 'center' as "center",
    marginTop: '50px'
  }
  const imageStyle = {
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    border: '3px solid #000',
    marginBottom: '50px',
    margintop: '20px'
  }
  const imageWrapperStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  }
  const verified = {
    width: '50px',
    height: '50px',
  };

  if (!user?.me) {
    return (
      <div>
        <h1>
          <div style={imageWrapperStyle}>
            {user.username}
          </div>
          <img src="/images/verified.jpg" style={verified} />

        </h1>
        <p><strong>Email:</strong> {user.email || 'Email not provided'}</p>

        <img src="/images/rat2.jpg" style={imageStyle} />


        <div style={buttonContainer}>
          <button style={button}>Follow</button>
          <button style={button}>Message</button>
        </div>

        <div style={followersContainer}>
          <p>500 Following</p>
          <p>10k Followers</p>
        </div>
        <h1 style={cook}>Anyone can cook!
          Cooking and discovering new recipes bring me a sense of joy and fulfillment. There's something incredibly satisfying about experimenting with ingredients, trying new flavors, and creating a dish from scratch. Each recipe is an opportunity to learn and express creativity in the kitchen. The process of preparing a meal, whether simple or complex, allows me to unwind, focus, and connect with my senses. Ultimately, the happiness comes not just from the delicious results, but from the experience of cooking and sharing it with others.</h1>

        <h2 style={recipe} >You can check out some of our favorite recipes here!</h2>

        <ul>
          <li style={food}>
            <Link to="/">Cajun Pasta 🍴</Link>
          </li>
          <li style={food}>
            <Link to="/">Spaghetti Carbonara 🍴</Link>
          </li>
          <li style={food}>
            <Link to ="/" >Pizza Margherita 🍴</Link>
            </li>
          <li style={food}>
           <Link to = "/"> Pad Thai 🍴</Link>
            </li>
          <li style={food}>
            <Link to ="/">Gumbo 🍴</Link>
            </li>
          <li style={food}>
            <Link to = "/">Garfield Lasagna 🍴</Link>
            </li>
        </ul>
      </div>

    );
  }

};

export default Profile;
