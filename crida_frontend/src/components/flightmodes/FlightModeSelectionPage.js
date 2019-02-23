import React from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import withStyles from "@material-ui/core/styles/withStyles";

const styles = theme => ({
  card: {
    minWidth: 350
  },
  button: {
    fontSize: "12px",
    margin: theme.spacing.unit,
    minWidth: 350
  },
  extendedIcon: {
    marginRight: theme.spacing.unit
  },
  title: {
    fontSize: '20px',
    minWidth: 350,
    margin: theme.spacing.unit
  },
});

class FlightModeSelectionPage extends React.Component {
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
          style={{ minHeight: "100vh" }}
        >
          <Card className={classes.card}>
            <Typography align="center" className={classes.title}>
              Select the delay prediction mode
            </Typography>
            <CardContent>
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  size="medium"
                  color="primary"
                  className={classes.button}
                  value="1"
                  onClick={this.props.clickBtn}
                >
                  Single flight
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  size="medium"
                  color="primary"
                  className={classes.button}
                  value="2"
                  onClick={this.props.clickBtn}
                >
                  Batch of flights
                </Button>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(FlightModeSelectionPage);
