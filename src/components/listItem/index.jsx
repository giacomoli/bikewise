import React from 'react';
import {
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Grid
} from '@material-ui/core';

import { bike_blank_url } from '../../config';

const getDateString = integerDate => {
  const date = new Date(parseInt(integerDate + '000'));
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
};

export default function RecordItem({ record }) {
  const { title, description, occurred_at, updated_at, address, media } = record;

  return (
    <ListItem>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={2}>
          <ListItemAvatar>
            <Avatar
              alt="Bike"
              variant="square"
              src={media.image_url_thumb || bike_blank_url}
              style={{ height: 150, width: 150 }}
            />
          </ListItemAvatar>
        </Grid>
        <Grid item xs={12} sm={6}>
          <ListItemText primary={title} secondary={description} />
        </Grid>
        <Grid item xs={12} sm={4}>
          <ListItemText
            primary={`Stolen: ${getDateString(occurred_at)}`}
            secondary={
              <React.Fragment>
                <Typography component="span">{`Reported: ${getDateString(
                  updated_at
                )}`}</Typography>
                <br />
                <Typography component="span">{`Location: ${address}`}</Typography>
              </React.Fragment>
            }
          />
        </Grid>
      </Grid>
    </ListItem>
  );
}
