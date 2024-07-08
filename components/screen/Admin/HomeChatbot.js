import { 
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions
} from "react-native";
import React, { useEffect, useState } from "react";
import FaceData from "../../../Services/FaceData";
import { FlatList } from "react-native-gesture-handler";

export default function HomeChatbot({navigation}) { 
    const [modechat, setModechat] = useState([]);
    const [selectbot, setSelectbot] = useState(null);

    useEffect(() => {
        setModechat(FaceData);
        setSelectbot(FaceData[0]);
    }, []);

    const presschat = (id) => {
        setSelectbot(FaceData.find(bot => bot.id === id));
    }

    return (
        <View style={{alignItems: 'center', backgroundColor: '#fff', paddingTop: 90, flex: 1}}>
            {selectbot && (
                <>
                    <Text style={{color: selectbot.colorface, fontSize: 30}}>
                        Olá
                    </Text>
                    <Text style={{color: selectbot.colorface, fontSize: 30, fontWeight: 'bold'}}>
                        chamo me {selectbot.name}
                    </Text> 
        
                    <Image style={{width: 150, height: 150, marginTop: 20}} source={{uri: selectbot.image}}/>

                    <Text style={{marginTop: 30, fontSize: 25}}>Como posso te ajudar?</Text>

                    <View style={{marginTop: 20, backgroundColor: '#F5F5F5', alignItems: 'center', height: 110, padding: 10, borderRadius: 10}}>
                        <FlatList
                            data={FaceData}
                            horizontal={true}
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={({item}) => selectbot && selectbot.id !== item.id && (
                                <TouchableOpacity key={item.id} onPress={() => presschat(item.id)} style={{margin: 15}}>
                                    <Image style={{width: 40, height: 40}} source={{uri: item.image}}/>
                                </TouchableOpacity>
                            )}
                        />
                        <Text style={{marginTop: 5, fontSize: 17, color: '#b0b0b0'}}>Escolha o seu chat favorito</Text>
                    </View>
                    <TouchableOpacity style={[{backgroundColor: selectbot.colorface}, {
                        padding: 17, width: Dimensions.get('screen').width * 0.6, borderRadius: 100, alignItems: 'center', marginTop: 30
                    }]} onPress={() => navigation.navigate('chatboot')}>
                        <Text style={{fontSize: 16, color: '#fff'}}> Começe o chat </Text>
                    </TouchableOpacity>
                </>
            )}
        </View>
    );
}
