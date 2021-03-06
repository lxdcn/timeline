const initialState = {
  editable: false,
  editId: null,
  viewId: null,
  redirect: false,
  editPanel: {
    open: false,
    incidentType: '',
    incidentId: 0,
    openFromRight: true
  },
  contextMenu: {
    open: false,
    mouseX: 0,
    mouseY: 0,
    eventTimestamp: 0
  },
  restRequest: {
    isFetching: false
  },
  banner: {
    message: '',
  },
  forkDialog: {
    show: false
  },
  shareDialog: {
    show: false
  }
}


const ui = (state = initialState, action) => {
  switch (action.type) {
    case 'TOGGLE_EDIT_PANEL':
      return {
        ...state,
        editPanel: {
          open: !state.editPanel.open,
          incidentType: action.editType,
          incidentId: action.id,
          openFromRight: action.clickOnLeftHalfScreen
        }
      }
    case 'SHOW_CONTEXT_MENU':
      return {
        ...state,
        contextMenu: {
          open: true,
          mouseX: action.mouseX,
          mouseY: action.mouseY,
          eventTimestamp: action.eventTimestamp
        }
      }
    case 'CLOSE_CONTEXT_MENU_IF_ANY':
      return {
        ...state,
        contextMenu: {
          open: false,
          mouseX: 0,
          mouseY: 0
        }
      }
    case 'REQUESTING_LINE':
      return {
        ...state,
        restRequest: {
          ...state.restRequest,
          isFetching: true
        }
      }
    case 'DISPLAY_BANNER_MESSAGE':
      return {
        ...state,
        banner: {
          message: action.message
        }
      }
    case 'OPEN_FORK_DIALOG':
      return {
        ...state,
        forkDialog: {
          show: true
        }
      }
    case 'CLOSE_FORK_DIALOG':
      return {
        ...state,
        forkDialog: {
          show: false
        }
      }
    case 'OPEN_SHARE_DIALOG':
      return {
        ...state,
        shareDialog: {
          show: true
        }
      }
    case 'CLOSE_SHARE_DIALOG':
      return {
        ...state,
        shareDialog: {
          show: false
        }
      }
    case 'REDIRECT_FINISH':
      return {
        ...state,
        redirect: false
      }
    default:
      return state
  }
}

export default ui
