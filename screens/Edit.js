import React, { useState, useEffect } from 'react';
import { View, Text, TextInput,TouchableHighlight,StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ListItem,Header, Button,Image} from 'react-native-elements' 
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import FlashMessage from "react-native-flash-message";
import { showMessage, hideMessage } from "react-native-flash-message";
import { set } from 'react-native-reanimated';

export default function Add({route, navigation}){
    [nome,setNome] = useState();
    [cpf,setCpf] = useState();
    [telefone,setTelefone] = useState();
    [id,setId] = useState();

    useEffect(()=>{
        if(route.params){
            const pessoa = route.params;
            setNome(pessoa.nome);
            setCpf(pessoa.cpf);
            setTelefone(pessoa.telefone);
            setId(pessoa.id);
        }
    },[])  

    async function editarDados(){
        await axios.put('http://professornilson.com/testeservico/clientes/'+id,{
         nome: nome,
         cpf: cpf,
         telefone: telefone,  
        } ).then(function (response){
          showMessage({
            message: "Registro alterado com sucesso!",
            type: "success",
          });
        console.log(response);
        }).catch(function (error) {
          showMessage({
              message: "Erro ao alterar",
              type: "info",
            });
          console.log(error);
      });
    }

    async function deleteDados(){
        await axios.delete('http://professornilson.com/testeservico/clientes/'+id).then(function (response){
            setNome("");
            setTelefone("");
            setCpf("");
            setId("");
          showMessage({
            message: "Registro deletado com sucesso!",
            type: "success",
          });
          setTimeout( () =>{
            navigation.navigate('Index');
          }, 2300);
        console.log(response);
        }).catch(function (error) {
          showMessage({
              message: "Erro ao deletar",
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
            style={{ width: 200, height: 200, marginLeft:50}}
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
                    title="Alterar"
                    style={styles.botao}
                    onPress={() => editarDados()}
        />    

        <Button style={{paddingTop:20}}
            title="Excluir"
            linearGradientProps={{
            colors: ['red','red', 'red'],
            }}
            style={styles.botao}
            onPress={() => deleteDados()}
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