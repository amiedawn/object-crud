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

  // determine if the element has a record id yet (if yes, we are editing a record, if no, we are creating)
  let isEdit = formEl.hasAttribute("data-record-id");

  // if it has data attribute, get record id and call function to complete editing
  if (isEdit) {
    let recordId = formEl.getAttribute("data-record-id");
    completeEditRecord(
      parentFirstName,
      parentLastName,
      email,
      childName,
      grade,
      recordId
    );
  }
  // no data attribute, so create new object and pass to createRecordEl function
  // reset form to default values when you successfully submit a record
  else {
    // package data as an object
    const parentObj = new Parent(
      parentFirstName,
      parentLastName,
      email,
      childName,
      grade
    );
    parentObj.getInfo();
    createRecordEl(parentObj);
  }

  

  // send object as argument to createRecordEl
  //createRecordEl(parentObj);

  formEl.reset();
};

let createRecordEl = function(parentObj) {
  let tableHeader = document.getElementById("table-header");

  // add record id as a custom attribute
  let table = tableHeader.insertRow(tableHeader.length);
  table.className = "record-item";
  table.setAttribute("data-record-id", recordIdCounter);

  let cell1 = table.insertCell(0);
  cell1.className = "p-parent-first-name";
  cell1.innerHTML = parentObj.parentFirstName;
 
  let cell2 = table.insertCell(1);
  cell2.className = "p-parent-last-name";
  cell2.innerHTML = parentObj.parentLastName;
  
  let cell3 = table.insertCell(2);
  cell3.className = "p-email";
  cell3.innerHTML = parentObj.email;

  let cell4 = table.insertCell(3);
  cell4.className = "p-child-name";
  cell4.innerHTML = parentObj.childName;
 
  let cell5 = table.insertCell(4);
  cell5.className = "p-grade";
  cell5.innerHTML = parentObj.grade;

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
  // get target element from event
  const targetEl = event.target;

  // if edit button was clicked
  if (targetEl.matches(".edit-btn")) {
    let recordId = targetEl.getAttribute("data-record-id");
    editRecord(recordId);
  }

  // if delete button was clicked
  if (targetEl.matches(".delete-btn")) {
    // get the element's record id
    let recordId = targetEl.getAttribute("data-record-id");
    deleteRecord(recordId);
  }
};

let editRecord = function(recordId) {
  // get record element
  let recordSelected = document.querySelector(".record-item[data-record-id='" + recordId + "']");

  // get content from object
  let recordParentFirstName = recordSelected.querySelector("td.p-parent-first-name").textContent;
  let recordParentLastName = recordSelected.querySelector("td.p-parent-last-name").textContent;
  let recordEmail = recordSelected.querySelector("td.p-email").textContent;
  let recordChildName = recordSelected.querySelector("td.p-child-name").textContent;
  let recordGrade = recordSelected.querySelector("td.p-grade").textContent;
 
  // restore data to form for a particular record
  document.querySelector("input[name='parent-first-name']").value = recordParentFirstName;
  document.querySelector("input[name='parent-last-name']").value = recordParentLastName;
  document.querySelector("input[name='email']").value = recordEmail;
  document.querySelector("input[name='child-name']").value = recordChildName;
  document.querySelector("input[name='grade']").value = recordGrade;

  // include the record's id
  formEl.setAttribute("data-record-id", recordId);

  // change label of submit to "Update Record"
  document.querySelector("#save-record").textContent = "Update Record";
};

let completeEditRecord = function(parentFirstName, parentLastName, email, childName, grade, recordId) {
  //console.log(parentFirstName, parentLastName, email, childName, grade, recordId);
  // find the matching record items
  let recordSelected = document.querySelector(".record-item[data-record-id='" + recordId + "']")
  
  // set new values
  recordSelected.querySelector("td.p-parent-first-name").textContent = parentFirstName;
  recordSelected.querySelector("td.p-parent-last-name").textContent = parentLastName;
  recordSelected.querySelector("td.p-email").textContent = email;
  recordSelected.querySelector("td.p-child-name").textContent = childName;
  recordSelected.querySelector("td.p-grade").textContent = grade;

  alert("Your record has been updated.");

  // reset the form by removing the record id and changing the button text back to normal
  formEl.removeAttribute("data-record-id");
  document.querySelector("#save-record").textContent = "Add Record";
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

