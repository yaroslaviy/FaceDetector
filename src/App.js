import React, {Component} from 'react';
import './App.css';
import Navigation from "./components/navigation/Navigation";
import Logo from "./components/logo/logo";
import ImageLinkForm from "./components/imagelinkform/ImageLinkForm";
import Rank from "./components/rank/rank";
import Particles from 'react-particles-js';
import FaceRecognition from "./components/facerecognition/facerecognition";
import SignIn from './components/signin/signin';
import Register from './components/register/register';


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

const initialstate = {
    input: '',
    imageURL: '',
    box: {},
    route: 'signin',
    user: {
        id: '',
        name: '',
        email: '',
        password: '',
        entries: 0,
        joined: new Date()
    },
    isSignedIn: false
};

class App extends Component {
    constructor() {
        super();
        this.state = initialstate
    }

    loadUser = (data) => {
        this.setState({
            user: {
                id: data.id,
                name: data.name,
                email: data.email,
                entries: data.entries,
                joined: data.joined
            }
        })
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
        this.setState({imageURL: this.state.input});
        fetch('http://localhost:3000/imageurl', {
            method: 'post',
            headers: {
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({input: this.state.input})
            })
            .then(response => response.json())
            .then(response => {
                if (response) 
                    fetch('http://localhost:3000/image', {
                        method: 'put',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({id: this.state.user.id})
                    }).then(response => response.json()).then(count => {
                        this.setState(Object.assign(this.state.user, {entries: count}))
                    }).catch(console.log)
                    this.displayFaceBox(this.calculateFaceLocation(response)).catch(err => console.log(err))
                }
            )
            .catch(console.log)
    }

    onRouteChange = (route) => {
        if (route === 'signout') {
            this.setState(initialstate)
        } else if (route === 'home') {
            this.setState({isSignedIn: true})
        }
        this.setState({route: route});
    }

    render() {
        const {isSignedIn, imageURL, route, box} = this.state;
        return (
            <div className="App">
                <Particles className='particles' params={particleparams}/>
                <Navigation onRouteChange={this.onRouteChange} isSignedIn={isSignedIn}/> {route === 'home'
                    ? <div>
                            <Logo/>
                            <Rank name={this.state.user.name} entries={this.state.user.entries}/>
                            <ImageLinkForm
                                onInputChange={this.onInputChange}
                                onSubmitPicture={this.onSubmitPicture}/>
                            <FaceRecognition imageURL={imageURL} box={box}/>

                        </div>
                    : ((route === 'signin' || route === 'signout')
                        ? <SignIn onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>
                        : <Register onRouteChange={this.onRouteChange} loadUser={this.loadUser}/>)
}
            </div>
        );
    }
}

export default App;
