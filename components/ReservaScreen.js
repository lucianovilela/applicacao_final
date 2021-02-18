// In App.js in a new project

import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { View, ScrollView } from 'react-native';
import { Text, Button, CheckBox } from 'react-native-elements';
import CalendarPicker from 'react-native-calendar-picker';
import Constants from 'expo-constants';
import moment from 'moment';
import * as firebase from 'firebase';
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

const FreeHours = ({ date, select, setSelect }) => {
  const [hours, setHours] = useState([]);
  const authContext = useContext(ContextAuth);
  useEffect(() => {
    authContext.action.getHorasLivres();
    setHours([...authContext.state.horasLivres]);
  }, []);

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
      <ScrollView style={{ flex: 1 }}>
        {hours.map((item) => (
          <Check
            value={item}
            click={(i) => {
              if (includes(select, { data: dateFormatado, hora: i })) {
                setSelect(select.filter((obj, i) => !select[i] === obj));
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

function ReservaScreen({ setShow }) {
  const [value, onChange] = useState(new Date());
  const authContext = useContext(ContextAuth);
  
  const [select, setSelect] = useState([]);
  useEffect(()=>{
    setSelect([...authContext.state.userInfo]);
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
      <FreeHours date={value} select={select} setSelect={setSelect} />

      <View style={{ marginBottom: 'auto' }}>
        <Button title="reservar" onPress={onReservar} />

        <Button title="cancelar" onPress={() => setShow(false)} />
      </View>
    </View>
  );
}

export default ReservaScreen;
