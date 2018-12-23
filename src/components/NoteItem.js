import React, { Component } from 'react';
import { connect } from 'react-redux';

class NoteItem extends Component {
    // click Edit button  
    twoAction=()=>{
      // change isEdit state from true to false or conversely
      this.props.changeEditStatus()
      //transfer data of note into store
      this.props.getEditData(this.props.note)
      // // change isAdd state from true to false or conversely
      // this.props.changeAddStatus()
    }

    // click Delete button 
    deleteData=()=>{
      //transfer id of note to store
      this.props.getDeleteData(this.props.note.id)
      this.props.alertOn('Delete Note "'+ this.props.note.noteTitle +'" successfully', "danger")
    }
   
    render() {
        return (
          <div className="card">
              <div className="card-header" role="tab" id="note1">
                <h5 className="mb-0">
                  <a data-toggle="collapse" data-parent="#noteList" href={"#number"+this.props.i} aria-expanded="true" aria-controls="noteContent1">
                      {this.props.noteTitle}
                  </a>
                  <div className="btn-group float-right">
                      <button onClick={()=>this.twoAction()} className="btn btn-outline-info">Edit</button>
                      <button onClick={()=>this.deleteData()}className="btn btn-outline-primary">Delete</button>
                  </div>
                </h5>
              </div>
              <div id={"number"+this.props.i} className="collapse in" role="tabpanel" aria-labelledby="note1">
                  <div className="card-body">
                    {this.props.noteContent}
                  </div>
              </div>
          </div>
        );
    }

}// end NoteItem

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeAddStatus: () => {
      dispatch({type:'CHANGE_ADD_STATUS'})
    },
    changeEditStatus: () => {
      dispatch({type:'CHANGE_EDIT_STATUS'})
    },
    getEditData: (editObject) => {
      dispatch({type:'GET_EDIT_DATA',editObject})
    },
    getDeleteData: (deleteId) => {
      dispatch({type:'DELETE',deleteId})
    },
    alertOn: (AlertContent,alertType) => {
      dispatch({type:'ALERT_ON',AlertContent,alertType})
    },
    alertOff: () => {
      dispatch({type:'ALERT_OFF'})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteItem);
