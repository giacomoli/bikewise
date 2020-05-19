import React from 'react';
import { List, makeStyles } from '@material-ui/core';

import RecordItem from '../listItem';

const useStyles = makeStyles(theme => ({
  error: {
    textAlign: 'center',
    marginTop: theme.spacing(2)
  }
}));

export default function RecordList({
  records = [],
  loading = false,
  error = false
}) {
  const classes = useStyles();

  if (error)
    return <div className={classes.error}>Can not load data, please try again</div>;
  if (loading) return <div className={classes.error}>Loading...</div>;
  if (records.length === 0) return <div className={classes.error}>No results</div>;

  return (
    <List>
      {records.map(record => (
        <RecordItem key={record.id} record={record} />
      ))}
    </List>
  );
}
