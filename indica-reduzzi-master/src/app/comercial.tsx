import {  View, SafeAreaView } from 'react-native';
import Greeting from '@/components/Greeting';
import ListaObras from '@/components/ListaObras';

const Comercial = () => {
 return (
   <SafeAreaView style={{flex: 1, gap: '10%', padding: 16, }}>
      <Greeting />
      <ListaObras/>
   </SafeAreaView>
  );
}

export default Comercial