import Login from '@/components/Login';
import Register from '@/components/Register';
import { ImageBackground } from 'react-native';

const RegisterScreen = () => {
 return (
   <ImageBackground
   source={require('../assets/mainBackground.png')}
   style={{flex: 1, justifyContent: 'center', alignItems: 'center', zIndex: -10}}
   resizeMode='cover'>
    <Register/>
   </ImageBackground>
  );
}

export default RegisterScreen