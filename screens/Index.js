import React, { useState, useEffect } from 'react';
import { View, } from 'react-native';
import { ListItem,Header, Button,Avatar, Chevron} from 'react-native-elements' 
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';

export default function Index({route,navigation}){

  const [dados,setDados] = useState([]);
  
      useEffect(()=>{
        
        async function listarDados(){
            const result = await axios(
                'http://professornilson.com/testeservico/clientes',
              );
              setDados(result.data);
        }
        listarDados();
    })

return(
    <View>
   <Header
            
            centerComponent={{ text: 'Lista', style: { color: '#fff', fontSize:20 } }}
            rightComponent={
                <Button  
                title="+"
                onPress={()=>navigation.navigate('Add')}
                />}
   />
<ScrollView >
       {
       dados.map((l,i) => (
        <ListItem key={i}  bottomDivider  
          onPress={() => navigation.navigate('Edit',{
            id: l.id,
            nome: l.nome,
            cpf: l.cpf,
            telefone: l.telefone
        })}
       >
          <Avatar source= {{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/adhamdannaway/128.jpg' }} />
            <ListItem.Content>
                <ListItem.Title>{l.nome}</ListItem.Title>
                <ListItem.Subtitle>{l.cpf}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
       )) 
       } 
       </ScrollView>
    </View>
)

}