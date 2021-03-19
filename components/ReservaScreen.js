// In App.js in a new project

import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Button, CheckBox } from 'react-native-elements';
import CalendarPicker from 'react-native-calendar-picker';
import Constants from 'expo-constants';
import moment from 'moment';
import ContextAuth from './AuthProvider';


const dateFormat = 'DD/MM/yyyy';
const Check = ({ value, click, checked }) => {
  return (
    <CheckBox
      checkedColor="#0F0"
      size={20}
      title={`${value}:00`}
      onPress={() => click(value)}
      uncheckedColor="#F00"
      checked={checked}
    />
  );
};

const FreeHours = ({ date, select, setSelect, hours }) => {

  /*
   */

  const dateFormatado = moment(date).format(dateFormat);
  const includes = (arr, item) => {
    for (let a of arr) {
      if (a.data === item.data && a.hora === item.hora) {
        return true;
      }
    }
    return false;
  };

  return (
    <View style={{ flex: 1 }}>
      <Text>Horários Disponíveis em {dateFormatado}</Text>
      <ScrollView style={{ flex: 1 }} >
        {hours.map((item) => (
          <Check
            value={item}
            click={(i) => {
              if (includes(select, { data: dateFormatado, hora: i })) {
                setSelect(select.filter((obj, j) => !(select[j].data === dateFormatado && select[j].hora === i )));
              } else {
                setSelect([...select, { data: dateFormatado, hora: i }]);
              }
            }}
            checked={includes(select, { data: dateFormatado, hora: item })}
          />
        ))}
      </ScrollView>
    </View>
  );
};

function ReservaScreen({ navigation }) {
  const [value, onChange] = useState(new Date());

  const authContext = useContext(ContextAuth);
  
  const [select, setSelect] = useState([]);
  useEffect(()=>{
    const f = async ()=>{
      await authContext.action.getHorasLivres();
      setSelect([...authContext.state.userInfo]);
    }
    f();
  }, [  ]);
 
  const onReservar = () => {
    authContext.action.saveUserInfo(select);
  };

  return (
    <View style={{ flex: 1, paddingTop: Constants.statusBarHeight }}>
      <CalendarPicker
        onDateChange={onChange}
        value={value}
        minDate={new Date()}
      />
      <FreeHours date={value} select={select} 
      setSelect={setSelect} hours={authContext.state.horasLivres}/>

      <View style={{ marginBottom: 'auto' }}>
        <Button title="reservar" onPress={onReservar} />

        <Button title="cancelar" onPress={() => navigation.navigate('Home')} />
      </View>
    </View>
  );
}

export default ReservaScreen;
