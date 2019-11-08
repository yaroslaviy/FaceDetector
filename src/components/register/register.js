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
        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
                body: JSON.stringify({email: this.state.registerEmail, password: this.state.registerPassword, name: this.state.name})
            })
            .then(response => response.json())
            .then(user => {
                if (user) {
                    this
                        .props
                        .loadUser(user);
                    this
                        .props
                        .onRouteChange('home');
                }

            })

    }
    render() {
        return (
            <article
                className="mw6 center br3 pa3 pa4-ns mv4 shadow-5 ba b--black-10 w-50-m w-100 w-25-l">
                <main className="pa4 black-80">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
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