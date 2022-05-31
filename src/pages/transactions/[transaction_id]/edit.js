import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Grid } from "../../../components"
import { findByTransactionId, updateByTransactionId } from "../../../store/slices/transaction-slice";
import { TransactionForm } from "../../../widgets"

const initialValues = {
  name: '',
  description: '',
  date: '',
  userUUID: '',
  category: '',
  amount: '',
  type: ''
};

export const EditTransaction = () => {
  const [values, setValues] = useState(initialValues);
  
  const dispatch = useDispatch();
  const params = useParams();
  
  const {trx, auth, loading, err: { message: helperText } } = useSelector(s => {
    return {
      trx: s.transaction.item,
      auth: s.auth,
      loading: s.transaction.loading,
      err: s.transaction.error
    }
  });

  useEffect(() => {
    dispatch(findByTransactionId(params.transaction_id));
  }, [dispatch, params.transaction_id]);

  useEffect(() => {
    if(trx.id === null) return;
    const {
      properties: {
        name,
        description,
        date,
        category,
        amount,
        type
      } 
    } = trx;
    
    setValues(v => {
      let amtToUse;
      
      if(Number(amount.number) < 0){
        amtToUse = String(Number(amount.number) * -1);
      } else if (Number(amount.number) > 0){
        amtToUse = String(amount.number);
      }

      return {
        ...v,
        
        name: name &&
        name.title.length > 0 
        ? name.title[0].text.content
        : '',
        
        description: description &&
        description.rich_text.length > 0 
        ? description.rich_text[0].text.content
        : '',
        
        date: date.date.start,
        
        userUUID: auth.user.id,
        
        category: category.select.name,
        
        amount: amtToUse,
        
        type: type.select.name
      }
    });
  }, [trx, auth.user.id]);

  const handleSubmit = () => {
    dispatch(
      updateByTransactionId({
        transaction_id: trx.id, 
        changes: values
      })
    );
  }

  return <Grid>
    <TransactionForm
      values={values}
      setValues={setValues}
      onSubmit={handleSubmit}
      loading={loading}
      button={{
        back: {
          text: 'Back',
          href: `/transactions/${params.transaction_id}`
        }
      }}
      helperText={helperText}
    />
  </Grid>
}