import { useState } from 'react';
import { styled } from '@mui/material/styles';
import {
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';

const StyledTable = styled(Table)({
  minWidth: 650,
});

const VerificationProcess = () => {
  const [members, setMembers] = useState([
    {
      id: 1,
      memberId: 101,
      identificationNumber: '1234567890',
      status: 'pending',
    },
    {
      id: 2,
      memberId: 102,
      identificationNumber: '0987654321',
      status: 'approved',
    },
    {
      id: 3,
      memberId: 103,
      identificationNumber: '4567891230',
      status: 'denied',
    },
    {
      id: 4,
      memberId: 104,
      identificationNumber: '7890123456',
      status: 'pending',
    },
  ]);

  const handleStatusChange = (event, id) => {
    const updatedMembers = members.map((member) => {
      if (member.id === id) {
        return { ...member, status: event.target.value };
      }
      return member;
    });
    setMembers(updatedMembers);
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center' }}>
      <div style={{ width: '80%' }}>
        <Typography variant="h4" component="h2" gutterBottom align="center" sx={{ fontWeight: 'bold' }}>
          Verify Members
        </Typography>
        <TableContainer component={Paper}>
          <StyledTable>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Member ID</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Identification Number</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Status</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {members.map((member) => (
                <TableRow key={member.id}>
                  <TableCell>{member.memberId}</TableCell>
                  <TableCell>{member.identificationNumber}</TableCell>
                  <TableCell>
                    <FormControl sx={{ minWidth: 120 }}>
                      <Select
                        value={member.status}
                        onChange={(event) => handleStatusChange(event, member.id)}
                        sx={
                          member.status === 'pending'
                            ? { color: 'warning.main', fontWeight: 'bold' }
                            : member.status === 'approved'
                            ? { color: 'success.main', fontWeight: 'bold' }
                            : { color: 'error.main', fontWeight: 'bold' }
                        }
                      >
                        <MenuItem value="pending" sx={{ color: 'warning.main' }}>
                          Pending
                        </MenuItem>
                        <MenuItem value="approved" sx={{ color: 'success.main' }}>
                          Approved
                        </MenuItem>
                        <MenuItem value="denied" sx={{ color: 'error.main' }}>
                          Denied
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </StyledTable>
        </TableContainer>
      </div>
    </div>
  );
};

export default VerificationProcess;
