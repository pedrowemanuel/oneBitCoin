import { useState, useEffect } from 'react';

import { StyleSheet, Text, View, SafeAreaView, StatusBar } from 'react-native';

import CurrentPrice from './src/components/CurrentPrice';
import HistoryGraphic from './src/components/HistoryGraphic';
import QuotationsList from './src/components/QuotationsList';

function addZero(number) {
  return (number <= 9) ? "0" + number : number;
}

function convertDate(date) {
  return `${date.getFullYear()}-${addZero(date.getMonth() + 1)}-${addZero(date.getDate())}`;
}

function url(qtdDays) {
  const date = new Date();
  const listLastDays = qtdDays;
  const endDate = convertDate(date);
  date.setDate(date.getDate() - listLastDays);
  const startDate = convertDate(date);

  return `https://api.coindesk.com/v1/bpi/historical/close.json?start=${startDate}&end=${endDate}`;
}

async function getListCoins(url) {
  let response = await fetch(url);
  let returnApi = await response.json();


  if(returnApi.bpi) {
    let selectListQuotations = returnApi.bpi;
  
    const queryCoinsList = Object.keys(selectListQuotations).map((key) => {
      return {
        date: key.split("-").reverse().join("/"),
        value: selectListQuotations[key],
      }
    });
  
    let data = queryCoinsList.reverse();
    return data;
  }

  return [];
}

async function getPriceCoinsGraphic(url) {
  let response = await fetch(url);
  let returnApi = await response.json();

  if(returnApi.bpi) {
    let selectListQuotations = returnApi.bpi;
    const queryCoinsList = Object.keys(selectListQuotations).map((key) => {return selectListQuotations[key]} );
  
    let data = queryCoinsList;
  
    return data;
  }

  return [];
}

export default function App() {
  const [coinsList, setCoinsList] = useState([]);
  const [coinsGraphicList, setCoinsGraphicList] = useState([0]);
  const [days, setDays] = useState(30);
  const [updateData, setUpdateData] = useState(true);
  const [price, setPrice] = useState();

  function updateDay(number) {
    setDays(number);
    setUpdateData(true);
  }

  function priceCotation() {
    setPrice(coinsGraphicList.pop());
  }

  useEffect(() => {
    getListCoins(url(days)).then((data) => {
      setCoinsList(data);
    });

    getPriceCoinsGraphic(url(days)).then((data) => {
      setCoinsGraphicList(data);
    });

    priceCotation();
    if(updateData) {
      setUpdateData(false);
    }

  }, [updateData]);

  return (
    <SafeAreaView style={styles.container}>
      <CurrentPrice lastCotation={price}  />
      <HistoryGraphic infoDataGraphic={coinsGraphicList} />
      <QuotationsList filterDay={updateDay} listTransactions={coinsList} />

      <StatusBar
        backgroundColor="#f50d41"
        barStyle="light-content"
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    paddingTop: Platform.OS === "android" ? 40 : 0,
  },
});
