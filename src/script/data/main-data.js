import $ from "jquery";

const jQuery = require("jquery");
const numeral = require("numeral");


const mainData = () => {
    const totalCases = document.querySelector("#totalCasesIndo");
    const totalRecovered = document.querySelector("#totalRecovered");
    const totalDeaths = document.querySelector("#totalDeaths");
    const totalTreated = document.querySelector("#totalTreated");
    const dPositive = document.querySelector("#dPositive");
    const dDeaths = document.querySelector("#dDeaths");
    const dRecovered = document.querySelector("#dRecovered");
    const dTreated = document.querySelector("#dTreated");
    const totalCasesGlobal = document.querySelector("#totalCasesGlobal");
    const number1Cases = document.querySelector("#number1Cases");
    const flagsIcon = document.querySelector("#flags-icon");
    const country = document.querySelector("#country");

    const getLocalData = async () => {
        const constapi = "https://data.covid19.go.id/public/api/update.json";
        const response = await fetch(`https://cors-anywhere.herokuapp.com/${constapi}`);

        // const response = await fetch("https://data.covid19.go.id/public/api/update.json",{
        //         headers: {
        //           'Content-Type': 'application/json',
        //           'Access-Control-Allow-Origin': '*',
        //         }});
        const data = await response.json();

        // const originalURL = "https://data.covid19.go.id/public/api/update.json";
        // const queryURL = "https://cors-anywhere.herokuapp.com/" + originalURL

        // $.ajax({
        //     url: queryURL,
        //     method: "GET",
        //     dataType: "json",
        //     // this headers section is necessary for CORS-anywhere
        //     headers: {
        //         "x-requested-with": "xhr"
        //     }
        // }).done(function (response) {
        //     console.log('CORS anywhere response', response);
        // }).fail(function (jqXHR, textStatus) {
        //     console.error(textStatus)
        // })

        totalCases.setAttribute("data-target", data.update.total.jumlah_positif);
        totalTreated.setAttribute("data-target", data.update.total.jumlah_dirawat);
        totalRecovered.setAttribute("data-target", data.update.total.jumlah_sembuh);
        totalDeaths.setAttribute("data-target", data.update.total.jumlah_meninggal);
        dPositive.innerHTML = numeral(data.update.penambahan.jumlah_positif).format("0,0");
        dRecovered.innerHTML = numeral(data.update.penambahan.jumlah_sembuh).format("0,0");
        dDeaths.innerHTML = numeral(data.update.penambahan.jumlah_meninggal).format("0,0");
        dTreated.innerHTML = numeral(data.update.penambahan.jumlah_dirawat).format("0,0");
        $(".count-people").each(function () {
            const obj = $(this);
            jQuery({
                Counter: 0
            }).animate({
                Counter: obj.attr("data-target")
            }, {
                duration: 2000,
                easing: "swing",
                step: function (now) {
                    obj.text(Math.ceil(now));
                },
                complete: function () {
                    obj.text(Math.ceil(obj.text()).toLocaleString("en"));
                },
            });
        });
    };
    const getGlobalData = async () => {
        const response = await fetch("https://disease.sh/v3/covid-19/all");
        const data = await response.json();
        totalCasesGlobal.setAttribute("data-target", data.cases);
    };
    const getMaxData = async () => {
        const response = await fetch("https://disease.sh/v3/covid-19/countries");
        const data = await response.json();
        const setCountries = data.map((country) => ({
            name: country.country,
            cases: country.cases,
            flag: country.countryInfo.flag,
        }));

        function sortData(prop) {
            return function (a, b) {
                if (a[prop] < b[prop]) {
                    return 1;
                } else if (a[prop] > b[prop]) {
                    return -1;
                }
                return 0;
            };
        }
        setCountries.sort(sortData("cases"));
        flagsIcon.innerHTML = `<img src="${setCountries[0].flag}">`;
        number1Cases.setAttribute("data-target", setCountries[0].cases);
        country.innerHTML = `<span>${setCountries[0].name}</span>`;

    };
    getLocalData();
    getGlobalData();
    getMaxData();
};
export default mainData;