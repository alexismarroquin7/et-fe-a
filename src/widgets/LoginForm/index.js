import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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

  const handleChange = e => {
    setValues({...values, [e.target.name]: e.target.value});
  }

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(login({credentials: values}));
  }

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
      name="password"
      value={values.password}
      onChange={handleChange}
    />
    <button>Login</button>
    <p style={{color: 'red'}}>{auth.error.message}</p>
    <p>Dont have an account? <a href="/sign-up">Sign-Up</a></p>
  </Form>
}