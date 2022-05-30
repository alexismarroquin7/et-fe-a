import  { useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";
import { Button, Grid } from "../../components";
import CheckIcon from '@mui/icons-material/Check';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';

const classes = {
  modal: {
    width: '100%',
    display: 'flex',
    flexFlow: 'column wrap',
    alignItems: "center",
    position: 'absolute',
    bottom: '0',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: '4rem 0',
    gap: "1rem"
  }
};

const initialOpen = {
  sortBy: false,
  dir: false,
  dateRange: false
}

const createDirText = (query) => {
  let dt = '';
  
  switch(query.dir){
    case 'desc':

      switch(query.sortBy){
        case 'date':
          dt = 'Newest';
          break
        
        case 'name':
          dt = 'Z-A';
          break
        
        default:
          throw Error(`unknown query.sortBy: ${query.dir}`)
      }
      
      break
      
      case 'asc':
        switch(query.sortBy){
          case 'date':
            dt = 'Oldest';
            break
          
          case 'name':
            dt = 'A-Z';
            break
          
          default:
            throw Error(`unknown query.sortBy: ${query.dir}`)
        }
      break
    
    default:
      throw Error(`unknown query.dir: ${query.dir}`)
        
  }

  return dt;
}

export const TransactionSearchBar = ({query, setQuery}) => {

  const [open, setOpen] = useState(initialOpen);

  const handleOpen = key => setOpen({...open, [key]: true});
  const handleClose = key => setOpen({...open, [key]: false});

  const handleChange = e => {
    setQuery({...query, [e.target.name]: e.target.value});
  }

  const [dirText, setDirText] = useState(() => {
    return createDirText(query);
  });

  useEffect(() => {
    setDirText(createDirText(query));
  }, [query]);

  return <Grid
    container
    ff="col"
    ai="center"
    border="1px solid #ddd"
  >
    <Grid
      width="90%"
      padding="1rem 0"
      jc="space-between"
      ai="center"
    >
      <Grid
        gap="1rem"
        ai="center"
      >
        <Button
          border={`1px solid #dddddd`}
          bgColor={`${query.sortBy === 'name' ? '#ddd' : 'white'}`}
          padding=".5rem 1rem"
          borderRadius="50px"
          onClick={() => handleOpen('sortBy')}
        >Sort By</Button>

        <Modal
          open={open.sortBy}
          onClose={() => handleClose('sortBy')}
        >
          <Box sx={classes.modal}>
            <Button
              width="90%"
              border={`1px solid ${query.sortBy === 'date' ? '#4285F4' : '#dddddd'}`}
              padding=".5rem 1rem"
              borderRadius="50px"
              onClick={() => {
                setQuery({
                  ...query,
                  sortBy: 'date'
                })
              }}
            >
              <Grid
                container
                jc="space-between"
                ai="center"
              >
                <p>DATE</p>
                {query.sortBy === 'date' && <CheckIcon style={{color: "#4285F4"}}/>}
              </Grid>
            </Button>
            <Button
              width="90%"
              border={`1px solid ${query.sortBy === 'name' ? '#4285F4' : '#dddddd'}`}
              padding=".5rem 1rem"
              borderRadius="50px"
              onClick={() => {
                setQuery({
                  ...query,
                  sortBy: 'name'
                })
              }}
            >
              <Grid
                container
                jc="space-between"
                ai="center"
              >
                <p>NAME</p>
                {query.sortBy === 'name' && <CheckIcon style={{color: "#4285F4"}}/>}
              </Grid>
            </Button>
          </Box>
        </Modal>

        <Button
          border="1px solid #dddddd"
          padding=".5rem 1rem"
          borderRadius="50px"
          onClick={() => handleOpen('dateRange')}
        >Date Range</Button>

        <Modal
          open={open.dateRange}
          onClose={() => handleClose('dateRange')}
        >
          <Box sx={classes.modal}>
            <Grid
              width="90%"
              jc="space-between"
              ai="center"
            >
              <label>AFTER</label>
              <input
                type="date"
                name="date_after"
                value={query.date_after}
                onChange={handleChange}
              />
            </Grid>
            <Grid
              width="90%"
              jc="space-between"
              ai="center"
            >
              <label>BEFORE</label>
              <input
                type="date"
                name="date_before"
                value={query.date_before}
                onChange={handleChange}
                min={query.date_after}
              />
            </Grid>
          </Box>
        </Modal>
    
    
      </Grid>
      
      <Button
        ai="center"
        onClick={() => {
          setQuery({
            ...query,
            dir: query.dir === 'asc' ? 'desc' : 'asc'
          });
        }}
      >
        {dirText}
        <ArrowDownwardIcon
          sx={{
            transform: query.dir === 'asc' ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: '.2s'
          }}
        />
      </Button>
      
      
    </Grid>
  </Grid>
}