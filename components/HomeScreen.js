import * as React from 'react';
import {useState } from 'react';

import { View, Text, StyleSheet } from 'react-native';
import { Input, Button, SocialIcon } from 'react-native-elements';

import ReservaScreen from './ReservaScreen';
function HomeScreen( { navigation, route } ) {
  const [reserva, setReserva] = useState(false);
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      {reserva?<ReservaScreen setShow={setReserva} />:
      <Button title="reservar horário" onPress={()=>{ setReserva(!reserva) }}/>
      }
    </View>
  );
}


export default HomeScreen;