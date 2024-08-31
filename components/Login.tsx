import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { TextInput, View } from 'react-native';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleEmailChange = (e:any) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e:any) => {
    setPassword(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <View>
      <label>Email:</label>
      <TextInput value={email} onChange={handleEmailChange} />

      <label>Password:</label>
      <View>
        <TextInput
          value={password}
          onChange={handlePasswordChange}
        />
        <FontAwesomeIcon
          icon={showPassword ? faEyeSlash : faEye}
          onClick={togglePasswordVisibility}
        />
      </View>

      <button>Login</button>
    </View>
  );
};

export default Login;