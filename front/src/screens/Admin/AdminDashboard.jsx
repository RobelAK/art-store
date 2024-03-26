// import axios from 'axios';
// import React, { useEffect, useState } from 'react';

// function AdminDashboard() {
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     axios.get('http://localhost:8081/admin/userstable')
//       .then(res => {
//         setUsers(res.data);
//         setLoading(false);
//       })
//       .catch(err => {
//         setError(err.message);
//         setLoading(false);
//       });
//   }, []);

//   const handleDelete = (id) => {
//     if (window.confirm('Are you sure you want to delete this user?')) {
//       axios.put('http://localhost:8081/admin/deleteuser/' + id)
//         .then(res => {
//           window.location.reload();
//         })
//         .catch(err => setError(err.message));
//     }
//   };

//   return (
//     <div className='vh-100 vw-100 d-flex align-items-center justify-content-center'>
//       {loading && <p>Loading...</p>}
//       {error && <p>{error}</p>}
//       {!loading && !error &&
//         <table className='table w-50 border-black'>
//           <thead>
//             <tr>
//               <th>Name</th>
//               <th>Email</th>
//               <th>Role</th>
//               <th>Action</th>
//             </tr>
//           </thead>
          // <tbody>
          //   {users.map((data, i) => (
          //     <tr key={i}>
          //       <td>{data.name}</td>
          //       <td>{data.email}</td>
          //       <td>{data.role}</td>
          //       <td>
          //         <button className='' onClick={() => handleDelete(data.id)}>delete</button>
          //       </td>
          //     </tr>
          //   ))}
          // </tbody>
//         </table>
//       }
//     </div>
//   );
// }

// export default AdminDashboard;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function AdminDashboard() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8081/admin/userstable')
      .then(res => {
        setUsers(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);
    const handleDelete = (id) => {
      if (window.confirm('Are you sure you want to delete this user?')) {
        axios.put('http://localhost:8081/admin/deleteuser/' + id)
          .then(res => {
            window.location.reload();
          })
          .catch(err => setError(err.message));
      }
    };
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Name</StyledTableCell>
            <StyledTableCell>Email</StyledTableCell>
            <StyledTableCell>Role</StyledTableCell>
            <StyledTableCell align="right">Action</StyledTableCell>
          </TableRow>
        </TableHead>
        
        {/* <tbody>
            {users.map((data, i) => (
              <tr key={i}>
                <td>{data.name}</td>
                <td>{data.email}</td>
                <td>{data.role}</td>
                <td>
                  <button className='' onClick={() => handleDelete(data.id)}>delete</button>
                </td>
              </tr>
            ))}
          </tbody> */}
        <TableBody>
          {users.map((data, i) => (
            <StyledTableRow key={i}>
              <StyledTableCell component="th" scope="row">{data.name}</StyledTableCell>
              <StyledTableCell>{data.email}</StyledTableCell>
              <StyledTableCell>{data.role}</StyledTableCell>
              <StyledTableCell align='right'>
                <Button className='' onClick={() => handleDelete(data.id)}>delete</Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default AdminDashboard;