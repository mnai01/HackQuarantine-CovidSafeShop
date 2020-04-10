import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableHighlight,
} from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import axios from "axios";
import ScrollView from "./ScrollView";
import { Feather } from "@expo/vector-icons";

export default function ScanScreen() {
  state = {
    location: null,
    geocode: null,
    errorMessage: "",
  };
  const [list, setlist] = useState({ results: [] });

  const [current, setCurrent] = useState({
    name: null,
    address: null,
    population: null,
  });

  const [MyLocation, setLocation] = useState({
    location: null,
    geocode: null,
    errorMessage: "",
  });

  const [value, onChangeText] = useState("");

  const [didMount, setDidMount] = useState(false);
  const [FinishedLoading, setLoading] = useState(false);
  const [ErrorTyped, setError] = useState(false);

  getlocationAsync = async () => {
    //await Permissions.askAsync(Permissions.LOCATION);
    // This returns an object and that object contains a variable status
    // among many other variables
    // so const { } essentially says whatever value in the object.status
    // assign it to the status i have assigned below
    // reference https://stackoverflow.com/questions/33798717/javascript-es6-const-with-curly-braces
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      setLocation({
        errorMessage: "Permission to access location was denied",
      });
      console.log(location.errorMessage);
    } else {
      console.log("granted");
    }

    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    })
      .then((location) => {
        setLocation({ location: location.coords });
        console.log(location.location);
      })
      .catch((err) => console.log(err));
  };

  const getGeocodeAsync = async (location) => {
    let geocode = await Location.reverseGeocodeAsync(location);
    state.setState({ geocode });
  };

  useEffect(() => {
    getlocationAsync();
  }, []);

  const handler = () => {
    setError(false);
    setLoading(true);
    setDidMount(false);
    console.log(current.name);
    axios
      .get(
        "http://68.129.24.115:8080/api/" +
          "/" +
          value +
          "/" +
          MyLocation.location.latitude +
          "/" +
          MyLocation.location.longitude
      )
      .then((res) => {
        console.log(
          "http://68.129.24.115:8080/api/" +
            "/" +
            value +
            "/" +
            MyLocation.location.latitude +
            "/" +
            MyLocation.location.longitude
        );
        console.log("This is data" + res);
        setlist((prevState) => ({
          ...prevState,
          results: res.data,
        }));
        setDidMount(true);
      })
      .catch((err) => {
        setError(true);
        setLoading(true);
        setDidMount(false);
        //change
        console.log(err.message);
      });
  };
  // let Loading = null;
  // if (didMount === false) {
  //   Loading = (
  //     <Text style={styles.reslistButtonText}>Press Scan to load your list</Text>
  //   );
  // } else {
  //   Loading = null;
  // }
  // if (FinishedLoading === false) {
  //   Loading = <Text style={styles.reslistButtonText}>Loading</Text>;
  // }

  return (
    <View style={styles.container}>

          <View style={styles.inputContainer}>
            <Feather name="search" style={styles.iconStyle}/>
            <TextInput 
                placeholder="Enter a place"
                underlineColorAndroid={"#428Af8"}
                style={styles.inputStyle}
                onChangeText={(text) => onChangeText(text)}
                value={value}
                onEndEditing={handler}
            />
          </View>
      {ErrorTyped ? (
        <View style={styles.ScrollViewMessageContainer}>
          <Text style={styles.ScrollViewMessage}>
            Please enter a correct place
          </Text>
        </View>
      ) : FinishedLoading ? (
        <ScrollView
          data={list}
          mounted={didMount}
          currentLocation={MyLocation}
        />
      ) : (
        <View style={styles.ScrollViewMessageContainer}>
          <Text style={styles.ScrollViewMessage}>
            Enter a place and press scan to generate a list
          </Text>
        </View>
      )}
      <TouchableHighlight
        style={styles.buttonStyling}
        underlayColor="#84C4FF"
        onPress={handler}
      >
        <Text style={styles.buttonText}>Scan</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: "#fff",
    justifyContent: "space-between",
    alignSelf: "stretch",
  },
  ScrollViewMessageContainer: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
  },
  ScrollViewMessage: { fontWeight: "bold", fontSize: 18 },
  inputContainer: {
    marginTop: 50,
    backgroundColor: '#f0EEEE',
    height: 50,
    borderRadius: 5,
    marginHorizontal: 15,
    flexDirection: 'row',
  },
  inputStyle: {
      flex: 1,
      fontSize: 20,
      padding: 5,
  },
  iconStyle: {
      fontSize: 35,
      alignSelf: 'center',
      marginHorizontal: 15,
  },
  buttonStyling: {
    marginTop: 10,
    marginBottom: 20,
    alignSelf: "stretch",
    justifyContent: "center",
    backgroundColor: "#4CA9FF",
    height: 50,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#fff",
  },
  buttonText: {
    alignSelf: "center",
    fontSize: 18,
    color: "black",
    fontWeight: "bold",
  },
});
