import React, { useState, useEffect } from 'react';
import { View, Text, TextInput,StyleSheet, Image } from 'react-native';
import { Header, Button} from 'react-native-elements' 
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import FlashMessage from "react-native-flash-message";
import { showMessage } from "react-native-flash-message";

export default function Add({route,navigation}){
    [nome,setNome] = useState();
    [cpf,setCpf] = useState();
    [telefone,setTelefone] = useState();

    useEffect(()=>{},[])  

    async function inserirDados(){
        await axios.post('http://professornilson.com/testeservico/clientes',{
         nome: nome,
         cpf: cpf,
         telefone: telefone,  
        } ).then(function (response){
          showMessage({
            message: "Registro cadastrado com sucesso!",
            type: "success",
          });
        console.log(response);
        }).catch(function (error) {
          showMessage({
              message: "Erro ao salvar.",
              type: "info",
            });
          console.log(error);
      });
    }

    return(
      
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Header
            leftComponent={
                <Button  
                title="< voltar"
                width="300"
                onPress={()=>navigation.navigate('Index')}
                ></Button>}
            centerComponent={{ text: 'Cadastro de Clientes', style: { color: '#fff' } }}
        />
        <FlashMessage position="top" /> 
        <ScrollView >
        <Image
            source={{ uri: 'https://pngimage.net/wp-content/uploads/2018/05/cadastro-icon-png-3.png' }}
            style={{ width: 200, height: 200}}
        />
        <Text style={styles.titulo}>Digite seu nome</Text>
        <TextInput
            placeholder="Nome"
            style={{width: 300, padding:10, backgroundColor: 'white' }}
            onChangeText={text => setNome(text)}
            value={nome}
        />

        <Text style={styles.titulo}>Digite seu CPF</Text>
        <TextInput
            placeholder="CPF"
            style={{width: 300, padding:10, backgroundColor: 'white' }}
            onChangeText={text => setCpf(text)}
            value={cpf}
        />

        <Text style={styles.titulo}>Digite seu Telefone</Text>
        <TextInput
            placeholder="Telefone"
            style={{width: 300, padding:10, backgroundColor: 'white' }}
            onChangeText={text => setTelefone(text)}
            value={telefone}
        />

         <Button style={{paddingTop:20}}
            title="Salvar"
            style={styles.botao}
            onPress={() => inserirDados()}
            /> 
         </ScrollView>  
        </View>
    )

}

const styles = StyleSheet.create({

    botao:{
      paddingTop:20,
      width:300
    },
  
    titulo:{
      paddingTop:20,
      fontSize:18
    },
  
    Screen:{
      paddingTop:20,
      fontSize:28
    }
  
  })