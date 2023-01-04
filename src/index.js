import './style.css';
import APIHandler from './APIHandler';
import DOMHandler from './DOMHandler';
import DATAHandler from './DATAHandler';


APIHandler.getData('Vienna')
    .then(data => DATAHandler.proccesData(data))
    .then(data => DOMHandler.populateData(data));