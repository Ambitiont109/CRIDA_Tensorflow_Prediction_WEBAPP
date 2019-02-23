import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  card: {
    minWidth: 275,
  },
  textField: {
    fontSize: '12px',
    margin: theme.spacing.unit,
    minWidth: 250
  },
  margin: {
    margin: theme.spacing.unit,
  },
  extendedIcon: {
    marginRight: theme.spacing.unit,
  },
});

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      error: '',
    };

    this.handlePassChange = this.handlePassChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();

    if (!this.state.username) {
      return this.setState({ error: 'Username is required' });
    }

    if (!this.state.password) {
      return this.setState({ error: 'Password is required' });
    }

    return this.setState({ error: '' });
  }

  handleUserChange(evt) {
    this.setState({
      username: evt.target.value,
    });
  };

  handlePassChange(evt) {
    this.setState({
      password: evt.target.value,
    });
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
          <CssBaseline />
          <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justify="center"
                style={{ minHeight: '100vh' }}
            >
            <form onSubmit={this.handleSubmit}>
              <Card className={classes.card}>
              <CardContent>
                  <Grid item xs={3}>
                      <TextField
                        className={classes.textField}
                        label="User Name"
                        margin="normal"
                        value={this.state.username}
                        onChange={this.handleUserChange}
                      />
                  </Grid>
                  <Grid item xs={3}>
                      <TextField
                        className={classes.textField}
                        label="Password"
                        type="password"
                        margin="normal"
                        value={this.state.password}
                        onChange={this.handlePassChange}
                      /><br />
                  </Grid>
              </CardContent>
              <CardActions>
                  <Grid item xs={3}>
                      <Button
                        variant="contained"
                        size="medium"
                        color="primary"
                        className={classes.margin}
                        type="submit"
                        value="Log In"
                        >
                      Login
                      </Button>
                  </Grid>
                </CardActions>
              </Card>
            </form>
          </Grid>
      </React.Fragment>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoginPage);
