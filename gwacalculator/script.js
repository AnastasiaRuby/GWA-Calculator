let subjects = [];

let grading = [];



// LOAD WHEN PAGE IS READY

window.onload = function(){

    saveGrades();

    document
    .getElementById("addButton")
    .addEventListener(
        "click",
        addSubject
    );


    document
    .getElementById("saveButton")
    .addEventListener(
        "click",
        saveGrades
    );

};





// SAVE GRADING SYSTEM

function saveGrades(){


    grading=[];


    let text =
    document
    .getElementById("gradingSystem")
    .value;



    let lines =
    text.split("\n");



    lines.forEach(line=>{


        if(line.includes("=")){


            let parts =
            line.split("=");



            let range =
            parts[0].trim();



            let gwa =
            Number(
                parts[1].trim()
            );



            let numbers =
            range.split("-");



            if(numbers.length===2){


                grading.push({

                    max:
                    Number(
                        numbers[0].trim()
                    ),


                    min:
                    Number(
                        numbers[1].trim()
                    ),


                    gwa:gwa

                });


            }


        }


    });



    grading.sort(
        (a,b)=>
        b.max-a.max
    );



    alert(
        "Grading system saved!"
    );


}





// CONVERT GRADE

function convertGrade(score){



    for(let rule of grading){


        if(
            score <= rule.max &&
            score >= rule.min
        ){

            return rule.gwa;

        }


    }


    return 5.00;

}





// ADD SUBJECT

function addSubject(){



let subject =
document.getElementById("subject").value;


let units =
Number(
document.getElementById("units").value
);



let prelim =
Number(
document.getElementById("prelim").value
);



let midterm =
Number(
document.getElementById("midterm").value
);



let final =
Number(
document.getElementById("final").value
);





if(
subject === "" ||
units <= 0 ||
isNaN(prelim) ||
isNaN(midterm) ||
isNaN(final)
){


alert(
"Please complete all fields"
);


return;


}





let average =

(prelim + midterm + final) / 3;




let gwa =

convertGrade(
average
);





subjects.push({

subject:subject,

units:units,

prelim:prelim,

midterm:midterm,

final:final,

gwa:gwa

});



display();



}




// DISPLAY TABLE

function display(){


let table =
document.getElementById(
"tableBody"
);



table.innerHTML="";



let totalUnits=0;

let totalWeighted=0;



subjects.forEach(
(s,index)=>{


totalUnits += s.units;


totalWeighted +=
s.gwa * s.units;



table.innerHTML += `

<tr>

<td>${s.subject}</td>

<td>${s.units}</td>

<td>${s.prelim}</td>

<td>${s.midterm}</td>

<td>${s.final}</td>

<td>${s.gwa.toFixed(2)}</td>


<td>

<button onclick="removeSubject(${index})">

Remove

</button>


</td>


</tr>

`;



});





document.getElementById(
"totalUnits"
).innerHTML =

"Total Units: "
+
totalUnits;




if(totalUnits > 0){


document.getElementById(
"overallGWA"
).innerHTML =

"Overall GWA: "
+
(
totalWeighted / totalUnits
)
.toFixed(2);



}
else{


document.getElementById(
"overallGWA"
).innerHTML =
"Overall GWA: --";


}



}





// REMOVE SUBJECT

function removeSubject(index){


subjects.splice(
index,
1
);


display();


}