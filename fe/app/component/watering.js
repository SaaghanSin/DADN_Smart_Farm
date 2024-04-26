import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView, Switch, TextInput} from 'react-native'

const {Client} = require('pg')

const client = new Client({
  host: 'localhost',
  database: 'dadn',
  user: 'postgres',
  password: 'Sus16103*',
  port: 5432,
})

// client.connect();
// client.query('SELECT * FROM users', (error, result) => {
//   if (error){
//     console.log(error.message)
//   }else{
//     console.log(result.rows)
//   }
//   client.end;
// })

const Watering = () => {
  const [soilMoisture, setSoilMoisture] = useState(36)
  const [isPumping, toggleManualPump] = useState(false)
  const [isAutomatic, togglePumpMode] = useState(false)
  const [moistureLimit, setMoistureLimit] = useState('')
  const [baseLimit, setBaseLimit] = useState('')
  const GlobalState = {
    soilMoisture, setSoilMoisture,
    isPumping, toggleManualPump,
    isAutomatic, togglePumpMode,
    moistureLimit, setMoistureLimit,
    baseLimit, setBaseLimit,
  }
  return(
    <SafeAreaView style={styles.container}>
      <View style={styles.title}>
        <Text style={styles.label}>Watering</Text>
        <Image style={styles.wateringIcon} source={require('./Asset/Images/watering-icon.png')}/>
      </View>
      <View style={styles.panelContainer}>
        <LeftPanel GlobalState={GlobalState}/>
        <RightPanel GlobalState={GlobalState}/>
      </View>
    </SafeAreaView>
  );
}
const LeftPanel = ({GlobalState}) => {
  const {
    soilMoisture, setSoilMoisture,
    isPumping, toggleManualPump,
    isAutomatic, togglePumpMode,
  } = GlobalState;
  return(
    <View style={styles.leftPanel}>
      <View style={styles.moistureDisplay}>
        <Text style={{fontSize: 30}}>{soilMoisture}%</Text>
        <Image style={styles.waterDropIcon} source={require('./Asset/Images/water-drop.png')}/>
      </View>
      <Text style={{color: 'gray', fontSize: 12,}}>Soil moisture</Text>
      <View 
        style={{
          borderColor: 'black', 
          borderBottomWidth: 1,
          marginTop: 40,
          marginBottom: 40,
        }}
      >
      </View>
      <View style={styles.manualPump}>
        <Text style={{fontSize: 20}}>Pump</Text>
        <Switch
          value={isPumping}
          onValueChange={() => toggleManualPump(!isPumping)}
          disabled={isAutomatic}
          thumbColor={isPumping ? 'white' : 'black'}
          trackColor={{false: '#a95db0', true: '#5db075'}}
          style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
        />
      </View>
    </View>
  )
}
const RightPanel = ({GlobalState}) => {
  const {
    isAutomatic, togglePumpMode, 
    moistureLimit, setMoistureLimit,
    baseLimit, setBaseLimit,
  } = GlobalState
  return(
    <View style={styles.rightPanel}>
      <View style={styles.pumpMode}>
        <Text style={{fontSize: 20}}>{isAutomatic ? 'Automatic' : 'Manual'}</Text>
        <Switch
          value={isAutomatic}
          onValueChange={() => togglePumpMode(!isAutomatic)}
          thumbColor={isAutomatic ? 'white' : 'black'}
          trackColor={{false: '#a95db0', true: '#5db075'}}
          style={{ transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }] }}
        />
      </View>
      <Text>Base Limit</Text>
      <View style={styles.userInput}>
        <TextInput
          value={baseLimit}
          onChangeText={(newText) => setBaseLimit(newText)}
          placeholder="Enter base limit"
          keyboardType="numeric"
          style={styles.textInput}
          editable={isAutomatic}
        />
        <Text style={{fontWeight: 'bold'}}>%</Text>
      </View>
      <Text>Upper Limit</Text>
      <View style={styles.userInput}>
        <TextInput
          value={moistureLimit}
          onChangeText={(newText) => setMoistureLimit(newText)}
          placeholder="Enter limit"
          keyboardType="numeric"
          style={styles.textInput}
          editable={isAutomatic}
        />
        <Text style={{fontWeight: 'bold'}}>%</Text>
      </View>
      <TouchableOpacity style={styles.button}>
        <Text style={{color: 'white'}}>
          Confirm
        </Text>
      </TouchableOpacity>
    </View>
  )
}

styles = StyleSheet.create({
  container: {
  },
  title: {
    flexDirection: 'row',
    marginTop: 15,
    marginBottom: 15,
    paddingLeft: 10,
    width: '50%',
    justifyContent: 'space-between',
  },
  label: {
    fontSize: 25,
  },
  wateringIcon: {
    width: 65,
    height: 40.5,
  },
  panelContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    borderColor: 'black',
    flexDirection: 'row',
    borderTopWidth: 1,
    borderBottomWidth: 1,
  },
  leftPanel: {
    margin: 10,
    padding: 10,
    width: '45%',
    borderColor: 'black',
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 20,
  },
  moistureDisplay: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  waterDropIcon: {
    width: 32,
    height: 32,
  },
  manualPump: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightPanel: {
    margin: 10,
    padding: 10,
    width: '45%',
  },
  pumpMode: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  userInput: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 10,
  },
  button: {
    backgroundColor: '#5db075',
    borderRadius: 30,
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: 25,
    paddingVertical: 5,
  },
  textInput: {
    backgroundColor: '#f6f6f6',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#efefef',
    paddingVertical: 10,
    paddingHorizontal: 30,
  },
})



export default Watering;
