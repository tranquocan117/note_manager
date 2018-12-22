import React, { Component } from 'react';
import { connect } from 'react-redux';

class NoteForm extends Component {

    constructor(props) {
        super(props);
        this.state={
            noteTitle:'',
            noteContent:'',
            id:''
        }
    }

    componentWillMount() {
        if (this.props.editItem){
            //edit case
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

    //click to Add button 
    addData=(title,content)=>{
        // if id is not empty => edit note
        if (this.state.id) { 
            var editObject={}
            editObject.id=this.state.id
            editObject.noteTitle=this.state.noteTitle
            editObject.noteContent=this.state.noteContent

            this.props.editDataStore(editObject) // up du lieu vao store
            this.props.changeEditStatus() //tat form
            this.props.alertOn("Edit successfully","success") //thong bao on

            
        }
        // if id is not empty => add new note
        else { 
            var item={}
            item.noteTitle=title
            item.noteContent=content
            // transfer var of item to store 
            this.props.addDataStore(item)
            this.props.alertOn("Add successfully ","success") //thong bao on
        }
        
    }
    // to print title Add Note or Edit Note
    printTitle=()=>{
        if (this.props.isAdd) {
            return <h4>Add Note</h4>
        }
        else {
            return <h4>Edit Note</h4>
        }
    }

    render() {
        return (
            <div className="col-4">
                {this.printTitle()}
                <form>
                    <div className="form-group">
                        <label htmlFor="noteTitle">Note Title</label>
                        <input defaultValue={this.props.editItem.noteTitle} onChange={(event)=>{this.isChange(event)}} type="text" className="form-control" name="noteTitle" id="noteTitle" aria-describedby="helpIdNoteTitle"  />
                    
                    </div>
                    <div className="form-group">
                        <label htmlFor="noteContent">Note Content</label>
                        <textarea defaultValue={this.props.editItem.noteContent} onChange={(event)=>{this.isChange(event)}} className="form-control" name="noteContent" id="noteContent" rows={5}  />
                    </div>
                    <button type="reset" onClick={()=>this.addData(this.state.noteTitle,this.state.noteContent)} className="btn btn-primary btn-block">Save</button>
                </form>
            </div>
        );
    }

}// end class NoteForm

const mapStateToProps = (state, ownProps) => {
    return {
        editItem: state.editItem,
        isAdd:state.isAdd,
        alertContent:state.alertContent
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addDataStore: (getItem) => {
            dispatch({type:'ADD_DATA',getItem})
        },
        editDataStore: (getItem) => {
            dispatch({type:'EDIT',getItem})
        },
        changeEditStatus: () => {
            dispatch({type:'CHANGE_EDIT_STATUS'})
          },
        alertOn: (AlertContent,alertType) => {
            dispatch({type:'ALERT_ON',AlertContent,alertType})
        }, 
       
        alertOff: () => {
            dispatch({type:'ALERT_OFF'})
          }
       
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(NoteForm);

