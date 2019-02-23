const styles = theme => ({
  header: {
    borderBottom: "solid 1px rgba(0,0,0,0.4)",
    backgroundColor: "#253069",
    color: "#d2d6ef",
    overflow: "hidden",
    boxShadow: "0 2px 4px rgba(0,0,0,0.2)",
    position: "relative",
    height: "12%"
  },
  h1: {
    fontSize: "30px",
    textAlign: "center",
    fontFamily: "sans-serif",
    lineHeight: "1.45em",
    webkitFontSmoothing: "antialiased"
  },
  h2: {
    fontSize: "22px",
    textAlign: "center",
    fontFamily: "sans-serif",
    lineHeight: "1.45em",
    webkitFontSmoothing: "antialiased"
  },
  h3: {
    fontSize: "20px",
    textAlign: "left",
    fontFamily: "sans-serif",
    lineHeight: "1.45em",
    marginLeft: theme.spacing.unit * 2,
    webkitFontSmoothing: "antialiased"
  },
  appBar: {
    top: "auto",
    bottom: 5,
    height: "10%"
  },
  toolbar: {
    alignItems: "center",
    justifyContent: "space-between"
  },
  textField: {
    fontSize: "12px",
    margin: theme.spacing.unit,
    minWidth: 120
  },
  formControl: {
    fontSize: "12px",
    margin: theme.spacing.unit,
    minWidth: 120
  },
  predictedDelay: {
    marginTop: "10px",
    position: "relative",
    minWidth: 350,
    maxWidth: 350,
    textAlign: "center",
    fontFamily: "sans-serif",
    backgroundColor: "rgb(225, 0, 80)"
  },
  predictedDelayText: {
    fontSize: "18px"
  },
  topControls: {
    borderBottom: "1px solid #ddd",
    height: "25%",
    boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
    background: "white",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
  },
  mainPart: {
    webkitJustifyContent: "space-between",
    justifyContent: "space-between",
    marginTop: "30px",
    marginBottom: "50px",
    paddingTop: "2px",
    position: "relative",
    backgroundColor: "#f7f7f7"
  },
  card: {
    maxWidth: 200
  },
  paper: {
    backgroundColor: "#f7f7f7",
    padding: theme.spacing.unit * 2,
    height: "70%",
    marginLeft: theme.spacing.unit * 2,
    marginRight: theme.spacing.unit * 2
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end"
  },
  rightIcon: {
    marginLeft: theme.spacing.unit
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit
  }
});
export default styles;
