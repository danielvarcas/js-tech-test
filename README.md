# Sky Betting & Gaming Tech Test

## Technology choices

### React

I decided to use React for a few reasons. Firstly, to demonstrate skill with modern frontend technology. Secondly, as an opportunity to brush up on my React skills, as I primarily work on Vue.js projects in my current job.

On a more general level, React is useful for developing applications which are likely to scale up in complexity. Using React, I was able to start with one basic component, then refactor this to create some smaller, reusable components. Using React's concept of 'state', I was able to maintain control over my application in a single place, which helped reduce complexity from a development point-of-view.

### create-react-app

I bootstrapped my project using 'create-react-app'. This took care of most of the initial project setup and allowed me to get started quickly.

### Bootstrap 4

I decided to use Bootstrap as my styling framework. I chose Bootstrap because it provides quick access to reusable and standardised style classes. This allowed me to focus more on building functionality and quickly add and change styles freely.

I also used Bootstrap 4's built-in SASS variable override utilties to create a basic theme by setting the Primary and Secondary theme colours.

### Bootstrap React

I used Bootstrap React's component library alongside Bootstrap. React Bootstrap is helpful in ensuring that Bootstrap-themed elements have all of their required style rules by default and that they work optimally with React. It also makes code easier to read, which helps speed up the development process.

### ESLint & Prettier

One of the first things I did was install ESLint and Prettier. I used ESLint to ensure code-quality and Prettier for code formatting. During the ESLint setup process, I opted for the 'airbnb' style guide and to enforce coding style.

### Husky

I used Husky to run my linting task pre-commit and prevent me from committing code containing linting errors.

### Netlify

I used Netlify to host the frontend of my app. Netlify provides an easy way to deploy projects and setup continuous deployment.

## Instructions

The project can be accessed by running it locally or by visiting the deployed site. Please note that the API still needs to be run locally when using the deployed site.

### Local:

From the root directory, run the Docker API:

```
$ docker-compose up
```

Install dependencies from the 'app' project directory:

```
$ cd app
$ npm install
```

Run the app:

```
$ npm start
```

### Hosted:

From the root directory, run the Docker API:

```
$ docker-compose up
```

With the API running locally, visit the following URL to access the deployed app:

- https://loving-goodall-9b8c87.netlify.com/
