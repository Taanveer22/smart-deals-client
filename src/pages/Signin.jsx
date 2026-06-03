import axios from 'axios';
import { useLocation, useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';
import useAxios from '../hooks/useAxios';

const Signin = () => {
  const { signInUser, googleSignIn } = useAuth();
  const axiosDefault = useAxios();
  const location = useLocation();
  const navigate = useNavigate();
  // since state is just a string, not an object
  const from = location.state || '/';

  const handleSignInFormSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log(email, password);

    try {
      const result = await signInUser(email, password);
      // console.log(result);
      const userInfo = {
        email: result?.user?.email || result?.user?.providerData?.[0]?.email,
        name: result?.user?.displayName || result?.user?.providerData?.[0]?.displayName,
        photo: result?.user?.photoURL || result?.user?.providerData?.[0]?.photoURL,
      };
      // console.log(userInfo);
      if (result?.user) {
        const res = await axiosDefault.post(`/users`, userInfo);
        // console.log(res.data);
        res?.data && toast.success('sign in done');
        navigate(from, { replace: true });
      }
    } catch (error) {
      // console.log(error);
      toast.error(error.message || 'sign in failed');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      // console.log(result);
      // console.log(result?.user?.email);
      // console.log(result?.user?.providerData?.[0]?.email);
      const userInfo = {
        email: result?.user?.email || result?.user?.providerData?.[0]?.email,
        name: result?.user?.displayName || result?.user?.providerData?.[0]?.displayName,
        photo: result?.user?.photoURL || result?.user?.providerData?.[0]?.photoURL,
      };
      // console.log(userInfo);
      if (result?.user) {
        const res = await axios.post(`http://localhost:5000/users`, userInfo);
        // console.log(res.data);
        res?.data && toast.success('sign in done');
        navigate(from, { replace: true });
      }
    } catch (error) {
      // console.log(error);
      toast.error(error.message || 'sign in failed');
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form onSubmit={handleSignInFormSubmit} className="card-body">
          <fieldset className="fieldset">
            <label className="label">Email</label>
            <input name="email" type="email" className="input" placeholder="Email" />
            <label className="label">Password</label>
            <input name="password" type="password" className="input" placeholder="Password" />
            <div>
              <a className="link link-hover">Forgot password?</a>
            </div>
            <button className="btn btn-primary mt-4">Signin</button>
          </fieldset>
        </form>
        <button onClick={handleGoogleSignIn} className="btn btn-secondary my-4 mx-6">
          Google Signin
        </button>
      </div>
    </div>
  );
};

export default Signin;
