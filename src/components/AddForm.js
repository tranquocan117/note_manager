import React, { Component } from 'react';
import { connect } from 'react-redux';

class AddForm extends Component {

    constructor(props) {
        super(props);
        this.state={
            noteTitle:'',
            noteContent:''           
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
    addData=(title,content)=>{
        var item={}
        item.noteTitle=title
        item.noteContent=content
        // transfer var of item to store 
        this.props.addDataStore(item)
        //alert on
        this.props.alertOn("Added successfully ","success") 
        //change add status
        this.props.changeAddStatus()
    }

    render() {
        return (
            <div className="col-4">
                <h4>Add Note</h4>
                <form>
                    <div className="form-group">
                        <label htmlFor="noteTitle">Note Title</label>
                        <input onChange={(event)=>{this.isChange(event)}} type="text" className="form-control" name="noteTitle" id="noteTitle" aria-describedby="helpIdNoteTitle"  />
                    </div>
                    <div className="form-group">
                        <label htmlFor="noteContent">Note Content</label>
                        <textarea onChange={(event)=>{this.isChange(event)}} className="form-control" name="noteContent" id="noteContent" rows={5}  />
                    </div>
                    <button type="reset" onClick={()=>this.addData(this.state.noteTitle,this.state.noteContent)} className="btn btn-primary btn-block">Save</button>
                </form>
            </div>
        );
    }
}// end class AddForm

const mapStateToProps = (state, ownProps) => {
    return {
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        changeAddStatus: () => {
            dispatch({type:'CHANGE_ADD_STATUS'})
        },
        addDataStore: (getItem) => {
            dispatch({type:'ADD_DATA',getItem})
        },
        alertOn: (AlertContent,alertType) => {
            dispatch({type:'ALERT_ON',AlertContent,alertType})
        }
    }
}
 
export default connect(mapStateToProps, mapDispatchToProps)(AddForm);

