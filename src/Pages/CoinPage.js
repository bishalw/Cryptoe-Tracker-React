import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { SingleCoin } from '../config/api';
import { CryptoState } from '../CryptoContext';
import axios from "axios";
import { LinearProgress, makeStyles, Typography } from '@material-ui/core';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import CoinInfo from '../components/CoinInfo';
import { numberWithCommas } from "../components/CoinsTable";

const CoinPage = () => {
 const { id } = useParams()
 const [coin, setCoin] = useState();
 
 const{ currency , symbol } = CryptoState();

 const fetchCoin = async () => {
     const {data} = await axios.get(SingleCoin(id));
     
     setCoin(data);
 }


useEffect(() => {
    fetchCoin();
},[])


function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        [theme.breakpoints.down("md")]: {// if < medium size screen  then it'll be colum for flex-dir and items will be aligned center
            flexDirection: "column",
            alignItems: "center",
        },
    },
    siderbar: {
        width: "30%",
        [theme.breakpoints.down("md")]: {
          width: "100%",
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 25,
        borderRight: "2px solid grey"
    },
    heading: {
        fontWeight: "bold",
        marginBottom: 20,
        fontFamily: "Montserrat",
    },
    description: {
        width: "100%",
        fontFamily: "Montserrat",
        padding: 25,
        paddingBottom: 15,
        paddingTop: 0,
        textAlign: "justify",
    },
    marketData: {
        alignSelf: "start",
        padding: 25,
        paddingTop: 10,
        width: "100%",
        [theme.breakpoints.down("md")]: {
          display: "flex",
          justifyContent: "space-around",
        },
        [theme.breakpoints.down("sm")]: {
          flexDirection: "column",
          alignItems: "center",
        },
        [theme.breakpoints.down("xs")]: {
          alignItems: "start",
        },
      },
}));
const classes = useStyles();

if(!coin ) return <LinearProgress style ={{backgroundColor: 'teal'}} />;
return(
    <div className={classes.container}>
        <div className={classes.siderbar}>
        <img
          src={coin?.image.large}
          alt={coin?.name}
          height="150"
          style={{ marginBottom: 20 }}
        />
         <Typography variant="h3" className={classes.heading}>
          {coin?.name}
        </Typography>
        <Typography variant = "subtitle1" className = {classes.description}>
        {ReactHtmlParser(coin?.description.en.split(". ")[0])}.
        </Typography>
        <div className={classes.marketData}>
            <span style={{ display: "flex"}}>
                <Typography variant='h5' className={classes.heading}>
                    Uselessness no :
                </Typography>
                &nbsp; &nbsp;
                <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >{numberWithCommas(coin?.market_cap_rank)}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Current Price:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.current_price[currency.toLowerCase()]
              )}
            </Typography>
          </span>
          <span style={{ display: "flex" }}>
            <Typography variant="h5" className={classes.heading}>
              Market No Cap:
            </Typography>
            &nbsp; &nbsp;
            <Typography
              variant="h5"
              style={{
                fontFamily: "Montserrat",
              }}
            >
              {symbol}{" "}
              {numberWithCommas(
                coin?.market_data.market_cap[currency.toLowerCase()]
                  .toString()
                  .slice(0, -6)
              )}
            </Typography>
          </span>

        </div>
        </div>
        {/* chart */}
        <CoinInfo coin = {coin} />

    </div>
)};
export default CoinPage;