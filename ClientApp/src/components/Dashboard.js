import React, { Component } from 'react';
import 'react-vis/dist/style.css';
import {LineChartWidget} from './Widgets/LineChartWidget';
import {ScatterPlot} from './Widgets/ScatterPlotWidget';
import {StockWidget} from './Widgets/StockWidget';
import {DashboardHubService, DashboardHubMessages} from '../services/DashboardHubService';


export class Dashboard extends Component {
  
    constructor(props){
        super(props);
        this.state = {
            ticker: "NASDAQ:MSFT",
        };

        this.handleChange = this.handleChange.bind(this);
        this.onTickerChange = this.onTickerChange.bind(this);
    }

    componentDidMount = () => {    
        DashboardHubService.registerMessageHandler(DashboardHubMessages.onTickerChange, this.onTickerChange);
    }

    componentWillUnmount = () =>{
        DashboardHubService.unRegisterMessageHandler(DashboardHubMessages.onTickerChange, this.onTickerChange);
    }


    handleChange(event) {
        this.setState({ticker: event.target.value});
    }

    onTickerChange(ticker){
        this.setState({ticker: ticker});
    }

    render () {

        return (
            <div>
                <h1>Realtime Dashboard</h1>
                <p>Welcome to your dashboard, built with <a href="https://reactjs.org">Reactjs</a> and <a href="https://uber.github.io/react-vis/">React-Vis</a>:</p>

                <div className="row">
                    <div className="col-sm-6">
                        <h3>Network Issues</h3>
                       <LineChartWidget/>
                    </div>
                    <div className="col-sm-6">
                        <h3>User Sentiment</h3>
                        <ScatterPlot/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <h2>Ticker to Watch</h2>
                        <StockWidget ticker={this.state.ticker}/>
                    </div>
                </div>
            </div>        
        );
    }
}
