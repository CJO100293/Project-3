# Project-3
## **Group Members:**
- Cody Osieczonek
- Omar Hadi
- Ginger Francione

## **Background:**
Our project uses the Alternative Fuels Data Center API to answer the following questions about the top 3 most common alternative fuel stations in the United States:

1. How many total of all of the top 3 most common alternative fuel stations are there on the West Coast (California), Central US (Texas) and East coast (New York) combined?
2. How many total of all of the top 3 most common alternative fuel stations are there in each major individual part of the united states? e.g West Coast (California), Central US (Texas) and East coast (New York)? 
3. How many total of each individual type of the 3 most common alternative fuel stations are there in California, Texas and New York.

## **Objectives**
We will display this data on a dashboard which is able to be interacted with via selectable toggles to filter the data on a map to show the following:
1. filter map to show results for the above questions being asked in the "background" section above.

## **Instructions to replicate**
1. In order for the above jupyter notebooks to work you will first need an API key from https://developer.nrel.gov/signup/
2. Once you have your API key create a file called ".env" inside of the root folder of this project and in this file enter the following:
AFDC_API = "YOUR_API_KEY HERE"
3. Replace "YOUR API_KEY HERE" with your api key obtained from step 1.
4. Run "data_analysis_cleaned.ipynb" in the "data_analysis" folder. This will run our API queries used to get the datasets that will output as raw JSON data into the "/output_data/data_analysis/json" folder. It will also clean up the data to only show the id of the fuel station, the state it is located in, its gps coordinates and the fuel types. This cleaned up dataset will then be output in CSV format into the "/output_data/data_analysis/csv" folder. It is not necessary to run "data_analysis_cleaned.ipynb" from the "data_analysis". This is here to show how we decided to only use alterative fuel types of Ethanol, Electric cars and Liquid Propane gas in California, Texas and New York instead of using all of the alternative fuel types across the entire United States for our datasets.
5. Run "ETL.ipynb" in the "ETL" folder. This will perform ETL on all of our datasets that were created generated from running "data_analysis_cleaned.ipynb" to further clean them up and remove any unwanted data. This data that was cleaned with ETL will then be output in CSV format into the "/output_data/ETL/csv" folder.
6. start a mongo database server by running the command "mongod"
7. In order to import all of the new CSV files that were created in step 5 into a database (we are using MongoDB for this) either run the "import.bat" batch script located inside of "/output_data/ETL/csv/" (if using Microsoft Windows) or otherwise run the following commands one by one from within the "/output_data/ETL/csv/" folder:
- mongoimport -d AltFuels -c ETL_E85_CA --type CSV --file ETL_E85_CA.csv --headerline
- mongoimport -d AltFuels -c ETL_E85_NY --type CSV --file ETL_E85_NY.csv --headerline
- mongoimport -d AltFuels -c ETL_E85_TX --type CSV --file ETL_E85_TX.csv --headerline
- mongoimport -d AltFuels -c ETL_ELEC_CA --type CSV --file ETL_ELEC_CA.csv --headerline
- mongoimport -d AltFuels -c ETL_ELEC_NY --type CSV --file ETL_ELEC_NY.csv --headerline
- mongoimport -d AltFuels -c ETL_ELEC_TX --type CSV --file ETL_ELEC_TX.csv --headerline
- mongoimport -d AltFuels -c ETL_LPG_CA --type CSV --file ETL_LPG_CA.csv --headerline
- mongoimport -d AltFuels -c ETL_LPG_NY --type CSV --file ETL_LPG_NY.csv --headerline
- mongoimport -d AltFuels -c ETL_LPG_TX --type CSV --file ETL_LPG_TX.csv --headerline
- mongoimport -d AltFuels -c ETL_top3_alt_fuels --type CSV --file ETL_top3_alt_fuels.csv --headerline
- mongoimport -d AltFuels -c ETL_top3_alt_fuels_CA --type CSV --file ETL_top3_alt_fuels_CA.csv --headerline
- mongoimport -d AltFuels -c ETL_top3_alt_fuels_NY --type CSV --file ETL_top3_alt_fuels_NY.csv --headerline
- mongoimport -d AltFuels -c ETL_top3_alt_fuels_TX --type CSV --file ETL_top3_alt_fuels_TX.csv --headerline
8. Make sure the module "Flask pymongo" is installed by running the command "pip install Flask pymongo". This will be needed in order for "/flask_api/app.py" to run.
9. Run "app.py" from within "/flash_api/app.py" using the command "python app.py"
10. Browse to "http://127.0.0.1:5000/" this will take you to our "available routes" page showing all available routes. You can browse to either "http://127.0.0.1:5000/api/endpoints" to show the available data endpoints that is being used.
11. Browse to "http://127.0.0.1:5000/map" to show our map. In the top right hand corner are selectable toggles to show either all of the top 3 alternative fuel stations for CA, NY and TX, All of the top 3 alternative fuel stations for only CA, All of the top 3 alternative fuel stations for only NY, All of the top 3 alternative fuel stations for only TX, ethanol fuel stations for only California, ethanol fuel stations for only New York, ethanol fuel stations for only Texas, electric charging stations for only California, electric charging stations for only New York, electric charging stations for only Texas, propane fuel stations for only California, propane fuel stations for only New York, and propane fuel stations for only Texas.
12. after selecting one of the data point toggles in the top right hand corner you can now left click on the plot points on the map to show the fuel type as well as the coordinates. Since the map is using GeoJSON the coordinates are listed in the order of Longitude, Latitude instead of Latitude, Longitude.

**NOTE For some reason when it came to the electric car charging stations a few datapoints ended up being outside of CA, NY or TX and ended up showing up in other states**

**NOTE in the "import.bat" file where it has the following line:**
**SET "MONGO_HOME=C:\Program Files\MongoDB\Server\6.0"**
**You may need to change the directory listed to whereever your mongodb server folder is located.**

## **Files**
### **Powerpoint Presentation:**
- **"Alternative Fuel Stations In California, Texas and New York.pptx"** - Our powerpoint presentation

### **Data Analysis Files:**
- **"/data_analysis/data_analysis.ipynb"** - This file was used for our exploratory data analysis. We used this to narrow down the top 3 most common types of alternative fueling stations.
- **"/data_analysis/data_analysis_cleaned.ipynb"** - This file is the cleaned up version of "data_analysis.ipynb" used to query our data for the top 3 most common alternative fuel stations in California, Texas and New York and stores the raw JSON data for our queries in the "/output_data/json" folder. It will also clean up the data to only show the id of the fuel station, the state it is located in, its gps coordinates and the fuel types. This cleaned up dataset will then be output in CSV format into the "/output_data/csv" folder.

## **ETL Files:**
- **"/ETL/ETL_top3_fuels.ipynb"** - This file performs the ETL work for the "top3_alt_fuels.csv" for the top 3 most common types of alternative fueling stations in California, Texas and New York.

### **Output "Top 3 Alternative Fuels" Raw Json Files:**
- **"/output_data/json/top3_alt_fuels.json"** - This file contains all of the raw data at the time of the API query being ran for the top 3 alternative fueling stations in California, Texas and New York.
#### **Output "California Alternative Fuels" Raw Json Files:**
- **"/output_data/data_analysis/json/top3_alt_fuels_CA.json"** - This file contains all of the raw data at the time of the API query being ran for the top 3 alternative fueling stations in California.
- **"/output_data/data_analysis/json/ELEC_CA.json"** - This file contains all of the raw data at the time of the API query being ran for the number of electric charging stations in California.
- **"/output_data/data_analysis/json/E85_CA.json"** - This file contains all of the raw data at the time of the API query being ran for the number of E85 fueling stations in California.
- **"/output_data/data_analysis/json/LPG_CA.json"** - This file contains all of the raw data at the time of the API query being ran for the number of LPG fueling stations in California.
#### **Output "Texas Alternative Fuels" Json Raw Files:**
- **"/output_data/data_analysis/json/top3_alt_fuels_TX.json"** - This file contains all of the raw data at the time of the API query being ran for the top 3 alternative fueling stations in Texas.
- **"/output_data/data_analysis/json/ELEC_TX.json"** - This file contains all of the raw data at the time of the API query being ran for the number of electric charging stations in Texas.
- **"/output_data/data_analysis/json/E85_TX.json"** - This file contains all of the raw data at the time of the API query being ran for the number of E85 fueling stations in Texas.
- **"/output_data/data_analysis/json/LPG_TX.json"** - This file contains all of the raw data at the time of the API query being ran for the number of LPG fueling stations in Texas.
#### **Output "New York Alternative Fuels" Raw Json Files:**
- **"/output_data/data_analysis/json/top3_alt_fuels_NY.json"** - This file contains all of the raw data at the time of the API query being ran for the top 3 alternative fueling stations in New York.
- **"/output_data/data_analysis/json/ELEC_NY.json"** - This file contains all of the raw data at the time of the API query being ran for the number of electric charging stations in New York.
- **"/output_data/data_analysis/json/E85_NY.json"** - This file contains all of the raw data at the time of the API query being ran for the number of E85 fueling stations in New York.
- **"/output_data/data_analysis/json/LPG_NY.json"** - This file contains all of the raw data at the time of the API query being ran for the number of LPG fueling stations in New York.

### **Output "Top 3 Alternative Fuels" Raw CSV Files:**
- **"/output_data/data_analysis/csv/top3_alt_fuels.csv"** - This file contains all of the cleaned up data at the time of the API query being ran for the top 3 alternative fueling stations in California, Texas and New York.
#### **Output "California Alternative Fuels" Raw csv Files:**
- **"/output_data/data_analysis/csv/top3_alt_fuels_CA.csv"** - This file contains all of the cleaned up data at the time of the API query being ran for the top 3 alternative fueling stations in California.
- **"/output_data/data_analysis/csv/ELEC_CA.csv"** - This file contains all of the cleaned up data at the time of the API query being ran for the number of electric charging stations in California.
- **"/output_data/data_analysis/csv/E85_CA.csv"** - This file contains all of the cleaned up data at the time of the API query being ran for the number of E85 fueling stations in California.
- **"/output_data/data_analysis/csv/LPG_CA.csv"** - This file contains all of the cleaned up data at the time of the API query being ran for the number of LPG fueling stations in California.
#### **Output "Texas Alternative Fuels" Raw CSV Files:**
- **"/output_data/data_analysis/csv/top3_alt_fuels_TX.csv"** - This file contains all of the cleaned up data at the time of the API query being ran for the top 3 alternative fueling stations in Texas.
- **"/output_data/data_analysis/csv/ELEC_TX.csv"** - This file contains all of the cleaned up data at the time of the API query being ran for the number of electric charging stations in Texas.
- **"/output_data/data_analysis/csv/E85_TX.csv"** - This file contains all of the cleaned up data at the time of the API query being ran for the number of E85 fueling stations in Texas.
- **"/output_data/data_analysis/csv/LPG_TX.csv"** - This file contains all of the cleaned up data at the time of the API query being ran for the number of LPG fueling stations in Texas.
#### **Output "New York Alternative Fuels" Raw CSV Files:**
- **"/output_data/data_analysis/csv/top3_alt_fuels_NY.csv"** - This file contains all of the cleaned up data at the time of the API query being ran for the top 3 alternative fueling stations in New York.
- **"/output_data/data_analysis/csv/ELEC_NY.csv"** - This file contains all of the cleaned up data at the time of the API query being ran for the number of electric charging stations in TNew York.
- **"/output_data/data_analysis/csv/E85_NY.csv"** - This file contains all of the cleaned up data at the time of the API query being ran for the number of E85 fueling stations in New York.
- **"/output_data/data_analysis/csv/LPG_NY.csv"** - This file contains all of the cleaned up data at the time of the API query being ran for the number of LPG fueling stations in TNew York.

### **Output "Top 3 Alternative Fuels" CSV Files After ETL Work:**
- **"/output_data/data_analysis/csv/ETL_top3_alt_fuels.csv"** - This file contains all of the data at the time of the API query being ran for the top 3 alternative fueling stations in California, Texas and New York after running it through the ETL process.
#### **Output "California Alternative Fuels" CSV Files After ETL Work:**
- **"/output_data/ETL/csv/ETL_top3_alt_fuels_CA.csv"** - This file contains all of the data at the time of the API query being ran for the top 3 alternative fueling stations in California after running it through the ETL process.
- **"/output_data/ETL/csv/ETL_ELEC_CA.csv"** - This file contains all of the data at the time of the API query being ran for the number of electric charging stations in California after running it through the ETL process.
- **"/output_data/ETL/csv/ETL_E85_CA.csv"** - This file contains all of the data at the time of the API query being ran for the number of E85 fueling stations in California after running it through the ETL process.
- **"/output_data/ETL/csv/ETL_LPG_CA.csv"** - This file contains all of the data at the time of the API query being ran for the number of LPG fueling stations in California after running it through the ETL process.
#### **Output "Texas Alternative Fuels" CSV Files After ETL Work:**
- **"/output_data/ETL/csv/ETL_top3_alt_fuels_TX.csv"** - This file contains all of the data at the time of the API query being ran for the top 3 alternative fueling stations in Texas after running it through the ETL process.
- **"/output_data/ETL/csv/ETL_ELEC_TX.csv"** - This file contains all of the data at the time of the API query being ran for the number of electric charging stations in Texas after running it through the ETL process.
- **"/output_data/ETL/csv/ETL_E85_TX.csv"** - This file contains all of the data at the time of the API query being ran for the number of E85 fueling stations in Texas after running it through the ETL process.
- **"/output_data/ETL/csv/ETL_LPG_TX.csv"** - This file contains all of the data at the time of the API query being ran for the number of LPG fueling stations in Texas after running it through the ETL process.
#### **Output "New York Alternative Fuels" CSV Files After ETL Work:**
- **"/output_data/ETL/csv/ETL_top3_alt_fuels_NY.csv"** - This file contains all of the data at the time of the API query being ran for the top 3 alternative fueling stations in New York after running it through the ETL process.
- **"/output_data/ETL/csv/ETL_ELEC_NY.csv"** - This file contains all of the data at the time of the API query being ran for the number of electric charging stations in TNew York after running it through the ETL process.
- **"/output_data/ETL/csv/ETL_E85_NY.csv"** - This file contains all of the data at the time of the API query being ran for the number of E85 fueling stations in New York after running it through the ETL process.
- **"/output_data/ETL/csv/ETL_LPG_NY.csv"** - This file contains all of the data at the time of the API query being ran for the number of LPG fueling stations in TNew York after running it through the ETL process.

## **Flask-API Files:**
- **"/flask_api/app.py"** - This file creates a report for our story telling to be later used for the data visualizations.
- **"/flask_api/templates/index.html"** - This file is powering some of the visualizations in our flask api.
- **"/flask_api/static/js/app.js"** - This file is powering our map and visualizations
- **"/flask_api/static/css/style.css"** - This file creates the style and layout of our page.

## **Sources:**
- **API Documentation:** https://developer.nrel.gov/docs/transportation/alt-fuel-stations-v1/all/
- **API Sign up page:** https://developer.nrel.gov/signup/
- **Data used to sort total number of each type of alternative fuel by state:** https://afdc.energy.gov/stations/states
- The basis for the code used in the "converting column value to string" sections of the "ETL.ipynb" jupyter notebook located within the "ETL" folder was found from https://docs.python.org/3/library/ast.html#ast.literal_eval
- The batch script used in step 6 of the instructions above used to import all of the csv files at once into the mongodb database was found from https://stackoverflow.com/questions/41828355/how-to-import-all-files-from-a-folder-to-mongodb
- The basis for the code used in each of the "Changing order of Longitude and Latitude columns to Latitude and Longitude" sections inside of the of the "ETL.ipynb" jupyter notebook located within the "ETL" folder was found from https://sparkbyexamples.com/pandas/pandas-change-the-order-of-columns/.
- The basis for the code used in lines 7, 40-52 and 55-118 of "/flask_api/app.py" was worked out with the help of the tutor Kourt Bailey.
- The basis for the code used in lines 121-123 of "/flask_api/app.py" was worked out with https://codeforgeek.com/render-html-file-in-flask/#:~:text=In%20Flask%2C%20create%20a%20folder,and%20render%20these%20files%20accordingly and https://www.digitalocean.com/community/tutorials/how-to-use-templates-in-a-flask-application.
- The basis for the code used in lines 18-30 and 41-72 of "/flask_api/statis/js/app.js" was worked out with the help of AskBCS and the tutor Kourt Bailey.
- The basis for the code used in each of the "creating popup on markers" sections of "/flask_api/statis/js/app.js" was worked out with the help of AskBCS and the tutor Kourt Bailey.