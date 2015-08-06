import '../styles/main.less'
import React from 'react/addons';
const {PureRenderMixin} = React.addons;

import {
    StackedBarChart,
    LineChart
} from '../../src';

import statesData from './data/statesData.json';
import temperatureData from './data/dailyTemperature.json';


const tempDataClean = temperatureData.map(d => _.assign({}, d, {date: new Date(d.date)}));



const App = React.createClass({
    getInitialState() {
        return {
            hoveredLineChartData: null
        }
    },
    onMouseMoveLineChart(d, index, event) {
        this.setState({hoveredLineChartData: d})
    },
    render() {
        const {hoveredLineChartData} = this.state;
        return <div>
            <h1>Reactochart</h1>

            <h3>Timeseries Line Chart</h3>

            <div>
                {hoveredLineChartData ?
                    <div>
                        {hoveredLineChartData.date + ''}
                        <br/>
                        New York Temperature: {hoveredLineChartData.newYork}
                    </div>
                    : null
                }
                <div>
                </div>
                <LineChart
                    width={1000}
                    height={400}
                    data={tempDataClean}
                    plotKeys={['newYork']}
                    dateKey="date"
                    onMouseMove={this.onMouseMoveLineChart}
                />
            </div>

            <h3>Bar Chart</h3>

            <div>
                <StackedBarChart
                    data={statesData}
                    plotKeys={['a','b','c','d','e','f','g']}
                />
            </div>

            <div>
                <StackedBarChart
                    orientation="column"
                    data={statesData}
                    plotKeys={['a','b','c','d','e','f','g']}
                />
            </div>


        </div>
    }
});

React.render(<App />, document.getElementById('container'));

export default App;