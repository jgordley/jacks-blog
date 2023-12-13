---
title: Calvin - A Full-Stack Open-Source Google Calendar Assistant
date: 2023/12/12
description: In-depth project rundown of a Langchain assistant that can manage your Google Calendar
tag: Langchain
author: John Gordley
---

# Calvin: A Full-Stack Open-Source Google Calendar Assistant

<iframe width="560" height="315" src="https://www.youtube.com/embed/ivGhV_OphxE?si=OOjko6S2fa2-TUy5" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>

<br>
<div style="display: inline-flex; align-items: center;">
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg> 
<a href="https://github.com/jgordley/GoogleCalendarAssistant" style="text-decoration: none; margin-left: 5px;">Google Calendar Assistant Project Link</a>
</div>

## Table of Contents

1. Introduction and Motivation
2. Tech Stack and Design Diagram
3. Authentication and Google API Setup
4. Langchain Agent Implementation Details
5. Results
6. Lessons Learned and Future Work

## Introduction and Motivation
<hr>
Oh the dream of having your own personal assistant to valet you to work in the morning, take care of your coffee and food, and manage all your important meetings. While the all-encompassing dream of having every need tended to may be far-fetched for people like me, the dream of having an assistant to manage all aspects of your Google Calendar has very much become a reality for the common worker. With all the buzz around the latest tools made available by the OpenAI API and Langchain AI Agents, I decided to take a crack at a very practical application for my everyday life: my Google Calendar.

After a semester of Independent Study under [Dr. Ed Klein](https://www.linkedin.com/in/edkleinurl/) at Vanderbilt University in the MS in CS program, I've got a fully working, full-stack Google Calendar Assistant created with Next.js, FastAPI, and MongoDB. At this stage, the assistant can list your calendars, respond to questions about events on a selected calendar, and create new events for you. While there is still a lot of work to be done before this assistant can even come close to the [Donna Bot](https://www.youtube.com/watch?v=LAd2n-Fw7q4) (credit Suits), this project not only provides a foundational proof of concept for AI agents that can interact with the Google Calendar using a simple Google Auth sign in, but also an extendable tech stack to be used by others for other Langchain AI agent projects.

## Tech Stack and Design Diagram
<hr>
As mentioned previously, the full tech stack for this project is Next.js frontend for the chat interface, FastAPI backend for the AI agent logic and OpenAI API calls, and a MongoDB database for storing user information. NextAuth is used for Google Authentication and a Google Cloud Project was set up to manage application permissions such as requesting the user's permission to access and modify calendar events. The architecture design diagram is shown below.

<Image
  src="/images/calvin/CalendarAssistantV2.png"
  alt="ArchitectureDiagram"
  priority
  className="next-image"
/>

As you can see above, a simple frontend UI is sketched out on the left that demonstrates some example queries that I wanted my application to have. The Authentication is all managed by Google Auth and user info such as their Google API access token, email, and account creation date are stored in a MongoDB database. The core logic revolves around calls to GPT-4 and Langchain Tool specifications that give GPT-4 information about the actions it can take to respond to a user. Once the user sends a message to the application, it is handed to a Langchain agent that calls GPT-4 to basically ask what action to take and with which parameters. That function call is then executed and the resulting output is then fed back into GPT-4 to be cleaned up for a nice response that the user can understand. For more information about function calling, see this great article from OpenAI: [https://openai.com/blog/function-calling-and-other-api-updates](https://openai.com/blog/function-calling-and-other-api-updates). 

## Google Auth and API Setup
<hr>

To incorporate Google Auth into my application, I used [NextAuth's Google Integration](https://next-auth.js.org/providers/google). With a few lines, you can specify a callback to Google's Auth API and receive a user token that includes access to different APIs based on your specification. In this case, the only API that was needed was the Google Calendar API and access to read/write calendars and events. You can see the default permission screen for the application below.

<Image
  src="/images/calvin/sign-in-with-google.png"
  alt="SignInPermissions"
  priority
  className="next-image"
/>

There are also several configuration steps that were taken in the Google Cloud Console. I had to create a project, specify an 0Auth consent screen, and add site URLs that would be allowed to issue a Google Login, such as my `localhost` and eventually my DigitalOcean hosted URL. For more info on setting up the Google Cloud Console with NextAuth, there's a great tutorial by Chinedu Imoh on [How to Implement Google Authentication in a Next.js App Using NextAuth](https://www.telerik.com/blogs/how-to-implement-google-authentication-nextjs-app-using-nextauth).

## Langchain Implementation Details
<hr>

Now for the interesting piece, the Langchain Agent that incorporates GPT-4. The design methodology of this agent is relatively simple. Provide a detailed list of functions that the agent can execute and descriptions for when they would be used, what inputs they have, and the functions themselves. In Langchain, this function specification is called a `BaseTool`. When the Langchain agent executes, it passes a formatted list of the `Tools` available to GPT-4, which then responds with what function to call given the query, along with the inputs to the function. The Langchain agent will then execute the function and pass the response back to GPT-4, who will consolidate the output into a final answer to be presented to the user. An example chain execution is shown below:

<Image
  src="/images/calvin/langchain_logic.png"
  alt="LangchainLogic"
  priority
  className="next-image"
/>

In this example, you can see the logs show `Invoking: get_calendar_events with...` which indicates that GPT-4 decided to go with the `GetCalendarEventsTool`. These tool specifications are done by defining a function to be called and a Tool with additional input descriptions and information to help GPT-4 make a decision on which function to call. Here is the `GetCalendarEventsTool` specification as an example:

```python
class GetCalendarEventsTool(BaseTool):
    name = "get_calendar_events"
    description = """
        Useful when you want to get calendar events in a particular date or time range after you have retrieved the current time.
        """
    args_schema: Type[BaseModel] = CalendarEventSearchInput

    def _run(self, user_email: str, calendar_id: str, start_date: str, end_date: str):
        events_response = get_calendar_events(
            user_email, calendar_id, start_date, end_date
        )
        return events_response
```

And the `get_calendar_events` function itself that is called by the Tool's `_run` method:

```python
def get_calendar_events(user_email, calendar_id, start_time, end_time):
    db = get_db()
    user = db.users.find_one({"email": user_email})

    if user:
        access_token = user.get("access_token")

        # Create the API endpoint
        endpoint = (
            f"https://www.googleapis.com/calendar/v3/calendars/{calendar_id}/events"
        )

        # Set the parameters
        params = {
            "timeMin": start_time,
            "timeMax": end_time,
        }

        # Set the headers
        headers = {
            "Authorization": f"Bearer {access_token}",
            "Accept": "application/json",
        }

        # Make the request
        response = requests.get(endpoint, headers=headers, params=params)
        events = response.json()

        # List the events
        event_list = []
        for event in events.get("items", []):
            start = event.get("start")
            date_info = start.get("date", start.get("dateTime"))
            event_list.append(f"{event.get('summary')}: {date_info}")

    return event_list
```

As you can see, it is relatively simple to provide a Google Calendar search tool to our Langchain agent. Just by defining a function and providing additional information to the model in the form of a Langchain tool, GPT-4 can decide what actions to take with meaningful inputs in the context of the conversation to generate useful responses. With the addition of more tools, the agent becomes more capable of helping the user with calendar operations such as creating and rescheduling events.

## Results
<hr>

The current state as of this blog post is that the user can log in with their Google account and ask questions about upcoming events on their calendar as well as create new events on their calendar simply by using natural language. The application is quite powerful given its simplicity and the scope of the project and I am very pleased with how this proof of concept turned out. If anything, this project serves as an example for others who wish to create chatbot assistants that can aid them in calling APIs or performing mundane tasks. 

There are still many improvements to be made that are discussed further down in this article. Many of the main drawbacks are the latency of the bot which is currently very slow due to the OpenAI GPT-4 endpoint latency (it increases greatly when using GPT-3.5-turbo at the expense of bot accuracy) and the bot "hallucinating" from time to time and missing events in certain questions. 

Below are some screenshots of conversations that I thought were helpful and interesting.

#### Creating an Event

<hr>

<Image
  src="/images/calvin/create-lunch.png"
  alt="CreateLunch"
  priority
  className="next-image"
/>

<p style="text-align:center">Simple request to create an event</p>

<hr>

<Image
  src="/images/calvin/created-by-calvin.png"
  alt="CreateByCalvin"
  priority
  className="next-image"
/>

<p style="text-align:center">Event created in Google Calendar with the "created with Calvin" watermark</p>

<hr>

<Image
  src="/images/calvin/time-conflict.png"
  alt="TimeConflict"
  priority
  className="next-image"
/>

<p style="text-align:center">Time conflict being recognized by the bot</p>

<hr>




## Lessons Learned and Future Work

Creating this end to end application was a fantastic experience for me and I learned an extensive amount about Langchain, FastAPI, Next.js, and Google APIs. Near the conclusion of the semester project I also learned how to host and deploy a service with multiple applications on [Digital Ocean](https://www.digitalocean.com/). I wish to continue this project going forward so that it can be helpful for me in my own personal and professional life and perhaps help and inspire others to take on their own AI assistant projects. The following are some interesting improvements that I would like to tackle:


#### Vector-based Tool Retrieval
In theory, one could add as many tool specifications as they wanted and give their agent [unlimited power](https://www.youtube.com/watch?v=SWwFogRQVnk). However, there is a limit on the amount of context you can send GPT-4 and other OpenAI models in the prompt, providing an eventual cap on the amount of tools you can expose. To combat this, a technique has been deviced called Vector-based tool retrieval. In this system, tool descriptions are converted to vectors using models like `text-embedding-ada-002` or `gte-large` and saved to a vector database such as [Weaviate](https://weaviate.io/). Then, before each call to GPT-4 by the langchain agent, the user's query is vectorized and a similarity search is performed to retrieve the `k` most similar tools to the user's query. These `k` tools are then fed to the model without exceeding the context window by feeding it every single tool available. More information on this technique can be found here on Langchain's website: [Custom Agent with Tool Retrieval](https://python.langchain.com/docs/modules/agents/how_to/custom_agent_with_tool_retrieval).

#### New and Improved Tools
I have several ideas for cool tools that could integrate well with the Google Calendar assistant. Creating a tool that could crawl [espn.com](https://www.espn.com) for upcoming sporting events that the user is interested in could be interesting. The same thing could be possible with upcoming show or movie release dates. There are also obvious tool improvements that are core to the functionality such as allowing the agent to reschedule events and invite users by email to events that it creates. 

#### Frontend Improvements
With a calendar application, it is important that the user does not lose events or incorrectly schedule events such as an important client meeting. To assist in this, it could be nice to show a small info card with the event information after one has been created, or give the user a chance to confirm or deny that the event is tentatively scheduled correctly. In the case of deleting an event, it would be nice to give the user the power to confirm that an event that the agent has chosen for deletion is correct. 

## Acknowledgements

I would like to thank [Dr. Ed Klein](https://www.linkedin.com/in/edkleinurl/) again for his supervision and guidance throughout this project. It has been a great experience overall and I look forward to continuing to iterate on this project.