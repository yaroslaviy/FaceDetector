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
import SignIn from './components/signin/signin';
import Register from './components/register/register';

const app = new Clarifai.App({apiKey: MY_KEY});

const particleparams = {
    "particles": {
        "number": {
            "value": 75
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
            box: {},
            route: 'signin',
            user: {
                id:'',
                name:'',
                email:'',
                password:'',
                entries: 0,
                joined: new Date()
            },
            isSignedIn: false
        }
    }

    loadUser = (data) => {
        this.setState({user: {
            id: data.id,
            name: data.name,
            email: data.email,
            entries: data.entries,
            joined: data.joined
        }})
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
        app
            .models
            .predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
            .then(response => this.displayFaceBox(this.calculateFaceLocation(response)).catch(err => console.log(err)));

    }

    onRouteChange = (route) =>{
        if (route === 'signout'){
            this.setState({isSignedIn: false})
        } else if(route === 'home'){
            this.setState({isSignedIn: true})
        }
        this.setState({route: route});
    }

    render() {
        const { isSignedIn, imageURL, route, box} = this.state;
        return (
            <div className="App">
                <Particles className='particles' params={particleparams}/>
                <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/> {route === 'home'
                    ?  <div>
                        <Logo/>
                        <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                        <ImageLinkForm
                            onInputChange={this.onInputChange}
                            onSubmitPicture={this.onSubmitPicture}/>
                        <FaceRecognition imageURL={imageURL} box={box}/>

                    </div>
                    : ( (  route === 'signin' || route === 'signout')?
                    <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
                    : <Register  onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
                    )
                    }
            </div>
        );
    }
}

export default App;
