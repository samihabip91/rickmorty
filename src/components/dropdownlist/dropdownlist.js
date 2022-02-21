import {useState, React} from 'react';
import './dropdownlist.scss';

function Dropdownlist(props) {
    var initialModel = {
        text: props.placeholder,
        value: 0
    };

    let options =  props.options;
    if(props.placeholder)
        options = [initialModel].concat(options);

    const [model, setModel] = useState(props.model ? props.model : '');
    if(model == undefined || model == null) 
        model = '';

    const changeHandler = (event) => {
        var value = event.target.value;
        if(props.modelType == "text")
            value = event.target.selectedOptions[0].text;

        setModel(event.target.value);
        props.onModelChange(value);
    }
    
    return (
        <div className="dropdownlist" >
            <select onChange={changeHandler} value={model} >
                {
                    options.map(o =>
                        <option key={props.id + o.value + 'option'} value={o.value} >{o.text}</option>
                    )
                }
            </select>
        </div>
    );
}

export default Dropdownlist;


