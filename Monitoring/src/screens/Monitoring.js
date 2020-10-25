import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import RNSpeedometer from 'react-native-speedometer';
import { Text} from "react-native";
import axios from 'axios';
class DetailMonitoring extends React.Component{

    constructor(props)
    {
            super(props);
            this.state ={
             value:0,
             tmp:0
            }

              
          }
componentDidMount(){
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
            return(
                <Background>
    <Logo />
    <Header>Monitoring</Header>
    <Paragraph>
     UPTD Pengolahan Daerah Aliran Sungai Cisadane-cidurian
    </Paragraph>
     <RNSpeedometer value={this.state.value} size={150}
      labels={[
            {
              name: 'Awas',
              labelColor: '#ff2900',
              activeBarColor: '#ff2900',
              
            },
            {
              name: 'Siaga 1',
              labelColor: '#ffff33',
              activeBarColor: '#ffff33',
            },
            {
              name: 'Siaga 2',
              labelColor: '#32B76C',
              activeBarColor: '#32B76C',
            },
            {
              name: 'Siaga 3',
              labelColor: '#00008B',
              activeBarColor: '#00008B',
            },
            {
              name: 'Normal',
              labelColor: '#00FFFF',
              activeBarColor: '#00FFFF',
            },
          ]}
     
     />
     <Text>
        {"\n"}
         {"\n"}
       
</Text>
         <Button
          mode="outlined"
          onPress={() => this.props.navigation.navigate('DetailMonitoring')}
         > 
     Profile 
    </Button>
       <Button
        mode="outlined"
        onPress={() => this.props.navigation.navigate('SearchData')}
    >
     KEMBALI
    </Button>
    <Button mode="outlined" onPress={() => navigation.navigate('HomeScreen')}>
      Logout
      </Button>
  </Background>
            )
          }
}
  

export default memo(DetailMonitoring);