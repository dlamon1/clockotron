# Clockotron

Clockotron provides the ability to manipulate the time of a countdown timer. It talks directly to Vmix text inputs.

## Installation

==> Download an install file from the Releases tab, link: https://github.com/dlamon1/clockotron/releases/tag/v0.7.3

or

==> Clone or fork this repo, use yarn for everything

## How it works

The timer runs in the Clockotron software and sends the current time values to a Vmix Text Input via a socket connection. We have a Companion module (in version 2.2.\*\*) that is designed to give you a keypad style control over the current time, input the time you want and press enter.

1. Connect to Vmix by providing the IP of the computer that is running Vmix (do not include a port)
2. Create a TEXT INPUT in Vmix to use as a countdown timer (do not create a clock/timer input, the timer will run in the Clockotron software)
3. In Clockotron, click REFRESH INPUT LIST
4. In the dropdown menus, select the Input AND the Layer to assign the timer
5. With any issues, try reloading from the View menu in the toolbar at the top
6. When additional text inputs are created in Vmix, click the REFRESH INPUT LIST to view them

## Feedback

Please submit bug reports to the issues tab on this repo.

Please feel free to submit Pull Requests
