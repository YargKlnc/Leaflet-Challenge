# Leaflet-Challenge
Leaflet Challenge by YK

![image](https://github.com/YargKlnc/Leaflet-Challenge/assets/142269763/ef9b0e08-87ff-478b-96b8-d86844148125)



**Background**

The United States Geological Survey, or USGS for short, is responsible for providing scientific data about natural hazards, the health of our ecosystems and environment, and the impacts of climate and land-use change. Their scientists develop new methods and tools to supply timely, relevant, and useful information about the Earth and its processes. The USGS is interested in building a new set of tools that will allow them to visualize their earthquake data. They collect a massive amount of data from all over the world each day, but they lack a meaningful way of displaying it. This work is tasked with developing a way to visualize USGS data that will allow them to better educate the public and other government organizations (and hopefully secure more funding) on issues facing our planet.

**Important Notes**

If you are using a windows machine open html file in integrated terminal and type; python -m http.server --bind 127.0.0.1 8000 and click on the link to open the map

**Instructions**

The instructions for this activity are broken into two parts:
  
  •	Part 1: Creating the Earthquake Visualization
  
  •	Part 2: Gathering and Plotting More Data 


Following tasks performed in this project:

•	Plotting the tectonic plates dataset on the map in addition to the earthquakes.

•	Adding other base maps to choose from.

•	Putting each dataset into separate overlays that can be turned on and off independently.

•	Adding layer controls to the map.


Requirements applying to "Part 1: Creating the Earthquake Visualization".


**Completed Tasks**


Map

•	TileLayer loads without error 

•	Connects to geojson API using D3 without error 

•	Markers with size corresponding to earthquake magnitude 

•	A legend showing the depth and their corresponding color 

![image](https://github.com/YargKlnc/Leaflet-Challenge/assets/142269763/ef0d33e2-6e00-46f4-8180-ffb359ff32ad)

![image](https://github.com/YargKlnc/Leaflet-Challenge/assets/142269763/80c4eaf4-cb29-4597-8436-c67f2562eea8)


Data Points 

•	Data points scale with magnitude level 

•	Data points colors change with depth level 

•	Each point has a tooltip with the Magnitude, the location and depth 

•	All data points load in the correct locations 


**References**

USGS logo photo rights belongs to https://www.usgs.gov/
