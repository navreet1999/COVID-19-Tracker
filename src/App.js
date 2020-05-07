import React from 'react';

import { Cards, CountryPicker, Chart } from './components';
import { fetchData } from './api/';   //here no need to give path api/index bcz when the file name is index it automatically access this when u give the folder name

import styles from './App.module.css';

import image from './images/image.png';

class App extends React.Component {
  state = {
    data: {},
    country: '',
  }

  // componentDidMount is best for fetching the data
  async componentDidMount() 
  {
    //this line make a request to api.js and fetching the relvant data
    const fetchdata = await fetchData();   //await is used when we dealing with as
                                      // (we waiting for the data that is going to be returned from our function)

    this.setState({ data:fetchdata });
         //as we write in the code we want to fetch some particular info of data,this print the data in the console 
  }

  handleCountryChange = async (country) => {
    const data = await fetchData(country);

    this.setState({ data, country: country });
  }

  render() {
    const { data, country } = this.state;

    return (
      <div className={styles.container}>
        <img className={styles.image} src={image} alt="COVID-19" />
        <Cards data={data} />  
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} /> 
      </div>
    );
  }
}

export default App;