import React from 'react'
import { connect } from 'react-redux'
import Drawer from 'material-ui/Drawer'

import AxisArrowEditor from '../AxisArrowEditor'
import TextBoxEditor from '../TextBoxEditor'
import RangeEditor from '../RangeEditor'

import { TOGGLE_EDIT_PANEL } from '../../actions'

import './style.css'

let EditPanel = ({ isOpen, type, onRequestClose }) => (
  <div >
    <Drawer
      docked={false}
      width='38.2%'
      openSecondary={true}
      open={isOpen}
      onRequestChange={onRequestClose}
      >
        {(() => {
          if (type === 'axisarrow') {
            return <AxisArrowEditor />
          } else if (type === 'textbox') {
            return <TextBoxEditor />
          } else if (type === 'range') {
            return <RangeEditor />
          }
        })()}
    </Drawer>
  </div>
)

const mapStateToProps = (state) => ({
  isOpen: state.ui.editPanel.open,
  type: state.ui.editPanel.incidentType
})

const mapDispatchToProps = (dispatch) => ({
  onRequestClose: () => {
    dispatch(TOGGLE_EDIT_PANEL())
  }
})

EditPanel = connect(
  mapStateToProps,
  mapDispatchToProps
)(EditPanel)



export default EditPanel
