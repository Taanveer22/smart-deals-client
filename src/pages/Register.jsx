import axios from 'axios';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';

const Register = () => {
  const { createUser, updateUserProfile } = useAuth();
  const navigate = useNavigate();

  const handleRegisterFormSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    // console.log(name, photo, email, password);

    try {
      const result = await createUser(email, password);
      await updateUserProfile(name, photo);
      // console.log(result);
      const userInfo = {
        email: result?.user?.email || result?.user?.providerData?.[0]?.email,
        name: result?.user?.displayName || result?.user?.providerData?.[0]?.displayName,
        photo: result?.user?.photoURL || result?.user?.providerData?.[0]?.photoURL,
      };
      // console.log(userInfo);
      if (result?.user) {
        const res = await axios.post(`http://localhost:5000/users`, userInfo);
        // console.log(res.data);
        res?.data && toast.success('registration done');
        navigate('/');
      }
    } catch (error) {
      // console.log(error);
      toast.error(error.message || 'Registration failed');
    }
  };

  return (
    <div className="flex justify-center items-center">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
        <form onSubmit={handleRegisterFormSubmit} className="card-body">
          <fieldset className="fieldset">
            <label className="label">Name</label>
            <input name="name" type="text" className="input" placeholder="Name" />
            <label className="label">Photo</label>
            <input name="photo" type="text" className="input" placeholder="Photo" />
            <label className="label">Email</label>
            <input name="email" type="email" className="input" placeholder="Email" />
            <label className="label">Password</label>
            <input name="password" type="password" className="input" placeholder="Password" />
            <button type="submit" className="btn btn-primary mt-4">
              Register
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Register;
