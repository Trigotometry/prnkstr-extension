### **Prnkstr — A DOM manipulating Chrome extension.**

### General Assembly — SEI-31

### **About Prnkstr**

The goal of this collaborative project was to build a Chrome Extension allowing a perpetrator to remotely carry out a prank on their chosen victim by manipulating their DOM, and therefor disrupting their browsing experience.

Once installed, Prnkstr allows you to easily name and setup up a link between a victim's Chrome browser and assign it to your *master* account. Prnkstr then runs in the background, and upon a each page reload receives the (harmless) DOM manipulation instructions from a remote database, where the perpetrator can choose enable or disable many features such as replacing all images from FillMurray.com, change all instances of *is* to *isn't* or even something as simple as wrapping all paragraph elements in a <marquee.> tag, bringing back some happily forgotten 90s web design memories.

Prnkstr itself will likely never make the Chrome Extension app store because it fundamentally breaks some of terms required to be posted to the store, though the team behind Prnkstr is hoping to adjust our codebase to adhere with these in the future, where we will try again.

Between Prnkstr's three collaborators ([Sam Seabourn](https://github.com/samseabourn) and [Adlan Elias](https://github.com/adlanelias)) the decision was made to build a backend API using Ruby on Rails and build our frontend control panel with React, in an effort to grow our familiarity with it.

### **Learnings**
Getting the Chrome Extension to run successfully and repetitively ping our Rails API when we needed it to was by far the most challenging part. However, through careful study of Google's extensive Chrome docs, I build a strong understanding of the interplay between an Extension's *manifest.json*, *content.js* & *background.js* scripts. Each of these scripts run in their own environment, so to get data to pass between these required using Chrome's API methods for sending messages between these different environments/scripts.

Organising the data to flow at the required moments meant setting up event listeners on things like creation of a new tab or a page reload and then *messaging* the newly created/active tab with the JSON response from our API, which housed the DOM manipulation instructions.

Finally, it was a matter of setting up a setTimeout() function on page load, recursively calling itself waiting for the JSON object containing manipulation instructions to come through and turn on/off the perpetrator's chosen pranks.

Of course, any web app needs a database and this project had 2 databases. One model was focused solely on the one-to-many relationship of a perpetrator and their victims. We wanted to allow a perpetrator to have many different victim's, but also allow each victim to have unique feature control. The second model housed each of the victim's DOM manipulation values, some of them as simple as a boolean value while others offered some more complex parameters. However, in the future if more features are added I would like to serialise the database so that each feature will only have a single column, regardless of how complex it's parameters might get.

I learned some Git collaboration skills, specifically how to deal with merge conflicts.

I honed my skills with on deploying to Heroku and discovered how to deploy over the top of a Heroku project, even if another person was the original deployer.

### **Show Me Already**
You can find the dashboard of the *Prnkstr extension* at;
https://thomashexton.github.io/prnkstr-client/#/

#### Setting up a Prnkstr link.
![Setting up a Prnkstr Link](https://raw.githubusercontent.com/Trigotometry/prnkstr-extension/master/readme%20images/%231%20Prnkstr%20Link.png)
#### Prnkstr Dashboard Login
![Prnkstr Dashboard Login](https://raw.githubusercontent.com/Trigotometry/prnkstr-extension/master/readme%20images/%232%20Prnkstr%20Login.png)
#### List of users to select from.
![List of already made links.](https://raw.githubusercontent.com/Trigotometry/prnkstr-extension/master/readme%20images/%233%20Prnkstr%20Linked%20List.png)
#### Prnkstr Dashboard — Displays list of current DOM manipulation features.
![Prnkstr Dashboard](https://raw.githubusercontent.com/Trigotometry/prnkstr-extension/master/readme%20images/%234%20Prnkstr%20Dashboard.png)

### **Potential Updates & Additions.**
- Opposite day - (change a list of words to their opposite: "is" to "isn't" etc).
- Matrix mode - (rotate all text elements by 90 & change text colour to green, invert whites to black and wrap them in <marquee.> tag. )

**Thank you to both Joel and Yianni for fielding questions.**
