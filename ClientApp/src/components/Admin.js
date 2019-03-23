import React, { Component } from 'react';
import {DashboardHubService, DashboardHubMessages} from '../services/DashboardHubService';

function getRandomData() {
    return new Array(100).fill(0).map(row => ({
      x: Math.random() * 10,
      y: Math.random() * 20,
      size: Math.random() * 10,
      color: Math.random() * 10,
      opacity: Math.random() * 0.5 + 0.5
    }));
  }

  const colorRanges = {
    typeA: ['#59E4EC', '#0D676C'],
    typeB: ['#EFC1E3', '#B52F93']
  };

export class Admin extends Component {

    constructor (props) {
        super(props);
        this.state = { 
            ticker: "",
            colors: "typeA"
            }; 
            
        this.updateLineChart = this.updateLineChart.bind(this);
        this.updatePlotData = this.updatePlotData.bind(this);
        this.updatePlotColor = this.updatePlotColor.bind(this);
        this.updateTicker = this.updateTicker.bind(this);

        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount = () => {   
    }


    handleChange(event) {
        this.setState({ticker: event.target.value});
    }

    updateLineChart(){       
    }

    updatePlotData(){
        var data = getRandomData();
        DashboardHubService.sendMessage(DashboardHubMessages.updateData,data);
    }

    updatePlotColor(){
        var newColor =  this.state.colors === 'typeA'? 'typeB': 'typeA';
        this.setState({colors:newColor});
        DashboardHubService.sendMessage(DashboardHubMessages.updateColor, newColor);
    }

    updateTicker(){
        DashboardHubService.sendMessage(DashboardHubMessages.updateTicker, this.state.ticker);
    }

  render () {
    return (
      <div>
        <h1>Dashboard Admin</h1>
           <p>Send updates to currently connected clients</p>

            <div className="form-group row">
                <label className="col-sm-2 col-form-label">Scatter Plot</label>
                <div className="col-sm-10">
                    <button className="btn btn-primary" onClick={this.updatePlotData}>Update Data</button>&nbsp;
                    <button className="btn btn-primary" onClick={this.updatePlotColor}>Change Color</button>
                </div>
            </div>
            
            <div className="form-group row">
                <div className="col-sm-2">Ticker</div>
                <div className="col-sm-6">
                    <select className="form-control" value={this.state.ticker}  onChange={this.handleChange} >
                        <option value="NASDAQ:MSFT">MSFT</option>
                        <option value="NASDAQ:AAPL">AAPL</option>
                        <option value="COINBASE:BTCUSD">BTC</option>
                        <option value="COINBASE:ETHUSD">ETH</option>                            
                    </select>
                </div>
                <div className="col-sm-4">
                        <button className="btn btn-primary" onClick={this.updateTicker}>Change Ticker</button> 
                </div>
            </div>
      </div>
    );
  }
}