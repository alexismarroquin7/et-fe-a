import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Grid } from "../../components";
import { TransactionForm } from "../../widgets"
import { create } from "../../store/slices/transaction-slice";

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

const initialValues = {
  name: '',
  description: '',
  date: '',
  userUUID: '',
  category: '',
  amount: '',
  type: ''
};

export const NewTransaction = () => {
  const {trx, auth} = useSelector(s => {
    return {
      trx: s.transaction,
      auth: s.auth
    }
  });
  
  const [values, setValues] = useState(initialValues);
  
  const ref = useRef(trx.list.length)
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  useEffect(() => {
    if(ref.current === trx.list.length) return;
    navigate(`/transactions`);
  }, [ref, trx.list.length, navigate]);

  const handleSubmit = () => {
    dispatch(create(values));
  }

  useEffect(() => {
    setValues(v => {
      return {
        ...v,
        userUUID: auth.user.id,
        date: today()
      }
    });
  }, [auth.user.id])

  return <Grid>
    <TransactionForm 
      values={values}
      setValues={setValues}
      onSubmit={handleSubmit}
      button={{
        back: {
          text: 'Cancel',
          href: '/transactions'
        }
      }}
      helperText={trx.error.message}
    />
  </Grid>
}