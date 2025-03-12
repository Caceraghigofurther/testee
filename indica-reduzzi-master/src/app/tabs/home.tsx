import { SafeAreaView, View } from "react-native";

import Greeting from "@/components/Greeting";
import Dashboard from "@/components/Dashboard";
import Indication from "@/components/Indications";
import { DefaultTheme } from "@react-navigation/native";

const Home = () => {
  return (
    <SafeAreaView style={{ flex: 1, padding: 20, gap: '10%' }}>

        <View style={{ width: '100%', gap: 10,}}>
        <Greeting />
        <Dashboard/>      
        </View>

        <View style={{ width: '100%', gap: 15,}}>
        <Indication backgroundImage={require('../../assets/indicateButtonBackground.png')} buttonText="Indicar" navigateTo={"/indicate"}/>

        <Indication backgroundImage={require('../../assets/trackIndicationButton.png')} buttonText="Acompanhar Indicação" navigateTo={"/tabs/trackIndication"}/>
        </View>

    </SafeAreaView>
  );
}

export default Home   