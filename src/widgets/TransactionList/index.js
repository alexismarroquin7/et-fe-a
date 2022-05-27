import { Grid } from "../../components"
import { TransactionItem } from "../TransactionItem"

export const TransactionList = ({transactions = []}) => {
  return <Grid
    container
    ff="col"
    ai="center"
  >
    {transactions.length > 0 && transactions.map((trx, i) => {
      return (
        <TransactionItem key={trx.id} transaction={trx} index={i}/>
      )
    })}
  </Grid>
}