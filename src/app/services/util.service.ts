import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class UtilService {

	constructor() { }

	getIataNoAndAirwaybilNo(iataAndAirwaybillNo: any) {
		var awbNo = "";
		var iataNo = "";
		if (iataAndAirwaybillNo && iataAndAirwaybillNo.indexOf("-") > -1) {
			console.log(iataAndAirwaybillNo.indexOf("-") > -1);

			iataNo = iataAndAirwaybillNo.split("-")[0];
			awbNo = iataAndAirwaybillNo.split("-")[1];
		} else {
			awbNo = iataAndAirwaybillNo;
		}

		return {
			awbNo: awbNo,
			iataNo: iataNo
		};
	}

	formatLocalDate(dt: Date, format: String) {
		format = format.replace("y", dt.getFullYear().toString());
		let m = dt.getMonth() + 1;
		format = format.replace("m", (m < 10 ? "0" : "") + m);
		let d = dt.getDate();
		format = format.replace("d", (d < 10 ? "0" : "") + d);
		let h = dt.getHours();
		format = format.replace("H", (h < 10 ? "0" : "") + h);
		m = dt.getMinutes();
		format = format.replace("M", (m < 10 ? "0" : "") + m);
		let s = dt.getSeconds();
		format = format.replace("S", (s < 10 ? "0" : "") + s);
		let ss = dt.getMilliseconds();
		format = format.replace("s", "" + ss);
		return format;
	}
	formatLocalDateMonth(dt: Date, format: String) {
		format = format.replace("y", dt.getFullYear().toString().substr(-2));
		let m = dt.getMonth() + 1;
		format = format.replace("m", dt.toLocaleString('en-us', { month: 'short' }));
		let d = dt.getDate();
		format = format.replace("d", (d < 10 ? "0" : "") + d);
		let h = dt.getHours();
		format = format.replace("H", (h < 10 ? "0" : "") + h);
		m = dt.getMinutes();
		format = format.replace("M", (m < 10 ? "0" : "") + m);
		let s = dt.getSeconds();
		format = format.replace("S", (s < 10 ? "0" : "") + s);
		let ss = dt.getMilliseconds();
		format = format.replace("s", "" + ss);
		return format;
	}

	//UTC
	formatUTCDate(dt: Date, format: String) {
		format = format.replace("y", dt.getUTCFullYear().toString());
		let m = dt.getUTCMonth() + 1;
		format = format.replace("m", (m < 10 ? "0" : "") + m);
		let d = dt.getUTCDate();
		format = format.replace("d", (d < 10 ? "0" : "") + d);
		let h = dt.getUTCHours();
		format = format.replace("H", (h < 10 ? "0" : "") + h);
		m = dt.getUTCMinutes();
		format = format.replace("M", (m < 10 ? "0" : "") + m);
		let s = dt.getUTCSeconds();
		format = format.replace("S", (s < 10 ? "0" : "") + s);
		let ss = dt.getUTCMilliseconds();
		format = format.replace("s", "" + ss);
		return format;
	}
}
