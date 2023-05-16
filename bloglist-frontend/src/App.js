import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogs";
import loginService from "./services/login";
import Notifications from './components/Notifications'

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [message, setMessage] = useState(null);
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: '',
    likes: 0
  })

  function loginHandle(event) {
    const { name, value } = event.target;
    setLoginForm((prevValue) => {
      return {
        ...prevValue,
        [name]: value,
      };
    });
  }

  async function submitHandle(event) {
    event.preventDefault();
    const { username, password } = loginForm;

    try {
      const user = await loginService.login({ username, password });

      window.localStorage.setItem('loggedUser', JSON.stringify(user))

      setUser(user);

      setLoginForm((prevValue) => {
        return {
          ...prevValue,
          username: "",
          password: "",
        };
      });
    } catch (error) {
      setMessage(error.response.data.error);

      setTimeout(() => {
        setMessage(null);
      }, 5000);
    }
  }

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs));
  }, []);

  useEffect(() => {
    const loggedUser = window.localStorage.getItem('loggedUser');
    if(loggedUser){
      const jsonLoggedUser = JSON.parse(loggedUser)
      setUser(jsonLoggedUser);
      blogService.setToken(jsonLoggedUser.token)
    }
  }, [])


  function Form() {
    return (
      <div>
        <h2>Log in to application</h2>
        <form onSubmit={submitHandle}>
          <label htmlFor="username">
            <input
              name="username"
              type="text"
              placeholder="Username"
              id="username"
              onChange={loginHandle}
              value={loginForm.username}
            />
          </label>
          <label htmlFor="password">
            <input
              name="password"
              type="password"
              placeholder="Password"
              id="password"
              onChange={loginHandle}
              value={loginForm.password}
            />
          </label>
          <button type="submit">Log In</button>
        </form>
      </div>
    );
  }

  function logoutHandle () {
    setUser(null)
    window.localStorage.clear();
  }

  async function createBlog (event) {
    event.preventDefault()
    try {
      const createdBlog = await blogService.create(newBlog)
      blogs.push(createdBlog)
      setNewBlog(prevValue => {
        return {
          ...prevValue,
          title: '',
          author: '',
          url: '',
        }
      })
      setMessage(`A new blog ${createdBlog.title} added`)
      setTimeout(() => {
        setMessage(null)
      },5000)
    }catch (error) {
      setMessage(error.response.data.error)
      setTimeout(() => {
        setMessage(null)
      },5000)
    }
  }

  function allBlogs() {

    function newBlogForm ({target}) {
      const {name, value} = target;
      setNewBlog(prevValue => {
        return {
          ...prevValue,
          [name]: value
        }
      })
    }

    return (
      <div>
        <h2>Blogs</h2>
        <p>
          <strong>{user.name} </strong> 
          logged in
          <button onClick={logoutHandle} >
            logout
          </button>
        </p>
        <div>
          <form className="create-blog">
            <label htmlFor="title">
              Title:

            </label>
            <input type="text" id="title" onChange={newBlogForm} value={newBlog.title} name="title" />
            <label htmlFor="author">
              Author:

            </label>
            <input type="text" id="author" onChange={newBlogForm} value={newBlog.author} name="author" />
            <label htmlFor="url">
              Url:

            </label>
            <input type="text" id="url" onChange={newBlogForm} value={newBlog.url} name="url" />

            <button onClick={createBlog}>Create</button>
          </form>
        </div>
        {blogs.map((blog) => {
          return <Blog key={blog.id} blog={blog} />;
        })}

      </div>
    );
  }


  return (
    <div>
      <Notifications
       message={message}
       />
      {user !== null ? allBlogs() : Form()}
    </div>
  );
};

export default App;
