import React, { Component } from 'react';
import { Alert, AlertContainer } from "react-bs-notifier";
import { connect } from 'react-redux';


class AlertInfo extends Component {
    handleDismiss=()=>{
        this.props.alertOff()
    }
    render() {
        if (this.props.alertShow===false) return null
        return (
        <AlertContainer >
            <Alert type={this.props.alertType} onDismiss={()=>this.handleDismiss()} timeout={1000}>
            {this.props.alertContent}
            </Alert>
        </AlertContainer>
        );
    }
} // end class AlertInfo

const mapStateToProps = (state, ownProps) => {
    return {
        alertShow:state.alertShow,
        alertContent:state.alertContent,
        alertType:state.alertType,
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        alertOff: () => {
            dispatch({type:'ALERT_OFF'})
          }, 
        }
    }

export default connect(mapStateToProps, mapDispatchToProps)(AlertInfo)
