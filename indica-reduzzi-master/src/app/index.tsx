import { ImageBackground } from "react-native";

import Login from "@/components/Login";

const Index = () => {
  return (
    <ImageBackground
      source={require("../assets/mainBackground.png")}
      style={{ 
        flex: 1,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: -10,
       }}
    >
      
      <Login/>
        
    </ImageBackground>
  );
}

export default Index