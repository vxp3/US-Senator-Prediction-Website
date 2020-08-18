// Data gathered from http://populationpyramid.net/germany/2015/


// Age categories
// var categories = [
//     '0-4', '5-9', '10-14', '15-19',
//     '20-24', '25-29', '30-34', '35-39', '40-44',
//     '45-49', '50-54', '55-59', '60-64', '65-69',
//     '70-74', '75-79', '80-84', '85-89', '90-94',
//     '95-99', '100 + '
//   ];

// Initial Params
// var categories = "Politician";


d3.csv("./data/top10_approve_rate.csv").then(function(approve) {
  console.log(approve);

// d3.csv("/data/employees.csv", function(data) {
//     for (var i = 0; i < data.length; i++) {
//         console.log(data[i].Name);
//         console.log(data[i].Age);
//     }
// });

  var Politician = [],
      Approve = [],
      Disapprove = [];
approve.map(function(d) {
  Politician.push(d.Politician);
  Approve.push(d.Approve);
  Disapprove.push(d.Disapprove);
})


console.log(Politician);


Highcharts.chart('container', {
  chart: {
    type: 'bar'
  },
  title: {
    text: "Q4 2018 Rankings"
  },
  subtitle: {
    text: 'Source: <a href="https://morningconsult.com/2019/01/10/americas-most-and-least-popular-senators-q4-2018-2/">MorningConsult</a>'
  },
  accessibility: {
    point: {
      valueDescriptionFormat: '{index}. Approve {xDescription}, {value}%.'
    }
  },
  xAxis: [{
    categories: Politician,
    // reversed: false,
    labels: {
      step: 1
    },
    accessibility: {
      description: 'Approve'
    }
  }, { // mirror axis on right side
    opposite: true,
    // reversed: false,
    categories: Politician,
    linkedTo: 0,
    labels: {
      step: 1
    },
    accessibility: {
      description: 'Disapprove'
    }
  }],
  yAxis: {
    title: {
      text: null
    },
    labels: {
      formatter: function () {
        return Math.abs(this.value) + '%';
      }
    },
    accessibility: {
      description: 'Percentage population',
      rangeDescription: 'Range: 0 to 100%'
    }
  },

  plotOptions: {
    series: {
      stacking: 'normal'
    }
  },

  tooltip: {
    formatter: function () {
      return '<b>' + this.series.name + ', senator ' + this.point.category + '</b><br/>' +
        'Percentage: ' + Highcharts.numberFormat(Math.abs(this.point.y), 1) + '%';
    }
  },

  series: [{
    name: 'Approve',
    data: [
      -64, -62, -62, -59, -58,
      -58, -57, -57, -56, -56
    ]
  }, {
    name: 'Disapprove',
    data: [
      28, 26, 23, 27, 23,
      27, 31, 29, 29, 27
    ]
  }]
});

console.log(Approve)

});


  