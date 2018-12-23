
import { noteData } from './firebaseConnect';

var redux=require('redux')

const noteInitialState = {
    isEdit: false,
    editItem:{},
    isAdd:false,
    alertShow:false,
    alertContent:"",
    alertType:"",
}

const allReducer = (state = noteInitialState, action) => {
    switch (action.type) {
        case 'CHANGE_ADD_STATUS':
            return {...state,isAdd:!state.isAdd}

        case 'ADD_DATA':
            //push data of getItem into table of noteData 
            noteData.push(action.getItem)
            return state
     
        case 'CHANGE_EDIT_STATUS':
            return {...state,isEdit:!state.isEdit}
        
        // get data in edit form
        case 'GET_EDIT_DATA':
            return {...state,editItem:action.editObject}

        case 'EDIT':
            //update data into table
            noteData.child(action.getItem.id).update({
                noteTitle: action.getItem.noteTitle,
                noteContent:action.getItem.noteContent
            })
            return {...state,editItem:{}}
        
        case 'DELETE':
            // remove note 
            noteData.child(action.deleteId).remove()
            return state

        case 'ALERT_ON':
            return {...state,alertShow:true,alertContent:action.AlertContent,alertType:action.alertType}
            
        case 'ALERT_OFF':
            return {...state,alertShow:false}

        default:
            return state
    }
}

var store=redux.createStore(allReducer)
store.subscribe(function(){
    console.log(JSON.stringify(store.getState()))
})
export default store
