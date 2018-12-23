import React, { Component } from 'react';
import { connect } from 'react-redux';

class Nav extends Component {
 
  handleAdd=(event)=>{
    event.preventDefault()
    this.props.changeAddStatus()
  }

  render() {
        return (
          <div>
              <nav className="navbar navbar-expand-sm navbar-dark mb-5" style={{backgroundColor: 'black'}}>
                <div className="container">
                  <a className="navbar-brand" href="http://google.com">Menu</a>
                  <button className="navbar-toggler hidden-lg-up" type="button" data-toggle="collapse" data-target="#acollapsibleNavId" aria-controls="collapsibleNavId" aria-expanded="false" aria-label="Toggle navigation" />
                  <div className="collapse navbar-collapse justify-content-end" id="collapsibleNavId">
                    <ul className="navbar-nav  mt-2 mt-lg-0">
                      <li className="nav-item active">
                        <a className="nav-link" href="#aa">Home <span className="sr-only">(current)</span></a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link" href="http://google.com" onClick={(event)=>this.handleAdd(event)}>Add Note</a>
                      </li>
                    </ul>
                  </div>
                </div> 
              </nav>
          </div>
        );
    }
  } // end Nav class

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    changeAddStatus: () => {
      dispatch({type:'CHANGE_ADD_STATUS'})
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Nav)


