# **Class Schedule for HiLCoE react-native client**

This program is made completely in react-native code. The purpose of this is that it'll make future development on the application much simpler because it will be easier for me to work on it without having to manage multiple code bases and projects. This application will be using the [Class Schedule server](https://github.com/brukbrhane/c-schedule_server.git) that I myself have developed.

---

## How to Build

It will be fairly straightforward to build the Project for android and ios, I will add extra steps in the next section for building with WPF. I'll just be writing down the code you need to write to get it up and running (keep in mind that you will need MacOS and XCode for react-native-ios to work).

1. `npm install`
2. `react-native run-android` or `react-native run-ios`

And that's it! I'll probably update this as it becomes necessary but so far this is all you'll have to do to get it going.

---

## Building Windows

This is going to be the somewhat harder job but I'll try and simplify it so you don't have to suffer like I did. Before you start though go to [THIS](https://github.com/microsoft/react-native-windows/blob/master/vnext/docs/ConsumingRNW.md) site and perform all the requirements listed on it. You can use that whole webpage to do basically what I have listed down here so do as you please

1. `npm install`
2. `yarn add rnpm-plugin-windows` - We add this in case I haven't already added it to the package.json file. can't help to have it here and it's neccessary right now because I haven't started working on it
3. `react-native windows --template vnext` - This will start the building of the project for WPF.
4. Once that is done you'll need to navigate to the "windows" folder created within the project folder and open the `.sln` file in Visual Studio
5. Once Visual Studio is opened up on that solution, go back to your command line which is open on the folder and enter in `react-native start`
6. After all that, make sure that before you run, you change the CPU architechture to run it with to x86 (there are some problems with running x64)
7. `react-native start`
8. Start the application within VS in x86 mode and you're good to go!

---

## Plans

At this point, there are no plans. Lets just get the boilerplate code going and we can see where the development goes from there. Until further support for react-native-wpf goes up, we'll be staying on 0.59 of react-native