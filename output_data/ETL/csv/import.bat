TITLE MongoDB CSV Importer
SET "MONGO_HOME=C:\Program Files\MongoDB\Server\6.0"
SET db=AltFuels

for %%v in (*.csv) do "%MONGO_HOME%\bin\mongoimport.exe" -d %db% -c %%~nv --type CSV --file %%v --headerline
TITLE "Import completed!"
PAUSE