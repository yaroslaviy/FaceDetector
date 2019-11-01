import React, {Component} from 'react';
import './App.css';
import Navigation from "./components/navigation/Navigation";
import Logo from "./components/logo/logo";
import ImageLinkForm from "./components/imagelinkform/ImageLinkForm";
import Rank from "./components/rank/rank";
import Particles from 'react-particles-js';

const particleparams = {
    "particles": {
        "number": {
            "value": 50
        },
        "size": {
            "value": 3
        }
    },
    "interactivity": {
        "events": {
            "onhover": {
                "enable": true,
                "mode": "repulse"
            }
        }
    }
};

class App extends Component {
    constructor() {
        super();
        this.state = {
            input: ''
        }
    }

    onInputChange = (event) => {
      
    }
    onSubmitPicture = () => {
      console.log('click');
    }
    render() {
        return (
            <div className="App">
                <Particles className='particles' params={particleparams}/>
                <Navigation/>
                <Logo/>
                <Rank/>
                <ImageLinkForm onInputChange={this.onInputChange} onSubmitPicture={this.onSubmitPicture}/>
            </div>
        );
    }
}

export default App;
