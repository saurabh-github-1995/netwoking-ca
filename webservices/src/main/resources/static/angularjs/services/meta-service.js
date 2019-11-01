app.service('metaService', function () {
    var metaTitle = '';
    var metaDescription = '';
    var metaKeywords = '';
    var metaLogo = '';
    var metaUrl = '';

    return {
        set: function (newTitle, newMetaDescription, newKeywords) {
            metaKeywords = newKeywords;
            metaDescription = newMetaDescription;
            title = newTitle;
        },
        setTitle : function (newTitle) {
            metaTitle = newTitle;
        },
        setDescription: function (newMetaDescription) {
            metaDescription = newMetaDescription;
        },
        setKeywords: function (newKeywords) {
            metaKeywords = newKeywords;
        },
        setLogo: function (newLogo) {
            metaLogo = newLogo;
        },
        setUrl: function (newUrl) {
            metaUrl = newUrl;
        },
        getTitle: function () { return metaTitle; },
        getDescription: function () { return metaDescription; },
        getKeywords: function () { return metaKeywords; },
        getUrl : function () { return metaUrl; },
        getLogo : function () { return metaLogo; }
    }
});
