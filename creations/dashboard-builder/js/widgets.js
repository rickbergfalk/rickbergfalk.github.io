// list of widgets, eventually returned as JSON from server
var widgetJSON = {
	"bartest": {
		settings: {
			"type" : "BarChart",
			"xpos" : 20,
			"ypos" : 20,
			"dataName" : "preferredBusinessRanking",
			"title" : "Preferred Business Partners",
			"width" : 400,
			"height" : 300,
			"is3D": false,
			"legend": "right" // none, right, left, top
		}
	},
	"pietest": {
		settings: {
			"type": "PieChart",
			"xpos" : 491,
			"ypos" : 72,
			"dataName" : "organizationPercentage",
			// options
			"title" : "Org Funding",
			"width" : 250,
			"height" : 200,
			"is3D": true
		}	
	},
	"linetest": {
		settings: {
			"type": "LineChart",
			"xpos" : 87,
			"ypos" : 380,
			"dataName" : "performanceByMonth",
			// options
			"title" : "A Line Chart for Trends",
			"width" : 400,
			"height" : 300,
			"legend" : "bottom",
			"showCategories" : true
		}
	},
	"gaugetest": {
		settings: {
			"type": "Gauge",
			"xpos" : 557,
			"ypos" : 321,
			"dataName" : "gaugeData",
			// options
			"width" : 150,
			"height" : 430,
			"greenFrom": 90,
			"greenTo": 100,
			"yellowFrom": 70,
			"yellowTo": 90,
			"redFrom": 0,
			"redTo": 70
		}
	}
}

// list of data available (for demo purposes)
var dataJSON = {
	// bar
	"preferredBusinessRanking": {
		"fields": [{
			"datatype": "string",
			"label": "Business",
			"data": ["Advanced Inc.", "A&E Companies", "Roundys Wheels", "Wealthy Bros."]
		},{
			"datatype": "number",
			"label": "PBR Index",
			"data": [92, 78, 62, 34]
		},{
			"datatype": "number",
			"label": "ZET Index",
			"data": [42, 67, 74, 81]
		},{
			"datatype": "number",
			"label": "ALB Index",
			"data": [23, 49, 62, 83]
		},{
			"datatype": "number",
			"label": "OTR Index",
			"data": [68, 73, 81, 47]
		}]
	},
	// bar
	"productGroupSalesYTD": {
		"fields": [{
			"datatype": "string",
			"label": "Product",
			"data": ["Shoes", "Hats", "Shirts", "Pants", "NLOS-Cs"]
		},{
			"datatype": "number",
			"label": "PBP Index",
			"data": [920, 480, 620, 0]
		}]
	},
	// bar
	"supplierPerformance": {
		"fields": [{
			"datatype": "string",
			"label": "Supplier",
			"data": ["Advanced Inc.", "Roundys Wheels", "Wealthy Bros."]
		},{
			"datatype": "number",
			"label": "Performance Index",
			"data": [34, 68, 72]
		}]
	},
	"organizationPercentage": {
		"fields": [{
			"datatype": "string",
			"label": "Organization",
			"data": ["Group A", "Group B"]
		},{
			"datatype": "number",
			"label": "percent",
			"data": [35, 65]
		}]
	},
	"performanceByMonth": {
		"fields": [{
			"datatype": "string",
			"label": "date",
			"data": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sept", "Oct", "Nov", "Dec"]
		},{
			"datatype": "number",
			"label": "Measure 1",
			"data": [1440, 1448, 1437, 1428, 1432, 1421, 1416, 1103, 1112, 1102, 1096, 1042]
		},{
			"datatype": "number",
			"label": "Measure 2",
			"data": [1430, 1438, 1437, 1438, 1422, 1411, 1426, 1403, 1412, 1402, 1496, 1442]
		},{
			"datatype": "number",
			"label": "Measure 3",
			"data": [1460, 1438, 1477, 1468, 1422, 1431, 1446, 1453, 1462, 1472, 1476, 1442]
		},{
			"datatype": "number",
			"label": "Measure 4",
			"data": [1340, 1348, 1337, 1438, 1432, 1421, 1316, 1303, 1412, 1302, 1396, 1342]
		},{
			"datatype": "number",
			"label": "Measure 5",
			"data": [1240, 1248, 1237, 1228, 1232, 1221, 1216, 1203, 1212, 1202, 1296, 1242]
		},{
			"datatype": "number",
			"label": "Measure 6",
			"data": [1234, 1238, 1237, 1228, 1272, 1271, 1236, 1013, 1012, 1002, 987, 992]
		}]
	},
	"gaugeData": {
		"fields": [{
			"datatype": "string",
			"label": "Label",
			"data": ["OK...", "Bad!", "Good"]
		},{
			"datatype": "number",
			"label": "Value",
			"data": [83, 31, 96]
		}]
	},
	"motionData": {
		"fields": [{
			"datatype": "string",
			"label": "Company",
			"data": [
            	'Advanced Inc.', 'Advanced Inc.', 'Advanced Inc.', 'Advanced Inc.', 'Advanced Inc.', 'Advanced Inc.', 'Advanced Inc.', 'Systems Co.', 'Systems Co.', 'Systems Co.', 'Systems Co.', 'Borderline Tek Inc.', 'Borderline Tek Inc.', 'Borderline Tek Inc.', 'Tools Enterprises', 'Tools Enterprises', 'Tools Enterprises', 'Tools Enterprises', 'Tools Enterprises', 'Tools Enterprises', 'Tools Enterprises', 'Tools Enterprises', 'Tools Enterprises', 'Tools Enterprises', 'Chrome Platers and Co.', 'Chrome Platers and Co.', 'Precise Peoples ltd.', 'Precise Peoples ltd.', 'Precise Peoples ltd.', 'Precise Peoples ltd.', 'Custom Machines', 'Custom Machines', 'Custom Machines', 'Custom Machines', 'Custom Machines', 'Custom Machines', 'Custom Machines', 'Custom Machines', 'Custom Machines', 'Enterprises Inc and Co.', 'Enterprises Inc and Co.', 'Enterprises Inc and Co.', 'Enterprises Inc and Co.', 'Enterprises Inc and Co.', 'Enterprises Inc and Co.', 'Enterprises Inc and Co.', 'Enterprises Inc and Co.', 'Enterprises Inc and Co.', 'Enterprises Inc and Co.', 'Enterprises Inc and Co.', 'Enterprises Inc and Co.', 'Enterprises Inc and Co.', 'Tools and Things', 'Tools and Things', 'Tools and Things', 'Tools and Things', 'Tools and Things', 'Tools and Things', 'Tools and Things', 'Tools and Things', 'Tools and Things', 'Tools and Things', 'Tools and Things', 'Tools and Things', 'Tools and Things', 'Tools and Things', 'Tools and Things', 'TNT Core', 'TNT Core', 'TNT Core', 'TNT Core', 'TNT Core', 'TNT Core', 'TNT Core', 'TNT Core', 'TNT Core', 'TNT Core', 'Mini Manufacturing', 'Mini Manufacturing', 'Mini Manufacturing', 'Mini Manufacturing', 'Mini Manufacturing', 'Mini Manufacturing', 'Innotek Technologies', 'Innotek Technologies', 'Innotek Technologies', 'A&E Companies', 'A&E Companies', 'A&E Companies', 'Jonas Bros LLC', 'Labiggies Co.', 'Labiggies Co.', 'Labiggies Co.', 'Labiggies Co.', 'Labiggies Co.', 'Labiggies Co.', 'Labiggies Co.', 'Labiggies Co.', 'Labiggies Co.', 'Labiggies Co.', 'Labiggies Co.', 'Labiggies Co.', 'Labiggies Co.', 'Labiggies Co.', 'Labiggies Co.', 'Labiggies Co.', 'Las Lobos Parts', 'Las Lobos Parts', 'Las Lobos Parts', 'Las Lobos Parts', 'Liggy Inc', 'Liggy Inc', 'Liggy Inc', 'Liggy Inc', 'Liggy Inc', 'Liggy Inc', 'Plane People', 'Plane People', 'Plane People', 'Plane People', 'McDonalds', 'McDonalds', 'McDonalds', 'McDonalds', 'Burger King', 'Burger King', 'Burger King', 'Chipotle', 'Chipotle', 'Chipotle', 'Chipotle', 'Chipotle', 'Mini Things', 'Mini Things', 'Mini Things', 'Mini Things', 'Mini Things', 'Mini Things', 'Mini Things', 'Mini Things', 'Mini Things', 'North Side Stuff', 'North Side Stuff', 'North Side Stuff', 'North Side Stuff', 'North Side Stuff', 'North Side Stuff', 'North Side Stuff', 'Nevermine Inc', 'Nevermine Inc', 'Nevermine Inc', 'Nevermine Inc', 'Big Catz Machine', 'Big Catz Machine', 'Big Catz Machine', 'Big Catz Machine', 'Big Catz Machine', 'Park Place', 'Powertools Too', 'Powertools Too', 'Powertools Too', 'Precise Widgeters', 'Precise Widgeters', 'Production Corporation', 'Production Corporation', 'Production Corporation', 'Production Corporation', 'Production Corporation', 'Production Corporation', 'Production Corporation', 'Production Corporation', 'Production Corporation', 'Production Corporation', 'Fans O Money Inc.', 'Fans O Money Inc.', 'Fans O Money Inc.', 'Fans O Money Inc.', 'Fans O Money Inc.', 'Fans O Money Inc.', 'Fans O Money Inc.', 'Fans O Money Inc.', 'Fans O Money Inc.', 'Fans O Money Inc.', 'Fans O Money Inc.', 'Fans O Money Inc.', 'Fans O Money Inc.', 'Fans O Money Inc.', 'Johnson and Sons', 'Johnson and Sons', 'Roundys Wheels', 'Roundys Wheels', 'Roundys Wheels', 'Roundys Wheels', 'Roundys Wheels', 'Special Parts and Co.', 'Special Parts and Co.', 'Special Parts and Co.', 'Engineering Extras', 'Engineering Extras', 'Engineering Extras', 'Engineering Extras', 'Engineering Extras', 'Engineering Extras', 'AeroChips', 'AeroChips', 'AeroChips', 'AeroChips', 'AeroChips', 'AeroChips', 'Tube Time', 'Tube Time', 'Tube Time', 'Tube Time', 'Tube Time', 'Tube Time', 'Tube Time', 'Tube Time', 'Tube Time', 'Tube Time', 'Tube Time', 'Tube Time', 'Tube Time', 'Tube Time', 'Wealthy Bros.', 'Wealthy Bros.', 'Wealthy Bros.', 'Wealthy Bros.', 'Wealthy Bros.', 'Wealthy Bros.'
			]
		},{
			"datatype": "date",
			"label": "Date",
			"data": [
            	new Date(2009, 4, 4), new Date(2009, 4, 11), new Date(2009, 4, 18), new Date(2009, 4, 25), new Date(2009, 5, 1), new Date(2009, 5, 8), new Date(2009, 5, 15), new Date(2009, 6, 27), new Date(2009, 7, 3), new Date(2009, 7, 10), new Date(2009, 7, 17), new Date(2009, 5, 22), new Date(2009, 5, 29), new Date(2009, 6, 6), new Date(2009, 4, 4), new Date(2009, 4, 11), new Date(2009, 4, 18), new Date(2009, 4, 25), new Date(2009, 5, 1), new Date(2009, 6, 20), new Date(2009, 6, 27), new Date(2009, 7, 3), new Date(2009, 7, 10), new Date(2009, 7, 17), new Date(2009, 7, 10), new Date(2009, 7, 17), new Date(2009, 5, 29), new Date(2009, 6, 6), new Date(2009, 6, 13), new Date(2009, 6, 20), new Date(2009, 4, 4), new Date(2009, 4, 11), new Date(2009, 4, 18), new Date(2009, 4, 25), new Date(2009, 5, 1), new Date(2009, 5, 8), new Date(2009, 5, 15), new Date(2009, 5, 29), new Date(2009, 6, 6), new Date(2009, 4, 4), new Date(2009, 4, 11), new Date(2009, 4, 18), new Date(2009, 4, 25), new Date(2009, 5, 1), new Date(2009, 5, 8), new Date(2009, 5, 15), new Date(2009, 5, 22), new Date(2009, 6, 13), new Date(2009, 6, 20), new Date(2009, 6, 27), new Date(2009, 7, 3), new Date(2009, 7, 10), new Date(2009, 4, 4), new Date(2009, 4, 11), new Date(2009, 4, 18), new Date(2009, 4, 25), new Date(2009, 5, 1), new Date(2009, 5, 8), new Date(2009, 5, 15), new Date(2009, 5, 22), new Date(2009, 5, 29), new Date(2009, 6, 6), new Date(2009, 6, 13), new Date(2009, 6, 20), new Date(2009, 6, 27), new Date(2009, 7, 3), new Date(2009, 7, 10), new Date(2009, 4, 4), new Date(2009, 4, 11), new Date(2009, 4, 18), new Date(2009, 4, 25), new Date(2009, 5, 1), new Date(2009, 5, 8), new Date(2009, 5, 15), new Date(2009, 5, 22), new Date(2009, 5, 29), new Date(2009, 6, 6), new Date(2009, 5, 1), new Date(2009, 6, 20), new Date(2009, 6, 27), new Date(2009, 7, 3), new Date(2009, 7, 10), new Date(2009, 7, 17), new Date(2009, 6, 6), new Date(2009, 6, 13), new Date(2009, 6, 20), new Date(2009, 5, 1), new Date(2009, 5, 8), new Date(2009, 5, 15), new Date(2009, 5, 15), new Date(2009, 4, 4), new Date(2009, 4, 11), new Date(2009, 4, 18), new Date(2009, 4, 25), new Date(2009, 5, 1), new Date(2009, 5, 8), new Date(2009, 5, 15), new Date(2009, 5, 22), new Date(2009, 5, 29), new Date(2009, 6, 6), new Date(2009, 6, 13), new Date(2009, 6, 20), new Date(2009, 6, 27), new Date(2009, 7, 3), new Date(2009, 7, 10), new Date(2009, 7, 17), new Date(2009, 4, 18), new Date(2009, 4, 25), new Date(2009, 5, 1), new Date(2009, 7, 17), new Date(2009, 6, 13), new Date(2009, 6, 20), new Date(2009, 6, 27), new Date(2009, 7, 3), new Date(2009, 7, 10), new Date(2009, 7, 17), new Date(2009, 4, 18), new Date(2009, 4, 25), new Date(2009, 5, 1), new Date(2009, 5, 8), new Date(2009, 4, 18), new Date(2009, 4, 25), new Date(2009, 5, 1), new Date(2009, 5, 8), new Date(2009, 4, 4), new Date(2009, 4, 11), new Date(2009, 4, 18), new Date(2009, 5, 22), new Date(2009, 5, 29), new Date(2009, 6, 6), new Date(2009, 6, 13), new Date(2009, 6, 20), new Date(2009, 5, 1), new Date(2009, 5, 8), new Date(2009, 5, 15), new Date(2009, 5, 22), new Date(2009, 5, 29), new Date(2009, 6, 6), new Date(2009, 6, 13), new Date(2009, 6, 20), new Date(2009, 6, 27), new Date(2009, 4, 4), new Date(2009, 4, 11), new Date(2009, 4, 18), new Date(2009, 5, 1), new Date(2009, 5, 15), new Date(2009, 5, 22), new Date(2009, 5, 29), new Date(2009, 5, 15), new Date(2009, 5, 22), new Date(2009, 5, 29), new Date(2009, 6, 6), new Date(2009, 4, 18), new Date(2009, 4, 25), new Date(2009, 5, 1), new Date(2009, 6, 20), new Date(2009, 6, 27), new Date(2009, 6, 27), new Date(2009, 4, 4), new Date(2009, 4, 11), new Date(2009, 4, 18), new Date(2009, 5, 8), new Date(2009, 5, 15), new Date(2009, 4, 4), new Date(2009, 4, 11), new Date(2009, 4, 18), new Date(2009, 4, 25), new Date(2009, 5, 1), new Date(2009, 5, 8), new Date(2009, 5, 22), new Date(2009, 5, 29), new Date(2009, 6, 6), new Date(2009, 6, 13), new Date(2009, 4, 4), new Date(2009, 4, 11), new Date(2009, 4, 18), new Date(2009, 4, 25), new Date(2009, 5, 1), new Date(2009, 5, 8), new Date(2009, 5, 15), new Date(2009, 5, 22), new Date(2009, 5, 29), new Date(2009, 6, 6), new Date(2009, 6, 13), new Date(2009, 6, 20), new Date(2009, 6, 27), new Date(2009, 7, 3), new Date(2009, 4, 11), new Date(2009, 4, 18), new Date(2009, 4, 11), new Date(2009, 4, 18), new Date(2009, 5, 1), new Date(2009, 5, 8), new Date(2009, 6, 13), new Date(2009, 5, 15), new Date(2009, 5, 22), new Date(2009, 5, 29), new Date(2009, 5, 1), new Date(2009, 5, 8), new Date(2009, 5, 15), new Date(2009, 5, 22), new Date(2009, 5, 29), new Date(2009, 6, 6), new Date(2009, 4, 4), new Date(2009, 4, 11), new Date(2009, 4, 25), new Date(2009, 5, 1), new Date(2009, 5, 8), new Date(2009, 5, 15), new Date(2009, 4, 4), new Date(2009, 4, 11), new Date(2009, 4, 18), new Date(2009, 4, 25), new Date(2009, 5, 1), new Date(2009, 5, 8), new Date(2009, 5, 15), new Date(2009, 5, 22), new Date(2009, 5, 29), new Date(2009, 6, 6), new Date(2009, 6, 13), new Date(2009, 6, 20), new Date(2009, 6, 27), new Date(2009, 7, 3), new Date(2009, 4, 4), new Date(2009, 4, 11), new Date(2009, 4, 18), new Date(2009, 4, 25), new Date(2009, 5, 1), new Date(2009, 5, 8)
			]
		},{
			"datatype": "number",
			"label": "Avg parts per week",
			"data": [
            	7.2, 3.4, 10.8, 17.8, 24.8, 9.9, 5.6, 5.4, 12.4, 19.4, 4.2, 3.1, 2.4, 3.5, 39.2, 46.2, 53.2, 60.2, 30.6, 0.3, 7.3, 14.3, 21.3, 28.3, 4.4, 1.2, 5.5, 12.5, 3, 0, 7.2, 14.2, 21.2, 28.2, 35.2, 42.2, 5.1, 6.1, 1.1, 5.4, 1.2, 3.9, 2.4, 2.9, 2.4, 0.2, 0, 0.5, 0.5, 0.6, 7.8, 1.7, 3.7, 2.4, 13.3, 20.3, 19, 33.8, 28.3, 35.3, 42.3, 38.3, 21.9, 45, 22.2, 20, 7.2, 16.7, 37.3, 22.2, 24.8, 12.2, 18.2, 10.6, 3.1, 2.4, 3.6, 0.2, 6.2, 1.1, 1.3, 6.3, 4.4, 6.3, 13.3, 3.9, 2.2, 2.4, 4, 0.1, 1.1, 1.1, 1.2, 0.9, 0.8, 0.6, 0.7, 0.8, 0.5, 1, 1.6, 1.7, 1.4, 2.4, 1.1, 2.3, 2.1, 4.5, 1.7, 3.2, 4.4, 11.4, 18.4, 25.4, 32.4, 39.4, 0.1, 1.6, 11.3, 13.2, 0.2, 7.2, 14.2, 3.4, 0.9, 11.1, 4.9, 4.2, 11.2, 5.2, 8.6, 6.4, 3.3, 10.3, 17.3, 24.3, 31.3, 38.3, 45.3, 52.3, 53, 0.2, 1.9, 0.4, 1.2, 1, 5.4, 1.4, 4.1, 11.1, 18.1, 4.2, 0.3, 7.3, 2.2, 3.1, 1.6, 0, 1.2, 5.2, 2.4, 6.3, 2.6, 39.2, 46.2, 11.7, 13.6, 3.9, 4.9, 5.2, 12.2, 19.2, 3.7, 3.4, 2.4, 17.4, 24.4, 4.4, 0.2, 2, 3.4, 11.2, 18.2, 9.9, 27.3, 34.3, 7.4, 0.5, 0.4, 5.4, 1.6, 0.2, 0.6, 0, 3.4, 2.6, 2, 0.2, 7.2, 14.2, 8.5, 10.4, 6.2, 13.3, 13.9, 4.2, 3.7, 13.5, 7, 18.4, 25.4, 32.4, 39.4, 46.4, 53.4, 15.1, 7.2, 4.8, 12.7, 19.7, 26.7, 10.5, 8, 14.3, 5.5, 9.7, 11.8, 5.8, 4.1
			]
		},{
			"datatype": "number",
			"label": "Days Open",
			"data": [
            	7.2, 10.2, 10.8, 17.8, 24.8, 29.6, 28, 5.4, 12.4, 19.4, 21.1, 6.2, 13.2, 13.9, 62.4, 69.4, 76.4, 83.4, 84.3, 0.3, 7.3, 14.3, 21.3, 28.3, 4.4, 6, 5.5, 12.5, 15, 0, 7.2, 14.2, 21.2, 28.2, 35.2, 42.2, 48.9, 6.1, 8, 5.4, 5.7, 7.9, 7, 7.9, 9.8, 1.3, 0, 3.2, 3.6, 2.1, 7.8, 8.5, 8.5, 4.8, 13.3, 20.3, 25.3, 33.8, 28.3, 35.3, 42.3, 38.3, 43.8, 45, 51.8, 60.1, 36, 48.2, 62.9, 69.9, 74.3, 47.4, 60.4, 63.3, 6.2, 13.2, 14.1, 1, 6.2, 3.2, 4.8, 6.3, 13.2, 6.3, 13.3, 19.7, 4.3, 11.3, 14, 0.7, 5.1, 3.3, 5.8, 3.6, 3.9, 1.8, 3.1, 2.5, 2, 3, 7, 6, 7.4, 9.9, 4.1, 4.8, 5.3, 12.3, 13.9, 6.4, 4.4, 11.4, 18.4, 25.4, 32.4, 39.4, 0.1, 6.5, 12.5, 14.5, 0.2, 7.2, 14.2, 16.8, 3.6, 11.2, 14.7, 4.2, 11.2, 18.2, 22, 32, 3.3, 10.3, 17.3, 24.3, 31.3, 38.3, 45.3, 52.3, 53, 0.2, 1.9, 2, 6, 5, 5.4, 7.2, 4.1, 11.1, 18.1, 20.8, 0.3, 7.3, 11, 5.2, 8, 0.1, 5.9, 5.2, 11.8, 6.3, 13.1, 63.2, 70.2, 41.2, 32.2, 15.5, 13.2, 5.2, 12.2, 19.2, 26, 3.4, 7.1, 17.4, 24.4, 30.9, 0.2, 7.1, 10.1, 11.2, 18.2, 23.2, 27.3, 34.3, 36.8, 0.5, 2.1, 5.4, 8.2, 0.2, 2.8, 0.2, 3.4, 10.4, 14.2, 0.2, 7.2, 14.2, 21.2, 26, 30.8, 13.3, 13.9, 4.2, 11.2, 18.2, 18.7, 18.4, 25.4, 32.4, 39.4, 46.4, 53.4, 60.4, 67.4, 26.5, 12.7, 19.7, 26.7, 31.4, 39.9, 14.3, 13.8, 17.7, 35.3, 42.3, 43.9
				]
		},{
			"datatype": "number",
			"label": "Number of Orders",
			"data": [
            	1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 3, 3, 3, 3, 1, 1, 13, 14, 2, 8, 14, 16, 68, 68, 5, 2, 3, 4, 4, 2, 4, 3, 3, 3, 2, 3, 3, 3, 4, 4, 3, 3, 2, 1, 7, 6, 6, 6, 3, 2, 2, 1, 1, 1, 1, 1, 4, 3, 2, 2, 1, 1, 1, 1, 1, 1, 1, 22, 15, 7, 10, 14, 12, 17, 10, 14, 19, 19, 14, 14, 10, 15, 24, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 4, 4, 3, 2, 2, 2, 2, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 3, 3, 1, 1, 1, 1, 1, 1, 1, 2, 3, 2, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 2, 2, 2, 3, 3, 3, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 2, 2, 2, 2, 1, 1, 2, 2, 1, 1, 1
			]
		}]
	},
}

