# API REST Blog List

  # Access
  #### GET /api/blogs
  All the blogs in the DB;
  #
  #### GET /api/blogs/id
  Info about one specific Blog;
  #
  #### GET /api/users
  All users information;
  #
  #### GET /api/users/userid
  All info about a specific user and all his blogs;
  
  # Login
  
  ##### I made the user/login system using Bcrypt and JWT
  
  #### /api/users   
  For creating a new user, make a post request in JSON format to /api/users
  ##### Ex: {username: 'test123', password: '123456'}
  #
  #### /api/login 
  After creating a new user, make a post to /api/login request to log in;
 
  ### Note
  All the data are in json format, if you are using google chrome install JSONVue extension to have a better experience or just use Firefox.
 
  ## Working on the front-end...
 
  Any idea or suggestion, send an email to geffersonteodorodesouza@gmail.com
