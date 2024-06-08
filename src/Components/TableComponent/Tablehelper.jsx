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
            <TableHead>State</TableHead>
            <TableHead>Postal Code</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
            {data?.map(entry => (
                <TableRow key={entry.id}>
                    <TableCell>{entry.firstname}</TableCell>
                    <TableCell>{entry.lastname}</TableCell>
                    <TableCell>{entry.contactNumber}</TableCell>
                    <TableCell>{entry.email}</TableCell>
                    <TableCell>{entry.addressLine1}</TableCell>
                    <TableCell>{entry.city}</TableCell>
                    <TableCell>{entry.state}</TableCell>
                    <TableCell>{entry.postalCode}</TableCell>
                </TableRow>
            ))}
        </TableBody>
      </Table>
    )
  }
  