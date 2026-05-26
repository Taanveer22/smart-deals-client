import { toast } from 'react-toastify';
import useAuth from '../hooks/useAuth';

const Register = () => {
  const { createUser } = useAuth();

  const handleRegisterFormSubmit = async (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const photo = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log(name, photo, email, password);

    try {
      const result = await createUser(email, password);
      if (result?.user) {
        // console.log(result);
        toast.success('registration done');
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
            <button className="btn btn-neutral mt-4">Signin</button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default Register;
