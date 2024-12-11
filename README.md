# Recipe Rack

Recipe Rack is an interactive and user-focused MERN stack application that provides a seamless platform for discovering, saving, and managing recipes. This collaborative project leverages modern web development technologies to deliver a polished, responsive, and secure experience for users. The application demonstrates real-world problem-solving, scalability, and agile development practices.

## Table of Contents
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Deployed Application](#deployed-application)
- [Future Development](#future-development)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)
- [Acknowledgments](#acknowledgments)

---

## Features
- **Discover Recipes**: The homepage displays six random recipes fetched from the Spoonacular API, which refresh upon reloading the page.
- **Recipe Details**: Clicking on a recipe provides detailed information, including ingredients and step-by-step instructions.
- **User Authentication**: Secure user registration and login using JWT-based authentication.
- **Saved Recipes**: Authenticated users can save their favorite recipes, as well as edit or delete them from their personal recipe list.
- **Responsive Design**: Optimized for desktop and mobile devices.
- **Polished UI**: A clean and intuitive user interface designed for ease of use.

---

## Technologies Used
- **Front End**: React.js
- **Back End**: Node.js, Express.js
- **Database**: MongoDB with Mongoose ODM
- **API**: GraphQL (queries and mutations for CRUD operations)
- **Authentication**: JSON Web Tokens (JWT)
- **Deployment**: Render
- **Third-Party API**: Spoonacular API
- **Project Management**: GitHub Actions, Git branching workflow

---

## Installation
1. Clone the repository:
   ```bash
   git clone https://github.com/settyburr/Project-3-Recipes
   ```
2. Install dependencies for both client and server:
   ```bash
   npm install
   cd client && npm install
   ```
3. Set up environment variables:
   - Create a `.env` file in the root and the client directory.
   - Add the required variables for database connection and API keys.

4. Start the development server:
   ```bash
   npm run develop
   ```
   This will concurrently run the front-end and back-end servers.

---

## Usage
1. Visit the homepage to discover random recipes.
2. Register for an account or log in to access personalized features.
3. View recipe details by clicking on a recipe card.
4. Save your favorite recipes and manage them through your profile.

---

## Screenshots
### Homepage
![Homepage displaying random recipes](path/to/screenshot-homepage.png)

### Recipe Details
![Recipe details page](path/to/screenshot-recipe-details.png)

### Saved Recipes
![Saved recipes management page](path/to/screenshot-saved-recipes.png)

---

## Deployed Application
The live application can be accessed [here](https://project-3-recipes.onrender.com).

---

## Future Development
We aim to enhance Recipe Rack with the following features:
- **Recipe Ratings**: Allow users to rate recipes on a 5-star system to provide feedback and help others choose the best recipes.
- **Comment Section**: Implement a comment section on recipe cards so users can discuss recipes and share adjustments tailored to their tastes.

---

## Contributing
We welcome contributions to enhance Recipe Rack! To contribute:
1. Fork the repository.
2. Create a feature branch:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add your feature description"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/your-feature-name
   ```
5. Submit a pull request for review.

---

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

---

## Contact
- Brandon Lanes - brandonlanes@gmail.com - Github username: BrandonLanes
- Seth Burrow - sethburrow01@gmail.com - Github username: settyburr
- Owen Gayle - owengayle19@gmail.com
- Joshua Woods - 

[Github Repository](https://github.com/settyburr/Project-3-Recipes)

---

## Acknowledgments
- The wonderful TA's and Dan Mueller for all their assistance.
- Bootcamp Tutors (Alistair, Andres)
- AI - Xpert Learning Assistant, AskBCS Learning Assistant, ChatGPT
