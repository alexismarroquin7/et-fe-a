import  { useState } from "react";
import { Box, Modal } from "@mui/material";
import { Button, Grid } from "../../components";
import CheckIcon from '@mui/icons-material/Check';

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

export const TransactionSearchBar = ({query, setQuery}) => {

  const [open, setOpen] = useState(initialOpen);

  const handleOpen = key => setOpen({...open, [key]: true});
  const handleClose = key => setOpen({...open, [key]: false});

  const handleChange = e => {
    setQuery({...query, [e.target.name]: e.target.value});
  }

  return <Grid
    container
    ff="col"
  >
    <Grid
      padding="1rem"
      gap="1rem"
    >
      <Button
        border="1px solid #dddddd"
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
            border="1px solid #dddddd"
            padding=".5rem 1rem"
            borderRadius="50px"
            onClick={() => {
              setQuery({
                ...query,
                sortBy: 'date'
              })
              handleClose('sortBy')
            }}
          >
            <Grid
              container
              jc="space-between"
              ai="center"
            >
              <p>DATE</p>
              {query.sortBy === 'date' && <CheckIcon/>}
            </Grid>
          </Button>
          <Button
            width="90%"
            border="1px solid #dddddd"
            padding=".5rem 1rem"
            borderRadius="50px"
            onClick={() => {
              setQuery({
                ...query,
                sortBy: 'name'
              })
              handleClose('sortBy')
            }}
          >
            <Grid
              container
              jc="space-between"
              ai="center"
            >
              <p>NAME</p>
              {query.sortBy === 'name' && <CheckIcon/>}
            </Grid>
          </Button>
        </Box>
      </Modal>

      <Button
        border="1px solid #dddddd"
        padding=".5rem 1rem"
        borderRadius="50px"
        onClick={() => handleOpen('dir')}
      >Direction</Button>

      <Modal
        open={open.dir}
        onClose={() => handleClose('dir')}
      >
        <Box sx={classes.modal}>
          <Button
            width="90%"
            border="1px solid #dddddd"
            padding=".5rem 1rem"
            borderRadius="50px"
            onClick={() => {
              setQuery({
                ...query,
                dir: 'asc'
              })
              handleClose('sortBy')
            }}
          >
            <Grid
              container
              jc="space-between"
              ai="center"
            >
              <p>ASCENDING</p>
              {query.dir === 'asc' && <CheckIcon/>}
            </Grid>
          </Button>
          
          <Button
            width="90%"
            border="1px solid #dddddd"
            padding=".5rem 1rem"
            borderRadius="50px"
            onClick={() => {
              setQuery({
                ...query,
                dir: 'desc'
              })
              handleClose('sortBy')
            }}
          >
            <Grid
              container
              jc="space-between"
              ai="center"
            >
              <p>DESCENDING</p>
              {query.sortBy === 'desc' && <CheckIcon/>}
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
            <label>After</label>
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
            <label>Before</label>
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
  </Grid>
}