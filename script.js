let totalPrix = 0;
let selectedCourses = [];
const courses = [
    {
        id: 1,
        name: "Mathématiques",
        level: "primaire",
        subject: "Maths",
        center: "Nador Centre",
        price: 200,
        Horaire:"mardi 09:00-16",
    },
    {
        id: 2,
        name: "Français",
        level: "primaire",
        subject: "Français",
        center: "Hay Al Matar",
        price: 180,
        Horaire:"samedi 08:00-10",
    },
    {
        id: 3,
        name: "Mathématiques",
        level: "college",
        subject: "Maths",
        center: "Nador Centre",
        price: 250,
        Horaire:"samedi 14:00-16",
    },
    {
        id: 4,
        name: "Physique-Chimie",
        level: "college",
        subject: "Physique",
        center: "Selouane",
        price: 250,
        Horaire:"vendredi 12:00-14",
    },
    {
        id: 5,
        name: "Mathématiques",
        level: "2eme Bac",
        subject: "Maths",
        center: "Nador Centre",
        price: 350,
        Horaire:"lundi 08:00-10",
    },
    {
        id: 6,
        name: "Physique-Chimie",
        level: "2eme Bac",
        subject: "Physique",
        center: "Hay Al Matar",
        price: 350,
        Horaire:"jeudi 12:00-14",
    },
     {
        id: 7,
        name: "Physique-Chimie",
        level: "1er Bac",
        subject: "Physique",
        center: "Hay Al Matar",
        price: 450,
        Horaire:"jeudi 12:00-14",
    },
        {
        id: 8,
        name: "Mathématiques",
        level: "2eme Bac",
        subject: "Maths",
        center: "Nador Centre",
        price: 200,
        Horaire:"mardi 08:00-16",
    },
         {
        id: 9,
        name: "Physique",
        level: "1er Bac",
        subject: "Maths",
        center: "Nador Centre",
        price: 250,
        Horaire:"mardi 08:00-12",
    },
             {
        id: 10,
        name: "Français",
        level: "1er Bac",
        subject: "Maths",
        center: "Nador Centre",
        price: 250,
        Horaire:"mardi 08:00-12",
    },
              {
        id: 11,
        name: "Physique",
        level: "college",
        subject: "Maths",
        center: "Nador Centre",
        price: 150,
        Horaire:"mardi 08:00-12",
    },
];

let niveau = document.getElementById("niveau");

niveau.addEventListener("change", ()=> {
    show(niveau.value);
});

function show(niveauFiltre) {
    let container = document.getElementById("container");
    container.innerHTML = "";

    for (let i = 0; i < courses.length; i++) {
        if (niveauFiltre !== "tous" && niveauFiltre !== courses[i].level.trim()) {
            continue;
        }
        
        container.innerHTML += `
            <section class="carte-1">
                <div class="cadre-1"></div>
                ${courses[i].level}
                <div>
                    <h3 class="mathématiques">${courses[i].center}</h3>
                </div>

                <div class="math">
                    <h5>Matière : ${courses[i].subject}</h5>
                    <h5>level : ${courses[i].level}</h5>
                    <h5>Horaire : ${courses[i].Horaire}</h5>
                    <h5>Places : 5</h5>
                    <h5>price : ${courses[i].price}</h5>
                </div>

                <h5 class="prix">${courses[i].price} MAD/mois</h5>

                <button class="btn" data-id="${courses[i].id}">Ajouter</button>
            </section>
        `;   
    }

    attacherEvenements();
}

show("tous");

function attacherEvenements() {
    const btns = document.querySelectorAll(".btn");

    btns.forEach(function(btn) {
        btn.addEventListener("click", function() {
            const id = Number(btn.dataset.id);
            const course = courses.find(c => c.id === id);

            if (course) {
                showSelections(course);
            }
        });
    });
}

function showSelections(course) {
    if (selectedCourses.some(c => c.id === course.id)) {
        return;
    }

    selectedCourses.push(course);
    afficherSelection();
}
function afficherSelection() {
    const selections = document.querySelector(".selection-content");

    selections.innerHTML = "";
    totalPrix = 0;

    selectedCourses.forEach(course => {
        totalPrix += course.price;

        selections.innerHTML += `
            <div class="cours-selectionne">
                <h3>${course.name}</h3>
                <p>Niveau : ${course.level}</p>
                <p>Centre : ${course.center}</p>
                <p>Prix : ${course.price} MAD/mois</p>

                <button class="btnn"
                    onclick="retirerCours(${course.id})">
                    Retirer
                </button>
            </div>
        `;
    });

    if (selectedCourses.length === 0) {
        selections.innerHTML =
            '<p class="empty-message">Aucun cours sélectionné.</p>';
    }

    document.querySelector(".prix-total strong").textContent =
        totalPrix + " MAD";
}
function retirerCours(id) {
    selectedCourses = selectedCourses.filter(function(course) {
        return course.id !== id;
    });

    afficherSelection();
    show(niveau.value);
}
