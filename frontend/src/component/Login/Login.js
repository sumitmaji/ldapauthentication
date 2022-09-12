import React, { useState } from 'react';
import './Login.css';
import useAPIError from '../../common/hooks/useAPIError';

async function loginUser(credentials) {
 return fetch(`/authenticate`, {
   method: 'POST',
   headers: {
     "Content-Type": "application/x-www-form-urlencoded",
   },
   body: `username=${credentials.username}&password=${credentials.password}`,
   credentials: 'include',
   mode: 'no-cors'
 })
   .then(data => data.json())
}

export default function Login() {
  const [username, setUserName] = useState();
  const [password, setPassword] = useState();
  const { addError } = useAPIError();
  

  const handleSubmit = async e => {
    e.preventDefault();
    const response = await loginUser({
      username,
      password
    });

	if(response.error){
		addError(response.message)
	}

  }

  return(

    <div className="container">
	<div className="screen">
		<div className="screen__content">
					<div className="gok_icon">
					    <img src="/gok.png" style={{width: 150, height: 150, position: "absolute", top: -50, left: -50}}/>
        			</div>
			<form className="login" method="post" action="/authenticate">
				<div className="login__field">
					<i className="login__icon fas fa-user"></i>
					<input type="text" className="login__input" placeholder="User name / Email" onChange={e => setUserName(e.target.value)} id="username" name="username" required autofocus/>
				</div>
				<div className="login__field">
					<i className="login__icon fas fa-lock"></i>
					<input type="password" className="login__input" placeholder="Password" onChange={e => setPassword(e.target.value)} id="password" name="password" required/>
				</div>
				<button className="button login__submit" type="submit">
					<span className="button__text">Log In Now</span>
					<i className="button__icon fas fa-chevron-right"></i>
				</button>				
			</form>
			<div className="social-login">
				<h3>log in via</h3>
				<div className="social-icons">
					<a href="#" className="social-login__icon fab fa-instagram"></a>
					<a href="#" className="social-login__icon fab fa-facebook"></a>
					<a href="#" className="social-login__icon fab fa-twitter"></a>
				</div>
			</div>
		</div>
		<div className="screen__background">
			<span className="screen__background__shape screen__background__shape4"></span>
			<span className="screen__background__shape screen__background__shape3"></span>		
			<span className="screen__background__shape screen__background__shape2"></span>
			<span className="screen__background__shape screen__background__shape1"></span>
		</div>		
	</div>
</div>
    
  )
}