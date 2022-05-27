import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { Button, Grid } from "../components"
import { findAll } from "../store/slices/transaction-slice"
import { parseQuery } from "../utils"
import { TransactionList } from "../widgets"
import { TransactionSearchBar } from "../widgets/TransactionSearchBar"

const initialQuery = {
  sortBy: 'date',
  dir: 'desc',
  name: '',
  date_after: '',
  date_before: ''
}

export const Transactions = () => {
  const dispatch = useDispatch();
  const trx = useSelector(s => s.transaction);
  const [query, setQuery] = useState(initialQuery);
  const navigate = useNavigate();

  useEffect(() => {
    const queryString = parseQuery(query);
    navigate(`/transactions${queryString}`);
    dispatch(findAll(query));
  }, [dispatch, query, navigate]);

  
  return <Grid
    container
    ff="col"
    ai="center"
  >
    <Grid
      width="90%"
      jc="flex-end"
    >
      <Button
        border="1px solid #ddd"
        padding=".5rem 1rem"
        borderRadius="50px"
        bgColor="#4285F4"
        color="white"
        onClick={() => navigate(`/new/transaction`)}
      >New</Button>
    </Grid>
    <TransactionSearchBar
      query={query}
      setQuery={setQuery}
    />
    <TransactionList transactions={trx.list}/>
  </Grid>
}