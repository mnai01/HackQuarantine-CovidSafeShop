# CovidSafeShop

## About us

This project was assembled during the 2020 HackQuarantine by [Ian Matlak](https://github.com/mnai01), [River Dennis](https://github.com/scifipanda) and [Nick Guzzardo](https://github.com/NickGuz). Our mission was to help clear up populated areas to keep people safe from crowds. Some of us on the team are from NY and COVID-19 is terrible here. Many people are panic buying which leads to crowds in grocery stores. The last place I want to be is in a crowded place which increases my risk of getting it and possibly infecting others who are at high risk of developing serious symptoms. This app will give the people a choice and help guide them to those less crowded, safer places. This is our first time ever developing a react native application. From the start, we had very little knowledge of the framework and since we joined late we only had 5 days to get something running. My team and I just kept fighting and eventually overcame challenges together. We now, not only have a new appreciation for react-native but have gained a new skill too. We have also learned about **Radar.io** and was able to implement their API into our project to help our cause. Our aim for prize categories where **Improving Awareness and Behaviour** 
and **Most Creative Radar.io Hack**

## Summary

CovidSafeShop is an android application that aims to provide users with a safe and reliable way to shop. Whether you're on the look for supplies or trying to pick up dinner it is best to avoid large crowds during a time like this. CovidSafeShop provides live population data of businesses nearby, you can search for a place, for example, a bike shop all the way from McDonald's your options are endless.
This feature is incredibly important for keeping people safe during their trips. With this data in hand, you can always make sure you're picking the business with the least amount of population minimizing your risk of spreading or catching COVID-19.
The app gets live data from our flask API endpoint. It uses a 3rd party python library to help grab the live population data which can be found [HERE](https://github.com/m-wrzr/populartimes).

## Application Pages.

**Scan page**

This is the main page that will provide users with the live population data needed to stay safe when shopping. As you can see below if you want more information about the page you can slick the navigate button which will bring you to its exact location on whichever map you use.

Example Item

![Example-item](assets/ExampleResult.JPG)

Page Walk Through

![Scan-Page](assets/ScanPage.gif)

**Notification page(Uses Radar.io)**

This page lets the user turn on or off automatic notifications based on the user's location. If this setting is on then the app will scan your location periodically. If you ever step in a store the application will realize and send you a reminder to not touch your face and wash your hand when you're done. This new lifestyle for us requires us to be very cautious while we are out. Some people still have trouble adjusting which why is this notification is geared towards reminding you to be safe.

![Notification](assets/Notification.JPG)
![NotificationPage](assets/NotificationPage.JPG)

**View code page**

![code-redirect](assets/CodePage.JPG)

This page will bring you to our github project.

## Languages

CovidSafeShop was built with React Native and our backend server was built with flask

## APIs

## React-Native
