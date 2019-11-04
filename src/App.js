import React, {Component} from 'react';
import './App.css';
import Navigation from "./components/navigation/Navigation";
import Logo from "./components/logo/logo";
import ImageLinkForm from "./components/imagelinkform/ImageLinkForm";
import Rank from "./components/rank/rank";
import Particles from 'react-particles-js';
import Clarifai from 'clarifai';
import FaceRecognition from "./components/facerecognition/facerecognition";
import MY_KEY from './apikey.js'
const app = new Clarifai.App({apiKey: MY_KEY });

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
            input: '',
            imageURL: '',
            box: {}
        }
    }

    calculateFaceLocation = (data) => {
        const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
        const image = document.getElementById('inputimage');
        const width = Number(image.width);
        const height = Number(image.height);
        return {
            leftCol: clarifaiFace.left_col * width,
            topRow: clarifaiFace.top_row * width,
            rightCol: width - (clarifaiFace.right_col * width),
            botRow: height - (clarifaiFace.bottom_row * height)
        }
    }

    displayFaceBox = (box) => {
        console.log(box);
        this.setState({box: box});
    }

    onInputChange = (event) => {
        this.setState({input: event.target.value})
    }

    onSubmitPicture = () => {
        this.setState({imageURL: this.state.input})
        app.models
            .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
            .then(response =>  this.displayFaceBox(this.calculateFaceLocation(response))
            .catch(err => console.log(err)));
        

    }

    render() {
        return (
            <div className="App">
                <Particles className='particles' params={particleparams}/>
                <Navigation/>
                <Logo/>
                <Rank/>
                <ImageLinkForm
                    onInputChange={this.onInputChange}
                    onSubmitPicture={this.onSubmitPicture}/>
                <FaceRecognition imageURL={this.state.imageURL} box={this.state.box}/>
            </div>
        );
    }
}

export default App;
