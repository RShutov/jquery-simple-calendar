# jQuery SimpleCalendar
Simple calendar on Jquery which  created for educationla purposes
Create calendar
================================================================================
  To create calendar call  **$.SimpleCalendar(<params>)** 
  
Calendar options
================================================================================
###lang
  **lang**: contain localization text. It's conatain four field:<br>
   * **weekdays** - array of weekdays names<br>
   * **weekdaysShort** - array of short weekdays names<br>
   * **months** - array of months names<br>
   * **dateError** - string which displayed when error has occured<br>
  
Custom value:
`````javascript
lang:{
      weekdays: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
      weekdaysShort: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
      months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
      dateError: "Wrong date",
    }
`````
###datePattern
**datePattern**: contain regex pattern for **\<input\>**<br>
Custom value:
`````javascript
datePattern: "[0-3][0-9]-((0[1-9])|(1[0-2])){1,1}-((19[0-9]{2,2})|(2[0-9]{3,3})){1,1}"
`````
###datePlaceholder
**datePlaceholder**: contain **\<input\>** palceholder text<br>
Custom value:
`````javascript
datePlaceholder: "DD-MM-YYYY",
`````
###Date constraints
There are two options to constrain the date:
  * **MAX_YEAR**: determine last year in calendar
  * **MIN_YEAR**: determine first year in calendar
  
Custom value:
`````javascript
MAX_YEAR: 3000
MIN_YEAR: 1900
`````
