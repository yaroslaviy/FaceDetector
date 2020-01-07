import React from 'react';

class Register extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            registerEmail: '',
            registerPassword: '',
            name: ''
        }
    }
    testPassword = () => {
        if(this.state.registerPassword === undefined)
            return false
        return this.state.registerPassword.length>=6;
    }
    testEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    onEmailChange = (event) => {
        this.setState({registerEmail: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({registerPassword: event.target.value})
    }
    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    onRegister = () => {
        const {registerEmail, registerPassword, name} = this.state;
        if(this.testEmail(registerEmail) && this.testPassword() && name) {    
        fetch('https://nameless-inlet-10436.herokuapp.com/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({email: registerEmail, password: registerPassword, name: name})
            })
            .then(response => response.json() )
            .then(user => {
                if (user.id) {
                    this
                        .props
                        .loadUser(user);
                    this
                        .props
                        .onRouteChange('home');
                } else {
                    document.querySelector('#error').innerHTML=user
                }

            })
        }
    }
    render() {
        return (
            
            <article
                className="mw6 center br3 pa3 pa4-ns mv4 shadow-5 ba b--black-10 w-50-m w-100 w-25-l">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent center ph0 mh0">
                            <legend className="f2 fw6 ph0 mh0">Register</legend>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="name">Name</label>
                                <input onChange={this.onNameChange}
                                    className="pa2 input-reset ba bg-transparent w-100"
                                    type="text"
                                    name="name"
                                    id="name"/>
                            </div>
                            <div className="mt3">
                                <label className="db fw6 lh-copy f6" htmlFor="email-address">Email</label>
                                <input onChange={this.onEmailChange}
                                    className="pa2 input-reset ba bg-transparent w-100"
                                    type="email"
                                    name="email-address"
                                    id="email-address"/>
                            </div>
                            <div className="mv3">
                                <label className="db fw6 lh-copy f6" htmlFor="password">Password</label>
                                <input onChange={this.onPasswordChange}
                                    className="b pa2 input-reset ba bg-transparent w-100"
                                    type="password"
                                    name="password"
                                    id="password"/>
                            </div>
                        </fieldset>
                        <div className='mb3 center' id='error'>
                        { !this.testPassword() ? 
                            <span>Password is too short</span> : <span></span>
                            }
                        </div>
                        <div className="">
                            <input
                                onClick={() => this.onRegister()}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                                type="submit"
                                value="Register"/>
                        </div>
                    </div>
                    
                </main>
            </article>
        );
    }
}

export default Register;