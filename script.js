const inputValue = document.getElementById("inputValue");
const addButton = document.querySelector(".btn");
const displaySection = document.querySelector(".todo-list-elem");

const getToDoListLocal = () => {
    return JSON.parse(localStorage.getItem('toDoLists'));
    // return the original string using JSON.parse
}

const updatedLocalStorage = (localToDoLists) => {
    return localStorage.setItem("toDoLists", JSON.stringify(localToDoLists));
}

let localToDoLists = getToDoListLocal() || [];

const addToDoDynamicElement = (currElem) => {
    const divElement = document.createElement('div');
    // using createElement method we created a div element dynamically using js
    divElement.classList.add('todo-list-elem');
    // then added a class to that div
    divElement.innerHTML = `<li>${currElem}</li> <button class="deleteToDo"> POP </button>`; 
    // using innerHTML we dynamically passed 2 elements <li> and button and using template literal we passed the input value
    displaySection.append(divElement);
    // and finally we appended the element in the "todo-list-elem" class of the section to display the elements dynamically
}

const addToDoList = (e) => {
    // before creating an element to render in the html we will store input values in localstorage

    e.preventDefault();
    // forms behaviour is different as when we click on submit our data is submit to prevent from that we use in-built method "preventDefault()"

    const toDoListValue = inputValue.value.trim();
    // first we took an empty array and pass the values, removing all whitespaces also

    inputValue.value = '';  // empty the input field
    // console.log(localToDoLists);
    // console.log(toDoListValue);
    
    if(toDoListValue != '' && !localToDoLists.includes(toDoListValue)) {    
    // checks if the input is empty and if input is repeated then don't run the code inside the if block 

        localToDoLists.push(toDoListValue);
        //then we push the values inside the array using push() method

        localToDoLists = [ ...new Set(localToDoLists)];
        // we use set to remove the duplication, but as we are using push method of array set dosen't have push method so we wrap it inside square brackets and use spread operator to display the values properly instead of tree structure of the set

        localStorage.setItem("toDoLists", JSON.stringify(localToDoLists).toLowerCase());
        // we add the data in the localstorage and converting that data into json string and in future we can access that data easily using methods like foreach, for of, map, etc

        addToDoDynamicElement(toDoListValue);
    } else {
        alert("Duplication/Invalid input");
    }
}

const showToDoListLocal = () => {
    // console.log(localToDoLists);
    localToDoLists.forEach((currElem) => {
        addToDoDynamicElement(currElem);
    });
}

const removeElement = (e) => {
    const toDoRemove = e.target;
    const toDoListContent = toDoRemove.previousElementSibling.innerText;
    const parentElem = toDoRemove.parentElement;
    // console.log(parentElem);
    
    localToDoLists = localToDoLists.filter((currTodo) => {
        // console.log("currTodo: ",currTodo);
        // console.log("toDoListContent: ",toDoListContent);
        return currTodo != toDoListContent.toLowerCase();
    });
    console.log("localToDoLists: ",localToDoLists);
    
    
    updatedLocalStorage(localToDoLists);  
    parentElem.remove();
}

showToDoListLocal();

displaySection.addEventListener(('click'), (e) => {
    e.preventDefault();
    if (e.target.classList.contains('deleteToDo')) {
        removeElement(e)
    }
});

addButton.addEventListener(('click'), (e) => {
    addToDoList(e);
});