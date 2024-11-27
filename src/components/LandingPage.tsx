import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const LandingPage: React.FC = () => {
  const [stockSymbol, setStockSymbol] = useState<string>('');  // Local state for the stock symbol
  const navigate = useNavigate();

  const handleSearch = () => {
    if (stockSymbol.trim() !== '') {
      navigate(`/stock/${stockSymbol.toUpperCase()}`);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center' }}>
        <Typography variant="h3" gutterBottom>
          Stock Search
        </Typography>
        <Typography variant="h6" paragraph>
          Enter a stock symbol to get information.
        </Typography>
        <TextField
          label="Stock Symbol"
          variant="outlined"
          fullWidth
          value={stockSymbol}
          onChange={(e) => setStockSymbol(e.target.value)}  // Update the stock symbol state as user types
          sx={{ marginBottom: 2 }}
        />
        <Button variant="contained" onClick={handleSearch} fullWidth>
          Search
        </Button>
      </Box>
    </Container>
  );
};

export default LandingPage;
