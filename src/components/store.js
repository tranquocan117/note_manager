
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
        case 'ADD_DATA':
            noteData.push(action.getItem)
            // console.log('Da them data thanh cong'+ JSON.stringify(action.getItem))

        case 'CHANGE_EDIT_STATUS':
            return {...state,isEdit:!state.isEdit}


        case 'CHANGE_ADD_STATUS':
            return {...state,isAdd:!state.isAdd}

        case 'GET_EDIT_DATA':
            return {...state,editItem:action.editObject}

        case 'EDIT':
            //update du lieu len firebase
            noteData.child(action.getItem.id).update({
                noteTitle: action.getItem.noteTitle,
                noteContent:action.getItem.noteContent
            })
            console.log('du lieu can sua '+JSON.stringify(action.getItem)+'da update thanh cong')
            return {...state,editItem:{}}
        
        case 'DELETE':
            
            noteData.child(action.deleteId).remove()
            console.log('du lieu can xoa co id' + action.deleteId+'xoa thanh cong')
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
