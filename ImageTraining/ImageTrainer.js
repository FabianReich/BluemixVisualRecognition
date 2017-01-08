/**
 * Created by Fabian on 22.10.2016.
 */
var watson = require('watson-developer-cloud'),
    fs = require('fs');

var visual_recognition = watson.visual_recognition({
    api_key: '< Your-API-Key>',
    version: 'v3',
    version_date: '2016-05-20'
});

exports.deleteFirstClassifierAndCreateClassifier = function (sClassifierName){
    visual_recognition.listClassifiers({},
        function(err, response) {
            if (err) {
                console.log(err);
                return;
            }
            if(response.classifiers.length == 0) {
                console.log("There are no classifiers to be deleted. Creating the new classifier.");
                createClassifier(sClassifierName);
            }else{
                var sOldClassifier = response.classifiers[0].classifier_id;
                deleteAndCreateNewClassifier(sClassifierName, sOldClassifier);
            }

        }
    );
};

function createClassifier(sClassifierName){
    var paramsCreateClassifier = {
        name: sClassifierName,
        /*
        first_positive_examples:fs.createReadStream('<Path-To-Your-Positive-Examples>'),
         negative_examples: fs.createReadStream('<Path-To-Your-Negative-Examples>')
        */
    };

    console.log("Creating classifier with id:" + sClassifierName);
    visual_recognition.createClassifier(paramsCreateClassifier,
        function(err, response) {
            if (err) {
                console.log(err);
                return;
            }
            console.log("New classifier created with id: " + response.classifier_id);
        });
}

function deleteAndCreateNewClassifier(sNewClassifierId, sOldClassifierId){
    console.log("Deleting classifier with id: " + sOldClassifierId);
    visual_recognition.deleteClassifier({
            classifier_id: sOldClassifierId },
        function(err, response) {
            if (err) {
                console.log(err);
                return;
            }
            console.log("Successfully deleted old classifier!");
            createClassifier(sNewClassifierId);
        }
    );
}