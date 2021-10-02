// ========== Get Day Earnings Cards ========
let totalCash = 0;
let earningsDay = 0;
let quantity = 0;
let earningsMonth = 0;

function cards() {
  totalCash = 0;
  earningsDay = 0;
  quantity = 0;
  earningsMonth = 0;
  $.ajax({
    url: "getEarnings.php",
    type: "GET",
    datatype: "JSON",
    success: function (earnings) {
      if (earnings == "NoConnect") {
        console.log("cards");

        logout();
        return;
      }
      let AllDayData;
      AllDayData = JSON.parse(earnings);
      console.log(AllDayData);
      AllDayData[0].forEach((element) => {
        totalCash += Number(element[0]);
        earningsDay += Number(element[1]);

        JSON.parse(element[2]).forEach((element) => {
          quantity += Number(element.quantity);
        });
      });

      AllDayData[1].forEach((element) => {
        earningsMonth += Number(element[1]);
      });

      earningsDay = earningsDay.toFixed(2);
      totalCash = totalCash.toFixed(2);
      earningsMonth = earningsMonth.toFixed(2);

      document.getElementById("dayRevenueCard").innerHTML = `${earningsDay} DH`;
      document.getElementById("items").innerHTML = quantity;
      document.getElementById("totalCash").innerHTML = `${totalCash} DH`;
      document.getElementById(
        "earningsMonth"
      ).innerHTML = `${earningsMonth} DH`;
    },
  });
}

cards();
// ---------------- End  Cards--------------

// Daily 1 week
let weekTotal = [];
let weekEarnings = [];

let dayTotal = 0;
let dayEarnings = 0;

// Monthly 1ans
let monthlyTotal = [];
let monthlyEarnings = [];

let monthTotal = 0;
let monthEarnings = 0;

// Dates
let weekDaysDate = [];

// Update Chart Conditions
let updateDailyChart = false;
let updateMonthlyChart = false;

var myChart;
var myChartMonth;
var myChart4Weeks;

// =============== WEEK Chart  ===============

function weekChart() {
  $.ajax({
    url: "chart.php",
    type: "GET",
    datatype: "JSON",
    success: (data) => {
      if (data == "NoConnect") {
        console.log("weekChart");

        logout();
        return;
      }
      weekTotal = [];
      weekEarnings = [];
      console.log(data);
      let weekData = JSON.parse(data);

      dayTotal = 0;
      dayEarnings = 0;
      weekData[0].forEach((element) => {
        if (element.length) {
          element.forEach((clientDay) => {
            // console.log(clientDay[1])
            dayTotal += Number(clientDay[1]);
            dayEarnings += Number(clientDay[2]);

            if (element[element.length - 1] == clientDay) {
              weekTotal.push(dayTotal);
              weekEarnings.push(dayEarnings);
              dayTotal = 0;
              dayEarnings = 0;
              return;
            }
          });
        } else {
          weekTotal.push(0);
          weekEarnings.push(0);
        }
      });

      console.log(weekTotal);
      console.log(weekEarnings);
      weekTotal.reverse();
      weekDaysDate.reverse();
      weekEarnings.reverse();
      Last7Days();
      chart();
    },
  });
}

weekChart();

function Last7Days() {
  for (var i = 1; i < 7; i++) {
    var d = new Date();
    d.setDate(d.getDate() - i);
    weekDaysDate.push(d.toString().slice(0, 3));
  }
  weekDaysDate.reverse();
}

function chart() {
  if (updateDailyChart == true) {
    myChart.data.datasets[0].data = weekTotal;
    myChart.data.datasets[1].data = weekEarnings;

    myChart.data.labels = [];

    for (var i = 1; i < 7; i++) {
      var d = new Date();
      d.setDate(d.getDate() - i);
      myChart.data.labels.push(d.toString().slice(0, 3));
    }
    myChart.data.labels.reverse();

    // updateDailyChart == false
    myChart.update();
    return;
  }

  let labels = weekDaysDate;
  let data = {
    labels: labels,

    datasets: [
      {
        label: "Total Cash",
        fill: false,
        lineTension: 0.3,
        backgroundColor: "rgb(52 39 176)",
        borderColor: "rgb(52 39 176)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgb(52 39 176)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgb(52 39 176)",
        pointHoverBorderColor: "rgb(52 39 176)",
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        pointHitRadius: 10,
        data: weekTotal,
      },
      {
        label: "earnings",
        fill: false,
        lineTension: 0.1,
        backgroundColor: "#a59fdc",
        borderColor: "#a59fdc",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "#a59fdc",
        pointBackgroundColor: "#a59fdc",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#a59fdc",
        // pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        pointHitRadius: 10,
        data: weekEarnings,
      },
    ],
  };

  const config = {
    type: "line",

    data,
    options: {
      // plugins: {
      //   legend: {
      //     display: false
      //   }

      // },

      responsive: true,
      maintainAspectRatio: false,
    },
  };

  myChart = new Chart(document.getElementById("myChart"), config);
}

// --------------------- End ----------------

// =============== 12 Months (Monthly) Chart ===============

function monthlyChart() {
  $.ajax({
    url: "chart.php",
    type: "GET",
    datatype: "JSON",
    success: (data) => {
      if (data == "NoConnect") {
        logout();
        return;
      }
      monthlyTotal = [];
      monthlyEarnings = [];
      console.log(data);
      let monthData = JSON.parse(data);
      console.log(monthData);
      monthTotal = 0;
      monthEarnings = 0;
      monthData[2].forEach((element) => {
        if (element.length) {
          element.forEach((clientMonth) => {
            // console.log(clientDay[1])
            monthTotal += Number(clientMonth[1]);
            monthEarnings += Number(clientMonth[2]);

            if (element[element.length - 1] == clientMonth) {
              monthlyTotal.push(monthTotal);
              monthlyEarnings.push(monthEarnings);
              monthTotal = 0;
              monthEarnings = 0;
              return;
            }
          });
        } else {
          monthlyTotal.push(0);
          monthlyEarnings.push(0);
        }
      });

      monthlyTotal.reverse();
      // weekDaysDate.reverse()
      monthlyEarnings.reverse();
      Last12Months();
      chartMonth();
    },
  });
}

let MonthDate = [];

function Last12Months() {
  if (updateMonthlyChart != true) {
    var date = new Date();
    monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    for (var i = 0; i < 13; i++) {
      MonthDate.push(monthNames[date.getMonth()]);
      date.setMonth(date.getMonth() - 1);
    }
    MonthDate.shift();
    MonthDate.reverse();
    console.log(MonthDate);
    document.getElementById("chartEarnings").removeAttribute("class");
    document
      .getElementById("chartEarnings")
      .setAttribute("class", "chartEarnings");
  } else {
    MonthDate = [];
  }
}

function chartMonth() {
  if (updateMonthlyChart == true) {
    myChartMonth.data.datasets[0].data = monthlyTotal;
    myChartMonth.data.datasets[1].data = monthlyEarnings;

    myChartMonth.data.labels = [];

    var date = new Date();
    var monthN = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    for (var i = 0; i < 13; i++) {
      myChartMonth.data.labels.push(monthN[date.getMonth()]);
      date.setMonth(date.getMonth() - 1);
    }
    myChartMonth.data.labels.shift();
    // console.log((myChartMonth.data.labels))
    myChartMonth.data.labels.reverse();
    myChartMonth.update();
    return;
  }

  let labels = MonthDate;
  let data = {
    labels: labels,

    datasets: [
      {
        label: "Total Cash",
        fill: false,
        lineTension: 0.3,
        backgroundColor: "rgb(52 39 176)",
        borderColor: "rgb(52 39 176)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgb(52 39 176)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgb(52 39 176)",
        pointHoverBorderColor: "rgb(52 39 176)",
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        pointHitRadius: 10,
        data: monthlyTotal,
      },
      {
        label: "earnings",
        fill: false,
        // lineTension: 0.3,
        backgroundColor: "#a59fdc",
        borderColor: "#a59fdc",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "#a59fdc",
        pointBackgroundColor: "#a59fdc",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#a59fdc",
        // pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        pointHitRadius: 10,
        data: monthlyEarnings,
      },
    ],
  };

  const config = {
    type: "line",

    data,
    options: {
      // plugins: {
      //   legend: {
      //     display: false
      //   }

      // },

      responsive: true,
      maintainAspectRatio: false,
    },
  };

  myChartMonth = new Chart(document.getElementById("myChartMonth"), config);

  updateMonthlyChart = true;
}

// ------------------------- End ----------------------

// =================== Chart 4 Weeks ================

let weeklyTotal = [];
let weeklyEarnings = [];
let WeekTotal = 0;
let WeekEarnings = 0;
let updateWeeklyChart = false;

function WeeklyChart() {
  $.ajax({
    url: "chart.php",
    type: "GET",
    datatype: "JSON",
    success: (data) => {
      if (data == "NoConnect") {
        logout();
        return;
      }
      weeklyTotal = [];
      weeklyEarnings = [];
      // console.log(data)
      let Last4WeeksData = JSON.parse(data);
      // console.log(monthData)
      WeekTotal = 0;
      WeekEarnings = 0;
      Last4WeeksData[1].forEach((element) => {
        if (element.length) {
          element.forEach((clientWeek) => {
            // console.log(clientDay[1])
            WeekTotal += Number(clientWeek[1]);
            WeekEarnings += Number(clientWeek[2]);

            if (element[element.length - 1] == clientWeek) {
              weeklyTotal.push(WeekTotal);
              weeklyEarnings.push(WeekEarnings);
              WeekTotal = 0;
              WeekEarnings = 0;
              return;
            }
          });
        } else {
          weeklyTotal.push(0);
          weeklyEarnings.push(0);
        }
      });

      weeklyTotal.reverse();
      // weekDaysDate.reverse()
      weeklyEarnings.reverse();
      // Last12Months ()
      chart4Weeks();
      console.log(weeklyTotal);
      console.log(weeklyEarnings);
    },
  });
}

function chart4Weeks() {
  if (updateWeeklyChart == true) {
    myChart4Weeks.data.datasets[0].data = weeklyTotal;
    myChart4Weeks.data.datasets[1].data = weeklyEarnings;

    myChart4Weeks.data.labels = [];

    let weeksN = ["Week 1", "Week 2", "Week 3", "Last 7 Days"];
    for (var i = 0; i < 4; i++) {
      myChart4Weeks.data.labels.push(weeksN[i]);
    }

    myChart4Weeks.update();
    return;
  }

  let labels = ["Week 1", "Week 2", "Week 3", "Last 7 Days"];
  let data = {
    labels: labels,

    datasets: [
      {
        label: "Total Cash",
        fill: false,
        lineTension: 0.3,
        backgroundColor: "rgb(52 39 176)",
        borderColor: "rgb(52 39 176)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgb(52 39 176)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgb(52 39 176)",
        pointHoverBorderColor: "rgb(52 39 176)",
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        pointHitRadius: 10,
        data: weeklyTotal,
      },
      {
        label: "earnings",
        fill: false,
        // lineTension: 0.3,
        backgroundColor: "#a59fdc",
        borderColor: "#a59fdc",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "#a59fdc",
        pointBackgroundColor: "#a59fdc",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#a59fdc",
        // pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        pointHitRadius: 10,
        data: weeklyEarnings,
      },
    ],
  };

  const config = {
    type: "line",

    data,
    options: {
      // plugins: {
      //   legend: {
      //     display: false
      //   }

      // },

      responsive: true,
      maintainAspectRatio: false,
    },
  };

  myChart4Weeks = new Chart(document.getElementById("myChart4weeks"), config);

  updateWeeklyChart = true;
}

// ------------------------- End ---------

// ============================ Specific Day Earnings ==================
// let thisDayTotal = [];
// let thisDayEarnings = [];
let thisDayTotal = 0;
let thisDayEarnings = 0;
let updatethisDayChart = false;
let thisDayHourTotal = [];
let thisDayHourEarnings = [];
let thisDayHours = [];
function thisDayChart() {
  $.ajax({
    url: "chartSpecificDay.php",
    type: "post",
    data: {
      date: document.getElementById("specificDay").value,
    },
    datatype: "JSON",
    success: (data) => {
      if (data == "NoConnect") {
        logout();
        return;
      }
      let thisDayData = JSON.parse(data);
      console.log(thisDayData);
      thisDayTotal = 0;
      thisDayEarnings = 0;
      thisDayHourTotal = [];
      thisDayHourEarnings = [];
      thisDayHours = [];

      // number of buyed Prd in specific day
      thisDayItemsBuyed = [];
      thisDayData.forEach((element) => {
        element[3] = JSON.parse(element[3]);
        thisDayItemsBuyed.push(element[3]);
        thisDayHours.push(element[0].slice(11, element[0].length));
        thisDayHourTotal.push(Number(element[1]));
        thisDayHourEarnings.push(Number(element[2]));
        thisDayTotal += Number(element[1]);
        thisDayEarnings += Number(element[2]);
      });
      console.log(thisDayItemsBuyed);

      let numThisDayItemsBuyed = 0;

      thisDayItemsBuyed.forEach((el) => {
        el.forEach((cart) => {
          numThisDayItemsBuyed += cart.quantity;
        });
      });
      console.log(numThisDayItemsBuyed);
      // --------- END number of buyed Prd in specific day -------------

      console.log(thisDayHours);
      console.log(thisDayHourTotal);
      console.log(thisDayHourEarnings);
      console.log(thisDayTotal);
      console.log(thisDayEarnings);
      chartThisDayChartBar();
      chartThisDayChart();
    },
  });
}

let updateThisDay;
let myChartThisDay;
function chartThisDayChart() {
  if (updateThisDay == true) {
    myChartThisDay.data.datasets[0].data = thisDayHourTotal;
    myChartThisDay.data.datasets[1].data = thisDayHourEarnings;
    myChartThisDay.data.labels = [];

    let HoursN = thisDayHours;
    for (var i = 0; i < HoursN.length; i++) {
      myChartThisDay.data.labels.push(HoursN[i]);
    }

    myChartThisDay.update();
    return;
  }

  let labels = thisDayHours;
  // let labels = [document.getElementById('specificDay').value];
  let data = {
    labels: labels,

    datasets: [
      {
        label: "Total Cash",
        fill: false,
        lineTension: 0.3,
        backgroundColor: "rgb(52 39 176)",
        borderColor: "rgb(52 39 176)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgb(52 39 176)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgb(52 39 176)",
        pointHoverBorderColor: "rgb(52 39 176)",
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        pointHitRadius: 10,
        // data: [thisDayTotal],
        data: thisDayHourTotal,
      },
      {
        label: "earnings",
        fill: false,
        // lineTension: 0.3,
        backgroundColor: "#a59fdc",
        borderColor: "#a59fdc",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "#a59fdc",
        pointBackgroundColor: "#a59fdc",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#a59fdc",
        // pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        pointHitRadius: 10,
        // data: [thisDayEarnings],
        data: thisDayHourEarnings,
      },
    ],
  };

  const config = {
    type: "line",

    data,
    options: {
      // plugins: {
      //   legend: {
      //     display: false
      //   }

      // },

      responsive: true,
      maintainAspectRatio: false,
    },
  };

  myChartThisDay = new Chart(document.getElementById("myChartThisDay"), config);

  updateThisDay = true;
}

let myChartThisDayBar;
function chartThisDayChartBar() {
  if (updateThisDay == true) {
    myChartThisDayBar.data.datasets[0].data = [thisDayTotal];
    myChartThisDayBar.data.datasets[1].data = [thisDayEarnings];
    myChartThisDayBar.data.labels = [
      document.getElementById("specificDay").value,
    ];

    myChartThisDayBar.update();
    return;
  }

  // let labels = thisDayHours;
  let labels = [document.getElementById("specificDay").value];
  let data = {
    labels: labels,

    datasets: [
      {
        label: "Total Cash",
        fill: false,
        lineTension: 0.3,
        backgroundColor: "rgb(52 39 176)",
        borderColor: "rgb(52 39 176)",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "rgb(52 39 176)",
        pointBackgroundColor: "#fff",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "rgb(52 39 176)",
        pointHoverBorderColor: "rgb(52 39 176)",
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        pointHitRadius: 10,
        data: [thisDayTotal],
        // data: thisDayHourTotal,
      },
      {
        label: "earnings",
        fill: false,
        // lineTension: 0.3,
        backgroundColor: "#a59fdc",
        borderColor: "#a59fdc",
        borderCapStyle: "butt",
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: "miter",
        pointBorderColor: "#a59fdc",
        pointBackgroundColor: "#a59fdc",
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: "#a59fdc",
        // pointHoverBorderColor: "rgba(220,220,220,1)",
        pointHoverBorderWidth: 2,
        pointRadius: 5,
        pointHitRadius: 10,
        data: [thisDayEarnings],
        // data: thisDayHourEarnings,
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
      responsive: true,
      maintainAspectRatio: false,
    },
  };

  myChartThisDayBar = new Chart(
    document.getElementById("myChartThisDayBar"),
    config
  );
}

// Refresh Data

document.getElementById("dailyChart").addEventListener("click", () => {
  // myChart.clear();
  // myChart.destroy();
  document
    .getElementById("myChart4weeks")
    .setAttribute("style", "display: none");
  document
    .getElementById("myChartMonth")
    .setAttribute("style", "display: none");
  document
    .getElementById("myChart")
    .setAttribute(
      "style",
      "display: block;box-sizing: border-box; height: 340px; width: 1086px"
    );
  document
    .getElementById("thisdayChart")
    .setAttribute("style", "display: none ");

  updateDailyChart = true;

  document.getElementById("monthlyChart").style =
    "background-color: #fafafa; color: #8e8d92";
  document.getElementById("weeklyChart").style =
    "background-color: #fafafa ; color: #8e8d92";
  document.getElementById("dailyChart").style =
    "background-color: #2442ea ; color: #fff";
  document.getElementById("specificDay").value = "";

  weekChart();
  cards();
});

document.getElementById("monthlyChart").addEventListener("click", () => {
  // myChart.clear();

  document
    .getElementById("myChartMonth")
    .setAttribute(
      "style",
      "display: block;box-sizing: border-box; height: 340px; width: 1086px"
    );
  document.getElementById("myChart").setAttribute("style", "display: none");
  document
    .getElementById("myChart4weeks")
    .setAttribute("style", "display: none");
  document
    .getElementById("thisdayChart")
    .setAttribute("style", "display: none ");

  document.getElementById("monthlyChart").style =
    "background-color: #2442ea ; color: #fff";
  document.getElementById("weeklyChart").style =
    "background-color: #fafafa ; color: #8e8d92";
  document.getElementById("dailyChart").style =
    "background-color: #fafafa ; color: #8e8d92";
  document.getElementById("specificDay").value = "";

  monthlyChart();
  cards();
});

document.getElementById("weeklyChart").addEventListener("click", () => {
  // myChart.clear();

  document
    .getElementById("myChart4weeks")
    .setAttribute(
      "style",
      "display: block;box-sizing: border-box; height: 340px; width: 1086px"
    );
  document.getElementById("myChart").setAttribute("style", "display: none");
  document
    .getElementById("myChartMonth")
    .setAttribute("style", "display: none");
  document
    .getElementById("thisdayChart")
    .setAttribute("style", "display: none ");

  document.getElementById("weeklyChart").style =
    "background-color: #2442ea ; color: #fff";
  document.getElementById("monthlyChart").style =
    "background-color: #fafafa ; color: #8e8d92";
  document.getElementById("dailyChart").style =
    "background-color: #fafafa ; color: #8e8d92";

  document.getElementById("specificDay").value = "";

  WeeklyChart();
  cards();
});

document.getElementById("specificDay").addEventListener("change", () => {
  if (document.getElementById("specificDay").value != "") {
    var d = Date.parse(document.getElementById("specificDay").value);
    var c = Date.now();

    if ((c) => d && d > 1616281200000) {
      document
        .getElementById("thisdayChart")
        .setAttribute("style", "display: flex ");
      document
        .getElementById("myChart4weeks")
        .setAttribute("style", "display: none");
      document.getElementById("myChart").setAttribute("style", "display: none");
      document
        .getElementById("myChartMonth")
        .setAttribute("style", "display: none");

      // document.getElementById('weeklyChart').style = 'background-color: #2442ea ; color: #fff'
      document.getElementById("weeklyChart").style =
        "background-color: #fafafa ; color: #8e8d92";
      document.getElementById("monthlyChart").style =
        "background-color: #fafafa ; color: #8e8d92";
      document.getElementById("dailyChart").style =
        "background-color: #fafafa ; color: #8e8d92";

      thisDayChart();
    }
  }
});

document.getElementById("productShow").onclick = () => {
  document.getElementById("posTop").removeAttribute("style");
  document.querySelector(".header2").style = "display : none";
  document.querySelector(".alertRes2").removeAttribute("style");

  document.querySelector(".listPd").style = "display:block";
  document.querySelector(".dashbordStat").style = "display:none";
   document.querySelector(".Settings").style = "display:none";
  document.getElementById("showSettings").style = "color: #a59fdc";
  document.getElementById("productShow").style = "color: #3427b0";
  document.getElementById("dashbordShow").style = "color: #a59fdc";
  document.getElementById("showClients").style = "color: #a59fdc";
  FetchAll();
  affichage();
};

document.getElementById("dashbordShow").onclick = () => {
  document.getElementById("showClients").style = "color: #a59fdc";
  document.getElementById("dashbordShow").style = "color: #3427b0";
  document.getElementById("productShow").style = "color: #a59fdc";
  document.getElementById("showSettings").style = "color: #a59fdc";
  document.querySelector(".listPd").style = "display:none";
  document.querySelector(".dashbordStat").style = "display:block";
   document.querySelector(".Settings").style = "display:none";
  cards();
};

document.getElementById("showClients").onclick = () => {
  document.getElementById("posTop").style = "display : none";
  document.querySelector(".header2").removeAttribute("style");
  document.querySelector(".alertRes2").style = "display : none";
   document.querySelector(".Settings").style = "display:none";

  document.getElementById("showClients").style = "color: #3427b0";
  document.getElementById("dashbordShow").style = "color: #a59fdc";
  document.getElementById("productShow").style = "color: #a59fdc";
  document.getElementById("showSettings").style = "color: #a59fdc";
  document.querySelector(".listPd").style = "display:block";
  document.querySelector(".dashbordStat").style = "display:none";
};

function isValid(currentUsername) {
  document.querySelector(".changePass").addEventListener("click", () => {
    const username = document.getElementById("changeUsername").value;
    const pass1 = document.getElementById("changePassword1").value;
    const pass2 = document.getElementById("changePassword2").value;
    console.log(username, currentUsername, pass1, pass2);

    if (username === currentUsername) {
      if (pass1 !== "" && pass2 !== "" && pass1 === pass2) {
        $.ajax({
          url: "settings.php",
          method: "POST",
          data: {
            newPass: pass1,
          },
          success: (data) => {
            console.log(data);
            if (data == "success") {
              document.getElementById("changePassword1").value = ''; 
              document.getElementById("changePassword2").value = ''; 
              document.querySelector(".isValid").innerHTML = `
              <div class="alert alert-success alert-dismissible fade show  mx-auto mt-4" role="alert">
              Password has been changed
              <a type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></a>
             </div>
              `;
            }
            return;
          },
        });
      }
      return;
    }

    if (pass1 !== "" && pass2 !== "" && pass1 === pass2) {
      $.ajax({
        url: "settings.php",
        method: "POST",
        data: {
          newUsername: username,
          newPass: pass1,
        },
        success: (data) => {
          if (data == "success") {
               document.getElementById("changePassword1").value = ''; 
              document.getElementById("changePassword2").value = ''; 
            document.querySelector(".isValid").innerHTML = `
            <div class="alert alert-success alert-dismissible fade show  mx-auto mt-4" role="alert">
            Your Login Details has been changed
            <a type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></a>
           </div>
            `;
          }
          console.log(data);
          return;
        },
      });
    }
  });
}

document.getElementById("showSettings").addEventListener("click", () => {
  document.getElementById("showSettings").style = "color: #3427b0";
  document.getElementById("showClients").style = "color: #a59fdc";
  document.getElementById("dashbordShow").style = "color: #a59fdc";
  document.getElementById("productShow").style = "color: #a59fdc";
  document.querySelector(".listPd").style = "display:none";
  document.querySelector(".dashbordStat").style = "display:none";
  document.querySelector(".Settings").style = "display:block";

  $.ajax({
    url: "getUsername.php",
    method: "GET",
    success: (data) => {
      document.querySelector(".Settings").innerHTML = `
    
        <div class='container' style='margin-top:20px'>
        <div class="HeaderLeft2">
          <p>Settings</p>
        </div>
        <div style='margin-top:75px'>
        <div class='isValid'></div>

        <div class="mb-3">
          <label for="exampleInputEmail1" class="form-label">Change Username</label>
          <input type="text" class="form-control" id="changeUsername" aria-describedby="emailHelp" value=${data}>
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">New Password</label>
          <input type="password" class="form-control" id="changePassword1">
        </div>
        <div class="mb-3">
          <label for="exampleInputPassword1" class="form-label">Repeat Password</label>
          <input type="password" class="form-control" id="changePassword2">
        </div>
      
        <button class="btn btn-primary changePass">save</button>
      </div>
      </div>
        `;
      isValid(data);
    },
  });
});
