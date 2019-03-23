import React, { Component } from 'react';
import TradingViewWidget, { Themes,IntervalTypes } from 'react-tradingview-widget';

export class StockWidget extends Component {
  
    constructor(props){
        super(props);        
    }
    render () {
        return (
              
            <TradingViewWidget
                symbol={this.props.ticker}
                theme={Themes.DARK}
                locale="en"
                interval={IntervalTypes.H}
                height="600"
            />    
        );
    }
}
