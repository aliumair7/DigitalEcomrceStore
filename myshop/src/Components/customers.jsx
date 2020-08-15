import React from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import userService from '../Service/userService';

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);



const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function Customers() {
  const classes = useStyles();
const[users,setusers]=React.useState([])
const getdata=()=>{
  userService.getusers().then((data)=>{
    setusers(data)
  }).catch(err=>console.log(err))
}

console.log(users)

React.useEffect(getdata,[])
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell  >First Name</StyledTableCell>
            <StyledTableCell align="right">Last Name</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Role</StyledTableCell>
            <StyledTableCell align="right">Date</StyledTableCell>

           
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((users) => (
            <StyledTableRow key={users.username}>
              <StyledTableCell >
                {users.firstname}
              </StyledTableCell>
              <StyledTableCell align="right">{users.lastname}</StyledTableCell>
              <StyledTableCell align="right">{users.email}</StyledTableCell>
              <StyledTableCell align="right">{users.role}</StyledTableCell>
              <StyledTableCell align="right">{users.Date}</StyledTableCell>
            
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}