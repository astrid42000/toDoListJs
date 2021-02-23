//SELECTEURS
const input= document.querySelector(".todoInput");
const button= document.querySelector(".todoButton");
const liste= document.querySelector(".todoList");
const filter= document.querySelector(".filtre");

//ECOUTEURS
    //action bouton
    button.addEventListener("click", add);

    //action sur la liste
    liste.addEventListener("click", btn);

    //action filtre
    filter.addEventListener("input", filterOption);

    //evenement au chargement de l apage pour récuperer les todos stockés
    document.addEventListener("DOMContentLoaded",getTodos);

//FONCTIONS

//AJOUT TODO
function add(event){
    event.preventDefault();
    //creation d'une div et ajout d'une classe
    const toDoDiv= document.createElement("div");
    const number= Math.random();
    toDoDiv.classList.add("todo");
    toDoDiv.setAttribute('draggable','true');
    toDoDiv.setAttribute('ondragstart','onDragStart(event);');
    toDoDiv.setAttribute('id',number);
    
    

    //creation du li et ajout d'une classe
    const toDoLi= document.createElement("li");
    toDoLi.classList.add("note");
    toDoLi.innerText=input.value;

    //lié le li a la div
    toDoDiv.appendChild(toDoLi);

    //ajouter le todo au localStorage
    save(input.value);

    //creation d'une div et classe
    const toDoDivBtn= document.createElement("div");
    toDoDivBtn.classList.add("todoBtn");
    toDoDivBtn.classList.add("my-auto");

    //lié la div a la div
    toDoDiv.appendChild(toDoDivBtn);

    //creation boutons
    const check= document.createElement("button");
    check.innerHTML='<i class="fas fa-check"></i>';
    check.classList.add("check");
 
    const supp= document.createElement("button");
    supp.innerHTML='<i class="fas fa-trash"></i>';
    supp.classList.add("supp");

    //liés bouton a la div
    toDoDivBtn.appendChild(check);
    toDoDivBtn.appendChild(supp);

    //ajout de la div au bloc de la todolist
    liste.appendChild(toDoDiv);

    //réinitialiser input à vide
    input.value="";
}

//ACTION BOUTON
function btn(event){
   const bouton= event.target;
   const parent= bouton.parentElement;
   const bloc= parent.parentElement;
  
    //action bouton supprimer
   if(bouton.classList[0] === "supp"){
        suppressionLocalStorage(bloc);
        bloc.remove();
   }

    //action bouton checker
    if(bouton.classList[0] === "check"){
        const item= parent.parentElement;
        item.classList.toggle("checker");
    }

}

//FILTRE
function filterOption(e){
    //récuperation de toute la liste de todo
    const todos= liste.childNodes;
    
    //action sur chaque element
    todos.forEach(function(todo){
        switch(e.target.value){
            case "tous":
                todo.style.display ="flex";
                break;
            case "filtre":
                todo.style.display ="flex";
                break;
            case "aFaire":
                if(!todo.classList.contains("checker")){
                    todo.style.display ="flex";
                }else {
                    todo.style.display ="none";
                }
                break;
            case "fait":
                if(todo.classList.contains("checker")){
                    todo.style.display ="flex";
                }else {
                    todo.style.display ="none";
                }
                break;
        }
    });

}

//GLISSER DEPOSER

//recuperation id element a glisser
function onDragStart(event) {
    event
      .dataTransfer
      .setData('text/plain', event.target.id);
      /*console.log(event.target.id);*/
}


function onDragOver(event) {
    event.preventDefault();
}

function onDrop(event) {
    //recuperation id
    const id = event
      .dataTransfer
      .getData('text');

    
    //element a deplacer
    const draggableElement = document.getElementById(id);
    console.log(draggableElement);

    //zone ou le deplacer
    const dropzone = event.target;
    console.log(dropzone);

    //ajout de l element sur la nouvelle zone
    dropzone.appendChild(draggableElement);
    event
    .dataTransfer
    .clearData();
    
}

//STOCKAGE DANS LOCAL STORAGE
function save(todo){
    let todos;

    //verif si todos existent
    if(localStorage.getItem('todos') === null){
        todos=[];
    }else {
        todos= JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem("todos", JSON.stringify(todos));
}

//RECUPERATION DES TODOS STOCKES DS LOCAL STORAGE
function getTodos(){
    let todos;

    //verif si todos existent
    if(localStorage.getItem('todos') === null){
        todos=[];
    }else {
        todos= JSON.parse(localStorage.getItem('todos'));
    }

    //Création des éléments récuperé ds localStorage
    todos.forEach(function(todo){
        const toDoDiv= document.createElement("div");
        const number= Math.random();
        toDoDiv.classList.add("todo");
        toDoDiv.setAttribute('draggable','true');
        toDoDiv.setAttribute('ondragstart','onDragStart(event);');
        toDoDiv.setAttribute('id',number);
        
        
    
        //creation du li et ajout d'une classe
        const toDoLi= document.createElement("li");
        toDoLi.classList.add("note");
        toDoLi.innerText=todo;
    
        //lié le li a la div
        toDoDiv.appendChild(toDoLi);
    
        //creation d'une div et classe
        const toDoDivBtn= document.createElement("div");
        toDoDivBtn.classList.add("todoBtn");
        toDoDivBtn.classList.add("my-auto");
    
        //lié la div a la div
        toDoDiv.appendChild(toDoDivBtn);
    
        //creation boutons
        const check= document.createElement("button");
        check.innerHTML='<i class="fas fa-check"></i>';
        check.classList.add("check");
     
        const supp= document.createElement("button");
        supp.innerHTML='<i class="fas fa-trash"></i>';
        supp.classList.add("supp");
    
        //liés bouton a la div
        toDoDivBtn.appendChild(check);
        toDoDivBtn.appendChild(supp);
    
        //ajout de la div au bloc de la todolist
        liste.appendChild(toDoDiv); 
    })
}

//SUPPRESSION DES TODOS DU LOCAL STORAGE

function suppressionLocalStorage(todo){
    let todos;

    //verif si todos existent
    if(localStorage.getItem('todos') === null){
        todos=[];
    }else {
        todos= JSON.parse(localStorage.getItem('todos'));
    }

    //Récupération de la valeur du todo a supprimer
    const todoValue= todo.children[0].innerText;

    //Récupération de l'index du todo
    const index= todos.indexOf(todoValue);

    //suppression
    todos.splice(index,1);

    //retrouner la nouvelle liste après supreesion du todo
    localStorage.setItem("todos", JSON.stringify(todos));
 
    
}