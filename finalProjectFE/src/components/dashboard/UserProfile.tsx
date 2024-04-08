import { ChangeEvent, useState, FormEvent } from 'react';

const UserProfile = () => {
  const [user, setUser] = useState({
    firstName: 'Steve',
    lastName: 'Wang',
    email: '123@gmail.com',
    phoneNumber: '5144281234',
    password: '',
    confirmPassword: '',
  });

  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleConfirmPasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (value !== user.password) {
      setPasswordError('Passwords do not match');
    } else {
      setPasswordError('');
    }
    setUser((prevState) => ({
      ...prevState,
      confirmPassword: value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await fetch('api/user', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (response.ok) {
        console.log('User profile updated successfully.');
      } else {
        console.error('Failed to update user profile.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <form onSubmit={handleSubmit} className="block text-sm font-medium text-gray-700">
        <table className="table-auto">
          <tbody>
            <tr>
              <td className="px-4 py-2">First Name</td>
              <td className="px-4 py-2">
                <input
                  type="text"
                  name="firstName"
                  value={user.firstName}
                  readOnly
                  className="border rounded-md px-2 py-1"
                />
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2">Last Name</td>
              <td className="px-4 py-2">
                <input
                  type="text"
                  name="lastName"
                  value={user.lastName}
                  readOnly
                  className="border rounded-md px-2 py-1"
                />
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2">Email</td>
              <td className="px-4 py-2">
                <input
                  type="text"
                  name="email"
                  value={user.email}
                  onChange={handleChange}
                  className="border rounded-md px-2 py-1"
                />
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2">Phone Number</td>
              <td className="px-4 py-2">
                <input
                  type="text"
                  name="phoneNumber"
                  value={user.phoneNumber}
                  onChange={handleChange}
                  className="border rounded-md px-2 py-1"
                />
              </td>
            </tr>
            <tr>
              <td className="px-4 py-2">Password</td>
              <td className="px-4 py-2">
                <input
                  type="password"
                  name="password"
                  value={user.password}
                  onChange={handleChange}
                  className="border rounded-md px-2 py-1"
                />
              </td>
            </tr>
            {user.password && ( // 只有当密码字段不为空时才显示确认密码字段
              <tr>
                <td className="px-4 py-2">Confirm Password</td>
                <td className="px-4 py-2">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={user.confirmPassword}
                    onChange={handleConfirmPasswordChange}
                    className="border rounded-md px-2 py-1"
                  />
                  {passwordError && <p className="text-red-500">{passwordError}</p>}
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Update
        </button>
      </form>
    </div>
  );
};

export default UserProfile;
