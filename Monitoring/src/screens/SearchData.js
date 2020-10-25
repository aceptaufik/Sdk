
import React, { memo,Component } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import Paragraph from '../components/Paragraph';
import { View, Picker, StyleSheet, Text, TouchableOpacity, Alert } from "react-native";
import { Table, TableWrapper, Row, Cell,Rows } from 'react-native-table-component';
import { DataTable } from 'react-native-paper';
import axios from 'axios';
class SearchData extends Component{
  constructor(props)
    {
      	    super(props);
            this.state ={
             value:0,
             tmp:0
            }
            // this.readUserData = this.readUserData.bind(this)

              
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
       <Logo />
    <Paragraph>
       Pilih Satu Alat Pemantau Banjir
     </Paragraph>  
 
        <DataTable>
                <DataTable.Header>
                  <DataTable.Title>Ketinggian</DataTable.Title>
                  <DataTable.Title numeric>Status</DataTable.Title>
                  <DataTable.Title numeric>Waktu</DataTable.Title>
                  
                </DataTable.Header>

                <DataTable.Row onPress={() => this.props.navigation.navigate('Monitoring')}>
                 <DataTable.Cell>{this.state.value}</DataTable.Cell>
                  <DataTable.Cell numeric>{status}</DataTable.Cell>
                  <DataTable.Cell numeric>{this.state.time}</DataTable.Cell>
                   
                </DataTable.Row>

                               

  
  </DataTable>

          <Button mode="outlined" onPress={() => this.props.navigation.navigate('Dashboard')}>
                MENU UTAMA
        </Button>
    </Background>
  )
}
}


const styles = StyleSheet.create ({
   container: {
      padding: 10,
      marginTop: 3,
      backgroundColor: '#d9f9b1',
      alignItems: 'center',
      width:450
   },
   text: {
      color: '#4f603c'
   }
})
export default memo(SearchData);