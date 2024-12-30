export interface MultChoice {
    text: string;
    options: string[];
    correctAnswer: number;
}

export const FAMILYMC: MultChoice[] = [
    {
        text: "What is a rainbow?",
        options: ["Magic", "Radio Wave Arch", "Sprinkle Water Arch", "Frozen Water Arch"],
        correctAnswer: 2
    },
    {
        text: "What do you call mumma's mumma?",
        options: ["Gramy", "Grandma", "Mimi", "Papa"],
        correctAnswer: 2
    },
    {
        text: "What does mumma call mumma's mumma?",
        options: ["Mom", "Gramy", "Mimi", "Dad"],
        correctAnswer: 0
    },
    {
        text: "Which planet is closest to the Sun?",
        options: ["Venus", "Mercury", "Mars", "Earth"],
        correctAnswer: 1
    },
    {
        text: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correctAnswer: 1
    },
    {
        text: "What color is the sky?",
        options: ["Red", "Green", "Blue", "Yellow"],
        correctAnswer: 2
    }
];
