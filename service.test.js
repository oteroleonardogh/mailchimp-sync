const { sync } = require('./services/contacts');
const mailchimp = require('@mailchimp/mailchimp_marketing');
const axios = require('axios');

jest.mock('@mailchimp/mailchimp_marketing');
jest.mock('axios');

describe('sync function', () => {
    it('should sync contacts correctly', async () => {
        // Setup mock responses
        axios.get.mockResolvedValue({
            data: [
                {"firstName":"Michelle","lastName":"Gaylord","email":"Kirk.Fritsch424@yahoo.com"},
                {"firstName":"Deborah","lastName":"Schinner","email":"Corbin.Abshire32@yahoo.com"},
                {"firstName":"Jessika","lastName":"Auer","email":"Dillon167@hotmail.com"},
                {"firstName":"Geo","lastName":"Schmitt","email":"Cierra_Walsh683@gmail.com"},
                {"firstName":"Floyd","lastName":"Gerlach","email":"Adalberto91@icloud.com"},
                {"firstName":"Hoyt","lastName":"Grady","email":"Elvie.Hagenes631@hotmail.com"},
                {"firstName":"Royce","lastName":"Kunze","email":"Dallin_Powlowski999@gmail.com"},
                {"firstName":"Eileen","lastName":"Schowalter","email":"Jameson698@yahoo.com"},
                {"firstName":"Leonie","lastName":"Strosin","email":"Raheem.DAmore433@yahoo.com"},
                {"firstName":"Noemie","lastName":"Gleichner","email":"Cristina538@icloud.com"},
                {"firstName":"Kaleb","lastName":"Robel","email":"Leonel.Sipes132@gmail.com"},
                {"firstName":"Harold","lastName":"Mann","email":"Alexys_Aufderhar172@hotmail.com"},
                {"firstName":"Danyka","lastName":"Witting","email":"Jamil787@yahoo.com"},
                {"firstName":"Alvena","lastName":"Marks","email":"Trace.Johnston464@icloud.com"},
                {"firstName":"Christopher","lastName":"Marquardt","email":"Felipe25@outlook.com"},
                {"firstName":"Tod","lastName":"Stehr","email":"Reginald_Bechtelar651@hotmail.com"},
                {"firstName":"Delphia","lastName":"Huels","email":"Myrtis668@icloud.com"},
                {"firstName":"Nels","lastName":"Brakus","email":"Rebeka_Thompson946@gmail.com"},
                {"firstName":"Bethel","lastName":"Rau","email":"Benedict_Kunze777@gmail.com"},
                {"firstName":"Charley","lastName":"Hermann","email":"Jennie.Kessler284@outlook.com"},
                {"firstName":"Cole","lastName":"Zieme","email":"Terrance182@outlook.com"},
                {"firstName":"Lee","lastName":"Runolfsson","email":"Jackie675@gmail.com"},
                {"firstName":"Zander","lastName":"Greenholt","email":"Austin545@yahoo.com"},
                {"firstName":"Rene","lastName":"Nienow","email":"Michael_Dach764@outlook.com"},
            ],
        });
        

        // Mock for getting all lists
        mailchimp.lists.getAllLists.mockResolvedValue({
            lists: [{ id: 'mock-list-id', name: 'Mock List' }]
        });

        // Mock for creating a list
        mailchimp.lists.createList.mockResolvedValue({
            id: 'new-mock-list-id'
        });

        mailchimp.lists.addListMember.mockImplementation((listId, member) => {
            return Promise.resolve(member); // Simplified mock implementation
        });

        // Call the sync function
        const result = await sync();

        // Assertions
        expect(result.syncedContacts).toBe(24); // Expect 2 contacts to be synced
        expect(result.contacts.length).toBe(24);
        expect(result.contacts[0].email).toBe('Kirk.Fritsch424@yahoo.com');
        expect(result.contacts[23].email).toBe('Michael_Dach764@outlook.com');
        // ... other assertions as needed
    });

    // ... other test cases
});
