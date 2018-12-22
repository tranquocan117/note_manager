import React, { Component } from 'react';
import NoteItem from './NoteItem';
import { noteData } from './firebaseConnect';

class NoteList extends Component {

  constructor(props) {
    super(props);
    this.state={
      dataFirebase:[]
    }
  }
  
  // get data from table of noteData
  componentWillMount() {
    noteData.on('value',(notes)=>{
      var arrayData=[]
      // push every note into arrayData
      notes.forEach((element)=>{
        const key=element.key
        const noteTitle=element.val().noteTitle
        const noteContent=element.val().noteContent
        arrayData.push({id:key,noteTitle:noteTitle,noteContent:noteContent})

      })
      // save arrayData to state of dataFirebase
      this.setState({
        dataFirebase:arrayData
      });
    })
  }

  // get data from state of dataFirebase, then transfer it into component NoteItem
  getData=()=>{
    if(this.state.dataFirebase)
      {
        return  this.state.dataFirebase.map((value,key)=>{
                  return (
                    <NoteItem key={key} 
                              i={key}
                              note={value}
                              noteTitle={value.noteTitle}
                              noteContent={value.noteContent}>
                    </NoteItem>
                  )
                })
      }
  }

  render() {
      return (
        <div className="col">
          <div id="noteList" role="tablist" aria-multiselectable="true">
                  {this.getData()}
          </div>
        </div>
      );
  }

} //end NoteList

export default NoteList;