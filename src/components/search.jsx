import React from 'react';
import { TextField, Button, Grid } from '@material-ui/core';

const Search = ({ setFilter }) => {
  const [query, setQuery] = React.useState('');
  const [startDate, setStartDate] = React.useState('');
  const [endDate, setEndDate] = React.useState('');

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={3}>
        <TextField
          name="query"
          label="Search query"
          value={query}
          onChange={evt => setQuery(evt.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <TextField
          name="startDate"
          label="Start Date"
          type="date"
          value={startDate}
          onChange={evt => setStartDate(evt.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={6} sm={4}>
        <TextField
          name="endDate"
          label="End Date"
          type="date"
          value={endDate}
          onChange={evt => setEndDate(evt.target.value)}
          fullWidth
        />
      </Grid>
      <Grid item xs={1} sm={1}>
        <Button
          variant="contained"
          color="primary"
          style={{ height: '100%' }}
          onClick={() => setFilter(query, startDate, endDate)}
        >
          Search
        </Button>
      </Grid>
    </Grid>
  );
};

export default Search;
