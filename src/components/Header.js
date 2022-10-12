import {
  AppBar,
  Container,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@material-ui/core";
import {
  createTheme,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";
import { useHistory } from "react-router-dom";
import { CryptoState } from "../CryptoContext";

const useStyles = makeStyles(() => ({ 
  title: {
    flex: 1,
    color : "white",
    fontFamily: "Montserrat",
    fontweight: "bold",
    cursur: "pointer",
  }
}))
const Header = () => {
  const classes = useStyles();

  const history = useHistory();

  const {currency, setCurrency} = CryptoState()

  const darkTheme = createTheme({
    palette: {
      primary:{
        main:"#fff",
      },
      type: "dark",
    },
  });
  return (
  <ThemeProvider theme={darkTheme}>
  <AppBar color='Transparent' position='static'>
    <Container> 
      <Toolbar>
        <Typography 
        onClick ={() => history.push("/")}
        className={classes.title}
        > Crip-Toe</Typography>
        <Select
          variant='outlined'
          style={{
            width: 100,
            height: 40,
            marginLeft: 15
          }}
          value = {currency}
          onChange={(e) => setCurrency(e.target.value)}
        >
          <MenuItem value={"USD"}>USD</MenuItem>
        </Select>
      </Toolbar>
    </Container>

  </AppBar>
  </ThemeProvider>
  )};

export default Header;
