import { Chapter, ContentType } from './types';

export const CHAPTERS: Chapter[] = [
    {
        id: 'intro',
        title: '1. What is GitHub?',
        blocks: [
            {
                type: ContentType.TEXT,
                content: "GitHub is a code hosting platform for version control and collaboration. It lets you and others work together on projects from anywhere. It uses **Git**, a distributed version control system, to track changes in source code during software development."
            },
            {
                type: ContentType.TIP,
                content: "Think of Git as the 'Save' button on steroids, and GitHub as the cloud storage (like Google Drive) for your code history."
            },
            {
                type: ContentType.IMAGE,
                content: "https://picsum.photos/800/400?grayscale",
                alt: "Abstract representation of version control"
            }
        ]
    },
    {
        id: 'setup',
        title: '2. Installation & Setup',
        blocks: [
            {
                type: ContentType.TEXT,
                content: "Before using GitHub, you need to install Git on your computer and configure it."
            },
            {
                type: ContentType.CODE,
                content: "git config --global user.name \"Your Name\"\ngit config --global user.email \"your.email@example.com\"",
                language: "bash"
            },
            {
                type: ContentType.TEXT,
                content: "These commands tell Git who you are, so your contributions to projects are properly attributed to you."
            }
        ]
    },
    {
        id: 'basics',
        title: '3. The Basics: Repo, Add, Commit',
        blocks: [
            {
                type: ContentType.TEXT,
                content: "A **Repository** (repo) is a folder for your project. To start tracking a folder, you initialize it."
            },
            {
                type: ContentType.CODE,
                content: "git init",
                language: "bash"
            },
            {
                type: ContentType.TEXT,
                content: "When you make changes, you have to **stage** them and then **commit** them."
            },
            {
                type: ContentType.CODE,
                content: "git add . \n# Stages all changes\n\ngit commit -m \"My first commit\"\n# Saves the snapshot",
                language: "bash"
            }
        ]
    },
    {
        id: 'remote',
        title: '4. Working with Remotes',
        blocks: [
            {
                type: ContentType.TEXT,
                content: "To save your code on GitHub, you need to link your local repository to a remote one on GitHub.com."
            },
            {
                type: ContentType.CODE,
                content: "git remote add origin https://github.com/username/repo-name.git\ngit branch -M main\ngit push -u origin main",
                language: "bash"
            },
            {
                type: ContentType.WARNING,
                content: "Always check you are pushing to the correct branch! 'origin' is the default name for your remote server."
            }
        ]
    },
    {
        id: 'branching',
        title: '5. Branching & Merging',
        blocks: [
            {
                type: ContentType.TEXT,
                content: "Branches allow you to work on new features without affecting the main code."
            },
            {
                type: ContentType.CODE,
                content: "git checkout -b new-feature\n# Creates and switches to a new branch",
                language: "bash"
            },
            {
                type: ContentType.TEXT,
                content: "Once you are done, you merge your changes back."
            },
            {
                type: ContentType.CODE,
                content: "git checkout main\ngit merge new-feature",
                language: "bash"
            }
        ]
    }
];

export const INITIAL_TERMINAL_OUTPUT = [
    "Welcome to the Git Simulator v1.0.0",
    "Type 'help' to see available commands.",
    "Try initializing a repository with 'git init'."
];
