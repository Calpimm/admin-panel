import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Table, TableHead, TableRow, TableCell, TableBody, TextField } from '@mui/material';
import { toast } from 'react-toastify';

const BanHistoryTable = () => {
  const [banHistory, setBanHistory] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    fetchBanHistory();
  }, []);

  const fetchBanHistory = async () => {
    const token = sessionStorage.getItem("adminToken");
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/ban-history`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'x-api-key': process.env.REACT_APP_API_KEY
        }
      });
      const data = await response.json();

      if (response.ok) {
        setBanHistory(data || []);
      } else {
        toast.error('Error fetching ban history:', data.message);
      }
    } catch (error) {
      toast.error('Fetch error:', error);
    }
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredBanHistory = banHistory.filter(record =>
    record.userId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-xl font-bold mb-4"
      >
        Ban History
      </motion.h2>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-4"
      >
        <TextField
          fullWidth
          label="Search"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          className="mb-4"
        />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User ID</TableCell>
              <TableCell>User Type</TableCell>
              <TableCell>Ban Duration</TableCell>
              <TableCell>Reason</TableCell>
              <TableCell>Banned Until</TableCell>
              <TableCell>Created At</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredBanHistory.length > 0 ? (
              filteredBanHistory.map(record => (
                <TableRow key={record._id}>
                  <TableCell>{record.userId}</TableCell>
                  <TableCell>{record.userType}</TableCell>
                  <TableCell>{record.banDuration} minutes</TableCell>
                  <TableCell>{record.reason}</TableCell>
                  <TableCell>{new Date(record.bannedUntil).toLocaleString()}</TableCell>
                  <TableCell>{new Date(record.createdAt).toLocaleString()}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center">
                  No ban history found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </motion.div>
    </>
  );
};

export default BanHistoryTable;
