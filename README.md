**Overview of Project:**
====================================
For my project for CS330 -Struture and Organization of Programming Lanuages, I decided to create a Choose Your Own Adventure Game using mostly JavaScript with some HTML and CSS. I focused on using the JavaScript Document Object Model to add player interaction.

**What I Managed to Accomplish:**
====================================
I was successful in creating a choose your own adventure game. I used HTML and CSS to create a basic display. Each section of the game is divided into its own /*< div >*/ tag. I used features of the JavaScript DOM to add functionality to the game. I mainly used the addEventListener() method with the 'click' event so that when the player clicked on the options, the click would register. I also used textContent and innerHTML to set the content of the story and options displayed on screen. The  getElementById method was used to get access to each of the divs that I created in the HTML file. 

To track each scene in the story, I created a graph-like structure with a JavaScript object. Each scene is an attribute of the object. They have a text property describing the current scene, and an options array listing the possible choices the player can make. The 'next' property was used to transition to the next scene. The scenes can continue until a dead end is reached which would mean there are no more options left to choose from. 

I also created a character model with characteristics like name, health, attack, and defense. The player should be able to change these attributes as the game goes on based on the choices they make. I created a Deque class to simulate an inventory. Items can be added and removed from the inventory by the player based on the actions they make. The inventory is displayed to the player so they can see the items they've collected.

I created a Stack class to store the scenes of the story. Each time the player makes a choice, the current scene is pushed onto the stack. The updateStory() function updates the game display based on the current scene. It displays the scene's text and options and checks for the event listeners for each option so that clicking on an option progresses the story accordingly. The updateInventoryDisplay() and updateStatsDisplay() functions update the display of the player's inventory and character's attributes, respectively.

**Features That I Failed to Implement:** 
====================================
In my original plan, I wanted to use Node.js on the back end and connect the game to a database that would allow the player to save and come back to their save file. I ran out of time to incorporate that feature. I wanted to replace that feature with the ability to go back to the previous scene. I stored each scene in a stack. I created a button that, when pressed, the player would be able to pop off the last scene added to the stack and set that to the current scene. However, the button takes the player back to the first scene in the game instead of to the previous node.

Another feature I was thinking about adding was including images that would pop up every time the scene changed. I realized very quickly that adding an image for each scene would take a long time and I felt like it only added to the aesthetic of the game. Since the focus of this project is functionality, I decided against it.
