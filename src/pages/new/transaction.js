import { useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Grid } from "../../components";
import { TransactionForm } from "../../widgets"


export const NewTransaction = () => {
  const trx = useSelector(s => s.transaction);

  const ref = useRef(trx.list.length)
  const navigate = useNavigate();

  useEffect(() => {
    if(ref.current === trx.list.length) return;
    navigate(`/transactions`);
  }, [ref, trx.list.length, navigate]);

  return <Grid>
    <TransactionForm />
  </Grid>
}