This project uses React for the front-end and Express using Node JS for the back-end.
I have also deployed the solution online and it can accessed using this link.
https://csvdownload.herokuapp.com/

The objective here is to read a CSV file and for its each line pull data from the given api and merge the combined data into a new csv file.
This new merge is displayed in form of a table and also can be downloaded in CSV format.

I used graphical User interface instead of command line interface because it makes the process very visible and non-programmers can use the app without any difficulty.


Steps taken to perform the task.

1. Pull the data from Accounts api and then store it in JSON format.
2. Read the CSV file.
3. Parse CSV file data and convert it into JSON using csvtojson library.
4. After obtaining the Csv data, display it to the user in tabular format.
5. Read the api and csv data and merge it having all columns of Account ID,Account Name, FirstName, Created On, Status.
6. Output and generate the merge into a new CSV file and make it available for the user to download.


Npm packages used are as under.

To display the datagrid DevExtreme for react was used.
Bootstrap, React-Bootstrap was used for the User Interface.
CSV to Json npm package was used to convert csv data to JSON format.
Express was used to perform HTTP get request from the API.
CORS was used Cross-origin resource sharing.



To install the packages use npm install.
And then use npm start to run the server and it can be viewed on http://localhost:8081










