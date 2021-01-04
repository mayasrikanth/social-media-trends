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
  
/* toxic_true = [1.94591015, 2.19722458, 2.19722458, 0.69314718, 0.,
     3.8286414 , 0.        , 1.09861229, 0.        , 1.09861229,
     0.69314718, 1.09861229, 0.69314718, 0.        , 1.09861229,
     0.69314718, 1.09861229, 0.        , 0.69314718, 0.69314718,
     1.94591015, 1.60943791, 1.38629436, 0.        , 1.09861229,
     2.39789527, 3.40119738, 2.7080502 , 2.07944154, 1.60943791,
     2.07944154, 4.21950771, 4.34380542, 3.66356165, 3.25809654,
     2.89037176, 3.4657359 , 1.94591015, 2.48490665, 2.19722458,
     2.39789527, 1.60943791, 0.        , 2.83321334, 0.        ,
     2.63905733, 8.88599432, 4.69134788, 3.55534806, 3.04452244,
     2.19722458, 2.07944154, 1.60943791, 1.09861229, 1.38629436,
     1.09861229, 1.79175947, 1.60943791, 1.79175947, 5.59471138,
     1.38629436, 2.30258509, 1.38629436, 2.48490665, 2.07944154,
     2.56494936, 3.09104245, 3.40119738, 1.94591015, 2.83321334,
     4.30406509, 2.56494936, 1.38629436, 0.        , 3.40119738,
     2.83321334, 4.61512052, 2.94443898, 5.79909265, 5.08759634];
toxic_pred = [2.00447836, 1.89295215, 2.04465347, 2.0986879 , 1.42465308,
     0.63955814, 2.32999041, 1.55761452, 1.46430696, 1.07497249,
     1.10168554, 0.98009696, 1.01816306, 0.93193342, 0.67577333,
     0.77870358, 0.76143391, 0.84572308, 0.64446257, 0.63389065,
     0.64786955, 0.96392857, 1.1466624 , 1.2139152 , 0.90099661,
     0.96326131, 1.3272904 , 1.95577156, 2.13711551, 2.07456651,
     1.90617045, 2.01506601, 2.78570958, 3.3272497 , 3.37406955,
     3.3100467 , 3.16007233, 3.34758751, 2.79343353, 2.81132102,
     2.63180963, 2.62168414, 2.24800651, 1.31691688, 2.21340526,
     1.26020897, 1.7795167 , 5.06979289, 3.46615966, 3.07037497,
     2.90176409, 2.58988617, 2.54233484, 2.34981013, 2.11336409,
     2.19675475, 2.04473121, 2.32082114, 2.23496583, 2.30330408,
     3.92035839, 2.30320411, 2.6187505 , 2.27820606, 2.67666407,
     2.53594441, 2.71797849, 2.92779428, 3.06725368, 2.55141011,
     2.8736369 , 3.43407755, 2.84309548, 2.41298208, 1.81626789,
     3.07933391, 2.90800627, 3.56060579, 3.01306024, 4.02834903];
toxic_all = [1.94591015, 1.38629436, 0.        , 0.    , 0.,
     0.        , 1.09861229, 0.        , 0.        , 0.        ,
     0.        , 0.        , 0.69314718, 1.09861229, 0.        ,
     0.        , 0.        , 0.        , 0.        , 0.        ,
     0.        , 0.69314718, 0.        , 0.        , 0.        ,
     0.        , 0.69314718, 0.        , 0.        , 0.        ,
     0.        , 0.69314718, 0.69314718, 0.        , 0.        ,
     0.        , 0.        , 0.        , 0.69314718, 1.38629436,
     0.        , 0.69314718, 0.69314718, 4.02535169, 2.30258509,
     0.69314718, 2.07944154, 0.69314718, 1.09861229, 1.38629436,
     2.63905733, 2.39789527, 1.94591015, 2.19722458, 2.19722458,
     0.69314718, 0.        , 3.8286414 , 0.        , 1.09861229,
     0.        , 1.09861229, 0.69314718, 1.09861229, 0.69314718,
     0.        , 1.09861229, 0.69314718, 1.09861229, 0.        ,
     0.69314718, 0.69314718, 1.94591015, 1.60943791, 1.38629436,
     0.        , 1.09861229, 2.39789527, 3.40119738, 2.7080502 ,
     2.07944154, 1.60943791, 2.07944154, 4.21950771, 4.34380542,
     3.66356165, 3.25809654, 2.89037176, 3.4657359 , 1.94591015,
     2.48490665, 2.19722458, 2.39789527, 1.60943791, 0.        ,
     2.83321334, 0.        , 2.63905733, 8.88599432, 4.69134788,
     3.55534806, 3.04452244, 2.19722458, 2.07944154, 1.60943791,
     1.09861229, 1.38629436, 1.09861229, 1.79175947, 1.60943791,
     1.79175947, 5.59471138, 1.38629436, 2.30258509, 1.38629436,
     2.48490665, 2.07944154, 2.56494936, 3.09104245, 3.40119738,
     1.94591015, 2.83321334, 4.30406509, 2.56494936, 1.38629436,
     0.        , 3.40119738, 2.83321334, 4.61512052, 2.94443898,
     5.79909265, 5.08759634]; 
nam_pred = [6.61161553, 7.43740847, 6.87758056, 6.28814067, 6.16556243,
     6.49083995, 6.27154277, 6.09668413, 6.72504581, 6.04910973,
     6.26532832, 6.2479592 , 6.31181117, 6.48306323, 6.68720194,
     7.186671  , 6.91002731, 7.07406867, 6.60666311, 7.62978128,
     6.6400926 , 7.10717267, 6.97010128, 6.97662986, 6.75356113,
     6.55222043, 6.56971264, 6.48523451, 6.43819703, 6.48784071,
     6.68577786, 7.05901565, 7.20783168, 7.25671288, 7.09711859,
     6.46754624, 6.26599221, 6.05398595, 6.62028787, 6.91883499,
     6.36564591, 6.29395022, 6.96301568, 6.69611896, 6.47313455,
     6.56642132, 6.9487138 , 7.46284646, 6.61002336, 6.27064066,
     7.13878377, 6.63332696, 6.4817073 , 6.53173036, 6.54429028,
     6.52281903, 6.5934511 , 6.36968451, 6.35725764, 6.34399063,
     6.55094539, 6.31899475, 6.64696865, 6.44220109, 6.98994804,
     6.56879496, 6.55554795, 6.59451799, 6.34145708, 6.94882189,
     6.51078229, 6.71857785, 6.32053437, 7.08090325, 6.53709786,
     6.49401604, 6.4486964 , 8.07862938, 6.77448806, 6.4915797 ];
nam_true = [7.81439963, 6.91869522, 6.03308622, 5.90808294, 6.41181827,
     6.08904488, 5.86646806, 6.82001636, 5.76205138, 6.13339804,
     6.1180972 , 6.23048145, 6.50128967, 6.8145429 , 7.57353126,
     7.10167597, 7.34277919, 6.58755001, 8.23057722, 6.54534966,
     7.38087904, 7.10249936, 7.10085191, 6.69456206, 6.35088572,
     6.4019172 , 6.27098843, 6.2126061 , 6.31716469, 6.66568372,
     7.3065314 , 7.52940646, 7.57609734, 7.27517232, 6.17794411,
     5.88332239, 5.59471138, 6.55108034, 7.05012252, 6.08904488,
     6.00388707, 7.16549348, 6.67203295, 6.28785856, 6.46614472,
     7.14124512, 8.01168673, 6.45833828, 5.87493073, 7.49942329,
     6.49375384, 6.22257627, 6.33859408, 6.37502482, 6.34563636,
     6.49072353, 6.07534603, 6.0799332 , 6.07764224, 6.47850964,
     6.04973346, 6.67959919, 6.28785856, 7.33758774, 6.50128967,
     6.48616079, 6.56526497, 6.0799332 , 7.2806972 , 6.38350663,
     6.81234509, 6.00388707, 7.58578882, 6.4019172 , 6.32793678,
     6.2441669 , 9.89757008, 6.81014245, 6.08221891, 6.30627529];
nam_all = [9.52266628, 6.96508035, 6.24027585, 6.23244802, 5.02388052,
     5.18178355, 5.25749537, 5.69035945, 5.90263333, 6.7178047 ,
     5.68017261, 5.77455155, 5.54517744, 6.33859408, 6.62007321,
     6.2166061 , 6.12905021, 7.68248245, 6.63068339, 6.41509696,
     6.10702289, 6.02102335, 5.80513497, 5.86929691, 6.03787092,
     5.8230459 , 6.16751649, 6.44571982, 6.38012254, 6.34212142,
     8.87430804, 8.37309185, 7.31322039, 6.98007594, 5.82600011,
     5.6454469 , 6.54534966, 7.57044325, 7.92876632, 6.60394382,
     6.60123012, 7.14045304, 7.36770857, 6.88653164, 6.57786136,
     6.48463524, 7.44307837, 6.06145692, 6.20050917, 6.64509097,
     6.28971557, 6.60529792, 7.81439963, 6.91869522, 6.03308622,
     5.90808294, 6.41181827, 6.08904488, 5.86646806, 6.82001636,
     5.76205138, 6.13339804, 6.1180972 , 6.23048145, 6.50128967,
     6.8145429 , 7.57353126, 7.10167597, 7.34277919, 6.58755001,
     8.23057722, 6.54534966, 7.38087904, 7.10249936, 7.10085191,
     6.69456206, 6.35088572, 6.4019172 , 6.27098843, 6.2126061 ,
     6.31716469, 6.66568372, 7.3065314 , 7.52940646, 7.57609734,
     7.27517232, 6.17794411, 5.88332239, 5.59471138, 6.55108034,
     7.05012252, 6.08904488, 6.00388707, 7.16549348, 6.67203295,
     6.28785856, 6.46614472, 7.14124512, 8.01168673, 6.45833828,
     5.87493073, 7.49942329, 6.49375384, 6.22257627, 6.33859408,
     6.37502482, 6.34563636, 6.49072353, 6.07534603, 6.0799332 ,
     6.07764224, 6.47850964, 6.04973346, 6.67959919, 6.28785856,
     7.33758774, 6.50128967, 6.48616079, 6.56526497, 6.0799332 ,
     7.2806972 , 6.38350663, 6.81234509, 6.00388707, 7.58578882,
     6.4019172 , 6.32793678, 6.2441669 , 9.89757008, 6.81014245,
     6.08221891, 6.30627529];*/
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

// Hardcoding confidence intervals for last 15 steps
/*tf_conf_x = [117, 118, 119, 120, 121, 122, 123, 124, 125, 126, 127, 128, 129, 130, 131];
tf_conf_low = [5.26914311, 5.16670218, 5.1657916 , 5.17276519, 5.17722527,
       5.17967058, 5.1811184 , 5.18212616, 5.18294736, 5.18369068,
       5.18440168, 5.18509931, 5.18579142, 5.18648124, 5.18717012];
tf_conf_high = [7.81068241, 8.02119104, 8.07495211, 8.09134616, 8.09741879,
       8.10013954, 8.10163438, 8.10265017, 8.10347273, 8.10421628,
       8.10492733, 8.10562497, 8.10631708, 8.1070069 , 8.10769577];
conf_low = [1.94591015, 1.38629436, 0.        , 0.    , 0.,
     0.        , 1.09861229, 0.        , 0.        , 0.        ,
     0.        , 0.        , 0.69314718, 1.09861229, 0.        ,
     0.        , 0.        , 0.        , 0.        , 0.        ,
     0.        , 0.69314718, 0.        , 0.        , 0.        ,
     0.        , 0.69314718, 0.        , 0.        , 0.        ,
     0.        , 0.69314718, 0.69314718, 0.        , 0.        ,
     0.        , 0.        , 0.        , 0.69314718, 1.38629436,
     0.        , 0.69314718, 0.69314718, 4.02535169, 2.30258509,
     0.69314718, 2.07944154, 0.69314718, 1.09861229, 1.38629436,
     2.63905733, 2.39789527, 1.94591015, 2.19722458, 2.19722458,
     0.69314718, 0.        , 3.8286414 , 0.        , 1.09861229,
     0.        , 1.09861229, 0.69314718, 1.09861229, 0.69314718,
     0.        , 1.09861229, 0.69314718, 1.09861229, 0.        ,
     0.69314718, 0.69314718, 1.94591015, 1.60943791, 1.38629436,
     0.        , 1.09861229, 2.39789527, 3.40119738, 2.7080502 ,
     2.07944154, 1.60943791, 2.07944154, 4.21950771, 4.34380542,
     3.66356165, 3.25809654, 2.89037176, 3.4657359 , 1.94591015,
     2.48490665, 2.19722458, 2.39789527, 1.60943791, 0.        ,
     2.83321334, 0.        , 2.63905733, 8.88599432, 4.69134788,
     3.55534806, 3.04452244, 2.19722458, 2.07944154, 1.60943791,
     1.09861229, 1.38629436, 1.09861229, 1.79175947, 1.60943791,
     1.79175947, 5.59471138, 1.38629436, 2.30258509, 1.38629436,
     2.48490665, 2.07944154, 2.56494936, 3.09104245, 3.40119738,
     3.26914311, 3.16670218, 3.1657916 , 3.17276519, 3.17722527,
     3.17967058, 3.1811184 , 3.18212616, 2.18294736, 3.18369068,
     2.18440168, 3.18509931, 2.18579142, 3.18648124, 3.18717012];
conf_high = [1.94591015, 1.38629436, 0.        , 0.    , 0.,
     0.        , 1.09861229, 0.        , 0.        , 0.        ,
     0.        , 0.        , 0.69314718, 1.09861229, 0.        ,
     0.        , 0.        , 0.        , 0.        , 0.        ,
     0.        , 0.69314718, 0.        , 0.        , 0.        ,
     0.        , 0.69314718, 0.        , 0.        , 0.        ,
     0.        , 0.69314718, 0.69314718, 0.        , 0.        ,
     0.        , 0.        , 0.        , 0.69314718, 1.38629436,
     0.        , 0.69314718, 0.69314718, 4.02535169, 2.30258509,
     0.69314718, 2.07944154, 0.69314718, 1.09861229, 1.38629436,
     2.63905733, 2.39789527, 1.94591015, 2.19722458, 2.19722458,
     0.69314718, 0.        , 3.8286414 , 0.        , 1.09861229,
     0.        , 1.09861229, 0.69314718, 1.09861229, 0.69314718,
     0.        , 1.09861229, 0.69314718, 1.09861229, 0.        ,
     0.69314718, 0.69314718, 1.94591015, 1.60943791, 1.38629436,
     0.        , 1.09861229, 2.39789527, 3.40119738, 2.7080502 ,
     2.07944154, 1.60943791, 2.07944154, 4.21950771, 4.34380542,
     3.66356165, 3.25809654, 2.89037176, 3.4657359 , 1.94591015,
     2.48490665, 2.19722458, 2.39789527, 1.60943791, 0.        ,
     2.83321334, 0.        , 2.63905733, 8.88599432, 4.69134788,
     3.55534806, 3.04452244, 2.19722458, 2.07944154, 1.60943791,
     1.09861229, 1.38629436, 1.09861229, 1.79175947, 1.60943791,
     1.79175947, 5.59471138, 1.38629436, 2.30258509, 1.38629436,
     2.48490665, 2.07944154, 2.56494936, 3.09104245, 3.40119738,
     7.81068241, 8.02119104, 8.07495211, 8.09134616, 8.09741879,
     8.10013954, 8.10163438, 8.10265017, 8.10347273, 8.10421628,
     8.10492733, 8.10562497, 8.10631708, 8.1070069 , 8.10769577];*/


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
function loadTableDynamic(word_arr, freq_arr){
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
    
