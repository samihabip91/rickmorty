import {useState, React} from 'react';
import './textbox.scss';

function Textbox(props) {
const [model, setModel] = useState(props.model ? props.model : '');

const changeHandler = (event) => {
    setModel(event.target.value);
    props.onModelChange(event.target.value);
}

  return (
    <div className="input-wrapper" >
      <input type={props.type ? props.type : 'text'} 
             placeholder={props.placeholder} 
             onChange={changeHandler} value={model} />
    </div>
  );
}

export default Textbox;
