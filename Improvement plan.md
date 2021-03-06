Improvement plan

Angular
- phase 1: see below
- phase 2
-- Consume new API operations
-- Add API authentication

.NET
- phase 1: nothing
- phase 2:
-- Enhance API with some operations
-- Add API authentication

Soft skills improved as effect:
- Autonomy 
-- ability to design a small project or parts of a bigger one independently; 
-- empowered & accountable on own decisions

- Communication (i.e. with the "customer")


-----------------------------
PHASE 1
-----------------------------

We have a weather forecast REST API exposed at this URL: http://ocpa.ro/backend/
- No authentication (yet) on this API

This API exposes the following GET operations:

Get a list of geographic regions available for the forecast
[GET] /geography

Get a list of geographic subregions for a given region name
[GET] /geography?region=<reg name>

Get a list of cities for given region / subregion names
[GET] /geography?region=<reg name>&subregion=<sub reg name>

Get the available forecast start/end dates and the data set length for the specified parameter combination
[GET] /meteo?region=<reg name>
[GET] /meteo?region=<reg name>&subregion=<sub reg name>
[GET] /meteo?region=<reg name>&subregion=<sub reg name>&city=<city name>

Get the forecast data for the specified parameter combination
[GET] /meteo?region=<reg name>&subregion=<sub reg name>&city=<city name>&skip=<days to skip>&take=<days to return>


-----------------------------
Goal: Implement an Angular app that allows retrieving forecast information from the above presented API.

Must have:

The app should present the following UI elements:

(1) INPUT (SELECTION) AREA

- Region (Drop down box)
-- When a region is selected, this results in repopulating the Subregion drop down box

- Subregion (Drop down box)
-- When a subregion is selected, this results in repopulating the Cities drop down box

- City (Drop down box)
-- When a city is selected, this results in fetching and displaying the forecast data for the first "page" in the OUTPUT area

(2) OUTPUT AREA

Should display the selected city using a path-like format eg <region> / <subregion> / <city>

The data is to be displayed in a table with these columns:
- Date
- T Min
- T max
- Normal T Min
- Normal T Max

-- Should show 10 days per page
-- SHould show paging controls (Previous / Next / Number of pages / Current page number)
-- Moving between pages is done by playing with the skip / take arguments passed to the API.


Technical requirements:
- If the backend URL changes, the app should be able to follow the new URL by means of changing a config option, without needing to recompile
- REST backend to be accessed via Angular services, whose functions return Observables

- The input and output area should be defined in their own Angular component
- The layout should be responsive and it should scale so that it fits to the screen resolution / window size optimally

- Should define data models for the backend so that they can be easier extended if necessary
- No dead code written (Write the optimal amount of code to provide the desired functions)

------------------

Optional: 
** Each column should be sortable. 
** Sorting should not affect paging. 
** The sort column and order should be preserved when moving between pages.

* Customizable app look and feel via CSS


Phase 1 Deliverables:

1. Story/tasks break down
- Repo created on Github and stories defined as issues under that repo
Ideas of stories: Input Area / Output Area / Paging Controls / Background services

2. Estimations
- Attach estimation to the main "story" ticket
- Consider 2-weeks sprints

- Estimate carefully. Don't expect hints to be provided by the team lead! He's acting like a customer now :) :p
(Kidding. Team lead will provide coaching and help when needed. But you should try to be as autonomous as possible.)

3. Design
- Discussions wiki page under GitHub

4. Implementation
- The code should be added in GitHub repo
- Should be possible to access the app via a LAN URL (no internet publish at this time)
-----------------------------
