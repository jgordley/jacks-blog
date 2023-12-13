---
title: Calvin - A Full-Stack Open-Source Google Calendar Assistant
date: 12/12/2023
description: In-depth project rundown of a Langchain assistant that can manage your Google Calendar
tag: Langchain
author: John Gordley
---

# Calvin: A Full-Stack Open-Source Google Calendar Assistant
John Gordley 12/12/2023

![](https://placehold.co/600x400)

## Table of Contents
1. Introduction and Motivation
2. Tech Stack and Design Diagram
3. Implementation Details
4. Results and Demo
5. Lessons Learned and Future Work

## Introduction and Motivation
Oh the dream of having your own personal assistant to valet you to work in the morning, take care of your coffee and food, and manage all your important meetings. While the all-encompassing dream of having every need tended to may be far-fetched for people like me, the dream of having an assistant to manage all aspects of your Google Calendar has very much become a reality for the common worker. With all the buzz around the latest tools made available by the OpenAI API and Langchain AI Agents, I decided to take a crack at a very practical application for my everyday life: my Google Calendar.

After a semester of Independent Study under [Dr. Ed Klein](https://www.linkedin.com/in/edkleinurl/) at Vanderbilt University in the MS in CS program, I've got a fully working, full-stack Google Calendar Assistant created with Next.js, FastAPI, and MongoDB. At this stage, the assistant can list your calendars, respond to questions about events on a selected calendar, and create new events for you. While there is still a lot of work to be done before this assistant can even come close to the [Donna Bot](https://www.youtube.com/watch?v=LAd2n-Fw7q4) (credit Suits), this project not only provides a foundational proof of concept for AI agents that can interact with the Google Calendar using a simple Google Auth sign in, but also an extendable tech stack to be used by others for other Langchain AI agent projects.

## Tech Stack and Design Diagram
As mentioned previously, the full tech stack for this project is Next.js frontend for the chat interface, FastAPI backend for the AI agent logic and OpenAI API calls, and a MongoDB database for storing user information. NextAuth is used for Google Authentication and a Google Cloud Project was set up to manage application permissions such as requesting the user's permission to access and modify calendar events. The architecture design diagram is shown below.

