import { Client, Account,Storage } from 'appwrite';

export const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('65aa91a7728d5c296c1e'); // Replace with your project ID

export const account = new Account(client);
    
export const getFileById = (fileId: string): string => {
    const storage = new Storage(client);
    // const promise = storage.getFile('65aa97745edf2ade19da', fileId);
    // console.log("File id : "+fileId);
    // promise.then(function (response) {
    //     console.log("Success");
    //     console.log(response); // Success
    // }, function (error) {
    //     console.log(error); // Failure
    // });
    const result = storage.getFileView('65aa97745edf2ade19da', fileId);
    console.log(result);
    return result.href;
};
