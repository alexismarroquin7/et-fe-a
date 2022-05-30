import { Grid } from "../../components"
import { TransactionItem } from "../TransactionItem"

export const TransactionList = ({transactions = []}) => {
  return <Grid
    container
    ff="col"
    ai="center"
  >
    <Grid
      width="90%"
    >
      <p>results: {transactions.length}</p>
    </Grid>

    {transactions.length > 0 && transactions.map((trx, i) => {
      return (
        <TransactionItem key={trx.id} transaction={trx} index={i}/>
      )
    })}
  </Grid>
}