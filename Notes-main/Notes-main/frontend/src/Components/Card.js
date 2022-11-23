import  {React} from 'react'
import  IconButton  from '@material-ui/core/IconButton'
import {Delete} from '@material-ui/icons';
import '../Styles/card.css';
let text = ""
const Card = (props) => {
    return (
        <div className = "card">
            <div className = "card-title">
                <h1>{props.title}</h1>    
            </div>        
            <div className = "card-content">
                <p>
                    {props.content}
                </p>
            </div>
            <div className = "btns">
                <IconButton color = 'error'
                 onClick = {() =>{
                    return props.onDelete(props.noteId)
                }}>
                    <Delete  color='error'/>
                </IconButton>
            </div>
        </div>
    )
}

export default Card;
export {text};