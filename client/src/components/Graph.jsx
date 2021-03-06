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
      top: 50,
      bottom: 50,
      left: 50,
      right: 50,
    };

    const xMax = max(this.props.data.map(player => player.data.length + 1));
    const xScale = scaleLinear()
      .domain([1, xMax])
      .range([0, this.props.width]);

    const yMax = max(this.props.data.map(player => max(player.data, d => d.value)));
    const yScale = scaleLinear()
      .domain([0, yMax])
      .range([this.props.height, 0]);

    const sparkLine = line()
      .x(d => xScale(d.gameweek))
      .y(d => yScale(d.value));

    const linePaths = this.props.data.map(player => sparkLine(player.data));

    const circlePointSets = this.props.data.map(player => (
      player.data.map(d => ({
        x: xScale(d.gameweek),
        y: yScale(d.value),
      }))));

    const xAxis = axisBottom()
      .scale(xScale)
      .ticks(xMax);

    const yAxis = axisLeft()
      .scale(yScale)
      .ticks(yMax < 10 ? yMax : 10);

    return (
      <svg
        ref={(node) => { this.node = node; }}
        width={this.props.width + margin.left + margin.right}
        height={this.props.height + margin.top + margin.bottom}
      >
        <g style={{ transform: `translate(${margin.left}px, ${margin.right}px)` }}>
          <g className="line">
            { linePaths.map((linePath, i) => (
              <path d={linePath} style={{ stroke: this.props.data[i].color }} />
            ))}
          </g>
          <g className="scatter">
            {circlePointSets.map((circlePointSet, i) => (
              circlePointSet.map(circlePoint => (
                <circle
                  cx={circlePoint.x}
                  cy={circlePoint.y}
                  key={`${circlePoint.x},${circlePoint.y}`}
                  r={4}
                  style={{ fill: this.props.data[i].color }}
                />
              ))))
            }
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
    color: PropTypes.string,
    data: PropTypes.arrayOf(PropTypes.shape({
      gameweek: PropTypes.number,
      value: PropTypes.number,
    })),
  })).isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default Graph;
