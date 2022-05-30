import { ArrowBack } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Grid } from "../../components"
import { findByTransactionId } from "../../store/slices/transaction-slice";
import { TransactionItemDetailed } from "../../widgets";

export const Transaction = () => {
  const trx = useSelector(s => s.transaction);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    dispatch(findByTransactionId(params.transaction_id));
  }, [dispatch, params.transaction_id]);
  
  return <Grid
    container
    ff="col"
    ai="center"
    bgColor="#eee"
    height="100vh"
  >
    <Grid
      width="90%"
      padding="1rem 0"
    >
      <ArrowBack
        onClick={() => {
          navigate(`/transactions`);
        }}
      />
    </Grid>

    {trx.loading ? (
    
    <Grid
      position="absolute"
      zIndex="1"
      top="40%"
      left="50%"
    >
      <CircularProgress />
    </Grid>
    
    ) : ''}
    
    {trx.item.id === null 
    ? '' 
    : (
      <TransactionItemDetailed
        transaction={trx.item}
      />
    )}
  
  </Grid>
}