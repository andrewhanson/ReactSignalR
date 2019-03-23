import React, {Component} from 'react';
import {DashboardHubService, DashboardHubMessages} from '../../services/DashboardHubService';

import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  MarkSeries,
  MarkSeriesCanvas,
  Hint
} from 'react-vis';

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

const randomData = getRandomData();

export class ScatterPlot extends Component {
  state = {
    drawMode: 0,
    data: randomData,
    colorType: 'typeA',
    value: false
  };

  constructor(props){
    super(props);

    this.onColorChange = this.onColorChange.bind(this);
    this.onDataChange = this.onDataChange.bind(this);
  }

  componentDidMount = () => {  
      DashboardHubService.registerMessageHandler(DashboardHubMessages.onColorChange, this.onColorChange);
      DashboardHubService.registerMessageHandler(DashboardHubMessages.onDataChange, this.onDataChange); 
  }

  componentWillUnmount = () => {
    DashboardHubService.unRegisterMessageHandler(DashboardHubMessages.onColorChange, this.onColorChange);
    DashboardHubService.unRegisterMessageHandler(DashboardHubMessages.onDataChange, this.onDataChange);      
  }

  onColorChange(colorType){
    this.setState({colorType: colorType})
  }
  
  onDataChange(data){
    console.log('data changed', data);
    this.setState({data: data[0]})
  }

  render() {
    const {drawMode, data, colorType} = this.state;
    const markSeriesProps = {
      animation: true,
      className: 'mark-series-example',
      sizeRange: [5, 15],
      seriesId: 'my-example-scatterplot',
      colorRange: colorRanges[colorType],
      opacityType: 'literal',
      data,
      onNearestXY: value => this.setState({value})
    };

    const mode = 'canvas';
    return (
      <div className="canvas-wrapper">
        <div className="canvas-example-controls">         
        </div>
        <XYPlot
          onMouseLeave={() => this.setState({value: false})}
          width={600}
          height={300}
        >
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis />
          <YAxis />
          {mode === 'canvas' && <MarkSeriesCanvas {...markSeriesProps} />}
          {mode === 'svg' && <MarkSeries {...markSeriesProps} />}
          {this.state.value ? <Hint value={this.state.value} /> : null}
        </XYPlot>
      </div>
    );
  }
}