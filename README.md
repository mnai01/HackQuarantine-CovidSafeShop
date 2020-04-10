# CovidSafeShop

This project was assembled during the 2020 HackQuarantine by https://github.com/m-wrzr/populartimes, [River Dennis](https://github.com/scifipanda), and [Nick Guzzardo](https://github.com/NickGuz).

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

**Notification page**

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
