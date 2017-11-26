import React, { Component } from 'react'
import { connect } from 'react-redux'
import { grey300, grey400, grey800 } from 'material-ui/styles/colors'
import { Group, Rect, Line } from 'react-konva'

import { INCIDENT_DRAGGED } from '../../actions'

import { timestampToX } from '../../utils'
import { dataToKanvaAttrForRange, konvaAttrToDataForRange, konvaAttrToDataAvoidAxisArrowForRange } from './positionCalculator'

import DateTimeMarkerOnAxisArrow from '../DateTimeMarkerOnAxisArrow'

export const RANGE_HEIGHT = 30
export const RANGE_BOUNDARY_WIDTH = 3

class Range extends Component {
  constructor(props) {
    super(props)
    const { start, end, aboveLine, scale, centralTime } = props
    this.state = {
      showTime: false,
      start,
      end,
      startX: timestampToX(start, scale, centralTime),
      endX: timestampToX(end, scale, centralTime),
      aboveLine
    }
    console.log(this.state)
  }

  onRectDragMove() {
    const { scale, centralTime, axisArrowLineWidth } = this.props
    const { x, y } = { x: this.canvasRect.x(), y: this.canvasRect.y() }
    const newPropsCalcFromKonvaAttr = konvaAttrToDataForRange(x, y, this.canvasRect.width(), RANGE_HEIGHT, scale, centralTime, axisArrowLineWidth)
    const { startCordLinePoints, endCordLinePoints } = dataToKanvaAttrForRange({
      ...this.props,
      ...newPropsCalcFromKonvaAttr
    })

    this.setState({
      showTime: true,
      start: newPropsCalcFromKonvaAttr.start,
      end: newPropsCalcFromKonvaAttr.end,
      startX: this.canvasRect.x(),
      endX: this.canvasRect.x() + this.canvasRect.width(),
      aboveLine: newPropsCalcFromKonvaAttr.aboveLine
    })

    this.canvasRect.x(x)
    this.canvasRect.y(y)
    this.startCord.points(startCordLinePoints)
    this.endCord.points(endCordLinePoints)
    this.startBoundary.x(this.canvasRect.x() - RANGE_BOUNDARY_WIDTH / 2)
    this.startBoundary.y(this.canvasRect.y())
    this.endBoundary.x(this.canvasRect.x() + this.canvasRect.width() - RANGE_BOUNDARY_WIDTH / 2)
    this.endBoundary.y(this.canvasRect.y())
  }

  onRectDragEnd() {
    const { scale, centralTime, axisArrowLineWidth } = this.props
    const { start, end, distance, aboveLine } = konvaAttrToDataAvoidAxisArrowForRange(this.canvasRect.x(), this.canvasRect.y(), this.canvasRect.width(), RANGE_HEIGHT, scale, centralTime, axisArrowLineWidth)
    this.props.dispatch(INCIDENT_DRAGGED(this.props.id, { start, end, distance, aboveLine }))
  }

  onBoundaryDragMove() {
    const { scale, centralTime, axisArrowLineWidth } = this.props

    const startBoundaryX = this.startBoundary.x() > this.endBoundary.x() ? this.endBoundary.x() : this.startBoundary.x()
    const endBoundaryX = this.startBoundary.x() > this.endBoundary.x() ? this.startBoundary.x() : this.endBoundary.x()
    const rectWidth = endBoundaryX - startBoundaryX

    const newPropsCalcFromKonvaAttr = konvaAttrToDataForRange(startBoundaryX + RANGE_BOUNDARY_WIDTH / 2, this.canvasRect.y(), rectWidth, RANGE_HEIGHT, scale, centralTime, axisArrowLineWidth)

    const { startCordLinePoints, endCordLinePoints } = dataToKanvaAttrForRange({
      ...this.props,
      ...newPropsCalcFromKonvaAttr
    })

    this.setState({
      showTime: true,
      start: newPropsCalcFromKonvaAttr.start,
      end: newPropsCalcFromKonvaAttr.end,
      startX: startBoundaryX + RANGE_BOUNDARY_WIDTH / 2,
      endX: endBoundaryX + RANGE_BOUNDARY_WIDTH / 2
    })

    this.canvasRect.x(startBoundaryX + RANGE_BOUNDARY_WIDTH / 2)
    this.canvasRect.width(rectWidth)
    this.startCord.points(startCordLinePoints)
    this.endCord.points(endCordLinePoints)
    this.startBoundary.x(startBoundaryX)
    this.endBoundary.x(endBoundaryX)
  }

  onBoundaryDragEnd() {
    const { scale, centralTime, axisArrowLineWidth } = this.props

    const startBoundary = this.startBoundary.x() > this.endBoundary.x() ? this.endBoundary : this.startBoundary
    const endBoundary = this.startBoundary.x() > this.endBoundary.x() ? this.startBoundary : this.endBoundary
    const rectWidth = endBoundary.x() - startBoundary.x()

    const { start, end, distance, aboveLine } = konvaAttrToDataAvoidAxisArrowForRange(startBoundary.x() + RANGE_BOUNDARY_WIDTH / 2, this.canvasRect.y(), rectWidth, RANGE_HEIGHT, scale, centralTime, axisArrowLineWidth)
    this.props.dispatch(INCIDENT_DRAGGED(this.props.id, { start, end, distance, aboveLine }))
  }

  onMouseOver() {
    this.onRectDragMove()
    this.setState({
      showTime: true
    })
  }

  onMouseOut() {
    this.setState({
      showTime: false
    })
  }

  render() {
    const { rectX, rectY, rectWidth, startCordLinePoints, endCordLinePoints } = dataToKanvaAttrForRange(this.props)

    return (
      <Group>
        <Rect
          x={rectX}
          y={rectY}
          stroke={grey300}
          strokeWidth={0.5}
          width={rectWidth}
          height={RANGE_HEIGHT}
          cornerRadius={0}
          fill={grey300}
          draggable={true}
          ref={(rect) => {this.canvasRect = rect}}
          onDragMove={this.onRectDragMove.bind(this)}
          onDragEnd={this.onRectDragEnd.bind(this)}
          // onClick={this.onClick.bind(this)}
          // onTap={this.onClick.bind(this)}
          onMouseOver={this.onMouseOver.bind(this)}
          onMouseOut={this.onMouseOut.bind(this)}
        />
        <Rect
          x={rectX - RANGE_BOUNDARY_WIDTH / 2}
          y={rectY}
          stroke={grey800}
          strokeWidth={RANGE_BOUNDARY_WIDTH / 2}
          width={RANGE_BOUNDARY_WIDTH}
          height={RANGE_HEIGHT}
          cornerRadius={0}
          fill={grey800}
          draggable={true}
          ref={(rect) => {this.startBoundary = rect}}
          onDragMove={this.onBoundaryDragMove.bind(this)}
          onDragEnd={this.onBoundaryDragEnd.bind(this)}
          onMouseOver={this.onMouseOver.bind(this)}
          onMouseOut={this.onMouseOut.bind(this)}
        />
        <Rect
          x={rectX + rectWidth - RANGE_BOUNDARY_WIDTH / 2}
          y={rectY}
          stroke={grey800}
          strokeWidth={RANGE_BOUNDARY_WIDTH / 2}
          width={RANGE_BOUNDARY_WIDTH}
          height={RANGE_HEIGHT}
          cornerRadius={0}
          fill={grey800}
          draggable={true}
          ref={(rect) => {this.endBoundary = rect}}
          onDragMove={this.onBoundaryDragMove.bind(this)}
          onDragEnd={this.onBoundaryDragEnd.bind(this)}
          onMouseOver={this.onMouseOver.bind(this)}
          onMouseOut={this.onMouseOut.bind(this)}
        />
        <Line
          points={startCordLinePoints}
          stroke={grey400}
          strokeWidth={0.5}
          ref={(line) => {this.startCord = line}}
        />
        <Line
          points={endCordLinePoints}
          stroke={grey400}
          strokeWidth={0.5}
          ref={(line) => {this.endCord = line}}
        />
        <DateTimeMarkerOnAxisArrow
          visible={this.state.showTime}
          when={this.state.start}
          midPoint={this.state.startX}
          aboveLine={!this.state.aboveLine}
        />
        <DateTimeMarkerOnAxisArrow
          visible={this.state.showTime}
          when={this.state.end}
          midPoint={this.state.endX}
          aboveLine={!this.state.aboveLine}
        />
      </Group>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  scale: state.data.axisArrow.scale,
  centralTime: state.data.axisArrow.centralTime,
  axisArrowLineWidth: state.data.axisArrow.lineWidth,
})

Range = connect(
  mapStateToProps,
  null
)(Range)
export default Range
