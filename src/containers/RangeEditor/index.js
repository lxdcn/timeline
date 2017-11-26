import React from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'

import { DUPLICATE_THIS_INCIDENT, DELETE_THIS_INCIDENT, TEXT_ON_TEXT_BOX_EDITOR_CHANGE } from '../../actions'


let RangeEditor = ({ incident, onDuplicate, onDelete, onChange }) => (
  <div>
    <div className="Title">
      <h3>Text Box</h3>
    </div>
    <RaisedButton label="Duplicate" className="Button" onClick={() => onDuplicate(incident.id)} />
    <RaisedButton label="Delete" className="Button" onClick={() => onDelete(incident.id)} />

    <Paper className="Card">
      <span> Range </span>
      <TextField
        hintText='Text here ...'
        multiLine={true}
        rows={2}
        rowsMax={20}
        value={incident.text}
        fullWidth={true}
        onChange={(e, newText) => onChange(incident.id, newText)}
    />
    </Paper>
  </div>
)

const mapStateToProps = (state) => ({
  incident: state.data.incidents.filter(incident => incident.id === state.ui.editPanel.incidentId)[0]
})

const mapDispatchToProps = (dispatch) => ({
  onDelete: (id) => {
    dispatch(DELETE_THIS_INCIDENT(id))
  },
  onDuplicate: (id) => {
    dispatch(DUPLICATE_THIS_INCIDENT(id))
  },
  onChange: (id, text) => {
    dispatch(TEXT_ON_TEXT_BOX_EDITOR_CHANGE(id, text))
  }
})

RangeEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(RangeEditor)


export default RangeEditor