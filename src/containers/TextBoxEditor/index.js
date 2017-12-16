import React from 'react'
import { connect } from 'react-redux'
import Paper from 'material-ui/Paper'
import Slider from 'material-ui/Slider'
import RaisedButton from 'material-ui/RaisedButton'
import TextField from 'material-ui/TextField'
import Checkbox from 'material-ui/Checkbox'

import { DUPLICATE_THIS_INCIDENT, DELETE_THIS_INCIDENT, TEXT_ON_TEXT_BOX_EDITOR_CHANGE, CONFIG_ON_TEXT_BOX_EDITOR_CHANGE } from '../../actions'

import './style.css'

let TextBoxEditor = ({ incident, onDuplicate, onDelete, onTextChange, onConfigChange }) => (
  <div>
    <div className="Title">
      <h2>Text Box</h2>
    </div>
    <RaisedButton label="Duplicate" className="Button" onClick={() => onDuplicate(incident.id)} />
    <RaisedButton label="Delete" className="Button" onClick={() => onDelete(incident.id)} />

    <Paper className="Card">
      <span> Text </span>
      <TextField
        hintText='Text here ...'
        multiLine={true}
        rows={2}
        rowsMax={20}
        value={incident.text}
        fullWidth={true}
        onChange={(e, newText) => onTextChange(incident.id, newText)}
    />
    </Paper>

    <Paper className="Card">
      <span> Box Width </span>
      <Slider className="Slider"/>
    </Paper>

    <Paper className="Card">
      <span> Font Size </span>
      <Slider className="Slider"/>
    </Paper>

    <Paper className="Card">
      <Checkbox
        label="Display Border"
        checked={incident.displayBorder}
        onCheck={(e, isChecked) => onConfigChange(incident.id, isChecked ? { displayBorder: true } : { attachCord: false, displayBorder: false } )}
      />
    </Paper>

    <Paper className="Card">
      <span> Border Width </span>
      <Slider className="Slider"/>
    </Paper>

    <Paper className="Card">
      <Checkbox
        label="Attach Cord"
        checked={incident.attachCord}
        onCheck={(e, isChecked) => onConfigChange(incident.id, isChecked ? { attachCord: true, displayBorder: true } : { attachCord: false })}
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
  onTextChange: (id, text) => {
    dispatch(TEXT_ON_TEXT_BOX_EDITOR_CHANGE(id, text))
  },
  onConfigChange: (id, newConfig) => {
    console.log(newConfig)
    dispatch(CONFIG_ON_TEXT_BOX_EDITOR_CHANGE(id, newConfig))
  }
})

TextBoxEditor = connect(
  mapStateToProps,
  mapDispatchToProps
)(TextBoxEditor)


export default TextBoxEditor
