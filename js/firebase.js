//Inicializacion de Firebase
var firebaseConfig = {
    apiKey: "AIzaSyCChTlB7gD-N9RgY2helvb0g3zj1nWrIFc",
    authDomain: "emprendete-842ea.firebaseapp.com",
    databaseURL: "https://emprendete-842ea.firebaseio.com",
    projectId: "emprendete-842ea",
    storageBucket: "emprendete-842ea.appspot.com",
    messagingSenderId: "781556060139",
    appId: "1:781556060139:web:1e40fe86238bdb4e8053ae",
    measurementId: "G-3VDV6LJHCM"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var storage = firebase.storage();