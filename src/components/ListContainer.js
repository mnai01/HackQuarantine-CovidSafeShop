import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  ActivityIndicator,
} from "react-native";
import { createOpenLink } from "react-native-open-maps";
import { ScrollView } from "react-native-gesture-handler";

export default function ListContainer(props) {
  let d = new Date();
  let weekday = new Array(7);
  weekday[0] = "Sunday";
  weekday[1] = "Monday";
  weekday[2] = "Tuesday";
  weekday[3] = "Wednesday";
  weekday[4] = "Thursday";
  weekday[5] = "Friday";
  weekday[6] = "Saturday";

  let today = weekday[d.getDay()];
  let hour = d.getHours();
  console.log(today);

  function degreesToRadians(degrees) {
    return (degrees * Math.PI) / 180;
  }

  const distanceInKmBetweenEarthCoordinates = (lat1, lon1, lat2, lon2) => {
    var earthRadiusKm = 6371;

    var dLat = degreesToRadians(lat2 - lat1);
    var dLon = degreesToRadians(lon2 - lon1);

    lat1 = degreesToRadians(lat1);
    lat2 = degreesToRadians(lat2);

    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return earthRadiusKm * c;
  };

  let list = props.data;
  let didMount = props.mounted;
  let currentLocation = props.currentLocation;

  return (
    <ScrollView>
      {didMount ? (
        // map all the places returned, each place is help in a index
        list.results.map((res) => {
          // equals all the average population data for the whole week
          let WeeklyPopulationData = res.populartimes;
          // average population data for today
          let avgPopData = null;
          // live population data
          let currentPop = null;
          // population status decided on currentPop to avgPopData ratio
          let popStatus = null;

          let distanceBetween = distanceInKmBetweenEarthCoordinates(
            currentLocation.location.latitude,
            currentLocation.location.longitude,
            res.coordinates.lat,
            res.coordinates.lng
          );
          // if current_popularity (Live population data) is null
          if (res.current_popularity === null) {
            currentPop = "Live Data Not Available";
          } else {
            currentPop = res.current_popularity + "%";
          }
          // maps the week population data
          if (WeeklyPopulationData !== undefined) {
            WeeklyPopulationData.map((res) => {
              // if find the result which matched today day.
              // This will output the population data for today
              if (today === res.name) {
                // set to todays population data
                avgPopData = res.data[hour] + "%";
                // if avg population data is less then the Live population data
                // if avg population data is more then the Live population data
                // if avg population data is equal to the Live population data
                // if null or anything else
                if (avgPopData < currentPop) {
                  if (currentPop === "Live Data Not Available") {
                    popStatus = "Live Status Not Available";
                    return;
                  }
                  popStatus = "Live Status: Busier than average";
                  currentPop = "Live population: " + currentPop;
                } else if (avgPopData > currentPop) {
                  popStatus = "Live Status: Not too busy";
                  currentPop = "Live population: " + currentPop;
                } else if (avgPopData == currentPop) {
                  popStatus = "Live Status: Normal";
                  currentPop = "Live population: " + currentPop;
                } else {
                  popStatus = "Live Status Not Available";
                }
              }
            });
          } else {
            popStatus = "Unavailable";
            currentPop = "Live population: Unavailable";
            avgPopData = "Unavailable";
          }
          return (
            <View style={styles.resListContainer} key={res.id}>
              <View style={styles.resListLeft}>
                <Text style={styles.resTitle}>{res.name}</Text>
                <Text style={styles.resDistance}>
                  {distanceBetween.toFixed(1)} km /{" "}
                  {(distanceBetween / 1.609).toFixed(1)} miles
                </Text>
                <Text style={styles.resAddress}>{res.address}</Text>
                <Text style={styles.resStatus}>{popStatus}</Text>
                <Text style={styles.resLive}>{currentPop}</Text>
                <Text style={styles.resAvgPop}>
                  Average population now: {avgPopData}
                </Text>
              </View>
              <TouchableHighlight
                style={styles.resListButton}
                underlayColor="#84C4FF"
                onPress={createOpenLink({
                  latitude: res.coordinates.lat,
                  longitude: res.coordinates.lng,
                  zoom: 18,
                })}
              >
                <View>
                  {<Text style={styles.reslistButtonText}>NAVIGATE</Text>}
                </View>
              </TouchableHighlight>
            </View>
          );
        })
      ) : (
        <View style={styles.ScrollViewMessageContainer}>
          {
            <ActivityIndicator
              style={styles.ScrollViewMessage}
              size="large"
              color="#0000ff"
            />
          }
        </View>
      )}
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: 10,
    backgroundColor: "red",
    alignSelf: "stretch",
    justifyContent: "center",
  },
  resListContainer: {
    justifyContent: "space-between",
    flex: 1,
    flexDirection: "row",
    marginTop: 24,
    borderRadius: 7,
    borderColor: "#000",
    borderWidth: 1,
    backgroundColor: "#ffff",
  },
  resListLeft: {
    textAlign: "center",
    margin: 5,
    borderRadius: 7,
  },
  resTitle: { padding: 3, fontSize: 18, color: "black", fontWeight: "bold", flexWrap: 'wrap', flex: 1, width: 250 },
  resDistance: { padding: 3, fontStyle: "italic", color: "black", flexWrap: 'wrap', flex: 1, width: 250 },
  resAddress: { padding: 3, color: "black", flexWrap: 'wrap', flex: 1, width: 250},
  resStatus: { padding: 3, fontWeight: "bold", flexWrap: 'wrap', flex: 1, width: 250 },
  resLive: { padding: 3, fontWeight: "bold", color: "red", flexWrap: 'wrap', flex: 1, width: 250 },
  resAvgPop: { padding: 3, fontStyle: "italic", color: "black", flexWrap: 'wrap', flex: 1, width: 250 },
  resListButton: {
    backgroundColor: "#3BA1FF",
    width: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 7,
  },
  reslistButtonText: {
    fontWeight: "bold",
    color: "white",
    fontSize: 15,
  },
  ScrollViewMessageContainer: {},
  ScrollViewMessage: {
    padding: 35,
    marginTop: "25%",
  },
});
