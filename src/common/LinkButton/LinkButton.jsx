import './LinkButton.css'
import { useNavigate } from 'react-router-dom';

export const LinkButton = ({path, title, classButton, emit}) => {

    const navigate = useNavigate();
     
    const superEmit = (argumento) =>{

        navigate(argumento)

        if(emit){
            emit()   
        }
  
    }

     return (
         <div className={classButton} onClick={()=>superEmit(path)}>
            {title}
         </div>
     )
}