import { Grid } from "../../components"
import AddIcon from '@mui/icons-material/Add';
import { useState } from "react";

const amountAsDollar = (amt) => {
  if(amt < 0){
    let str = String(amt);
    str = str.slice(1, str.length);
    return `-$${Number(str).toFixed(2)}`;
  } else {
    return `$${amt.toFixed(2)}`;
  }
}

export const TransactionItem = ({transaction, index}) => {
  const [hidden, setHidden] = useState({description: true});
  const {
    properties: {
      name,
      description,
      date,
      type,
      category,
      amount
    }
  } = transaction;

  return <Grid
    container
    ff="col"
    ai="center"
    bgColor={index % 2 === 0 ? "#eeeeee" : "#ffffff"}
    padding="1rem 0"
  >
    <Grid
      width="90%"
      jc="space-between"
    >
      <p>Date:</p>
      <p>{date.date.start}</p>
    </Grid>
    
    <Grid
      width="90%"
      jc="space-between"
    >
      <p>Type:</p>
      <p 
        style={{
          backgroundColor: type.select.color,
          color: 'white',
          borderRadius: '50px',
          padding: '.2rem .5rem'
        }}
      >{type.select.name}</p>
    </Grid> 
    
    <Grid
      width="90%"
      jc="space-between"
    >
      <p>Amount:</p>
      <p style={{color: type.select.color}}>{amountAsDollar(amount.number)}</p>
    </Grid> 
    
    <Grid
      width="90%"
      jc="space-between"
    >
      <p>Category:</p>
      <p>{category.select.name}</p>
    </Grid>

    <Grid
      width="90%"
      jc="space-between"
    > 
      <p>Name:</p>
      <p>{name.title.length > 0 && name.title[0].text.content}</p>
    </Grid>

    <Grid
      width="90%"
      ff="col"
      ai="center"
    >
      <Grid
        width="100%"
        jc="space-between"
        ai="center"
      >
        <p>Description:</p>
        <AddIcon
          onClick={() => {
            setHidden({
              ...hidden,
              description: !hidden.description
            });
          }}
          style={{transform: hidden.description ? 'rotate(0deg)' : 'rotate(90deg)'}}
        />
      </Grid>
      {
        !hidden.description && 
        <Grid
          width="100%"
          borderRadius="5px"
          bgColor={index % 2 === 0 ? "#fff" : "#eee"}
        >
          <p style={{padding: "0 .5rem"}}>{description.rich_text.length > 0 && description.rich_text[0].text.content}</p>
        </Grid>
      }
    </Grid>

  </Grid>
}