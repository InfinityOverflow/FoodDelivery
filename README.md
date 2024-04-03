# FoodDelivery
the app is divided into two main parts frontend and backend. the app acheives basic food ordering functionality 

## Tech Stack
ReactJs, Typescript, NodeJs, MongoDB

## 3rd Party Libraries Used
<li> shadcn-ui,lucide-react,Zod-Framework: For UI libraries</li>
<li> Stripe:- Payment Gateway</li>
<li> Auth0:- for authentication</li>
<li> MongoDB:- for Database</li>

## Steps To Run the Project Locally
<li>clone the repository.</li>
<li>open terminal and install node modules for backend and frontend respectively using npm install</li>
<li>create .env files for backend and frontend respectively</li>
<li>create a mongoDB connection string and store it in your backend env file,also make sure to add your IP in whiteList.</li>
<li>create an Auth0 account as well and store Issuer base URL and Auth0 audience.</li>
<li>store Stripe API key, frontend URL (where frontend is running) and stripe web hoock secret (See Stripe CLI installation guide for this )</li>
<li>frontend env requires base URL for API request and Auth0 variables like DOMAIN, CLIENT-ID , CALLBACK-URL(same as frontend base URL).</li>


<br/>
to run frontend:- 
<li>cd frontend/</li>
<li>npm run dev </li>
<br/>
to run backend:-
<li>cd backend/  </li>
<li> npm run start</li>
<br/>
to run stripe CLI:-
<li>cd backend/  </li>
<li>npm run stripe </li>

<br/>

 **<b>Ensure Stripe CLI is running and the webhook secret is updated in the backend .env file as displayed in the terminal for successful payment processing </b> **

## Planned things to do
### Good to have Functionality
<li> Ability to Order from multiple restaurants</li>
<li> Better implement Cart page </li>
<li> Add Badge Icon to show current items in the cart</li>
<li> Method to Rate the Restaurant and Show the Ratings</li>
<li> Upgrade React-Query to Tanstack-Query</li>

### For Code Quality and GitWorkFlow
<li>Write Unit Test Cases for the components.</li>
<li>Implement SonarQube Coverage Tool for better insights into code Quality</li>
<li>Better implement backend logic for more edge cases and rigorous testing</li>
<li>Better and more insightful user prompts</li>
<li>Integrate Git Workflow for CI/CD.</li>


