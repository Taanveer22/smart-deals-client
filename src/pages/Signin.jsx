import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';

const Signin = () => {
  const { signInUser, googleSignIn } = useAuth();

  const handleSignInFormSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(email, password);

    try {
      const result = await signInUser(email, password);
      if (result?.user) {
        // console.log(result);
        toast.success('sign in done');
      }
    } catch (error) {
      // console.log(error);
      toast.error(error.message || 'sign in failed');
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const result = await googleSignIn();
      if (result?.user) {
        // console.log(result);
        toast.success('sign in done');
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
            <button className="btn btn-neutral mt-4">Signin</button>
          </fieldset>
        </form>
        <button onClick={handleGoogleSignIn} className="btn btn-info my-4 mx-6">
          Google Signin
        </button>
      </div>
    </div>
  );
};

export default Signin;
