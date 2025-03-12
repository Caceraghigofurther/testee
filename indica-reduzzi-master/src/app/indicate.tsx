import { View, ImageBackground } from 'react-native';
import Indication from '@/components/Indication';

const Indicate = () => {
 return (
   <ImageBackground
   source={require('../assets/indicatePageBackground.png')}
   style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: -10}}
   >
    <Indication/>
   </ImageBackground>
  );
}

export default Indicate