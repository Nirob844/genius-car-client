import React, { useContext, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import img from '../../assets/images/login/login.svg';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import { FaGoogle } from 'react-icons/fa';
import { GoogleAuthProvider } from 'firebase/auth';


const Login = () => {


    const { signIn, setLoading, providerLogin, } = useContext(AuthContext);
    const [error, setError] = useState('');
    const location = useLocation();
    const navigate = useNavigate();

    const from = location.state?.from?.pathname || '/';
    const googleProvider = new GoogleAuthProvider()

    const handleGoogleSingIn = () => {
        providerLogin(googleProvider)
            .then(result => {
                const user = result.user;
                toast.success('login successfully');
                console.log(user);
            })
            .catch(error => {
                console.error(error)
                setError(error.message);
            })


    }

    const handleLogin = event => {
        event.preventDefault();
        const form = event.target;
        const email = form.email.value;
        const password = form.password.value;

        signIn(email, password)
            .then(result => {
                const user = result.user;
                // console.log(user);
                // form.reset();
                // setError('');
                // if (user.emailVerified) {
                //     toast.success('login successfully');
                //     navigate(from, { replace: true });
                // }
                // else {
                //     toast.error('Your email is not verified. Please verify your email address.')
                // }
                const currentUser = {
                    email: user.email
                }

                console.log(currentUser);

                // get jwt token
                fetch('http://localhost:5000/jwt', {
                    method: 'POST',
                    headers: {
                        'content-type': 'application/json'
                    },
                    body: JSON.stringify(currentUser)
                })
                    .then(res => res.json())
                    .then(data => {
                        console.log(data);
                        // local storage is the easiest but not the best place to store jwt token
                        localStorage.setItem('genius-token', data.token);
                        navigate(from, { replace: true });
                    });
            })
            .catch(error => {
                console.error(error);
                setError(error.message);
            })
            .finally(() => {
                setLoading(false);
            })
    }

    return (
        <div className="hero w-full my-20">
            <div className="hero-content grid gap-20 md:grid-cols-2 flex-col lg:flex-row">
                <div className="text-center lg:text-left">
                    <img className='w-3/4' src={img} alt="" />
                </div>
                <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100 py-20">
                    <h1 className="text-5xl text-center font-bold">Login</h1>
                    <form onSubmit={handleLogin} className="card-body">
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Email</span>
                            </label>
                            <input type="text" name='email' placeholder="email" className="input input-bordered" />
                        </div>
                        <div className="form-control">
                            <label className="label">
                                <span className="label-text">Password</span>
                            </label>
                            <input type="text" name='password' placeholder="password" className="input input-bordered" />
                            <label className="label">
                                <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                            </label>
                        </div>
                        <div className="form-control mt-6">
                            <input className="btn btn-warning" type="submit" value="Login" />
                        </div>
                    </form>
                    <p className='text-center'>or signIn with</p>
                    <button onClick={handleGoogleSingIn} className="btn btn-outline btn-warning w-3/4 mx-auto my-2">
                        <FaGoogle className='mr-3'></FaGoogle>
                        Google</button>
                    <p className='text-center'>New to Genius Car <Link className='text-orange-600 font-bold' to="/signup">Sign Up</Link> </p>
                    <p className='text-red-600'>{error}</p>
                </div>
            </div>
        </div>
    );
};

export default Login;