import $ from "jquery";
import moment from 'moment';
import 'moment/locale/id';

const jQuery = require("jquery");
const numeral = require("numeral");
const tableData = document.querySelector("#tableData");
const update = document.querySelector("#update");

const tableLocal = async () => {
    const response = await fetch(`https://cors-anywhere.herokuapp.com/` + `https://data.covid19.go.id/public/api/prov.json`);

    // const response = await fetch("https://data.covid19.go.id/public/api/prov.json",{
    //             headers: {
    //               'Content-Type': 'application/json',
    //               'Access-Control-Allow-Origin': '*',
    //             }});
    const data = await response.json();
	moment.locale('id');
    update.innerHTML = moment(`${data.last_date}`).format("LLLL");

    const getProvData = () => {
        const setProvince = data.list_data.map((province) => ({
            name: province.key,
            cases: province.jumlah_kasus,
        }));
        let temp = "";
        for (let item in setProvince) {
            temp += "<tr>";
            temp += `<td>${setProvince[item].name}</td>`;
            temp += `<td>${numeral(setProvince[item].cases).format("0,0")}</td>`;
        }
        tableData.innerHTML = temp;
    };
    getProvData();

};

export default tableLocal;
