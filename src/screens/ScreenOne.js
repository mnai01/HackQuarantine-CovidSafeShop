/**
 * KNOWN ISSUES
 *
 * 1. Notification should only alert once and not again until user is at a new location.
 * 2. Check to make sure location is the same after certain interval to ensure user is actually at the place and not going past it.
 * 3. Interval switches to about 1 second from the specified 10 for unknown reason.
 * 4. Find good values for coords in checkLocation.
 *
 */

import React from "react";
import { StyleSheet, Text, Button, View, Switch } from "react-native";
import * as Location from "expo-location";
import * as Permissions from "expo-permissions";
import { Notifications } from "expo";
import { API_KEY } from "react-native-dotenv";

export default class App extends React.Component {
  constructor() {
    super();

    this.state = {
      location: null,
      nearbyPlaceCoords: {
        latitude: null,
        longitude: null,
      },
      errorMessage: null,
      bgLocationIsEnabled: false,
      newPlace: true,
    };
  }

  componentDidMount() {
    // Get the user's location every 10 seconds (for now)
    this.interval = setInterval(() => this.setIntervals(), 10000);
  }

  componentWillUnmount() {
    // Clear the background location interval to prevent memory leaks
    clearInterval(this.interval);
  }

  setIntervals = () => {
    this.getLocationAsync();
    this.getNearbyPlaceCoords();
    this.checkLocation();
  };

  // Notification needs a cooldown so it doesn't spam every interval
  sendNotification = async () => {
    let notificationId = await Notifications.presentLocalNotificationAsync({
      title: "Covid",
      body: "Remember not to touch your face idiot",
    });

    //this.setIntervals();
    this.setState({ newPlace: false });
  };

  getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      this.setState({
        errorMessage: "Permission to access location was denied",
      });
    }

    let location = await Location.getCurrentPositionAsync({
      enableHighAccuracy: true,
    });
    this.setState({ location: location.coords });
  };

  // Checks if the user is currently at a store or some place
  checkLocation = async () => {
    if (this.state.location && this.state.nearbyPlaceCoords) {
      //  Just sorta random numbers idk what values to use yet
      // Need certain values to ensure user is actually at store and not store next to it or house etc.
      if (
        Math.abs(
          this.state.location.latitude - this.state.nearbyPlaceCoords.latitude
        ) < 0.01 &&
        Math.abs(
          this.state.location.longitude - this.state.nearbyPlaceCoords.longitude
        ) < 0.01
      ) {
        if (this.state.newPlace) {
          this.sendNotification();
        }
      }
    } else {
    }
  };

  // Uses Radar.io to get nearby places and determine if user is at a store
  getNearbyPlaceCoords = async () => {
    if (this.state.bgLocationIsEnabled && this.state.location) {
      let placeLatitude = null;
      let placeLongitude = null;

      let url = `https://api.radar.io/v1/search/places?categories=food-beverage&near=${this.state.location.latitude},${this.state.location.longitude}&radius=1000&limit=1`;

      fetch(url, {
        method: "GET",
        headers: new Headers({
          Authorization: "RADAR.IO API KEY HERE",
        }),
      })
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          try {
            placeLatitude = data.places[0].location.coordinates[1];
            placeLongitude = data.places[0].location.coordinates[0];

            if (
              this.state.nearbyPlaceCoords.latitude !== placeLatitude ||
              this.state.nearbyPlaceCoords.longitude !== placeLongitude
            ) {
              this.setState({
                nearbyPlaceCoords: {
                  latitude: placeLatitude,
                  longitude: placeLongitude,
                },
                newPlace: true,
              });
            }
          } catch (TypeError) {
            this.setState({
              errorMessage: "Nothing nearby",
            });
          }
        });
    } else {
      this.setState({
        errorMessage: "Background Location disabled or coordinates unknown",
      });
    }
  };

  // Logic for the background location setting switch
  toggleSwitch = () => {
    if (!this.state.bgLocationIsEnabled) {
      this.getLocationAsync();
    }

    this.setState({
      bgLocationIsEnabled: !this.state.bgLocationIsEnabled,
    });
  };

  render() {
    let bgLocationIsEnabled = this.state.bgLocationIsEnabled;
    let text = "Background Location disabled or coordinates unknown";
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location && this.state.bgLocationIsEnabled) {
      text = JSON.stringify(
        this.state.location.latitude + ", " + this.state.location.longitude
      );
      text = text.slice(1, text.length - 1);
    }

    return (
      <>
        <View style={styles.container}>
          <Text>Background Location: </Text>
          <Switch
            onValueChange={this.toggleSwitch}
            value={bgLocationIsEnabled}
          />
        </View>
        <View>
          <Text>{text}</Text>
          <Button onPress={this.sendNotification} title="Test Notification" />
        </View>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
