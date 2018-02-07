import React from 'react';
import PropTypes from 'prop-types';
import { scaleLinear } from 'd3-scale';
import { max } from 'd3-array';
import { select } from 'd3-selection';
import { line } from 'd3-shape';
import { axisBottom, axisLeft } from 'd3-axis';

class Graph extends React.Component {
  render() {
    const svg = select(this.node);

    const margin = {
      top: 20,
      bottom: 20,
      left: 20,
      right: 20,
    };

    const xScale = scaleLinear()
      .domain([1, max(this.props.data, d => d.gameweek)])
      .range([0, this.props.width]);

    const yScale = scaleLinear()
      .domain([0, max(this.props.data, d => d.value)])
      .range([0, this.props.height]);

    const sparkLine = line()
      .x(d => xScale(d.gameweek))
      .y(d => yScale(d.value));

    const linePath = sparkLine(this.props.data);

    const circlePoints = this.props.data.map(d => ({
      x: xScale(d.gameweek),
      y: yScale(d.value),
    }));

    const xAxis = axisBottom()
      .scale(xScale)
      .ticks(this.props.data.length);

    const yAxis = axisLeft()
      .scale(yScale)
      .ticks(10);

    return (
      <svg
        ref={(node) => { this.node = node; }}
        width={this.props.width + margin.left + margin.right}
        height={this.props.height + margin.top + margin.bottom}
      >
        <g style={{ transform: `translate(${margin.left}px, ${margin.right}px)` }}>
          <g className="line">
            <path d={linePath} />
          </g>
          <g className="scatter">
            {circlePoints.map(circlePoint => (
              <circle
                cx={circlePoint.x}
                cy={circlePoint.y}
                key={`${circlePoint.x},${circlePoint.y}`}
                r={4}
              />
            ))}
          </g>
          <g
            className="xAxis"
            ref={node => select(node).call(xAxis)}
            style={{
              transform: `translateY(${this.props.height}px)`,
            }}
          />
          <g className="yAxis" ref={node => select(node).call(yAxis)} />
        </g>
      </svg>
    );
  }
}

Graph.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({
    gameweek: PropTypes.number,
    value: PropTypes.number,
  })).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default Graph;
