# ldapauthentication

### Installing node and npm
1. sudo apt update
2. sudo apt install nodejs npm

### Installing sample reactjs app
1. npx create-react-app my-app

### Running reactjs in DEV mode
1. cd ./frontend
2. npm install
3. npm start
4. Application runs in http://localhost:3000

### Installing extension
- Babel ES6/ES7
- Bracket Pair Colorization Toggler
- ES7 React/Redux/GraphQL/React-Native snippets
- JavaScript (ES6) code snippets
- Node.js Modules Intellisense
- Path Intellisense
- Prettier - Code formatter
- Microsoft Edge Tools for VS Code
- Docker


### Running project using fabric8
- mvn docker:build
  This will create a docker image. Before we trigger the command, the build artifacts should have been
  generated in target directory. The fabric8 plugin will copy the build artifact (jar/war) into maven
  directory in target/docker.
- mvn clean package docker:build
  This will generate the build artifacts and create a docker image.
- mvn docker:run
  This will run the docker image by fabric8 plugin in the foreground.
- mvn docker:start
  This will run the docker image by fabric8 plugin in the background.
- mvn docker:stop
  This will stop the docker contains running in foreground

Please refer below link for setup

1. Setup [`Live Reload`](https://github.com/sumitmaji/spring-documentation/tree/main/intellij#enabling-live-reload-for-spring)
2. Setup [`fabric8`](https://github.com/sumitmaji/spring-documentation/tree/main/fabric8#fabric8)
3. Setup [`Spring boot`](https://github.com/sumitmaji/spring-documentation/tree/main/intellij#enabling-live-reload-using-docker-for-spring)


### Build dev build for reactjs
1. Select profile `react-dev-image`
2. Build docker image `mvn clean docker:build`
3. Run the docker image `mvn docker:start`

### Build dev build for spring
1. Select profile `devtool` and `spring-image`
2. Build docker image `mvn clean package docker:build`
3. Run the docker image `mnv docker:start`

### Running both reactjs and springboot
1. Build react dev image and spring dev image
2. Select profile `spring-react-dev-run`
3. Run the project `mvn docker:start`

Simple ReactJs Project


### Login
1. https://github.com/in28minutes/full-stack-with-react-and-spring-boot/blob/master/frontend/todo-app/src/components/todo/AuthenticationService.js
2. https://www.digitalocean.com/community/tutorials/how-to-add-login-authentication-to-react-applications
3. https://www.cluemediator.com/login-app-create-login-form-in-reactjs-using-secure-rest-api#:~:text=%20Way%20to%20create%20login%20form%20in%20ReactJS,the%20react%20application.%20Follow%20the%20below...%20More%20
4. https://github.com/StephenGrider/AdvancedReduxCode/tree/master/auth
5. https://github.com/academind/react-complete-guide-code/tree/22-authentication
6. https://www.digitalocean.com/community/tutorials/how-to-validate-a-login-form-with-react-and-formik




Ldap Authentication Service
