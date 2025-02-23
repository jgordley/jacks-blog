---
title: "From Text to Action: How LLMs Became AI Agents"
date: "2024-02-23"
excerpt: "A mini-history lesson on how LLMs gained the ability to execute actions and the state of Agents in 2025"
tags: ["agents", "langchain"]
---
**Jack Gordley**  

![Claude Pro UX Screenshot](/images/text_to_action/claude_pro.png)

The AI hype continues on from 2024 to 2025 with many tech CEOs and AI enthusiasts claiming that this is "the year of Agents":

- [OpenAI CPO Kevin Weil](https://www.axios.com/2025/01/23/davos-2025-ai-agents) - 
  > For us, I think 2025 is the year that we go from ChatGPT being this super smart thing that can answer any question you ask, to ChatGPT doing things in the real world for you

- [NVIDIA CEO Jensen Huang](https://finance.yahoo.com/news/nvidia-jensen-huang-says-ai-044815659.html) -
  > The age of AI Agentics is here," Huang told the crowd, describing a shift from generative AI to agentic AI—a future driven by intelligent AI agents capable of assisting with tasks across industries. Huang called this emerging sector "a multi-trillion-dollar opportunity.

But what exactly does this "shift" entail? While LLMs like ChatGPT and Claude found their way into the mainstream in 2023, the main use case for average consumers continues to be as a chatbot/search engine for knowledge rather than a functioning Agent that takes action on our behalf. So what is all the hype this year about AI agents and how is the transition happening? Let's break it down. 

## Definitions - What is an AI Agent?

Let's start with a few definitions from companies at the forefront of AI Agent research:  

- **[Google AI Agent white-paper](https://www.kaggle.com/whitepaper-agents)**  
  > A Generative AI agent can be defined as an application that attempts to achieve a goal by observing the world and acting upon it using the tools that it has at its disposal.

- **[AWS AI Agents](https://aws.amazon.com/what-is/ai-agents/)**  
  > An artificial intelligence (AI) agent is a software program that can interact with its environment, collect data, and use the data to perform self-determined tasks to meet predetermined goals.

- **[HuggingFace SmolAgents](https://huggingface.co/blog/smolagents)**  
  > AI Agents are programs where LLM outputs control the workflow.

From these definitions, the distinction between Large Language Models and AI agents is the ability to not just generate text, but take action on behalf of users given a set of tools at their disposal. So how do LLMs generate text that makes a decision that leads to action?

## Agent Foundations - JSON Mode  

The basic idea behind getting LLMs to take action is to send some information to an LLM about tools that we have at our disposal and ask it what to do. In technical terms, have an LLM make a decision on what function to call with which parameters based on an input request.

A simple example, we could ask an LLM to help us add two numbers and pass along information about a function that we can use:

![LLM function calling example](/images/text_to_action/llm_example_1.png)

This is great! The LLM has determined that we should call the function and that we should pass in 3 and 5 as the inputs. But how are we are going to take the LLM's advice and actually execute the code? We need a format that is easily parseable so that we can translate the LLMs intentions to code that we can actually execute. The common pattern that emerged in 2022 was using JSON. 

![LLM function calling example with JSON](/images/text_to_action/llm_example_2.png)

Then you could easily write a python script that would take the output and parse with a JSON:

```python
import json

output = call_chatbot()
# Response: {"function": "add", "a": 3, "b": 6}

json.loads(output)
return add(output.get('a'), output.get('b'))
```

However, in 2022, LLMs were notoriously bad at outputting **only** JSON. They would often return responses like:  

```
"Sure! Here's a JSON with what to call your function {"functionName": "add", "a": 3, "b": 6}"
```

Obviously this will fail to parse as a JSON and require more robust parsing, but the other infinite scenarios for searching through the string are impossible to solidify into a production-ready system (although some may have tried).

![Please output JSON speech](/images/text_to_action/pls_json.png)

[https://www.reddit.com/r/ProgrammerHumor/comments/1fueur3/promptengineering](https://www.reddit.com/r/ProgrammerHumor/comments/1fueur3/promptengineering)

Responding to this need, OpenAI released [Function Calling](https://openai.com/index/function-calling-and-other-api-updates/) in June 2023 and [JSON mode at DevDay](https://openai.com/index/new-models-and-developer-products-announced-at-devday/) in November 2023. These features essentially locked ChatGPT's response into a JSON format so developers could have confidence that the output results would be parseable for any variety of use cases, whether it be calling a function or outputting in a structure that developers needed for their use case:

Example of OpenAI's JSON Mode:

```python
import openai
openai.api_key = 'your-api-key'

response = openai.Completion.create(
  model="text-davinci-003",
  prompt="Translate the following English text to French and output JSON: 'Hello, how are you?'",
  response_format={ "type": "json_object" } # NEW FIELD
)

print(response)
```
[OpenAI Community: How do I use the new JSON mode?](https://community.openai.com/t/how-do-i-use-the-new-json-mode/475890/2)

Similar projects such as [Guidance AI](https://github.com/guidance-ai/guidance) popped up that allowed users to generate LLM output from popular open-source models in a structured format. This project also implemented interesting generation concepts such as `Select`, where an LLM can fill in a value for you based on available choices:

From the [Guidance AI documentation](https://github.com/guidance-ai/guidance#select-basic):
> Select constrains generation to a set of options:
> ```python
> lm = llama2 + 'I like the color ' + select(['red', 'blue', 'green'])
> ```
> Output: `I like the color red`

This structured output functionality laid the groundwork for developers to use LLMs as decision makers for executing actions given a natural language input.

## Using Tools  

Many frameworks emerged as a result of structured output capabilities. Perhaps the most famous was **[LangChain](https://python.langchain.com/v0.1/docs/use_cases/tool_use/)**, founded by Harrison Chase. This project defined standards for function input and output to LLMs, which it named **[Tool Calling]( https://python.langchain.com/v0.1/docs/use_cases/tool_use/)**.

These `BaseTool` definitions included a function name, description (to be passed to the LLM for context), a schema with the function input parameters, and a definition of what function to actually execute if the Agent decides to use it. Here's an example from my [Google Calendar Agent project](https://gordles.io/blog/calvin) to get a user's calendar events:

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

LangChain received its fair share of criticism for being essentially a wrapper around f-strings, but I would argue it set the standard at the time for intuitive, easy to setup AI Agents. Other notable frameworks that emerged were:

Other notable frameworks included:  

- **[OpenAI Function Calling](https://platform.openai.com/docs/guides/function-calling)**  
- **[AutoGPT - "Commands"](https://github.com/Significant-Gravitas/AutoGPT)**  
- **[BabyAGI - "Tasks"](https://babyagi.org/)**  
- **[LlamaIndex Knowledge Assistants](https://www.llamaindex.ai/)**

It's also worth noting that with model providers like OpenAI adding function calling abilities and JSON mode directly in their API, it's not that difficult to implement your own Agent setup using simple python, the LLM API of your choice, and `exec()` to execute code, giving yourself full control over the setup. This is still a raging debate among developers of AI Agents:

![Just use OpenAI](/images/text_to_action/call_openai_meme.png)
[Reddit: LLMs Frameworks - LangChain, LlamaIndex, Griptape](https://www.reddit.com/r/LangChain/comments/1c6zktz/llms_frameworks_langchain_llamaindex_griptape)


## The Classic Weather API Example

With these agent frameworks in place, developers had easy ways to set up "Agents" which meet the definitions we mentioned earlier. Agents had access to tools, make decisions, and actually take action, whether it be executing code to add two numbers or call an external API to create a new event on someones calendar.

A classic example of an end to end working AI agent is the weather example. In order to create an AI agent that can scout the weather for us, we can give it access to a weather API function, then it will decide based on the user request what location to call the function for and return the result to us:

```python
async def get_weather(location: String) -> WeatherReport:
    """Get detailed weather report"""
    # Implementation using a weather API
    return weather_string
```

**Conversation flow:**  

```
User: Hello, how are you today?  
Agent: *thinking* I do not need to call a weather API, just respond to the user's greeting.  
Agent Response: "Hello, I'm good! How can I help you?"  

User: What's the weather like in Seattle?  
Agent: *thinking* I need to call the weather API with input Seattle.  
Response: {function: "get_weather", params: {location: "Seattle"}}  
System: get_weather("Seattle") -> 30 degrees and Rainy  
Agent Response: "The weather in Seattle is 30 degrees and rainy, better pack a raincoat!"
```

A more in-depth example can be found in [OpenAI's function calling docs](https://platform.openai.com/docs/guides/function-calling).  

## State of Agents in 2025  

Now that we've had these capabilities for almost two years, what do we have to show for it?  

My answer - I am still surprised at the lack of examples of AI agents that are actually being used in production or providing real benefits to users. An explanation for this is still that agents can be unreliable and difficult for large-scale corporations to implement as error cases are extremely costly.

In 2024, we saw the release of the **"First AI Software Engineer," Devin** ([Cognition AI](https://www.cognition.ai/blog/introducing-devin)), which shook the markets and gave me a mini-panic attack about my career prospects. However, the demo turned out to be largely faked ([World of Bugs breakdown](https://www.youtube.com/watch?v=tNmgmwEtoWE)) and its capabilities have since seen a boatload of criticism on Twitter:

> Last week, we asked Devin to make a change. It added an event on the banner component mount, which caused 6.6M @posthog events in one week, which will cost us $733. Devin cost $500 + $733 = $1273 😢👍
- [@abhagsain on Twitter](https://x.com/abhagsain/status/1876362355870994538)

> Ok tried Devin on two new tasks, one was automatically creating data visualizations of benchmarks, which took about 4 hours and a ton of back and forth debugging with it to get it .. mostly working. Second was having it just create a readme after looking over all the code. Hallucinated nearly everything. I can't recommend Devin especially at this price at this time to others.
- [@Teknium1 on Twitter](https://x.com/Teknium1/status/1870899152244425177)

For success stories, I tend to turn to Agents that are less explicitly labeled as such. A great example is Perplexity search which I would consider an AI Agent at its core, as it is essentially an LLM with access to internet search tools/APIs: [Perplexity AI: How Does Perplexity Work](https://www.perplexity.ai/hub/faq/how-does-perplexity-work)

There are also a few notable examples I have seen from large providers such as Google, who have incorporated the abilities to create tasks, notes, and calendar events using Gemini [as reported by 9to5Google](https://9to5google.com/2024/02/27/gemini-google-calendar/). Although only native to Google, this applications is taking LLMs one step further by allowing them to perform actions on the users behalf like scheduling a task or retrieving information from their calendar. Again, the risks are huge for error cases - such as a user scheduling a reminder to meet a client and the reminder being scheduled in the wrong time zone. Reliability is going to be the key to large scale adoption of features like this.

In any case, AI agents are not going away anytime soon. A lot of bright minds are throwing themselves at the AI Agent problem. It was reported that 75% of the latest YC batch was focused on AI, [according to CoAI](https://getcoai.com/news/ai-startups-now-represent-75-of-y-combinators-summer-2024-cohort/#:~:text=AI%20dominates%20Y%20Combinator's%20latest,working%20on%20AI%2Drelated%20products).

LLMs in general have definitely made their mark, I personally use Claude daily for coding help, cooking tutorials, and a broad variety of other questions that I used to use Google search for. But for AI agents that can take action on our behalf, I think there is still an incredible amount of untapped potential.