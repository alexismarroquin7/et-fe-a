// components
import { AccountCircle } from "@mui/icons-material"
import { CircularProgress, Menu, MenuItem } from "@mui/material"

// widgets
import { Button, Grid } from "../../components"
import { TransactionList } from "../../widgets"
import { TransactionSearchBar } from "../../widgets/TransactionSearchBar"

// store
import { findAll } from "../../store/slices/transaction-slice";
import { logout } from "../../store/slices/auth-slice";

// hooks
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { useLocalStorage } from "../../hooks/useLocalStorage"

// utils
import { parseQuery } from "../../utils"

const initialQuery = {
  sortBy: 'date',
  dir: 'desc',
  name: '',
  date_after: '',
  date_before: ''
}

const initialAnchorEl = null;

export const Transactions = () => {
  const dispatch = useDispatch();
  
  const trx = useSelector(s => s.transaction);
  
  const [query, setQuery] = useLocalStorage(
    'et-fe-a-query',
    initialQuery
  );

  const navigate = useNavigate();
  const [ anchorEl, setAnchorEl ] = useState(initialAnchorEl);
  
  const open = Boolean(anchorEl);
  
  const handleClose = () => setAnchorEl(initialAnchorEl);

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
      jc="space-between"
      ai="center"
      padding="1rem 0"
    >
      <AccountCircle
        sx={{fontSize: "2.5rem"}}
        onClick={(e) => {
          setAnchorEl(e.currentTarget);
        }}
      />

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        <MenuItem
          onClick={() => {
            dispatch(logout());
            handleClose();
          }}
        >Logout</MenuItem>
      </Menu>

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
    
    {trx.loading && <Grid
      padding="1rem 0"
    >
      <CircularProgress />
    </Grid>}

    {
      !trx.loading &&
      trx.list.length > 0 &&
      trx.error.message.length === 0 &&
      <TransactionList transactions={trx.list}/>
    }
    
    {
      !trx.loading &&
      trx.error.message.length > 0 && (
      <Grid
        padding="1rem 0"
      >
        <p
          style={{color: "red"}}
        >{trx.error.message}</p>
      </Grid>
      )
    }

    {
      !trx.loading &&
      trx.list.length === 0 && (
      <Grid
        padding="1rem 0"
      >
        <p>This list is empty.</p>
      </Grid>
      )
    }
  
  </Grid>
}