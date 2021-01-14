/* NO Longer hardcoding data! I am now loading .csv data dynamnically from github directory.*/




/* DOCUMENTATION: VARIABLS SET BY INDEX.HTML

// Graph 1 (confidence + forecasts)
var conf_low = []; // lower value of confidence interval 
var area = []; // difference between upper and lower confidence bounds 
var data_all = []; //concatenated true + forecasted observations (15 steps into future)

var data_pred = []; // forecasted observations using ARIMA. 
var data_true = []; // true observed frequencies. 

END OF VARS SET BY INDEX.HTML */

weeks1 = [ 0,   1,   2,   3,   4,   5,   6,   7,   8,   9,  10,  11,  12,
      13,  14,  15,  16,  17,  18,  19,  20,  21,  22,  23,  24,  25,
      26,  27,  28,  29,  30,  31,  32,  33,  34,  35,  36,  37,  38,
      39,  40,  41,  42,  43,  44,  45,  46,  47,  48,  49,  50,  51]; 


// echarts examples: https://echarts.apache.org/examples/en/index.html?theme=light
// echarts docs: https://echarts.apache.org/en/tutorial.html#Overview%20of%20Style%20Customization 
  
weeks = [ 0,   1,   2,   3,   4,   5,   6,   7,   8,   9,  10,  11,  12,
      13,  14,  15,  16,  17,  18,  19,  20,  21,  22,  23,  24,  25,
      26,  27,  28,  29,  30,  31,  32,  33,  34,  35,  36,  37,  38,
      39,  40,  41,  42,  43,  44,  45,  46,  47,  48,  49,  50,  51,
      52,  53,  54,  55,  56,  57,  58,  59,  60,  61,  62,  63,  64,
      65,  66,  67,  68,  69,  70,  71,  72,  73,  74,  75,  76,  77,
      78,  79,  80,  81,  82,  83,  84,  85,  86,  87,  88,  89,  90,
      91,  92,  93,  94,  95,  96,  97,  98,  99, 100, 101, 102, 103,
     104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116,
     117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129,
     130, 131];


// Defining Arrays (1 for each keyword) to hold closest neighbors (TOXIC FEMINISM CASE)
tf_words = ['#feminismismanhating', '#feminismisawful', '#rsa', '#itsneverokay', 
'whiners', '#erotica', '#sjwlogic', '#imwithsabotage', '#stress', '#sheresisted',
'#humanity', 'xenophobia'];
tf_dist = [0.298, 0.356, 0.471, 0.492, 0.496, 0.499, 0.508, 0.516, 0.522, 0.529,
0.53, 0.541];
tf_freq = [15, 136, 51, 17, 21, 12, 8, 6, 47, 12, 102, 18];

// TSNE-plot demo. 
tsne_n = ['#toxicfeminism', '#feminismismanhating', '#feminismisawful', '@javed', '#rsa', 
'#itsneverokay', '@cia', 'whiners', '#erotica', '@libbyblog', '#sjwlogic', 
'@wendywglobal', 'rhyme', '#imwithsabotage', '@flagstaffghana', 'publicised']; 
tsne_x = [-225.34985, -11.214129, -370.24695, -115.863266, -38.937935, -468.89218, 394.57895, 
195.15031, -445.24152, -54.32746, -219.09306, 147.0514, -249.55618, 295.43106, 209.29282, 68.88156];
tsne_y = [113.70877, 210.7245, 298.92694, 418.65622, -11.941959, 27.747469, -27.335003, 102.07703, 
-257.9782, -242.64703, -421.8547, -128.54271, -122.286224, -302.2922, 347.9651, -446.1653];


// CLOSEST NEIGHBORS: For this, the format for tsne of closest neighbors should be: [[x_val, y_val, word, cosine_dist]]
data_tsne = [
[[50, 50, '#toxicfeminism',0.298, 'target']], 
[[-11.214129, 210.7245, '#feminismismanhating',0.298, 'neighbor'], [-370.24695, 298.92694,'#feminismisawful', 0.356, 'neighbor'],
[-38.937935, -11.941959, '#rsa',0.471, 'neighbor']]
];



var res = [];
/*var dataURL = "https://raw.githubusercontent.com/mayasrikanth/mayasrikanth.github.io/main/data/website-data.csv";
function getCSVData(csvContent) {
    return Papa.parse(csvContent {download: true, dynamicTyping: true}).data;
}; 
$.get(dataURL, function (csvContent) {
  console.log("HIII");
  res = getCSVData(csvContent); 
  console.log(res); 
};*/




// function to sort the arrays 
function sortarrays() {
  //1) combine the arrays:
  var list = [];
  for (var j = 0; j < tf_words.length; j++) 
      list.push({'word': tf_words[j], 'dist': tf_dist[j], 'count': tf_freq[j]});

  //2) sort:
  list.sort(function(a, b) {
      return ((a.dist < b.dist) ? -1 : ((a.dist == b.dist) ? 0 : 1));
      //Sort could be modified to, for example, sort on the age 
      // if the name is the same.
  });
  //3) separate them back out:
  for (var k = 0; k < list.length; k++) {
      tf_words[k] = list[k].word;
      tf_dist[k] = list[k].dist;
      tf_freq[k] = list[k].count;
  }
}



// The idea is that the data .csv should already have all neighbors sorted by 
// distance. We are also not appending cosine distance, only log of raw count. 
/*function loadTableDynamic(word_arr, freq_arr){
  console.log("Entered loadTableDynamic!!!");
  var mybody = document.getElementsByTagName("body")[0];
  var mytable = document.getElementById("cosine-table");
  var mytablebody = document.getElementById("cosine-table-body"); // old table body

  // new table body (populate with updated entries). 
  var new_tbody = document.createElement('tbody');
    

  // clearing old entries if there are any.  
  while(mytablebody.hasChildNodes())
  {
     mytablebody.removeChild(mytablebody.firstChild);
  }

  n = tf_words.length;
  console.log(freq_arr);
  params = 2; 
  for(var row = 0; row < n; row++) {
           mycurrent_row=document.createElement("tr");
           //for(var col = 0; col < 2; col++) {

              // Appending closest neighbor
               mycurrent_cell = document.createElement("td");
               //currenttext = document.createTextNode("cell is: " + row + col);
               currenttext = document.createTextNode(word_arr[row]);
               mycurrent_cell.appendChild(currenttext);
               mycurrent_row.appendChild(mycurrent_cell);
               mycurrent_cell.style.className = "active-row";
               
              // Appending corpus counts
               mycurrent_cell = document.createElement("td");
               //currenttext = document.createTextNode("cell is: " + row + col);
               currenttext = document.createTextNode(freq_arr[row]);
               mycurrent_cell.appendChild(currenttext);
               mycurrent_row.appendChild(mycurrent_cell);
              // mycurrent_cell.style.className = "active-row";
           mytablebody.appendChild(mycurrent_row);
       }
  mytable.appendChild(mytablebody);
  //mytable.replaceChild(new_tbody, mytablebody);

  
}*/



// The idea is that the data .csv should already have all neighbors sorted by 
// distance. We are also not appending cosine distance, only log of raw count. 
function loadTableDynamic(word_arr, cos_dist, freq_arr){
  console.log("Entered loadTableDynamic!!!");
  var mybody = document.getElementsByTagName("body")[0];
  var mytable = document.getElementById("cosine-table");
  var mytablebody = document.getElementById("cosine-table-body"); // old table body

  // new table body (populate with updated entries). 
  var new_tbody = document.createElement('tbody');
    

  // clearing old entries if there are any.  
  while(mytablebody.hasChildNodes())
  {
     mytablebody.removeChild(mytablebody.firstChild);
  }

  n = word_arr.length -1;
  console.log(word_arr);
  params = 2; 
  for(var row = 0; row < n; row++) {
           mycurrent_row=document.createElement("tr");
           //for(var col = 0; col < 2; col++) {

              // Appending closest neighbor
               mycurrent_cell = document.createElement("td");
               //currenttext = document.createTextNode("cell is: " + row + col);
               currenttext = document.createTextNode(word_arr[row]);
               mycurrent_cell.appendChild(currenttext);
               mycurrent_row.appendChild(mycurrent_cell);
               mycurrent_cell.style.className = "active-row";
               
              // Appending corpus counts
               mycurrent_cell = document.createElement("td");
               //currenttext = document.createTextNode("cell is: " + row + col);
               currenttext = document.createTextNode(freq_arr[row]);
               mycurrent_cell.appendChild(currenttext);
               mycurrent_row.appendChild(mycurrent_cell);

               // Appending cosine distance
               mycurrent_cell = document.createElement("td");
               //currenttext = document.createTextNode("cell is: " + row + col);
               currenttext = document.createTextNode(cos_dist[row]);
               mycurrent_cell.appendChild(currenttext);
               mycurrent_row.appendChild(mycurrent_cell);



              // mycurrent_cell.style.className = "active-row";
           mytablebody.appendChild(mycurrent_row);
       }
  mytable.appendChild(mytablebody);
  //mytable.replaceChild(new_tbody, mytablebody);

  
}















function cosineDistanceTable(){
  sortarrays();
  var mybody = document.getElementsByTagName("body")[0];
  var mytable = document.getElementById("cosine-table");
  var mytablebody = document.getElementById("cosine-table-body");
  console.log("MADE IT");

  n = tf_words.length;
  word_arr = tf_words;
  dist_arr = tf_dist;
  freq_arr = tf_freq;

  console.log(dist_arr);
  params = 2; 
  for(var row = 0; row < n; row++) {
           mycurrent_row=document.createElement("tr");
           //for(var col = 0; col < 2; col++) {

              // Appending closest neighbor
               mycurrent_cell = document.createElement("td");
               //currenttext = document.createTextNode("cell is: " + row + col);
               currenttext = document.createTextNode(word_arr[row]);
               mycurrent_cell.appendChild(currenttext);
               mycurrent_row.appendChild(mycurrent_cell);
               mycurrent_cell.style.className = "active-row";


              // Appending cosine distance
               mycurrent_cell = document.createElement("td");
               //currenttext = document.createTextNode("cell is: " + row + col);
               currenttext = document.createTextNode(dist_arr[row]);
               mycurrent_cell.appendChild(currenttext);
               mycurrent_row.appendChild(mycurrent_cell);
               mycurrent_cell.style.className = "active-row";

               
              // Appending corpus counts
               mycurrent_cell = document.createElement("td");
               //currenttext = document.createTextNode("cell is: " + row + col);
               currenttext = document.createTextNode(freq_arr[row]);
               mycurrent_cell.appendChild(currenttext);
               mycurrent_row.appendChild(mycurrent_cell);
              // mycurrent_cell.style.className = "active-row";
           mytablebody.appendChild(mycurrent_row);
       }
  mytable.appendChild(mytablebody);
}


// TSNE data (hardcoded)

tf_labels = ['#toxicfeminism', '#feminismismanhating', '#feminismisawful', '@javed', '#rsa', '#itsneverokay', 
  '@cia', 'whiners', '#erotica', '@libbyblog', '#sjwlogic', 
  '@wendywglobal', 'rhyme', '#imwithsabotage', '@flagstaffghana',
   'publicised', '#dkbiz', '#stress', 'pantry', '@tvietor', 
   '@sunandavashisht', '@sonamakapoor', '#sheresisted', 
   '#humanity', 'publishers', '@mlb', 'characters', 'shopkeeper', 
   'checks', 'acknowledge', 'xenophobia'];

tf_x = [84.89871, 2.0533667, -35.445038, 83.3489, 51.80577, 26.994102, 
57.476665, -5.086792, 26.323029, 83.75621, 51.34877, 59.246754, 52.790546, 
-15.271239, -29.678585, 8.340472, -26.337261, -78.95914, 22.65036, 
-60.80907, 37.481915, -27.743078, 0.33459777, -55.56171, -86.14176, 
26.821083, -27.761173, 14.398789, -45.96514, -60.946968, -0.6507211];

tf_y = [36.51358, -45.580444, 77.14228, 1.8861485, -4.4957547, 47.24307, 
64.307594, 64.026024, -59.79952, -31.057081, -83.57386, -49.77101, 
27.783325, -20.383978, 38.053284, -88.101456, -80.41315, -21.667597, 
19.177082, 13.114715, 7.263311, -16.338219, -21.46236, -56.8539, 6.4833093];


var mychart;
var allchart;
var tsnechart; 
var flag = false; 


// function to load Graph 2 (middle graph) of forecasts/true observations over longer horizon. 
function loadGraph2(data_true, data_pred, hash_name) {

   // Plotting all raw counts with all arima projections. 
  var option = {
        title: {
            text: hash_name + " Counts", //'#ToxicFeminism',
            boundaryGap: [0, '100%']
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: ['True', 'Pred'], 
            right: 10             // legend is placed in middle-right
      },
    
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      toolbox: {
          // add later
      },
      xAxis: {
          type: 'category',
          boundaryGap: false,
          name: 'Weeks',
          data: [  0,   1,   2,   3,   4,   5,   6,   7,   8,   9,  10,  11,  12,
                13,  14,  15,  16,  17,  18,  19,  20,  21,  22,  23,  24,  25,
                26,  27,  28,  29,  30,  31,  32,  33,  34,  35,  36,  37,  38,
                39,  40,  41,  42,  43,  44,  45,  46,  47,  48,  49,  50,  51,
                52,  53,  54,  55,  56,  57,  58,  59,  60,  61,  62,  63,  64,
                65,  66,  67,  68,  69,  70,  71,  72,  73,  74,  75,  76,  77,
                78,  79],
      },
      yAxis: {
          type: 'value',
          name: 'Log  Counts'
      },
      dataZoom: [
        {   // This dataZoom component controls x-axis by dafault
            type: 'slider', // this dataZoom component is dataZoom component of slider
            start: 0,      // the left is located at 10%
            end: 100         // the right is located at 60%
        }],
      series: [
          {
              name: 'Pred',
              type: 'line',
              //stack: '总量',
              color: 'magenta',
              data: data_pred

          },
          {
              name: 'True',
              type: 'line',
              //stack: '总量',
              data: data_true 
          }
        ]
    };
    // use configuration item and data specified to show chart
    myChart.setOption(option, animation=true);
    myChart.setOption({
      grid: { 
      left: '5%'
       }
    });

}


// load leftmost Graph 1 showning 50 most recent observations, where last 15 are future projections. 
function loadGraph1(forecasts, conf_low, conf_area, hash_name) {
  // Plotting raw counts over all time 
 var option1 = {
         title: {
          text: hash_name + " Forecasts", 
          boundaryGap: ['0', '100%']
      },
      tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'cross',
              label: {
                  backgroundColor: '#6a7985'
              }
          }
      },
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      xAxis: {
          type: 'category',
          boundaryGap: false,
          label: 'Weeks',
          data: weeks1
      },
      yAxis: {
          min: 0,
          type: 'value',
          name: 'Log Counts'
      },

    // SERIES with projections and confidence intervals. 
      series: [
      { // Lower Confidence Interval
            name: 'L',
            type: 'line',
            data: conf_low,
            lineStyle: {
                opacity: 0
            }, 
            stack: 'confidence-band',
            symbol: 'none'
      }, 

      {
        name: 'U',
        type: 'line',
        data: conf_area,
        lineStyle: {
            opacity: 0
        },
        areaStyle: {
            color: '#ccc'
        },
        stack: 'confidence-band',
        symbol: 'none'
    },
      { // ACTUAL SERIES
           name: 'Log Counts',
          type: 'line',
          data: forecasts // this is the actual data + projections for a given series 
            
      }],
          
     "visualMap": [{
        //show: true,
        show: false,
        type: 'piecewise',
        dimension: 0,
        "pieces": [{
            "gte": 35,  
            "lte": 50, 
            "label": "Forecast",
            "position": "top",
            "color":"turquoise"
        },  
    
      {

            "gte": 0,
            "lte": 35,//80,
            "label":  "True",
            "color": "magenta"
        }],  
    }]
        
        
  };

 allchart.setOption(option1);//, animation=true);


}



// load rightmost Graph 3 showing tsne plot of nearest neighbors. 
function loadGraph3(target_data, neighbors_data, hash_name) {

  

  var neighbor_labels = [];
  // manually extracting target and neighbor labels. 
  for(var i =0; i < neighbors_data.length; i++) {
      neighbor_labels.push(neighbors_data[i][2]); 
  }
  console.log(neighbor_labels); 

  option2 = {
    title: {
        text: 'closest neighbors' 
    },
    xAxis: {
        splitLine: {
            lineStyle: {
                type: 'dashed'
            }
        }
    },
    yAxis: {
        splitLine: {
            lineStyle: {
                type: 'dashed'
            }
        },
        scale: true
    },
    series: [{
        name: 'Neighbors',
        data: neighbors_data,
        type: 'scatter',
        symbolSize: function (param) {
             return 5*param[3]; /// 5e2;
       },
 
        label: {
                show: true,
                formatter: function (param) {
                    return param.value[2];
                },
                position: 'top'
        
        },
        itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(120, 36, 50, 0.5)',
            shadowOffsetY: 5,
            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                offset: 0,
                color: 'rgb(251, 118, 123)'
            }, {
                offset: 1,
                color: 'rgb(204, 46, 72)'
            }])
        }
    }, 

    {
        name: 'Target',
        data: target_data,
        type: 'scatter',
        symbolSize: function (param) {
            return 5*param[3];
        },
        
        label: {
            show: true,
            formatter: function (param) {
                    return param.value[2];
                },
            position: 'top'
        },

        itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(25, 100, 150, 0.5)',
            shadowOffsetY: 5,
            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                offset: 0,
                color: 'rgb(129, 227, 238)'
            }, {
                offset: 1,
                color: 'rgb(25, 183, 207)'
            }])
        }
    }]
  };

  tsnechart.setOption(option2);

}







// model function. 
function loaddata(data_pred, data_true, data_all, hash_name) {  

  // Plotting all raw counts with all arima projections. 
  var option = {
        title: {
            text: hash_name + " forecast", //'#ToxicFeminism',
            boundaryGap: [0, '100%']
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                label: {
                    backgroundColor: '#6a7985'
                }
            }
        },
        legend: {
            data: ['True', 'Pred'], 
            right: 10             // legend is placed in middle-right
      },
    
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      toolbox: {
          // add later
      },
      xAxis: {
          type: 'category',
          boundaryGap: false,
          name: 'Weeks',
          data: [  0,   1,   2,   3,   4,   5,   6,   7,   8,   9,  10,  11,  12,
                13,  14,  15,  16,  17,  18,  19,  20,  21,  22,  23,  24,  25,
                26,  27,  28,  29,  30,  31,  32,  33,  34,  35,  36,  37,  38,
                39,  40,  41,  42,  43,  44,  45,  46,  47,  48,  49,  50,  51,
                52,  53,  54,  55,  56,  57,  58,  59,  60,  61,  62,  63,  64,
                65,  66,  67,  68,  69,  70,  71,  72,  73,  74,  75,  76,  77,
                78,  79],
      },
      yAxis: {
          type: 'value',
          name: 'Log  Counts'
      },
      dataZoom: [
        {   // This dataZoom component controls x-axis by dafault
            type: 'slider', // this dataZoom component is dataZoom component of slider
            start: 0,      // the left is located at 10%
            end: 100         // the right is located at 60%
        }],
      series: [
          {
              name: 'Pred',
              type: 'line',
              //stack: '总量',
              color: 'magenta',
              data: data_pred//toxic_pred

          },
          {
              name: 'True',
              type: 'line',
              //stack: '总量',
              data: data_true //toxic_true
          }
        ]
    };
    // use configuration item and data specified to show chart
    myChart.setOption(option, animation=true);
    myChart.setOption({
      grid: { 
      left: '5%'
       }
    });

// Plotting raw counts over all time 
 var option1 = {
         title: {
          text: hash_name + " counts", //'#ToxicFeminism',
          boundaryGap: ['0', '100%']
      },
      tooltip: {
          trigger: 'axis',
          axisPointer: {
              type: 'cross',
              label: {
                  backgroundColor: '#6a7985'
              }
          }
      },
      /*legend: {
          data: ['Log Counts', 'L', 'U'],
          right: 10              // legend is placed in middle-right
          top: '15%',
          orient: 'vertical'      // vertical layout
      },*/
      grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
      },
      toolbox: {
         /* feature: {
              saveAsImage: {}
          }*/
      },
      xAxis: {
          type: 'category',
          boundaryGap: false,
          label: 'Weeks',
          data: weeks
      },
      yAxis: {
          min: 0,
          type: 'value',
          name: 'Log Counts'
      },

    // SERIES with projections and confidence intervals. 
      series: [
      { // Lower Confidence Interval
            name: 'L',
            type: 'line',
            data: data_all.map(function (item) {
                return item - 1; // this value should be lower for a given observation. 
            }),
            lineStyle: {
                opacity: 0
            }, 
            stack: 'confidence-band',
            symbol: 'none'
      }, 

      {
        name: 'U',
        type: 'line',
        data: data_all.map(function (item) {
            return 2; // this value should be (upper - lower) for a given observation. 
        }),
        lineStyle: {
            opacity: 0
        },
        areaStyle: {
            color: '#ccc'
        },
        stack: 'confidence-band',
        symbol: 'none'
    },
      { // ACTUAL SERIES
           name: 'Log Counts',
          type: 'line',
          data: data_all  // this is the actual data for a given series 
            
      }],
          
     "visualMap": [{
        //show: true,
        show: false,
        type: 'piecewise',
        dimension: 0,
        "pieces": [{
            "gte": 35, //80, // program these boundary conditions
            "lte": 50, //132
            "label": "Forecast",
            "position": "top",
            "color":"turquoise"
        },  
    
      {

            "gte": 0,
            "lte": 35,//80,
            "label":  "True",
            "color": "magenta"
        }],  
    }]
        
        
  };

 allchart.setOption(option1);//, animation=true);


option2 = {
    title: {
        text: 'closest neighbors' 
    },
    xAxis: {
        splitLine: {
            lineStyle: {
                type: 'dashed'
            }
        }
    },
    yAxis: {
        splitLine: {
            lineStyle: {
                type: 'dashed'
            }
        },
        scale: true
    },
    series: [{
        name: 'Neighbors',
        data: data_tsne[1],
        type: 'scatter',
        symbolSize: function (data) {
            return 1e2 * data[3]; /// 5e2;
        },
 
        label: {
                show: true,
                formatter: function (param) {
                    return param.data[2];
                },
                position: 'top'
        
        },
        itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(120, 36, 50, 0.5)',
            shadowOffsetY: 5,
            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                offset: 0,
                color: 'rgb(251, 118, 123)'
            }, {
                offset: 1,
                color: 'rgb(204, 46, 72)'
            }])
        }
    }, 

    {
        name: 'Target',
        data: data_tsne[0],
        type: 'scatter',
        symbolSize: function (data) {
            return 1e2 * data[3];
        },
        
        label: {
            show: true,
            formatter: function (param) {
                return param.data[2];
            },
            position: 'top'
        },

        itemStyle: {
            shadowBlur: 10,
            shadowColor: 'rgba(25, 100, 150, 0.5)',
            shadowOffsetY: 5,
            color: new echarts.graphic.RadialGradient(0.4, 0.3, 1, [{
                offset: 0,
                color: 'rgb(129, 227, 238)'
            }, {
                offset: 1,
                color: 'rgb(25, 183, 207)'
            }])
        }
    }]
  };

  tsnechart.setOption(option2);

      
}


function loaddata1(){
  if(flag == false) {
     tsnechart = echarts.init(document.getElementById('tsne'));
     console.log(document.getElementById('tsne'));
     flag = true; 
  }
} 


// Initiatize echarts on button press if they are not defined. 
function loaddata2(){
  if(flag == false) {
     myChart = echarts.init(document.getElementById('pred1'));
     allchart = echarts.init(document.getElementById('all1'));
     tsnechart = echarts.init(document.getElementById('tsne'));
     console.log(document.getElementById('tsne'));
     flag = true; 
  }
} 

 /* console.log(str_param);
  if(str_param === '#toxicfeminism'){
    loaddata(toxic_pred, toxic_true, toxic_all, str_param);
  }

  if(str_param === '#notallmen'){
    loaddata(nam_pred, nam_true, nam_all, str_param);
  }
 
      
}*/
    
