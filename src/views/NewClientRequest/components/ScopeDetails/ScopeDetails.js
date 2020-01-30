import React, { useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import {
  Card,
  CardHeader,
  CardContent,
  CardActions,
  Divider,
  Grid,
  Button,
  TextField
} from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {}
}));

const ScopeDetails = props => {
  const { className, ...rest } = props;

  const classes = useStyles();

  return (
    <Card
      {...rest}
      className={clsx(classes.root, className)}
    >
      <form
        autoComplete="off"
        noValidate
      >
        <CardHeader
          subheader=""
          title="Scope Requirements"
        />
        <Divider />
        <CardContent>
        <Grid
            container
            spacing={3}
          >
            <Grid
              item
              md={12}
              xs={12}
            >
              <TextField
                id="outlined-multiline-static"
                fullWidth
                label="Scope Description"
                multiline
                rows="4"
                defaultValue=""
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <CardActions al>
          <Button
            color="primary"
            variant="text"
          >
            Upload Relevant Images
          </Button>
        </CardActions>
      </form>
    </Card>
  );
};

ScopeDetails.propTypes = {
  className: PropTypes.string
};

export default ScopeDetails;
