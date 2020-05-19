import React, { Component } from 'react';
import { Container, AppBar, Toolbar, Typography } from '@material-ui/core';

import SearchComponent from '../components/search';
import ListComponent from '../components/list';
import Pagination from '../components/pagination';
import { base_url } from '../config.js';

const formatDate = strDate => {
  return new Date(strDate).getTime().toString().slice(0, -3);
};

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: {
        page: 1,
        records: []
      },
      loading: false,
      error: false,
      totalRecordCount: '',
      filter: {
        query: '',
        startDate: '',
        endDate: ''
      }
    };
  }

  loadTotalRecords = () => {
    const url = `${base_url}?incident_type=theft&proximity=Berlin`;
    fetch(url)
      .then(data => data.json())
      .then(response => {
        this.setState({
          totalRecordCount: response.incidents.length
        });
      })
      .catch(error => {
        this.setState({
          totalRecordCount: -1
        });
      });
  };

  loadCurrentPageRecords = () => {
    const { filter, current } = this.state;

    this.setState({
      loading: true
    });

    let url = `${base_url}?page=${current.page}&per_page=10&incident_type=theft&proximity=Berlin`;

    if (filter.query) url += `&query=${filter.query}`;
    if (filter.startDate) url += `&occurred_after=${filter.startDate}`;
    if (filter.endDate) url += `&occurred_before=${filter.endDate}`;

    fetch(url)
      .then(data => data.json())
      .then(response => {
        this.setState({
          current: {
            ...current,
            records: response.incidents
          },
          loading: false,
          error: false
        });
      })
      .catch(err => {
        this.setState({
          current: {
            ...current,
            records: []
          },
          loading: false,
          error: true
        });
      });
  };

  componentDidMount() {
    //Get all stolen bikes
    this.loadTotalRecords();

    this.loadCurrentPageRecords();
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      prevState.current.page !== this.state.current.page ||
      prevState.filter.query !== this.state.filter.query ||
      prevState.filter.startDate !== this.state.filter.startDate ||
      prevState.filter.endDate !== this.state.filter.endDate
    ) {
      this.loadCurrentPageRecords();
    }
  }

  setFilter = (query, startDate, endDate) => {
    // Set Search Filter from Child Component
    this.setState({
      filter: {
        query: query ? query : '',
        startDate: startDate ? formatDate(startDate) : '',
        endDate: endDate ? formatDate(endDate) : ''
      }
    });
  };

  setCurrentPage = page => {
    this.setState({
      current: {
        ...this.state.current,
        page
      }
    });
  };

  render() {
    const { current, loading, error, totalRecordCount } = this.state;

    return (
      <>
        <AppBar position="static" style={{ marginBottom: 8 }}>
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
              BikeWise Example
            </Typography>
            <Typography>{`Total Bike Count: ${totalRecordCount}`}</Typography>
          </Toolbar>
        </AppBar>
        <Container>
          <SearchComponent setFilter={this.setFilter} />
          <ListComponent records={current.records} loading={loading} error={error} />
          <Pagination
            currentPage={current.page}
            totalRecordCount={totalRecordCount}
            setCurrentPage={this.setCurrentPage}
          />
        </Container>
      </>
    );
  }
}
