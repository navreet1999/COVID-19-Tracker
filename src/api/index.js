import axios from 'axios';  //axios is used to make API request

//covid-19 api used for extracting the data regarding covid-19
const url = 'https://covid19.mathdro.id/api';

//this is fetchData function,which asyn function returning a response from the API
export const fetchData = async (country) => {
  let changeableUrl = url;

  if (country) {
    changeableUrl = `${url}/countries/${country}`;
  }

  //when api runs one object lots of data,but we want some few things from data,below we fetching the particular data from object
  try {
    const { data: { confirmed, recovered, deaths, lastUpdate } } = await axios.get(changeableUrl);

    //here we returning the modified data
    /*
    const modifiedData={
      confirmed=data.confirmed,
      recovered=data.recovered,
      deaths=data.deaths,
      lastUpadte=data.lastUpdate
    }

    as JS rules we write this as
    const modifiedData={
      confirmed,
      recovered,
      deaths,
      lastUpadte
    }

    and in below line we return this data directly
    */
    return { confirmed, recovered, deaths, lastUpdate };
  } 
  catch (error) {
    return error;
  }
};



export const fetchDailyData = async () => {
  try {
    const { data } = await axios.get(`${url}/daily`);

    /*const modified Data=data.map((dailyDta)=>({
      confirmed: dailyData.confirmed.total,
      deaths:dailyData.deaths.total,
      date:dailyData.reportDate,
    }))

    return modified data; 
    */
    return data.map(({ confirmed, deaths, reportDate: date }) => ({ confirmed: confirmed.total, deaths: deaths.total, date }));
  } catch (error) {
    return error;
  }
};

export const fetchCountries = async () => {
  try {
    const { data: { countries } } = await axios.get(`${url}/countries`);

    return countries.map((country) => country.name);
  } catch (error) {
    return error;
  }
};
