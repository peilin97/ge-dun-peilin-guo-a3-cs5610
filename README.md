# ge-dun-peilin-guo-a3-server-cs5610
URL Shortener-Server

Author: Ge Dun, Peilin Guo
***
## write-up
* Describe your data model and schema. How did Mongoose make this easy or hard to express?
    
    We have a URL schema, where we defined two properties: original: String and shortened: String. The original property represenst the original url link. The shortened property represents the shortened path ID. 

    With the model's methods (e.g. findOne(), updateOne()), it is easier for us to process data.
* Have you worked with databases before? How was this different or similar? If you’ve not worked with databases before, describe your challenges and ease in representing this data.

    I have used MongoDB before, which is similar to this project. A slight difference is that in this project we need to generate the shortened URL by ourselves if the user doesn't provide one. Therefore, additional functions to generate the data are required in this project. This assignment has a simple data model, which just required one schema. The previous project I worked on required multiple schemas and also references.
* Respond to some of the questions or considerations from the Error Handling and Complications section of the assignment.

    For each new input, even if a new URL already exists in the database, we will assign a new unique URL to it. If a user requests an existing brand URL, an error message will be thrown ("Brand URL is already used. Please try another one."). For invalid input URLs, a pop-up window with "invalid URL" information will be displayed. When the user chooses to delete the URL, the system will pop up a window to let them confirm this operation, and then jump back to the home page. There are two columns in the database: original URL and shortened URL, there is no difference between branded URL and non-branded URL.

* Given more time, what additional features, functionality or design changes would you make?

    Let users log in/out to manage all previously shortened links in their accounts. Currently, users can only modify the original URL by searching for the shortened path ID. We hope to add a new feature that can directly edit the brand URL of the existing original URL to save memory and help users better organize their links. Otherwise, the database must keep many useless "old" links for the same original URL.