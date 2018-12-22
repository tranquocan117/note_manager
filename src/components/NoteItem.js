import React, { Component } from 'react';
import { connect } from 'react-redux';

class NoteItem extends Component {

    twoAction=()=>{
      this.props.changeEditStatus()
      //ham lay noi dung truyen vao store
     this.props.getEditData(this.props.note)
     this.props.changeAddStatus()
    }

    deleteData=()=>{
      console.log(this.props.note.id)
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
}


const mapStateToProps = (state, ownProps) => {
  return {
    isEdit: state.isEdit
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeEditStatus: () => {
      dispatch({type:'CHANGE_EDIT_STATUS'})
    },
    getEditData: (editObject) => {
      dispatch({type:'GET_EDIT_DATA',editObject})
    },
    getDeleteData: (deleteId) => {
      dispatch({type:'DELETE',deleteId})
    },
    changeAddStatus: () => {
      dispatch({type:'CHANGE_ADD_STATUS'})
    },
    alertOn: (AlertContent) => {
      dispatch({type:'ALERT_ON',AlertContent})
    },
    alertOff: () => {
      dispatch({type:'ALERT_OFF'})
    }
   
}
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteItem);
