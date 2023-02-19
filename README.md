# Scantron_Software
A web application developed to serve SLU faculty in grading scantron sheets.

# How to run Front-end react App
1. In your command prompt, go to the scantron-app folder.
2. Type in your command line to start react app:
```
npm start
```
3. Once the localhost is compiled, go back to the previous folder in the command prompt.
4. Type in your command line to start to start Flask endpoint:
```
python get_file.py
```
5. In the Homepage, validate you can use the single form to upload pdf files to the html. Back-end processing is not active yet.

# How files in Scantron project work
- scantron-app folder will be handling the front-end application with React
- Within the 'back-end python' folder, the readbub.py file carries all the logic to run computer vision algorithms that compute responses
    - To run this functionality, go to the 'back-end python' folder and run 
    ```
    python readbub.py
    ```
- Within the 'back-end python' folder, get_file.py contains the Flask logic to generate an endpoint to connect with the front end
- The deprecated folder stores files that were originally part of the project. This folder may be deleted once they are no longer useful
