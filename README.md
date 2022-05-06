# Weather-App-JS

Table of Contents
---------------------
 * Introduction
 * Installation
 * Using Weather-App-JS
 * Other Features
 * Design Decisions

---------------------
Introduction

This weather application was created as part of the SheCodes Plus workshop. A key requirement of this weather application was to show our HTML, CSS, Bootstrap, and JavaScript skills. The weather application had to include the following information: real weather icons, real weather descriptions, real temperature data, and colors or gradients. Weather-App-JS also inlcudes the current day and time, weather data in Fahrenheit for the next six days, a pin drop to find weather data for a user's exact location, and a basic responsive design. This weather application is also hosted on Netlify and can be viewed here: https://quizzical-shannon-c13ff6.netlify.app/ 

---------------------
Installation

Weather-App-JS required the installation of Axios in order to connect to the OpenWeather API. 
    
  Using jsDelivr CDN: 
    <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>

---------------------
Using Weather-App-JS

 Weather-App-JS appears with weather information for Las Vegas displayed in Fahrenheit. At the top of the weather application, the user can type a location in the search box which says "FIND A LOCATION", press "enter" on their keyboard, or select the green "SEARCH" button to get the latest weather for the location that was entered. The blue pin drop next to the search box can also be selected to get weather infromation for the user's exact location. 
 
 In the white circle, the user has the option of viewing the temperature in Celsuis. The user can select the °C and the temperature inside the circle is automatically converted from Fahrenheit to Celsuis. To go back to Fahrenheit, the user can select the °F. 

---------------------
Other Features

 Weather-App-JS has a basic responsive design. When the webpage is sized down to a max-width of 576px, Weather-App-JS only displays the weather information located inside the circle. The weather information under "The Next Six Days" column disappears. 

---------------------
 Design Decisions
 
 The colors and font used for Weather-App-JS were inspired by Lady Gaga's Oreo cookies! 