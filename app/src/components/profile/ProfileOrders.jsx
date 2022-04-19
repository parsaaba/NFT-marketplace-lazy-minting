import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(name, order, seller, buyer, price) {
  return { name, order, seller, buyer, price };
}

const rows = [
  createData('0x13abf52467623e6bbf61b164a25307db02ca2505', 159, 6.0, 24, 4.0),
  createData('0x13abf52467623e6bbf61b164a25307db02ca2505', 237, 9.0, 37, 4.3),
  createData('0x13abf52467623e6bbf61b164a25307db02ca2505', 262, 16.0, 24, 6.0),
  createData('0x13abf52467623e6bbf61b164a25307db02ca2505', 305, 3.7, 67, 4.3),
  createData('0x13abf52467623e6bbf61b164a25307db02ca2505', 356, 16.0, 49, 3.9),
];

export default function DenseTable() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Transaction</TableCell>
            <TableCell align="right">Order</TableCell>
            <TableCell align="right">Seller</TableCell>
            <TableCell align="right">Buyer</TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.order}</TableCell>
              <TableCell align="right">{row.seller}</TableCell>
              <TableCell align="right">{row.buyer}</TableCell>
              <TableCell align="right">{row.price}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
