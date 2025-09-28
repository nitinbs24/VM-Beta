// /app/page.js
'use client';
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export default function HomePage() {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    const fetchClaims = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/fra/claims');
        const data = await response.json();
        setClaims(data);
      } catch (error) {
        console.error("Failed to fetch claims:", error);
      }
    };
    fetchClaims();
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Forest Rights Act (FRA) Claims
      </Typography>
      {/* You can render the claims here or on a map */}
      <ul>
        {claims.map((claim) => (
          <li key={claim.id}>{claim.claimant_name}</li>
        ))}
      </ul>
    </Box>
  );
}