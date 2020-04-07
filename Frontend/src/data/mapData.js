import { ACTIVE, DIED, RECOVERED } from "../helpers/constant";

const LatLngData = [
  [12.12, 76.68],
  [24.879999, 74.629997],
  [16.994444, 73.300003],
  [19.155001, 72.849998],
  [24.7945, 73.055],
  [21.25, 81.629997],
  [16.1667, 74.833298],
  [26.85, 80.949997],
  [28.610001, 77.230003],
  [19.07609, 72.877426],
  [14.16704, 75.040298],
  [26.540457, 88.719391],
  [24.633568, 87.849251],
  [28.440554, 74.493011],
  [24.882618, 72.858894],
  [16.779877, 74.556374],
  [12.715035, 77.281296],
  [13.432515, 77.727478],
  [12.651805, 77.208946],
  [22.728392, 71.637077],
  [9.383452, 76.574059],
  [14.623801, 75.621788],
  [10.92544, 79.838005],
  [15.852792, 74.498703],
  [19.354979, 84.986732],
  [23.905445, 87.52462],
  [20.296059, 85.824539],
  [21.105001, 71.771645],
  [30.172716, 77.299492],
  [25.477585, 85.709091],
  [21.045521, 75.801094],
  [26.49189, 89.5271],
  [8.893212, 76.614143],
  [22.430889, 87.321487],
  [23.849325, 72.126625],
  [11.786253, 77.800781],
  [13.583274, 76.540154],
  [14.530457, 75.801094],
  [18.901457, 73.176132],
  [22.96051, 88.567406],
  [15.756595, 76.192696],
  [22.656015, 86.352882],
  [25.989836, 79.450035],
  [23.223047, 82.87056],
  [19.186354, 73.191948],
  [30.525005, 75.890121],
  [22.422455, 85.760651],
  [18.106659, 83.395554],
  [21.190449, 81.28492],
  [23.597969, 72.969818],
  [28.590361, 78.571762],
  [25.369179, 85.53006],
  [11.623377, 92.726486],
  [24.618393, 88.024338],
  [23.546757, 74.43383],
  [25.077787, 87.900375],
  [29.854263, 77.888],
  [14.913181, 79.992981],
  [14.413745, 77.712616],
  [18.101904, 78.852074],
  [23.173939, 81.565125],
  [15.812074, 80.355377],
  [15.764501, 79.259491],
  [10.311879, 76.331978],
  [21.961946, 70.792297],
  [16.544893, 81.52124],
  [21.04954, 76.532028],
  [26.182245, 91.754723],
  [27.897551, 77.384117],
  [18.245655, 76.505356],
  [23.486839, 75.659157],
  [32.041943, 75.405334],
  [24.47438, 85.688744],
  [23.427221, 87.287018],
  [19.487707, 75.380768],
  [19.85306, 74.000633],
  [15.167409, 77.373627],
  [24.417534, 88.250343],
  [22.744108, 77.736969],
  [14.752805, 78.552757],
  [23.520399, 87.311897],
  [25.771315, 73.323685],
  [28.148735, 77.332024],
  [29.138407, 76.693245],
  [25.37571, 86.474373],
  [20.388794, 78.120407],
  [23.669296, 86.151115],
  [21.761524, 70.627625],
  [22.657402, 88.86718],
  [22.700474, 88.319069],
  [23.344101, 85.309563],
  [14.146319, 79.850388],
  [28.078636, 80.471588],
  [27.108416, 78.584602],
  [9.823619, 77.986565],
  [12.946366, 79.959244],
  [17.143908, 79.623924],
  [13.340881, 74.742142],
  [21.779188, 87.744629],
  [21.164993, 81.775307],
  [23.125587, 88.546867],
  [22.511976, 88.250992],
  [12.695032, 78.621887],
  [23.302189, 81.356804],
  [9.515625, 78.100014],
  [20.484348, 86.119194],
  [24.953514, 84.011787],
  [21.092159, 71.770462],
  [25.563322, 84.869804],
  [22.835602, 74.255989],
  [29.607981, 78.342674],
  [27.122196, 84.072235],
  [25.312717, 86.490608],
  [25.920074, 80.809998],
  [10.365581, 77.970657],
  [22.668312, 85.625511],
  [21.640575, 69.605965],
  [22.663696, 87.746803],
  [22.542061, 88.318954],
  [12.523731, 76.894684],
  [19.990751, 72.743675],
  [30.480042, 74.518204],
  [12.834174, 79.703644],
  [22.633492, 74.095993],
  [12.971599, 77.594566],
  [29.471397, 77.696732],
  [24.916355, 79.581184],
  [26.500999, 90.535233],
  [31.604889, 76.919533],
  [18.125875, 76.750969],
  [21.603176, 71.222084],
  [28.411331, 77.848434],
  [22.34601, 87.231972],
  [25.556044, 84.660332],
  [27.99502, 74.961792],
  [22.086868, 79.543488],
  [26.732311, 88.410286],
  [12.915605, 74.855965],
  [23.9468, 88.049713],
  [17.247253, 80.151443],
  [21.324196, 78.013832],
  [32.564522, 75.023148],
  [26.994154, 83.034798],
  [20.464079, 74.996857],
  [26.811712, 79.004692],
  [22.916706, 87.070351],
  [27.94908, 80.782402],
  [25.35128, 85.031143],
  [23.00795, 72.553757],
  [26.264776, 82.072708],
  [23.012794, 87.593948],
  [22.610683, 75.680862],
  [25.912968, 81.991653],
  [25.584042, 83.577019],
  [25.564711, 83.977745],
  [25.101145, 76.513161],
  [19.969227, 73.743195],
  [23.99662, 85.36911],
  [28.978298, 79.399612],
  [20.112093, 79.118698],
  [21.812876, 80.18383],
  [9.897157, 76.713409],
  [17.554356, 80.619736],
  [22.369043, 87.55442],
  [22.318083, 72.618988],
  [17.320486, 76.839752],
  [32.110542, 76.536224],
  [21.342585, 83.624199],
  [25.748695, 82.698441],
  [27.570839, 81.598022],
  [20.792713, 76.694328],
  [15.139393, 76.92144],
  [28.730579, 77.775879],
  [29.210421, 78.96183],
  [26.367811, 79.629158],
  [10.784703, 76.653145],
  [29.594189, 79.653893],
  [22.601292, 75.302467],
  [17.437462, 78.448288],
  [19.263334, 75.752426],
  [16.99708, 79.967361],
  [26.57448, 91.975243],
  [19.551146, 74.928162],
  [21.004194, 75.563942],
  [21.109133, 82.0979],
  [24.184713, 86.302193],
  [25.771103, 87.482185],
  [27.703669, 76.201195],
  [24.597349, 76.16098],
  [28.923548, 79.700722],
  [21.191774, 81.718285],
  [17.611629, 78.08181],
  [26.072067, 83.185654],
  [29.320511, 73.899399],
  [12.252576, 79.416924],
  [25.862968, 85.781029],
  [25.213928, 84.989555],
  [25.973787, 75.151535],
  [26.702518, 77.893394],
  [12.735126, 77.829338],
  [28.293783, 79.804459],
  [25.436298, 78.567352],
  [22.363848, 82.73484],
  [16.814524, 81.526558],
  [21.097855, 81.033707],
  [23.041924, 84.540833],
  [27.147869, 74.859489],
  [11.477696, 77.873886],
  [26.298552, 87.265388],
  [12.999464, 80.117729],
  [27.55875, 78.662567],
  [23.406979, 88.365593],
  [29.903839, 73.87719],
  [18.007202, 79.558296],
  [18.76182, 79.480904],
  [25.949638, 83.558647],
  [18.966354, 76.748077],
  [31.052128, 76.1175],
  [23.426788, 72.657074],
  [29.592957, 76.119247],
  [14.422232, 78.226341],
  [19.314962, 84.79409],
  [9.077854, 77.345184],
  [30.210995, 74.945473],
  [22.170424, 71.668427],
  [27.036007, 88.262672],
  [17.53231, 73.517792],
  [29.219677, 79.512459],
  [11.744699, 79.768021],
  [21.705723, 72.998199],
  [25.38727, 82.568031],
  [19.925682, 74.728477],
  [11.608495, 75.591705],
  [26.587299, 85.501183],
  [25.017258, 85.416161],
  [13.92993, 75.5681],
  [26.536938, 80.48996],
  [26.437252, 91.62011],
  [19.970324, 79.30336],
  [24.833271, 92.778908],
  [24.68469, 92.564339],
  [23.727106, 92.717636],
  [22.607672, 88.394493],
  [17.006298, 74.865372],
  [14.464103, 75.921661],
  [22.552437, 75.756531],
  [30.81646, 75.171707],
  [22.859726, 88.404839],
  [31.823462, 75.205063],
  [27.387049, 79.588127],
  [29.185776, 74.771782],
  [23.742628, 86.41114],
  [31.527355, 75.913673],
  [25.237284, 88.783058],
  [26.347883, 86.071861],
  [24.043468, 78.330353],
  [21.741323, 70.28112],
  [29.959694, 77.549057],
  [28.667856, 77.449791],
  [21.468185, 83.975403],
  [25.883495, 86.600624],
  [26.880077, 93.60833],
  [23.061089, 87.992584],
  [16.432983, 81.696617],
  [11.072035, 76.074005],
  [13.611159, 77.51696],
  [13.435455, 77.731476],
  [27.472834, 94.911964],
  [27.338936, 88.606506],
  [25.83087, 72.24012],
  [17.928122, 79.894531],
  [11.258753, 75.780411],
  [26.731142, 77.033752],
  [10.959815, 79.380898],
  [24.579716, 80.832176],
  [22.057163, 78.938202],
  [15.505723, 80.049919],
  [26.898392, 83.979713],
  [20.707228, 77.00296],
  [20.492281, 74.026009],
  [18.38662, 78.802246],
  [28.895515, 76.606613],
  [21.2155, 86.1222],
  [13.090994, 80.224998],
  [31.213682, 76.144012],
  [18.794905, 78.912872],
  [26.894478, 76.334824],
  [28.771646, 77.507561],
  [9.512137, 77.634087],
  [9.548395, 78.591637],
  [26.937834, 81.188324],
  [17.440325, 78.498894],
  [25.133699, 82.56443],
  [11.519588, 79.325157],
  [28.128876, 75.399506],
  [25.454794, 78.133957],
];

const Data = [];

const statusArray = [RECOVERED, ACTIVE, DIED];

for (let i = 0; i < LatLngData.length; i++) {
  if (LatLngData[i][1] < 70) {
    console.log(LatLngData[i]);
  }
  Data.push({
    lat: LatLngData[i][0],
    lng: LatLngData[i][1],
    status: statusArray[Math.round(Math.random() * 3) % 3],
  });
}

export default Data;
