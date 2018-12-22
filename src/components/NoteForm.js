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
    
    isChange=(event)=>{
        const name=event.target.name
        const value=event.target.value
      
        this.setState({
            [name]:value
        });
    
    }
    // for react thuan
    // addData=(title,content)=>{
    //     var item={}
    //     item.noteTitle=title
    //     item.noteContent=content
      
    //    this.props.getData(item)

    // }


    addData=(title,content)=>{
        if (this.state.id) { //sua du lieu
            console.log('dang sua du lieu')
            var editObject={}
            editObject.id=this.state.id
            editObject.noteTitle=this.state.noteTitle
            editObject.noteContent=this.state.noteContent

            this.props.editDataStore(editObject) // up du lieu vao store
            this.props.changeEditStatus() //tat form
            this.props.alertOn("Edit successfully","success") //thong bao on

            
        }
        else {  //add du lieu moi
            var item={}
            item.noteTitle=title
            item.noteContent=content
        
            this.props.addDataStore(item)
            this.props.alertOn("Add successfully ","success") //thong bao on
        }
        
    }

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
        <input defaultValue={this.props.editItem.noteTitle} type="text" onChange={(event)=>{this.isChange(event)}} className="form-control" name="noteTitle" id="noteTitle" aria-describedby="helpIdNoteTitle"  />
       
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
}

const mapStateToProps = (state, ownProps) => {
    return {
        editItem: state.editItem,
        isAdd:state.isAdd,
        alertContent:state.alertContent
    }
}
//this.props.test
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
//this.props.addDataStore()
 
export default connect(mapStateToProps, mapDispatchToProps)(NoteForm);

