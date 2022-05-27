import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Button, Form, Grid } from "../../components"
import { axiosInstance as axios } from "../../utils";

const initialValues = {
  name: '',
  description: '',
  date: '',
  userUUID: '',
  category: '',
  amount: '',
  type: ''
};

const today = () => {
  const date = new Date();

  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let currDate = date.getDate();

  if(month < 10) {
    month = `0${month}`
  }

  if(currDate < 10) {
    currDate = `0${currDate}`
  }

  return `${year}-${month}-${currDate}`;
}

const initialOptions = {
  types: [
    {
      name: '--select--',
      value: ''
    },
    {
      name: 'Deposit',
      value: 'deposit'
    },
    {
      name: 'Withdrawal',
      value: 'withdrawal'
    },
  ],
  categories: [
    {
      name: '--select--',
      value: ''
    }
  ]
}

export const TransactionForm = () => {

  const [values, setValues] = useState(initialValues);
  const [options, setOptions] = useState(initialOptions);
  const navigate = useNavigate();
  const handleChange = e => {
    setValues({
      ...values,
      [e.target.name]: e.target.value
    })
  }
  
  const handleSubmit = e => {
    e.preventDefault();
    console.log(values);
  }

  useEffect(() => {
    setValues(v => {
      return {
        ...v,
        date: today()
      }
    });

    const fetchCategoryOptions = async () => {
      try {
        const res = await axios().get('/transaction_categories');
        setOptions(o => {
          return { ...o, categories: [ o.categories[0], ...res.data ] } 
        });
      } catch (err) {
        console.log(err);
      }
    }
    
    const fetchTypeOptions = async () => {
      try {
        const res = await axios().get('/transaction_types');
        setOptions(o => {
          return { ...o, types: [ o.types[0], ...res.data ] } 
        });
      } catch (err) {
        console.log(err);
      }
    }
    
    const fetchOptions = async () => {
      await fetchCategoryOptions();
      await fetchTypeOptions();
    }

    fetchOptions();

  }, [])

  return <Form
    onSubmit={handleSubmit}
    ff="col"
    ai="center"
    container
    gap="2rem"
  >
    <Grid
      width="90%"
      ff="col"
      gap=".5rem"
    >
      <label>Type:</label>
      <select
        name="type"
        value={values.type}
        onChange={handleChange}
      >
        {options.types.map(t => {
          return <option
            key={t.name}
            value={t.value}
          >{t.name}</option>
        })}
      </select>
    </Grid>

    <Grid
      width="90%"
      ff="col"
      gap=".5rem"
    >
      <label>Date:</label>
      <input
        type="date"
        name="date"
        value={values.date}
        onChange={handleChange}
      />
    </Grid>

    <Grid
      width="90%"
      ff="col"
      gap=".5rem"
    >
      <label>Amount:</label>
      <input
        type="number"
        
        name="amount"
        value={values.amount}
        onChange={handleChange}
      />
    </Grid>

    <Grid
      width="90%"
      ff="col"
      gap=".5rem"
    >
      <label>Category:</label>
      <select
        name="category"
        value={values.category}
        onChange={handleChange}
      >
        {options.categories.map(c => {
          return <option
            key={c.name}
            value={c.value}
          >{c.name}</option>
        })}
      </select>
    </Grid>

    <Grid
      width="90%"
      ff="col"
      gap=".5rem"
    >
      <label>Name:</label>
      <input
        type="text"
        
        name="name"
        value={values.name}
        onChange={handleChange}
      />
    </Grid>

    <Grid
      width="90%"
      ff="col"
      gap=".5rem"
    >
      <label>Description:</label>
      <textarea
        type="text"
        name="description"
        value={values.description}
        onChange={handleChange}
      />  
    </Grid>

    <Grid
      width="90%"
      ai="center"
      gap="1rem"
    > 
      <Button
        border="1px solid #4285F4"
        padding=".5rem 1rem"
        borderRadius="50px"
        color="#4285F4"
        onClick={() => navigate('/transactions')}
      >Cancel</Button>
      <Button
        border="1px solid #4285F4"
        padding=".5rem 1rem"
        borderRadius="50px"
        color="white"
        bgColor="#4285F4"
        type="submit"
      >Submit</Button>
    </Grid>
  </Form>
}