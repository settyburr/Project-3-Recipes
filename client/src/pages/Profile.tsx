import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import '../styling/profile.css';
import { QUERY_ME } from '../utils/queries';
const Profile = () => {
  const { loading, data } = useQuery(QUERY_ME);
  const user = data?.me || data?.user || {};
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!user?.me) {
    return (
      <div className="profile-page-border">
        <div className="profile-page">
          <h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              {user.username}
            </div>
            <img src="/images/verified.jpg" className="verified-badge" />
          </h1>
          <p><strong>Email:</strong> {user.email || 'Email not provided'}</p>
          <img src="/images/rat2.jpg" className="profile-image" />
          <div className="button-container">
            <button className="button">Follow</button>
            <button className="button">Message</button>
          </div>
          <div className="followers-container">
            <p>500 Following</p>
            <p>10k Followers</p>
          </div>
          <div className="cooking-philosophy">
          Anyone can cook!
          Cooking and discovering new recipes bring me a sense of joy and fulfillment. There's something incredibly satisfying about experimenting with ingredients, trying new flavors, and creating a dish from scratch. Each recipe is an opportunity to learn and express creativity in the kitchen. The process of preparing a meal, whether simple or complex, allows me to unwind, focus, and connect with my senses. Ultimately, the happiness comes not just from the delicious results, but from the experience of cooking and sharing it with others.
          </div>
          <div className="favorite-recipes">
            <h2>Favorite Recipes</h2>
            <ul>
              <li><Link to="/recipes/634486">BBQ Beef Brisket 🍴</Link></li>
              <li><Link to="/recipes/716330">Chicken and Mango Skewer 🍴</Link></li>
              <li><Link to="/recipes/665041">Watermelon, Feta and Mint Salad 🍴</Link></li>
              <li><Link to="/recipes/651341">Meatball Sliders 🍴</Link></li>
              <li><Link to="/recipes/640634">Creamy Curry Chicken With Yellow Rice 🍴</Link></li>
              <li><Link to="/recipes/642719">Fettuccine With Bacon Mushroom and Peas 🍴</Link></li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
  return null; // In case there's no valid user data
};
export default Profile;