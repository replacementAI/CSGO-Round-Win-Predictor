import React from 'react';
import Select from 'react-select';
import axios, {Axios} from "axios";
import {useState} from "react";

const options1 = [
    { value: '0', label: 'T' },
    { value: '1', label: 'CT' },
    ];

// const options2 = [
//     { value: '0', label: '0' },
//     { value: '1', label: '1' },
//     { value: '2', label: '2' },
//     { value: '3', label: '3' },
//     { value: '4', label: '4' },
//     { value: '5', label: '5' },
// ];

const options2 = [
    { value: '4', label: '0 to 4' },
    { value: '5', label: '5' },
];

// const options3 = [
//     { value: '0', label: '0' },
//     { value: '1', label: '1' },
//     { value: '2', label: '2' },
//     { value: '3', label: '3' },
//     { value: '4', label: '4' },
//     { value: '5', label: '5' },
// ];

const options3 = [
    { value: '4', label: '0 to 4' },
    { value: '5', label: '5' },
];

// const options4 = [
//     { value: '0', label: '0' },
//     { value: '1', label: '1' },
//     { value: '2', label: '2' },
//     { value: '3', label: '3' },
//     { value: '4', label: '4' },
//     { value: '5', label: '5' },
// ];

const options4 = [
    { value: '3', label: '0 to 3' },
    { value: '4', label: '4 to 5' },
];

const options5 = [
    { value: '0', label: 'Not Planted' },
    { value: '1', label: 'A' },
    { value: '2', label: 'B' },
];

const options6 = [
    { value: '0', label: 'No' },
    { value: '1', label: 'Yes' },
];

const options7 = [
    { value: '0', label: 'No' },
    { value: '1', label: 'Yes' },
];

const options8 = [
    { value: '0', label: 'No' },
    { value: '1', label: 'Yes' },
];

const options9 = [
    { value: '0', label: 'No' },
    { value: '1', label: 'Yes' },
];

const options10 = [
    { value: '0', label: 'No' },
    { value: '1', label: 'Yes' },
];

const options11 = [
    { value: '1', label: '0 to 32' },
    { value: '33', label: 'Greater than or equal to 33' },
];

// const options12 = [
//     { value: '0', label: '0' },
//     { value: '1', label: '1' },
//     { value: '2', label: '2' },
//     { value: '3', label: '3' },
//     { value: '4', label: '4' },
//     { value: '5', label: '5' },
//     { value: '6', label: '6' },
//     { value: '7', label: '7' },
//     { value: '8', label: '8' },
//     { value: '9', label: '9' },
//     { value: '10', label: '10' },
// ];

const options12 = [
    { value: '7', label: '0 to 7' },
    { value: '8', label: '8 to 10' },
];

// const options13 = [
//     { value: '5', label: '5' },
//     { value: '4', label: '4' },
//     { value: '3', label: '3' },
//     { value: '2', label: '2' },
//     { value: '1', label: '1' },
//     { value: '0', label: '0' },
//     { value: '-1', label: '-1' },
//     { value: '-2', label: '-2' },
//     { value: '-3', label: '-3' },
//     { value: '-4', label: '-4' },
//     { value: '-5', label: '-5' },
// ];

const options13 = [
    { value: '1', label: '1 to 5' },
    { value: '0', label: '0 to -5' },
];

const options14 = [
    { value: '0', label: 'First Half' },
    { value: '1', label: 'Second Half' },
];

const question1 = 'Which side won?';
const question2 = 'How many CTs did the round start with?';
const question3 = 'How many Ts did the round start with?';
const question4 = 'How many CTs did the round end with?';
const question5 = 'Which site was planted on?';
const question6 = 'Did CTs use utility?';
const question7 = 'Did Ts use utility?';
const question8 = 'Did CTs have a defuse kit?';
const question9 = 'Did CTs have a helmet?';
const question10 = 'Did Ts have a helmet?';
const question11 = 'How much time was left when the round ended?';
const question12 = 'How many players in total were eliminated?';
const question13 = 'Subtract the number of CTs at the end of the round from the number of Ts at the end of the round.';
const question14 = 'Which half was it?';

let lambdaFunction = new URL('https://rgo7pqyai6blksfb32y7j5hone0xcrdj.lambda-url.us-west-2.on.aws/');
const param1 = 'winningSide';
const param2 = 'ctStart';
const param3 = 'tStart';
const param4 = 'ctEnd';
const param5 = 'site';
const param6 = 'ctUtility';
const param7 = 'tUtility';
const param8 = 'defuseKit';
const param9 = 'ctHelmet';
const param10 = 'tHelmet';
const param11 = 'timeLeft';
const param12 = 'totalEliminated';
const param13 = 'PC1';
const param14 = 'halfTime';

// get the data from the lambda function using axios and display first element of array under "CT" and second element under "T"
function App() {
    const [selectedOption1, setSelectedOption1] = useState(null);
    const [selectedOption2, setSelectedOption2] = useState(null);
    const [selectedOption3, setSelectedOption3] = useState(null);
    const [selectedOption4, setSelectedOption4] = useState(null);
    const [selectedOption5, setSelectedOption5] = useState(null);
    const [selectedOption6, setSelectedOption6] = useState(null);
    const [selectedOption7, setSelectedOption7] = useState(null);
    const [selectedOption8, setSelectedOption8] = useState(null);
    const [selectedOption9, setSelectedOption9] = useState(null);
    const [selectedOption10, setSelectedOption10] = useState(null);
    const [selectedOption11, setSelectedOption11] = useState(null);
    const [selectedOption12, setSelectedOption12] = useState(null);
    const [selectedOption13, setSelectedOption13] = useState(null);
    const [selectedOption14, setSelectedOption14] = useState(null);
    const [data, setData] = useState(null);

    const handleSubmit = (event) => {
        event.preventDefault();
        lambdaFunction.searchParams.set(param1, selectedOption1.value);
        lambdaFunction.searchParams.set(param2, selectedOption2.value);
        lambdaFunction.searchParams.set(param3, selectedOption3.value);
        lambdaFunction.searchParams.set(param4, selectedOption4.value);
        lambdaFunction.searchParams.set(param5, selectedOption5.value);
        lambdaFunction.searchParams.set(param6, selectedOption6.value);
        lambdaFunction.searchParams.set(param7, selectedOption7.value);
        lambdaFunction.searchParams.set(param8, selectedOption8.value);
        lambdaFunction.searchParams.set(param9, selectedOption9.value);
        lambdaFunction.searchParams.set(param10, selectedOption10.value);
        lambdaFunction.searchParams.set(param11, selectedOption11.value);
        lambdaFunction.searchParams.set(param12, selectedOption12.value);
        lambdaFunction.searchParams.set(param13, selectedOption13.value);
        lambdaFunction.searchParams.set(param14, selectedOption14.value);
        axios.get(lambdaFunction.href)
            .then(response => {
                setData(response.data);
            })
            .catch(error => {
                console.log(error);
            });
    };

    return (
        <div className="App">
            <h1>CS:GO Next Round Winner Predictor</h1>
            <form onSubmit={handleSubmit}>
                <label>{question1}</label>
                <Select
                    value={selectedOption1}
                    onChange={setSelectedOption1}
                    options={options1}
                />
                <label>{question2}</label>
                <Select
                    value={selectedOption2}
                    onChange={setSelectedOption2}
                    options={options2}
                />
                <label>{question3}</label>
                <Select
                    value={selectedOption3}
                    onChange={setSelectedOption3}
                    options={options3}
                />
                <label>{question4}</label>
                <Select
                    value={selectedOption4}
                    onChange={setSelectedOption4}
                    options={options4}
                />
                <label>{question5}</label>
                <Select
                    value={selectedOption5}
                    onChange={setSelectedOption5}
                    options={options5}
                />
                <label>{question6}</label>
                <Select
                    value={selectedOption6}
                    onChange={setSelectedOption6}
                    options={options6}
                />
                <label>{question7}</label>
                <Select
                    value={selectedOption7}
                    onChange={setSelectedOption7}
                    options={options7}
                />
                <label>{question8}</label>
                <Select
                    value={selectedOption8}
                    onChange={setSelectedOption8}
                    options={options8}
                />
                <label>{question9}</label>
                <Select
                    value={selectedOption9}
                    onChange={setSelectedOption9}
                    options={options9}
                />
                <label>{question10}</label>
                <Select
                    value={selectedOption10}
                    onChange={setSelectedOption10}
                    options={options10}
                />
                <label>{question11}</label>
                <Select
                    value={selectedOption11}
                    onChange={setSelectedOption11}
                    options={options11}
                />
                <label>{question12}</label>
                <Select
                    value={selectedOption12}
                    onChange={setSelectedOption12}
                    options={options12}
                />
                <label>{question13}</label>
                <Select
                    value={selectedOption13}
                    onChange={setSelectedOption13}
                    options={options13}
                />
                <label>{question14}</label>
                <Select
                    value={selectedOption14}
                    onChange={setSelectedOption14}
                    options={options14}
                />
                <button type="submit">Submit</button>
            </form>
            <div>
                <h2>T Probability of Winning:</h2>
                {data && <p>{data[0]}</p>}
                <h2>CT Probability of Winning:</h2>
                {data && <p>{data[1]}</p>}
            </div>
        </div>
    );
}

export default App;
