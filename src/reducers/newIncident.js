import { konvaAttrToDataForTextBox } from '../containers/TextBox/positionCalculator'
import { konvaAttrToDataForRange } from '../containers/Range/positionCalculator'
import { konvaAttrToDataForMilestone } from '../containers/Milestone/positionCalculator'

const TEXT_BOX_DEFAULT_WIDTH = 200
const TEXT_BOX_DEFAULT_HEIGHT = 38
const TEXT_BOX_DEFAULT_FONT_SIZE = 18
const TEXT_BOX_DEFAULT_BORDER_WIDTH = 1.08
const newTextBox = (x, y, incidentType, nextIncidentId, scale, centralTime) => {
  const { distance, aboveLine, when } = konvaAttrToDataForTextBox(x, y, TEXT_BOX_DEFAULT_WIDTH, TEXT_BOX_DEFAULT_HEIGHT, scale, centralTime)
  return {
    id: nextIncidentId,
    when,
    type: incidentType,
    text: 'TextBox',
    width: TEXT_BOX_DEFAULT_WIDTH,
    fontSize: TEXT_BOX_DEFAULT_FONT_SIZE,
    height: TEXT_BOX_DEFAULT_HEIGHT,
    displayBorder: true,
    borderWidth: TEXT_BOX_DEFAULT_BORDER_WIDTH,
    distance,
    aboveLine,
    attachCord: true
  }
}


const RANGE_BOX_DEFAULT_WIDTH = 200
const RANGE_DEFAULT_FONT_SIZE = 18
const newRange = (x, y, incidentType, nextIncidentId, scale, centralTime, axisArrowLineWidth) => {
  const { start, end, distance, aboveLine } = konvaAttrToDataForRange(x, y, RANGE_BOX_DEFAULT_WIDTH, scale, centralTime, axisArrowLineWidth)
  return {
    id: nextIncidentId,
    type: incidentType,
    text: 'Ranger',
    fontSize: RANGE_DEFAULT_FONT_SIZE,
    start,
    end,
    distance,
    aboveLine
  }
}

const newMilestone = (x, y, incidentType, nextIncidentId, scale, centralTime, axisArrowLineWidth) => {
  const { when, distance, aboveLine } = konvaAttrToDataForMilestone(x, y, scale, centralTime, axisArrowLineWidth)
  return {
    id: nextIncidentId,
    type: incidentType,
    when,
    distance,
    aboveLine
  }
}


export const newIncidentData = (x, y, incidentType, nextIncidentId, { scale, centralTime, lineWidth }) => {
  if (incidentType === 'textbox') {
    return newTextBox(x, y, incidentType, nextIncidentId, scale, centralTime)
  } else if (incidentType === 'range'){
    return newRange(x, y, incidentType, nextIncidentId, scale, centralTime, lineWidth)
  } else if (incidentType === 'milestone'){
    return newMilestone(x, y, incidentType, nextIncidentId, scale, centralTime, lineWidth)
  }
}
