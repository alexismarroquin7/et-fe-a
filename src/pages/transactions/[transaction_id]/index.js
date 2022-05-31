import { ArrowBack, MoreVert } from "@mui/icons-material";
import { Box, CircularProgress, Menu, MenuItem, Modal } from "@mui/material";
import { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Button, Grid } from "../../../components"
import { findByTransactionId, deleteByTransactionId } from "../../../store/slices/transaction-slice";
import { TransactionItemDetailed } from "../../../widgets";
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import EditIcon from '@mui/icons-material/Edit';

const classes = {
  modal: {
    width: '100%',
    bottom: '0',
    display: 'flex',
    flexFlow: 'column wrap',
    alignItems: "center",
    position: 'absolute',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: '2rem 0',
    gap: "1rem"
  }
};

export const Transaction = () => {
  const trx = useSelector(s => s.transaction);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    dispatch(findByTransactionId(params.transaction_id));
  }, [dispatch, params.transaction_id]);

  const [optionsMenuAnchorEl, setOptionsMenuAnchorEl] = useState(null);
  const optionsMenuOpen = Boolean(optionsMenuAnchorEl);
  
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  
  const handleDeleteTrx = (e) => {
    dispatch(deleteByTransactionId(trx.item.id))
  }

  const ref = useRef(trx.list.length);

  useEffect(() => {
    if(ref.current === trx.list.length) return;
    navigate(`/transactions`);
  }, [ref, trx.list.length, navigate]);
  
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
      jc="space-between"
    >
      <ArrowBack
        onClick={() => {
          navigate(`/transactions`);
        }}
      />
      
      <MoreVert
        onClick={(e) => {
          setOptionsMenuAnchorEl(e.currentTarget);
        }}
      />

      <Menu
        open={optionsMenuOpen}
        onClose={() => setOptionsMenuAnchorEl(null)}
        anchorEl={optionsMenuAnchorEl}
      >
        <MenuItem
          onClick={() => {
            navigate(`/transactions/${params.transaction_id}/edit`);
          }}
        >
        
          <Grid
            ai="center"
            gap=".5rem"
          >
            <EditIcon/>
            <p>Edit</p>
          </Grid>
        
        </MenuItem>
        
        <MenuItem
          onClick={() => {
            setDeleteModalOpen(true);
          }}
        >
          
          <Grid
            ai="center"
            gap=".5rem"
          >
            <DeleteOutlineIcon/>
            <p>Delete</p>
          </Grid>
        
        </MenuItem>

      </Menu>

      <Modal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
      >
        <Box
          sx={classes.modal}
        >
          <p>Are you sure you want to delete this transaction?</p>
          
          <Button
            width="90%"
            jc="center"
            border="1px solid #eee"
            padding="1rem"
            borderRadius="50px"
            color="white"
            bgColor="#de5246"
            onClick={handleDeleteTrx}
          >Delete</Button>
          
          <Button
            width="90%"
            jc="center"
            border="1px solid #de5246"
            color="#de5246"
            padding="1rem"
            borderRadius="50px"
            onClick={() => {
              setDeleteModalOpen(false);
            }}
          >Cancel</Button>

        </Box>
      </Modal>
    
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
    
    {trx.item.id === null ||
    trx.loading
    ? '' 
    : (
      <TransactionItemDetailed
        transaction={trx.item}
      />
    )}
  
  </Grid>
}