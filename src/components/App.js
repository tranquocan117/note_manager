import React, { Component } from 'react';
import './../css/App.css';
import Nav from './Nav';
import NoteList from './NoteList';
import { connect } from 'react-redux';
import AlertInfo from './AlertInfo';
import AddForm from './AddForm';
import EditForm from './EditForm';

class App extends Component {

  constructor(props) {
    super(props);
    this.state={}
  }
  
  showForm=()=>{
    if (this.props.isAdd) {
      return <AddForm/>
    }
    if (this.props.isEdit){
      return <EditForm/>
    }
  }

  render() {
    return (
      <div>
          <Nav/>
          <AlertInfo/>
          <div className="container">
            <div className="row">
              <NoteList/>
              {this.showForm()}
            </div>
          </div>
     </div> 
    );
  }

}// end App class

const mapStateToProps = (state, ownProps) => {
  return {
    isAdd: state.isAdd,
    isEdit:state.isEdit
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeEditStatus: () => {
      dispatch({type:'CHANGE_EDIT_STATUS'})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

