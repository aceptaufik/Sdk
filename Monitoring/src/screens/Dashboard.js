import React, { memo } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Paragraph from '../components/Paragraph';
import Button from '../components/Button';
import RNSpeedometer from 'react-native-speedometer';
import { Text} from "react-native";
const Dashboard = ({ navigation }) => (
  <Background>
    <Logo />
    <Header>Selamat Datang</Header>
    <Paragraph>
     Aplikasi Pemantau Bencana Banjir
    </Paragraph>
       <Button
        mode="outlined"
        onPress={() => navigation.navigate('SearchData')}
    >
      Lihat Data
    </Button>
  </Background>
);

export default memo(Dashboard);