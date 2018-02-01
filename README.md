# Redesigned [i2b2](https://www.i2b2.org/) Web Client
This project attempts to redesign the i2b2 Web Client for a simplified search and query experience. Built using modern web technologies such as React, Redux, React-Router. User interface elements are from [Material-UI](https://github.com/mui-org/material-ui). Most basic feature of the [original i2b2 Web Client](https://www.i2b2.org/webclient/) such as concept search, patient demographics, patient result set, group querying are redesigned with improved data accessbility and reduced interface complexity.

## Preconditions
NPM (Node Package Manager) needs to be installed.

The [i2b2-backend](https://github.com/saichintha/i2b2-backend) needs to be successfully set up.

## Usage
With the PostgreSQL and `i2b2-backend` running, run the following command in the terminal
```
npm start
```

Corresponding output should look like this
```
Starting development server...

Compiled with warnings.
```

Then visit http://localhost:3000/ to view the application.

## Blurry GIF Demo
![alt-text](https://github.com/saichintha/i2b2-client-react/blob/master/src/common/images/demo.gif)

## Screenshots
### Home
![alt-text](https://github.com/saichintha/i2b2-client-react/blob/master/src/common/images/home.png)

### Sample Search (keyword: bio)
![alt-text](https://github.com/saichintha/i2b2-client-react/blob/master/src/common/images/search.png)
