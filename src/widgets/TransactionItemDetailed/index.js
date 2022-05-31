import { Grid } from "../../components";
import { useState } from "react";
import { useNavigate } from "react-router";

import AddIcon from '@mui/icons-material/Add';

const amountAsDollar = (amt) => {
  if(!amt){
    return ''
  }

  if(amt < 0){
    let str = String(amt);
    str = str.slice(1, str.length);
    return `-$${Number(str).toFixed(2)}`;
  } else {
    return `$${amt.toFixed(2)}`;
  }
}

export const TransactionItemDetailed = ({ transaction }) => {
  
  const [hidden, setHidden] = useState({
    description: true
  });

  const navigate = useNavigate();

  const {
    id,
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
    bgColor="#eeeeee"
    padding="1rem 0"
    onClick={() => {
      navigate(`/transactions/${id}`)
    }}
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
      <p
        style={{
          backgroundColor: category.select.color,
          padding: '.2rem .5rem',
          borderRadius: "50px"
        }}
      >{category.select.name}</p>
    </Grid>

    <Grid
      width="90%"
      jc="space-between"
    > 
      <p>Name:</p>
      <p>{name && name.title.length > 0 && name.title[0].text.content}</p>
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
          bgColor="#fff"
        >
          <p
            style={{
              padding: description &&
              description.rich_text.length > 0 
              ? "0 .5rem" 
              : "0 1.5rem"
            }}
          >
            { 
              description &&
              description.rich_text.length > 0 &&
              description.rich_text[0].text.content
            }
          </p>

        </Grid>
      }
    </Grid>

  </Grid>
}