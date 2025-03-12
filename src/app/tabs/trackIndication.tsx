import { View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Greeting from '@/components/Greeting';
import Dashboard from '@/components/Dashboard';
import ListaObras from '@/components/ListaObras';

const TrackIndication = () => {
 return (
    <SafeAreaView style={{ flex: 1, padding: 20, gap: '10%' }}>
        <View style={{ width: '100%', gap: 10,}}>
        <Greeting />
        <Dashboard/>      
        </View>
        <ListaObras/>
    </SafeAreaView>
  );
}

export default TrackIndication