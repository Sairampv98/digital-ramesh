const tester = async () => {
    try {
        // Simple Rate Limit: Check if the specific ID was updated in the last 60 seconds
        const existingDoc = await mongoTest.findOne({ id: 1 });
        if (existingDoc && (new Date() - existingDoc.updatedAt < 60000)) {
            return { exist: false, error: "Sync rate limit reached. Try again in a minute." };
        }

        const response = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
        const { userId, id, title, body } = response.data;

        const savedData = await mongoTest.findOneAndUpdate(
            { id: id },
            { userID: userId, title: title, body: body },
            { upsert: true, new: true }
        );

        return { exist: true, data: savedData };
    } catch (error) {
        return { exist: false, error: error.message };
    }
};
/*
2. Update utils/test.js (With Rate Limit Logic)
We check the updatedAt field before making the external call.
*/
