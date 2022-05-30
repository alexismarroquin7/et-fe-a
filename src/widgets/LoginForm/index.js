import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Form } from "../../components";
import { login } from "../../store";

const initialValues = {
  login: '',
  password: ''
}

export const LoginForm = (props) => {
  const [values, setValues] = useState(initialValues);
  const auth = useSelector(s => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = e => {
    setValues({...values, [e.target.name]: e.target.value});
  }

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(login({credentials: values}));
  }

  useEffect(() => {
    if(!auth.loggedIn) return;

    navigate(`/transactions`);
  }, [auth.loggedIn, navigate]);

  return <Form
    border="1px solid black"
    padding="1rem"
    ff="col"
    ai="center"
    gap="1rem"
    onSubmit={handleSubmit}
  >

    <h3>Login</h3>
  
    <input
      placeholder="Email or UserID"
      name="login"
      value={values.login}
      onChange={handleChange}
    />
  
    <input
      placeholder="Password"
      type={"password"}
      name="password"
      value={values.password}
      onChange={handleChange}
    />
  
    <button>Login</button>
    
    <p style={{color: 'red'}}>{auth.error.message}</p>
  
    <p>Dont have an account? <a href="/sign-up">Sign-Up</a></p>
  
  </Form>
}