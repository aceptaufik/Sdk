
import React, { memo,Component } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import { View, Picker, StyleSheet, Text, TouchableOpacity, Alert, Image } from "react-native";
import { Table, TableWrapper, Row, Cell,Rows } from 'react-native-table-component';
import { DataTable } from 'react-native-paper';
import VerticalSlider from 'rn-vertical-slider'
import axios from 'axios';
import { Spring } from "react-spring";

class Monitoring extends React.Component{
    constructor(props)
    {
      	    super(props);
            this.state ={
             value:0,
             tmp:0,
             time:""
            }
        	  }
       
componentDidMount(){
 //this.get_values();
setInterval(() => this.get_values(),
      1000
    );
    
}

get_values=()=>{
 var d = new Date(); // for now
 var hour =  d.getHours(); // => 9
 var minutes = d.getMinutes(); // =>  30
 var second =  d.getSeconds(); // => 51
  let min = hour + ":"+minutes+":"+second;
   axios.get(`https://api.thingspeak.com/channels/1110584/feeds.json?api_key=23GKQS1XCNTCKDGU&results=2`)
      .then(res => {

        var id = res.data.feeds[1].entry_id
        var  val = res.data.feeds[1].field1
console.log("tesssss",val)
        this.setState({value:val,time:min})
      })
 }


render(){
  // this.readUserData
  const { navigation } = this.props;
  let val =this.state.value

  let status = "Normal";
  let color = "white";
  let value_data = this.state.value;
  if(value_data > 32){
    status = "Normal";
    color = "white";
  }
  else if(value_data > 29 && value_data < 31.9 ){
    status = "Siaga 3";
    color = "blue";
  }
   else if(value_data > 26 && value_data < 28.9){
    status = "Siaga 2";
    color = "green";
  }
  else if(value_data > 23 && value_data < 25.9){
    status = "Siaga 1";
    color = "yellow";
  }
  else if(value_data < 22.9){
    status = "Awas";
    color = "red";
  }
  return(
    
     <Background>
    <Text >Profile UPTD Pengolahan Air</Text>
      
       <View style={styles.container}>
       <Image source={require('../assets/images/bnaten1.png')} style={{width:98, height:110, alignSelf:'center', marginTop: 20}} />  
       <Text style={styles.name}>UPTD Banten</Text>
       <Image source={require('../assets/images/lok.png')} style={{width:45, height:60, alignSelf: 'center', marginTop: 10}} />
       <Text style={styles.name} >Bendungan Pasar Baru CisadaneJl. Ks. Tubun No.42, RT.002/RW.004, Koang Jaya, Kec. Karawaci, Kota Tangerang, Banten 15112 </Text>
      </View>

      <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Ketinggian</DataTable.Title>
                  <DataTable.Title numeric>{status}</DataTable.Title>
                   <DataTable.Title numeric>Waktu</DataTable.Title>
                  
                </DataTable.Header>

                <DataTable.Row >
                  <DataTable.Cell>{this.state.value}</DataTable.Cell>
                  <DataTable.Cell numeric>{status}</DataTable.Cell>
                  <DataTable.Cell numeric>{this.state.time}</DataTable.Cell>
                 
                </DataTable.Row>
  
  </DataTable>
   
       
  <Button mode="outlined" onPress={() => this.props.navigation.navigate('Monitoring')}>
                KEMBALI
        </Button>
        <Button mode="outlined" onPress={() => navigation.navigate('HomeScreen')}>
      Logout
      </Button>
    </Background>
  )
}
}
const styles = StyleSheet.create ({
   container: {
      flex: 1
   },
   text: {
      color: '#4f603c'
   },
  
  headerStyle: {
    fontSize: 36,
    textAlign: 'center',
    fontWeight: '100',
    marginBottom: 24
  },
  elementsContainer: {
    backgroundColor: '#ecf5fd',
    marginLeft: 24,
    marginRight: 24,
    marginBottom: 24
  },
    name: {
        fontSize: 20,
        fontWeight: "bold",
        color: '#000000',
        marginTop: 10,
        alignSelf: 'center'
    }
})
export default memo(Monitoring);