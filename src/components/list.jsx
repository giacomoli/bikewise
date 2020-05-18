import React from 'react';
import { List } from '@material-ui/core';

import RecordItem from './recordItem';

export default function ({ records = [], loading = false, error = false }) {
  if (error) return <div>Can't load data, please try again.</div>;
  if (loading) return <div>Loading...</div>;
  if (records.length === 0) return <div>No results</div>;

  return (
    <List>
      {records.map(record => (
        <RecordItem key={record.id} record={record} />
      ))}
    </List>
  );
}
