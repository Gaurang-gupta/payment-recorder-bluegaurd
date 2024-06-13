import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "../ui/table"
  
  
  export function TableDemo({ data }) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Contact Number</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Address Line</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Province</TableHead>
            <TableHead>Postal Code</TableHead>
            <TableHead>Service</TableHead>
            <TableHead>Next Service Date</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Tax Slab %</TableHead>
            <TableHead>Tax State</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Order Date</TableHead>
            <TableHead>Invoice Number</TableHead>
            <TableHead>Comments</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            {data?.map(entry => (
                <TableRow key={entry.id}>
                    <TableCell>{entry?.firstname}</TableCell>
                    <TableCell>{entry?.lastname}</TableCell>
                    <TableCell>{entry?.contactNumber}</TableCell>
                    <TableCell>{entry?.email}</TableCell>
                    <TableCell>{entry?.addressLine1}</TableCell>
                    <TableCell>{entry?.city}</TableCell>
                    <TableCell>{entry?.state}</TableCell>
                    <TableCell>{entry?.postalCode}</TableCell>
                    <TableCell>{entry?.serviceAvailable}</TableCell>
                    <TableCell>{entry?.nextServiceDate}</TableCell>
                    <TableCell>{entry?.price}</TableCell>
                    <TableCell>{entry?.taxSlab}</TableCell>
                    <TableCell>{entry?.taxState}</TableCell>
                    <TableCell>{Number(entry?.price) + ((entry?.price * entry?.taxSlab) / 100)}</TableCell>
                    <TableCell>{String(entry?.orderDate)}</TableCell>
                    <TableCell>{entry?.invoice_number}</TableCell>
                    <TableCell>{entry?.comments}</TableCell>
                </TableRow>
            ))}
        </TableBody>
      </Table>
    )
  }
  