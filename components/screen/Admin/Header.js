import React, { useState,useEffect} from "react";
import { 
    Text, 
    View, 
    Image,
    TouchableOpacity,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';






// header
const Header = ({navigation}) => {


  return ( 
    <View style={{backgroundColor:'#FFF'}}>
        <View style={{
            alignItems:'flex-start',
            flexDirection:'row',
            backgroundColor:'#fff',
            top:40,
            marginBottom:40
        }}>
                <View style={{ justifyContent:'space-between',flexDirection:'row',marginHorizontal:40}}>
                <Entypo name="location-pin" size={30} color="black" />
                <Text style={{
                    alignSelf:'center',
                    fontWeight:'bold',
                    fontSize:16,
                    left:40
                }}>Bragança</Text>
            <TouchableOpacity>
              <Image style={{
                  width:40,
                  height:40,
                  borderRadius:20,
                  marginHorizontal:20,
                  marginLeft:130
              }} source={require('../../../assets/user.jpg')}/>
            </TouchableOpacity>
          <TouchableOpacity  onPress={() => navigation.navigate('objetivo')} >
             <Image style={{
               width:30,
               height:30,
               top:6
             }} source={require('../../../assets/Rocket.png')}/>
          </TouchableOpacity>
           </View>
           <View style={{flexDirection:'row'}}>
            <View style={{height:20,width:20,backgroundColor:'#FB3333', top:15,right:45,borderRadius:15}}/>
            <Text style ={{color:'#000',right:59,top:15,marginTop:1,fontSize:13}}>2</Text>
           </View>
          
        </View>
    </View>
        
             

  )
}
export default Header;