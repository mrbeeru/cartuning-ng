
const facebookRatingService = require('./facebook-reviews'); 
const googleRatingService = null;

let ratings;

function getFacebookReviews(){

    ratings = [
        {
            name: "Lepa Daniel",
            rating: 3,
            comment: "Recomand cu incredere! Masina se comporta exceptional de cand am facut Stage 1!",
            date: new Date("4 July, 2020"),
          },
          {
            name: "Bogdan Florea",
            rating: 2,
            comment: "Foarte multumit de lucrare!<br/>" +
            "Masina se simte, de parca ar fi alta, fara plafonari, fara dat in nas, datorita limitarii de putere.<br/>" +
            "Explicatii pertinente in legatura cu punctele forte ale modificarilor facute.<br/>" +
            "Diagnoza facuta amanuntit, din toate punctele de vedere.<br/>" +
            "RECOMAND, oricand, sa apelati la serviciile oferite!<br/>" +
            "Multumesc frumos!",
            date: new Date("23 July, 2020"),
          },
          {
            name: "Claudiu Kla",
            rating: 4,
            comment: "Recomand cu încredere." +
            "Astăzi m-a ajutat cu inbunatatirea softului la a mea laguna 2 1.9 dci 130 cp. Ridicata undeva în 160. Se simte foarte bine Creștere de putere. În depășire pot sa zic ca nu o recunosc. Nici nu îmi dădeam seama cum ajungea de la 80km/h la 120-130 km/h în viteza a-4a. Deci pur și simplu este alta mașina." +
            "Multumesc mult😍😍😍",
            date: new Date("19 Februray, 2020"),
          },
          {
            name: "Claudiu Kla",
            rating: 5,
            comment: "",
            date: new Date("19 May, 2018"),
          },
    ]
    

    return ratings;
}

module.exports = {getFacebookReviews};