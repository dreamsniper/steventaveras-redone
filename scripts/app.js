/*jslint browser, es6, single, for, devel, this */
/*global window */

//function for accordion portfolio
window.onload = function () {
    let accordion = document.getElementById('accordion'),
        accordionButton = document.querySelectorAll('h2'),
        accordionButtonDiv = document.querySelectorAll('h2 + div'),
        index,
        allAccordionClosed = true,
        openDivPosition;


    function toggle() {
        //compares the clicked elements position with the array of buttons and assigns the position to index
        //once compareDucumentPosition returns 0 if they match in the array index the loop breaks.x
        for (index = 0; index < accordionButton.length; index += 1) {

            if (0 === this.compareDocumentPosition(accordionButton[index])) {
                break;
            }
        }
        if (allAccordionClosed) {

            //assign index to new variable
            openDivPosition = index;

            //change the style to block can also be done with classes
            accordionButtonDiv[index].style.display = 'block';

            //accordions no longer all closed
            allAccordionClosed = false;

        } else {

            if (index === openDivPosition) {

                accordionButtonDiv[index].style.display = 'none';

                allAccordionClosed = true;

            } else {
                accordionButtonDiv[openDivPosition].style.display = 'none';

                accordionButtonDiv[index].style.display = "block";

                openDivPosition = index;
            }
        }
    }
    //add eventListeners to buttons
    for (var i = 0; i < accordionButton.length; i += 1) {
        accordionButton[i].addEventListener('click', toggle, false);
    }

}


//when button is pressed menu slides down
$(document).ready(function() {
  $("#button-press").click(function(){
    $("#navbar-toggle").slideToggle(700);
  });
});