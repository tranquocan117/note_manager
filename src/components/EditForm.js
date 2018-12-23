import React, { Component } from 'react';
import { connect } from 'react-redux';

class EditForm extends Component {

    constructor(props) {
        super(props);
        this.state={
            noteTitle:'',
            noteContent:'',
            id:''
        }
    }
    // get data of note before editting
    componentWillMount() {
        if (this.props.editItem){
            this.setState({
                noteTitle:this.props.editItem.noteTitle,
                noteContent:this.props.editItem.noteContent,
                id:this.props.editItem.id
            });
        }
    }

    // get data from form, then save into state
    isChange=(event)=>{
        const name=event.target.name
        const value=event.target.value
        this.setState({
            [name]:value
        });
    }

    //click Save
    editData=(title,content)=>{
        var editObject={}
        editObject.id=this.state.id
        editObject.noteTitle=this.state.noteTitle
        editObject.noteContent=this.state.noteContent
        // transfer data of editObject to store
        this.props.editDataStore(editObject) 
        // alert on
        this.props.alertOn("Edited successfully","success") 
        //change edit status
        this.props.changeEditStatus() 
    }

    render() {
        return (
            <div className="col-4">
                <h4>Edit Note</h4>
                <form>
                    <div className="form-group">
                        <label htmlFor="noteTitle">Note Title</label>
                        <input defaultValue={this.props.editItem.noteTitle} onChange={(event)=>{this.isChange(event)}} type="text" className="form-control" name="noteTitle" id="noteTitle" aria-describedby="helpIdNoteTitle"  />
                    </div>
                    <div className="form-group">
                        <label htmlFor="noteContent">Note Content</label>
                        <textarea defaultValue={this.props.editItem.noteContent} onChange={(event)=>{this.isChange(event)}} className="form-control" name="noteContent" id="noteContent" rows={5}  />
                    </div>
                    <button type="reset" onClick={()=>this.editData(this.state.noteTitle,this.state.noteContent)} className="btn btn-primary btn-block">Save</button>
                </form>
            </div>
        );
    }
}// end class EditForm

const mapStateToProps = (state, ownProps) => {
    return {
        editItem: state.editItem,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        editDataStore: (getItem) => {
            dispatch({type:'EDIT',getItem})
        },
        changeEditStatus: () => {
            dispatch({type:'CHANGE_EDIT_STATUS'})
          },
        alertOn: (AlertContent,alertType) => {
            dispatch({type:'ALERT_ON',AlertContent,alertType})
        } 
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(EditForm);

