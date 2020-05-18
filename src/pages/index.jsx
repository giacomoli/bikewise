import React, { Component } from 'react';
import { Container, AppBar, Toolbar, Typography } from '@material-ui/core';

import SearchComponent from '../components/search';
import ListComponent from '../components/list';
import { base_url } from '../config.js';

const formatDate = strDate => {
  return new Date(strDate).getTime().toString().slice(0, -3);
};

export default class MainPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      current: {
        page: 1,
        loading: false,
        error: false,
        records: []
      },
      all: {
        loading: false,
        error: false,
        recordAmounts: []
      },
      filter: {
        query: '',
        startDate: '',
        endDate: ''
      }
    };
  }

  loadTotalRecords = () => {
    this.setState({
      all: {
        ...this.state.all,
        loading: true
      }
    });
    const url = `${base_url}?incident_type=theft`;
    fetch(url)
      .then(data => data.json())
      .then(response => {
        this.setState({
          all: {
            ...this.state.all,
            recordAmounts: response.incidents.length,
            loading: false,
            error: false
          }
        });
      })
      .catch(error => {
        this.setState({
          ...this.state.all,
          recordAmounts: 0,
          loading: false,
          error: true
        });
      });
  };

  loadCurrentPageRecords = () => {
    const { filter, current } = this.state;
    this.setState({
      current: {
        ...current,
        loading: true
      }
    });

    let url = `${base_url}?page=${current.page}&per_page=10&incident_type=theft`;

    if (filter.query) url += `&query=${filter.query}`;
    if (filter.startDate) url += `&occurred_after=${filter.startDate}`;
    if (filter.endDate) url += `&occurred_before=${filter.endDate}`;

    fetch(url)
      .then(data => data.json())
      .then(response => {
        this.setState({
          current: {
            ...current,
            records: response.incidents,
            loading: false,
            error: false
          }
        });
      })
      .catch(err => {
        console.log(err);
        this.setState({
          ...current,
          records: [],
          loading: false,
          error: true
        });
      });
  };

  componentDidMount() {
    //Get all bikes for pagination
    this.loadTotalRecords();
    this.loadCurrentPageRecords();
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
    this.loadCurrentPageRecords();
  };

  render() {
    return (
      <Container>
        <AppBar position="static" style={{ marginBottom: 8 }}>
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit">
              BikeWise Example
            </Typography>
          </Toolbar>
        </AppBar>
        <SearchComponent setFilter={this.setFilter} />
        <ListComponent {...this.state.current} />
      </Container>
    );
  }
}
