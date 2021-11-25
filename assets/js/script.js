const formEl = document.querySelector("#input-form"); // can submit by clicking on button or hitting enter
const parentFirstNameEl = document.querySelector("#parent-first-name");
const parentLastNameEl = document.querySelector("#parent-last-name");
const emailEl = document.querySelector("#email");
const childNameEl = document.querySelector("#child-name");
const gradeEl = document.querySelector("#grade");
const pageContentEl = document.querySelector("#page-content");

let recordIdCounter = 0;

function formHandler(event) {
  // avoid reloading the page so data is retained
  event.preventDefault();

  // retrieve input values from the form
  let parentFirstName = document.getElementById("parent-first-name").value;
  let parentLastName = document.getElementById("parent-last-name").value;
  let email = document.getElementById("email").value;
  let childName = document.getElementById("child-name").value;
  let grade = document.getElementById("grade").value;

  // create Parent class
  class Parent {
    constructor(parentFirstName, parentLastName, email, childName, grade) {
      this.parentFirstName = parentFirstName;
      this.parentLastName = parentLastName;
      this.email = email;
      this.childName = childName;
      this.grade = grade;
    }
    getInfo() {
      return (
        this.parentFirstName,
        this.parentLastName,
        this.email,
        this.childName,
        this.grade
      );
    }
  }

  // package data as an object
  const parentObj = new Parent(
    parentFirstName,
    parentLastName,
    email,
    childName,
    grade
  );
  parentObj.getInfo();

  // send object as argument to createRecordEl
  createRecordEl(parentObj);

  // reset form to default values when you successfully submit a record
  formEl.reset();
};

let createRecordEl = function(parentObj) {
  let tableHeader = document.getElementById("table-header");

  // add record id as a custom attribute
  let table = tableHeader.insertRow(tableHeader.length);
  table.className = "record-item";
  table.setAttribute("data-record-id", recordIdCounter);

  let cell1 = table.insertCell(0);
  cell1.innerHTML = parentObj.parentFirstName;
 
  let cell2 = table.insertCell(1);
  cell2.innerHTML = parentObj.parentLastName;
  
  let cell3 = table.insertCell(2);
  cell3.innerHTML = parentObj.email;

  let cell4 = table.insertCell(3);
  cell4.innerHTML = parentObj.childName;
 
  let cell5 = table.insertCell(4);
  cell5.innerHTML = parentObj.grade;
 
  // let cell6 = table.insertCell(5);
  // cell6.innerHTML =
  //   "<input type='button' value='Edit' onclick='editRow(this)' />";
  //   cell6.className = "record-item";
  // cell6.setAttribute("data-record-id", recordIdCounter);

  // let cell7 = table.insertCell(6);
  // cell7.innerHTML =
  //   "<input type='button' value='Delete' onclick='deleteRow()' />";
  //   cell7.className = "record-item";
  // cell7.setAttribute("data-record-id", recordIdCounter);

  const recordActionsEl = createRecordActions(recordIdCounter);
  table.appendChild(recordActionsEl);

  // increase record counter for next unique id
  recordIdCounter++;


};

let createRecordActions = function(recordId) {
  const actionContainerEl = document.createElement("div");
  actionContainerEl.className = "record-actions";

  // create edit button
  const editButtonEl = document.createElement("button");
  editButtonEl.textContent = "Edit";
  editButtonEl.className = "btn edit-btn";
  editButtonEl.setAttribute("data-record-id", recordId);

  actionContainerEl.appendChild(editButtonEl);

  // create delete button
  const deleteButtonEl = document.createElement("button");
  deleteButtonEl.textContent = "Delete";
  deleteButtonEl.className = "btn delete-btn";
  deleteButtonEl.setAttribute("data-record-id", recordId);

  actionContainerEl.appendChild(deleteButtonEl);

  return actionContainerEl;
};

let recordButtonHandler = function(event) {
  console.log(event.target);

  if (event.target.matches(".delete-btn")) {
    // get the element's record id
    var recordId = event.target.getAttribute("data-record-id");
    deleteRecord(recordId);
  }
};

let deleteRecord = function(recordId) {
  let recordSelected = document.querySelector(".record-item[data-record-id='" + recordId + "']");
  let deleteMessage = confirm("Are you sure you would like to delete this record?") 
  
  if (deleteMessage === true) {
    recordSelected.remove();
  } else {
    return;
  }
};

pageContentEl.addEventListener("click", recordButtonHandler);
formEl.addEventListener("submit", formHandler); // instead of "click" so can hit enter to submit also

