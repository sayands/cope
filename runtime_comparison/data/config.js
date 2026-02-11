/**
 * Video carousel data structure
 * Each video has its own conversation script
 */
export const videoCarousel = [
  {
    videoSrc: "assets/video_example1.mp4",
    caption: "Input Video 1",
    conversations: [
      {
        key: "q1",
        label: "Question 1",
        phone1: {
          question: "What is the score & time remaining in the first period of the hockey game?",
          answer: "The game is scoreless with 13:38 left on the clock.",
        },
        phone2: {
          question: "What is the score & time remaining in the first period of the hockey game?",
          answer: "The score is tied at 0-0 with 13:38 remaining.",
        },
      },
      
      {
        key: "q2",
        label: "Question 2",
        phone1: {
          question: "What happens to the player, number 52, during the game?",
          answer: "He's hurt and ends up falling on the ice several times throughout the game.",
        },
        phone2: {
          question: "What happens to the player, number 52, during the game?",
          answer: "He is injured and falls to the ice multiple times during the game.",
        },
      },

      {
        key: "q3",
        label: "Question 3",
        phone1: {
          question: "Who attends to the injured Toronto player, number 52?",
          answer: "A healthcare worker wearing a blue jacket.",
        },
        phone2: {
          question: "Who attends to the injured Toronto player, number 52?",
          answer: "A medical staff member wearing a blue jacket.",
        },
      },

      {
        key: "q4",
        label: "Question 4",
        phone1: {
          question: "Which player pushed player number 52?",
          answer: "Player 52 is being pushed by the player wearing the black-and-yellow jersey with number 46.",
        },
        phone2: {
          question: "Which player pushed player number 52?",
          answer: "Player 52 was pushed by the player wearing the black-and-yellow jersey with number 46.",
        },
      },

      {
        key: "q5",
        label: "Question 5",
        phone1: {
          question: "Which player is fighting with player number 51?",
          answer: "The player wearing number 51 (in the white-and-blue uniform) is engaged with a player wearing a dark jersey with yellow accents.",
        },
        phone2: {
          question: "Which player is fighting with player number 51?",
          answer: "The player wearing a dark jersey with yellow accents is fighting with player number 51.",
        },
      },

      {
        key: "q6",
        label: "Question 6",
        phone1: {
          question: "Which country broadcasts this program?",
          answer: "The logo says \"Hockey Night in Canada\", which is a well-known broadcast program from Canada.",
        },
        phone2: {
          question: "Which country broadcasts this program?",
          answer: "Based on the logo, this program is broadcasted in Canada.",
        },
      },

    ]
  },
  {
    videoSrc: "assets/video_example2.mp4",
    caption: "Input Video 2",
    conversations: [
      {
        key: "q1",
        label: "Question 1",
        phone1: {
          question: "What is the person preparing?",
          answer: "The person is making a sandwich.",
        },
        phone2: {
          question: "What is the person preparing?",
          answer: "The person is preparing a sandwich.",
        },
      },
      
      {
        key: "q2",
        label: "Question 2",
        phone1: {
          question: "What are the ingredients being used?",
          answer: "Using Bread, lettuce, tomato, cheese, and meat slices.",
        },
        phone2: {
          question: "What are the ingredients being used?",
          answer: "The ingredients are bread, lettuce, tomato, cheese, and meat slices.",
        },
      },

      {
        key: "q3",
        label: "Question 3",
        phone1: {
          question: "What is inside the cup?",
          answer: "The cup has a tea bag.",
        },
        phone2: {
          question: "What is inside the cup?",
          answer: "A tea bag can be seen inside the cup.",
        },
      },

    ]
  },
  // Add more videos here
];

/**
 * Delays for each phone - used for ALL question-answer pairs
 */
export const phoneDelays = {
  phone1: 2.39, // LLaVA-Video
  phone2: 0.33, // Cope-VideoLM
};

/**
 * Typewriter speeds for answers (calculated to match desired durations)
 */
export const answerTypingSpeeds = {
  phone1: 1390, // 1.39s total duration in ms
  phone2: 1330, // 1.33s total duration in ms
};
