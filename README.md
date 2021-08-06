# About

This application serves as a dynamic user interface for utilizing and searching the rules for the game Magic: The Gathering. It has a NodeJS back-end for fetching <a href="https://media.wizards.com/2021/downloads/MagicCompRules%2020210419.txt">the plain text file</a>, parsing it and a ReactJS front-end for representing the rules in a practical manner.

# Back-end functionality

The content of the previously mentioned text file is processed so that only the actual list of rules is first put into a variable, which is processed line by line using regular expressions and and put into their respectable arrays of chapters, sub-chapters, rules and sub-rules based on the first few characters of the line (which gives away if the line represents a chapter header, rule number etc.) Then, the array of sub-rules gets merged into the array of rules based on the rule numbering, after which the array of rules is put into the array of sub-chapters etc. The back-end serves just one handy nested array of objects to the front-end.

# Front-end functionality

The application creates a table of contents based on the main chapters (such as 1. Game Concepts), allows the user to expand on those chapters and choose a sub-chapter (such as 102. Players) and then lists all the rules (such as 103.1) and sub-rules (such as 103.1a) in that sub-chapter.

There is a search function for filtering the rules based on a keyword. It is case-insensitive and the search itself has a short after typing, so that the search is executed only when the user has supposedly stopped typing.

# Ideas for improvement

The application could be improved at least by
-  improving the search function by offering keyword suggestions and noticing if the user has made a typo of 1-2 characters
-  responsiveness

# Opinion

Very pleasant task to work on, and it took quite little googling!
