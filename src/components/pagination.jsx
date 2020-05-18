import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Pagination } from '@material-ui/lab';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      marginTop: theme.spacing(2)
    }
  }
}));

export default function RecordPagination({
  totalRecordCount,
  currentPage,
  setCurrentPage
}) {
  const classes = useStyles();
  const pageCount = totalRecordCount > 10 ? Math.ceil(totalRecordCount / 10) : 1;

  const onPageChange = (evt, value) => {
    setCurrentPage(value);
  };

  return (
    <div className={classes.root}>
      <Pagination
        count={pageCount}
        showFirstButton
        showLastButton
        page={currentPage}
        variant="contained"
        color="primary"
        onChange={onPageChange}
      />
    </div>
  );
}
