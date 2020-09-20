export function subscribeForUser(database, id, onFetchDone) {
    return database.collections.users.subscribeToDocument(id, function (newDocument) {
        if (onFetchDone) {
            onFetchDone(newDocument);
        }
    }, function (error) {
        alert(error.message);
    }, function () {
        if (onFetchDone) {
            onFetchDone();
        }
    });
}
//# sourceMappingURL=subscribeForUser.js.map