const burger= document.querySelector("#burger");
const menu = document.querySelector("#mobile-menu");
burger. addEventListener ("click", () => {
if (menu.classList.contains ( "hidden")) {
menu.classList. remove( "hidden");}
else
menu.classList.add( "hidden");
})


const  round_face = document.querySelector("round_button")
const  information = document.querySelector("display")
round_face.addEventListener("click",()=>{
    if (information.classList.contains ( "hidden")) {
        information.classList. remove( "hidden");}
        else
        information.classList.add( "hidden");

})





