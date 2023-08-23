//canvas, story and options divs 
const canvas = document.getElementById('canvas');
const storyDiv = document.getElementById('story');
const optionsDiv = document.getElementById('options');
const inventoryDiv = document.getElementById('inventory');
const statsDiv = document.getElementById('stats');

// Story as an object with options that include the text and next scene
const story = {
    start: {
      text: "Tyrone woke up. He does not see his mother around. What should he do?",
      options: [
        {
          text: "Go to the kitchen",
          next: "go_kitchen"
        },
        {
          text: "Go back to sleep",
          next: "go_to_sleep"
        }
      ]
    },
    go_kitchen: {
      text: "He looks around the kitchen. There's a key and a bowl of snacks. What should he do?",
      options: [
        {
          text: "Grab the key",
          next: "grab_key",
          inventoryUpdate: function(){
            playerInventory.addBack('key');//adds key to the inventory
            updateInventoryDisplay();//updates inventory display
            
            playerCharacter.defense += 2; //player defense goes up

          }
        },
        {
          text: "Grab the snacks",
          next: "grab_snacks"
        }
      ]
    },
    go_to_sleep: {
      text: "Tyrone goes back to sleep and dreams about finding his mother. The end.",
    },
    grab_key: {
      text: "Tyrone grabs the key and decides to head to a different room. He feels sturdier with the key in his pocket. He gets a defense boost!",
      options: [
        {
          text: "Go to the living room",
          next: "go_living_room"
        },
        {
          text: "Go to the bathroom",
          next: "go_to_bathroom"
        }
      ]
    },
    grab_snacks: {
      text: "Tyrone decided to eat the snacks. How can he look for his mother on an empty stomach? He got so busy that he forgot what he was doing. The end.",
      options: []
    },
    go_living_room: {
      text: "Tyrone gets distracted by the television and forgets what he was doing. The end.",
      options: []
    },
    go_to_bathroom: {
      text: "Tyrone walks over to the bathroom but the door is locked. What should he do?",
      options: [
        {
          text: 'Use the key',
          next: 'use_key',
          inventoryUpdate: function(){
            playerInventory.remove('key');//remove/use key
            updateInventoryDisplay();//updates inventory display
          }
        },
        {
          text: 'Try to break down the door',
          next: 'break_door'
        }
      ]
    },
    use_key: {
      text: "The key worked on the door. Tyrone enters the bathroom and sees the bathtub glowing. What should he do?",
      options: [
        {
          text: 'Reach in and pull out whatever is making the water glow',
          next: 'reach_in'
        },
        {
          text: 'Take a bath',
          next: 'take_bath'
        }
      ]
    },
    break_door: {
      text: "Tyrone tries to break the door down with force. He ends up knocking himself out. The end.",
      options: []
    },

    reach_in:{
      text: "Tyrone stuck his hand in the water to find the glowing item. The water was much deeper then he expected! He fell down a hole!",
      options:[
      {  text: "Tyrone screams while he falls!",
        next: 'fell_on_head',
        function(){
          playerCharacter.health -= 20;//player health decreases
        }
      }  
      ]
    },

    take_bath:{
      text: "Tyrone decided that this was the perfect time to take a bath and sat down in the water. Suddenly a whirlpool appeared! Tyrone was sucked down the drain!",
      options:[
      {
        text: 'Tyrone screams while he falls!',
        next: 'fell_on_butt',
        function(){
          playerCharacter.health -= 10;//player health decreases
        }
      }
      ]
    },

    fell_on_head:{
      text:'Tyrone landed on his head! Ouch! He felt himself grow weeaker. He lost some health. There are two paths. Should he got left or right?',
      options:[
        {
        text: 'Go down the dark path to the left',
        next: 'left_dark_path'
      },
        {
          text: 'Go down the brightly lit path on the right',
          next:'right_lit_path'
        }
    ]
    },
    fell_on_butt:{
      text:'Tyrone landed on his butt! He was able to walk it off with limited damage. He lost atiny bit of health. There are two paths. Should he got left or right?',
      options:[
        {
          text: 'Go down the dark path to the left',
        next: 'left_dark_path'
      },
        {
          text: 'Go down the brightly lit path on the right',
          next:'right_lit_path'
        }
    ]
    },

    left_dark_path: {
      text: "Tyrone decides to take the dark path. He walks for a while and suddenly a loud rumbling sound fills the air. A massive boulder comes crashing down the hill toward him, forcing him to run for his life.",
      options: [
        {
          text: "Dodge the boulder",
          next: "dodge_boulder"
        },
        {
          text: "Hide behind a tree",
          next: "hide_behind_tree"
        }
      ]
    },

    dodge_boulder: {
      text: "Tyrone manages to dodge the boulder just in time. As he catches his breath, he realizes that he's entered a dark cave.",
      options: [
        {
          text: "Proceed further into the cave",
          next: "enter_cave"
        }
      ]
    },

    hide_behind_tree: {
      text: "Tyrone quickly hides behind a tree as the boulder crashes by. When the boulder passes, he finds himself at the entrance of a dark cave.",
      options: [
        {
          text: "Step into the cave",
          next: "enter_cave"
        }
      ]
    },

    enter_cave: {
      text: "Tyrone steps into the cave and his heart races as he hears skittering sounds all around. Suddenly, he spots giant spiders crawling toward him.",
      options: [
        {
          text: "Fight the spiders with bare hands",
          next: "fight_spiders_bare_hands",
          function(){
          playerCharacter.health -= 20;//player health decreases
          }
        },
        {
          text: "Search for an escape route",
          next: "search_escape_route"
        },
        {
          text: "Spot a sword in the middle of the cave and grab it",
          next: "grab_sword",
          inventoryUpdate: function(){
            playerInventory.remove('sword');//remove/use key
            updateInventoryDisplay();//updates inventory display

             playerCharacter.attack += 5;//player attack increases
          }
        }
      ]
    },

    fight_spiders_bare_hands: {
      text: "Tyrone tries to fight off the giant spiders with his bare hands, but their numbers overwhelm him. He's bitten several times and falls to the ground, weakened.",
      options: [
        {
          text: "Use the sword in the middle of the room to defend himself",
          next: "grab_sword",
          inventoryUpdate: function(){
            playerInventory.remove('sword');//remove/use key
            updateInventoryDisplay();//updates inventory display
            
            playerCharacter.attack += 5;//player attack increases
          }
        },
        {
          text: "Attempt to run from the spiders",
          next: "attempt_flee_spiders"
        }
      ]
    },

    search_escape_route: {
      text: "Tyrone searches for an escape route. He spots a narrow tunnel leading deeper into the cave. It seems risky, but it might be his only chance to evade the spiders.",
      options: [
        {
          text: "Cautiously enter the narrow tunnel",
          next: "enter_narrow_tunnel"
        }
      ]
    },

    grab_sword: {
      text: "Tyrone's eyes locks onto a sword lodged in the ground. He rushes forward and snatches it up. The weight of the sword makes him feel more empowered. His attack has gone up!",
      options: [
        {
          text: "Engage the spiders with the sword",
          next: "engage_spiders_sword"
        },
        {
          text: "Look for an exit while holding the sword",
          next: "look_exit_with_sword"
        }
      ]
    },
    
    look_exit_with_sword: {
      text: "Tyrone decides to run through the first exit he finds. He runs until he encounters a waterfall. What should he do?",
      options: [
        {text: "Go through the waterfall.",
        next: "waterfall"
        },
        {
          text: "Keep walking",
          next: "continue_walking"
        }
      ] 
    },
    engage_spiders_sword: {
      text: "Tyrone decides to fight the spiders with the sword. He successfully fights them off long enough to spot a tunnel and another exit. What should he do?",
      options: [
        {text: "Go through the narrow tunnel",
        next: 'enter_narrow_tunnel'
        },
        {
          text: "Go through the other exit",
          next: "look_exit_with_sword"
        }
      ]
    },

    enter_narrow_tunnel:{
      text: "Tyrone decides to escape through the narrow tunnel he found. He comes accross a garden filled with flowers and talking animals. What should he do?",
      options: [
        {
          text: "Talk to the rabbit",
          next: "talk_to_rabbit"
        },
        {
          text: "Explore further",
          next: "explore_garden"
        }
      ]
    },

    attempt_flee_spiders: {
      text: "Tyrone attempts to flee the spiders. Unfortunately he's very clumsy and he slips and falls. The spiders eat him. The end"
    },

    right_lit_path: {
      text: "Tyrone decides to take the brightly lit path. He walks for a while and finds himself in a magical garden filled with colorful flowers and talking animals.",
      options: [
        {
          text: "Talk to the rabbit",
          next: "talk_to_rabbit"
        },
        {
          text: "Explore further",
          next: "explore_garden"
        }
      ]
    },
  talk_to_rabbit: {
  text: "Tyrone approaches the rabbit. The rabbit tells him that in order to find his mother, he needs to solve three riddles. He's given the first riddle: 'I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?'",
  options: [
    {
      text: "Attempt to solve the riddle",
      next: "solve_riddle"
    },
    {
      text: "Ignore the rabbit and explore the garden",
      next: "explore_garden"
    }
  ]
},

  solve_riddle: {
    text: "Tyrone thinks for a moment and confidently answers, 'An echo.' The rabbit smiles and congratulates him. He's given the second riddle: 'What belongs to you, but other people use it more than you?'",
    options: [
    {
      text: "Attempt to solve the riddle",
      next: "solve_second_riddle"
    },
    {
      text: "Explore the garden instead",
      next: "explore_garden"
    }
  ]
},

  solve_second_riddle: {
    text: "Tyrone thinks again and answers, 'My name.' The rabbit nods and tells him the final riddle: 'The more you take, the more you leave behind. What am I?'",
    options: [
    {
      text: "Try to solve the last riddle",
      next: "solve_third_riddle"
    },
    {
      text: "Explore the magical garden some more",
      next: "explore_garden"
    }
  ]
},

  solve_third_riddle: {
    text: "Tyrone ponders the riddle and answers, 'Footsteps.' The rabbit applauds him and tells him that he's proven himself worthy. As a reward, he's given a magical compass that will guide him to his mother's location.",
    options: [
    {
      text: "Thank the rabbit and continue the journey. Tyrone feels more confident with the compass in his hand! His defense increased!",
      next: "use_compass",
      inventoryUpdate: function(){
        playerInventory.addBack('compass');//adds key to the inventory
        updateInventoryDisplay();//updates inventory display

        playerCharacter.defense += 5; //player defense goes up
    }
  }
  ],
  },

  use_compass: {
    text: " The compass is point Tyrone to an eastern path. There is also a western path. Which should he take?",
    options: [
      {
        text: "Follow the compass to the east",
        next: "go_east"
      },
      {
        text:"Ignore the compass. Take the west path.",
        next:"left_dark_path"
      }
    ]
  },
  explore_garden: {
    text: "Tyrone decides to explore the magical garden further. He encounters many wondrous sights and enjoys the peaceful surroundings, but time is passing. He must make a decision.",
    options: [
    {
      text: "Return to the rabbit and solve the riddles",
      next: "talk_to_rabbit"
    },
    {
      text: "Continue exploring and hope to stumble upon his mother",
      next: "continue_exploring"
    }
  ]
},

  go_east: {
    text: "Tyrone encounters a waterfall. Should he continue walking or check the compass?",
    options: [
      {
        text: "Check the compass to see where to go next. It points to the waterfall",
        next: "waterfall"
      },
      {
        text:"Continue walking",
        next: "continue_walking"
      }
    ]
  },

  continue_walking: {
    text: "Tyrone decides to keep walk and comes to a dead end. Suddenly the floors drops from under neath him. I guess this is the end of our hero."
  },

  waterfall: {
    text: "Tyrone decides to run through the waterfall even though he's a cat and he hates water. He enters the cave he finds on the other side of the water.Suddenly he hears his mother's voice calling out for help. What should he do?",
    options: [
      {
        text: "Rush over to his mother!",
        next: "rush_mother"
      },
      {
        text:"Proceed with caution to where he heard his mother's voice.",
        next: "caution_mother"
      }
    ]
  },

  rush_mother: {
    text: "Tyrone decided to rush toward his mother's voice. He felt his strength increase. Unfortunately, a vicious monster was simply mimicing his mother's voice. Tyrone was gobble up. The end.",
  },

  caution_mother: {
    text:"Tyrone walks slowly forward. In the distance he see's a grotesque monster and a wizard. The wizard shots out to Tyrone to identify himself. What should Tyrone say?",
    options: [
      {
        text: "Tell the truth",
        next: "tell_truth"
      },
      {
        text: "Lie",
        next: "tell_lie"
      }
    ]
  },

  tell_truth: {
    text: "Tyrone tells the wizard that he is looking for his mother. The wizard smirks and points to the hideous monster and says that she is Tyrone's monster. The wizard offers to return his mother to his orignal form but Tyrone has to defeat him. How would you like to defeat the wizard?",
    options:[
      {
        text: "Fight him with your might!",
        next: "successful_wizard_fight"
      },
      {
        text: "Use your big brain to defeat him!",
        next: "successful_wizard_brains"
      }
    ]
  },
  tell_lie:{
    text: "Tyrone lies about who he is. The wizard gets angry and shoots Tyrone with a bolt of lighting. Tyrone is put into a deep sleep",
    options:[
      {
        text:"Tyrone wakes up..." ,
        next: "start"
    }
    ]
  },

  /*fight_wizard_might: {
    text: "Tyrone decides that he wants to fight the wizard. The wizard prepares his spell. What should Tyrone do?",
    options: [
      {
        text: "Attack with all his might!",
        next: ' successful_wizard_fight'
      }
    ]
  },*/


  successful_wizard_fight: {
    text: "The wizard shoots a powerful beam but Tyrone manages to dodge it. He slashes the wizard with his sword and the Wizard disappears into dust. The sword breaks. With the wizard's spell broken,Tyrone's mother is restored to her original self. Tyrone meows excitedly and rushes towards his mother.",
    options: [
        {
            text: "Hug his mother and return home",
            next: "end_victory",
            inventoryUpdate: function(){
              playerInventory.remove('sword');//remove sword
              updateInventoryDisplay();//updates inventory display
            }
        }
    ]
},

/*unsuccessful_wizard_fight: {
    text: "Tyrone bravely tries to fight the wizard, but he isn't strong enough. The wizard counters with a powerful spell, and Tyrone is thrown back, weakened. The wizard cackles as he casts one last spell on Tyrone.",
    options: [
        {
            text: "Guess that's the end?",
            next: "start"
        }
    ]
},*/

fight_wizard_brains: {
  text: "Tyrone faces the wizard and challenges him to a battle of wits. The wizard presents him with a riddle: ' You have me today, Tomorrow you'll have more; As your time passes, I'm not easy to store; I don't take up space, But I'm only in one place; I am what you saw, But not what you see. What am I?'",
  options: [
    {
      text: "Try to guess the answer",
      next: 'successful_wizard_brains'
  }
  ]
},

successful_wizard_brains: {
  text: "Tyrone guesses 'Memories'. He was correct! The wizard looks astonished, and he curses Tyrones strong intellect. The wizard turns Tyrone's mother back into her orignal form and disappears.Tyrone meows excitedly and rushes towards his mother.",
  options: [
      {
          text: "Hug his mother and return home",
          next: "end_victory"
      }
  ]
},

/*unsuccessful_wizard_brains: {
  text: "The wizard shakes his head and chuckles. 'Wrong answer,' he says. Tyrone's attempt to outwit the wizard has failed, and the wizard's laughter fills the air. He casts a spell on Tyrone",
  options: [
    {
      text: "Guess that's the end?",
      next: "start"
    }   
  ]
},*/

end_victory: {
  text: "Tyrone has defeated the terrible wizard and returned home with his mother. They had lots of treats and Tyrone even got some belly rubs. The end."
}

  };


  //Chracter class with attributes
class Character{
  constructor(name, health ,attack, defense){
      this.name = name;
      this.health = health;
      this.attack = attack;
      this.defense = defense;
  }
}

function updateStatsDisplay(){
  statsDiv.textContent= `Name: ${playerCharacter.name} | Health: ${playerCharacter.health} | Attack: ${playerCharacter.attack} | Defense ${playerCharacter.defense}`; 
}

//use Stack to track story
class Stack{
  constructor(){
    this.scenes = [];
  }

  isEmpty() {
    return this.scenes.length === 0;
  }

  push(element){
    this.scenes.push(element);
  }

  pop(){
    if(this.isEmpty()){
      return null
    }
    return this.scenes.pop();
  }
}

//use Deque for the inventory
class Deque {
  constructor() {
    this.items = [];
  }

  // Add an element to the front of the inventory
  addFront(element) {
    this.items.unshift(element);
  }

  // Add an element to the back of the inventory
  addBack(element) {
    this.items.push(element);
  }

  // Remove and return the front element from the inventory
  removeFront() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.shift();
  }

  // Remove and return the back element from the inventory
  removeBack() {
    if (this.isEmpty()) {
      return null;
    }
    return this.items.pop();
  }

  // Check if inventory is empty
  isEmpty() {
    return this.items.length === 0;
  }

//prints items in the inventory
checkItems() {
  console.log(this.items);
}

//remove item from anywhere
remove(item){
  if(this.isEmpty()){
    return null;
  }
  let itemtoRemove =this.items.indexOf(item);
  return this.items.splice(itemtoRemove,1);
}
}



//start screen is first "node"
let currentStoryNode = 'start';

//create the player's inventory
let playerInventory = new Deque();

//create character
const playerCharacter = new Character("Tyrone",100,10,5);

//create a stack of the story nodes
const previousStoryScenes = new Stack();

//function to update the story
function updateStory() {
  const currentStory = story[currentStoryNode];//get the current story node from the 'story' object based on the currentStoryNode variable.
  storyDiv.textContent = currentStory.text;//storyDiv updated with text from the current story node
  optionsDiv.innerHTML = '';//empty for new options

  currentStory.options.forEach(option => {//iterates over the options in the story and creates new elements for each option in the story
    const optionElement = document.createElement('div');
    optionElement.classList.add('option');//return css style name
    optionElement.textContent = option.text;//text content set to option text
    
    optionElement.addEventListener('click', () => {
      previousStoryScenes.push(currentStoryNode);//adds current story node to the stack
      currentStoryNode = option.next;//event listener for clicking the next scence for each options
      
      if(option.inventoryUpdate){
        option.inventoryUpdate();
      }

      
    updateStory();//story node is updated as the option button is clicked
    updateInventoryDisplay();// Update the inventory display at startup
    updateStatsDisplay();//update the stats displayed

    const goBack = document.getElementById('goBack');
    goBack.style.display = 'inline-block';
  });

goBack.addEventListener('click', () => {
  if (!previousStoryScenes.isEmpty()) {
    currentStoryNode = previousStoryScenes.pop(); // Pop the previous scene from the stack
    updateStory(); // Update the story to go back to the previous scene
    updateInventoryDisplay(); // Update the inventory display
    updateStatsDisplay(); // Update the stats displayed
  }

  // Hide the "Go Back" button if the stack is empty or after going back
  goBackButton.style.display = previousStoryScenes.isEmpty() ? 'none' : 'inline-block';
});

    optionsDiv.appendChild(optionElement);//adds the option to the optionsDiv to display it 
  });
}



const startButton = document.createElement('button');//creates the start button
startButton.textContent = 'Start Game';
startButton.addEventListener('click', () => {
  updateStory();
  updateStatsDisplay();
});
optionsDiv.appendChild(startButton);

//updateStory();//starts the game and displays the starting screen

//updates what is in the displayed invetory
function updateInventoryDisplay() {
  const inventoryElement = document.getElementById('inventory');
  inventoryElement.textContent = 'Inventory: ' + playerInventory.items.join(', ');
}

updateInventoryDisplay(); // Update the inventory display at startup




//Riddles were pulled from www.riddles.com