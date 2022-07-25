import symptoms from "./assets/symptoms.json";
import conditions from "./assets/conditions.json";
import testcase from "./assets/testcase.json";

export default function heatmap() {
    let potentialConditions = []; // push conditions into here from patient's symptoms (WAS condArr)
    let patientSymptoms = testcase.Symptoms; // input -- WILL NOT BE HERE LATER (WAS patientSympArray)

    console.log("//// BREAKING ////");

    for (let i = 0; i < patientSymptoms.length; i++) { // loop through patient's symptoms
        for (let j = 0; j < symptoms.Symptoms.length; j++) { // and loop through list of symptoms
            if (patientSymptoms[i] === symptoms.Symptoms[j].name){ // if patient's symptom is found in the array of symtoms, push the symptoms w/conditions
                potentialConditions.push(symptoms.Symptoms[j]); // push the symp+cond to condArr
                console.log("pushed to potential conditions:", potentialConditions[i]);
            }
        }
    }

    const conditionMap = new Map();

    for (let i = 0; i < patientSymptoms.length; i++) { // loop through patient's symptoms
        console.log("Symptom:", patientSymptoms[i]);
        console.log("Potential conditions:", potentialConditions);
        for (let j = 0; j < potentialConditions[i].conditions.length; j++) {
            conditionMap.set(potentialConditions[i].conditions[j], conditionMap.get(potentialConditions[i].conditions[j]) + 1 || 1);
            console.log("Possible condition:", potentialConditions[i].conditions[j]);
        }
    }
    console.log(conditionMap);
    let max = Math.max(...conditionMap.values());
    console.log("highest value is", max);

    let likelyConditions = [];

    for(let [key, value] of conditionMap.entries()) {
        if (value === max) {
            console.log("It seems as though you may have", key);
            likelyConditions.push(key);
        }
    }

    let patientDiagnosis = {};
    let sector;
    let location;
    let severity; // do something with this
    let condition;

    if (likelyConditions.length === 1) {
        console.log("only one possible condition");
        for (let i = 0; i < conditions.Conditions.length; i++) {
            if (likelyConditions[0] === conditions.Conditions[i]) { // when the condition is found, push the sector
                sector = conditions.Conditions[i].sector;
                location = conditions.Conditions[i].location;
            }
        }
        patientDiagnosis = {
            "Name": testcase.Name,
            "Condition": likelyConditions[0],
            "Sector": sector,
            "Affected Area": location
        }
    }
    else {
        console.log("many possible conditions");
        severity = 0;
        for (let i = 0; i < likelyConditions.length; i++) { // going through what conditions you MIGHT have
            for (let j = 0; j < conditions.Conditions.length; j++) { // searching through ALL existing conditions
                if (likelyConditions[i] === conditions.Conditions[j].name){ // if there is a match
                    if(severity < parseInt(conditions.Conditions[j].severity)) { // if this match has a higher severity, prioritize and set as new condition
                        sector = conditions.Conditions[j].sector;
                        severity = conditions.Conditions[j].severity;
                        location = conditions.Conditions[j].location;
                        condition = conditions.Conditions[j].name;
                    }
                }
            }
        }
        patientDiagnosis = {
            "Name": testcase.Name,
            "Potential Condition": condition,
            "Sector": sector,
            "Affected Area": location
        }
    }

    console.log(patientDiagnosis);
    return patientDiagnosis;

}