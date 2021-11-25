const formEl = document.querySelector("#input-form"); // can submit by clicking on button or hitting enter

function formHandler(event) {
  event.preventDefault();

  let parentFirstName = document.getElementById("parent-first-name").value;
  let parentLastName = document.getElementById("parent-last-name").value;
  let email = document.getElementById("email").value;
  let childName = document.getElementById("child-name").value;
  let grade = document.getElementById("grade").value;
 
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
  };

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

};

let createRecordEl = function(parentObj) {
  let tableHeader = document.getElementById("table-header");
  
  let table = tableHeader.insertRow(tableHeader.length);
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
  let cell6 = table.insertCell(5);
  cell6.innerHTML =
    "<input type='button' value='Edit' onclick='editRow(this)' />";
  let cell7 = table.insertCell(6);
  cell7.innerHTML =
    "<input type='button' value='Delete' onclick='deleteRow()' />";
}

formEl.addEventListener("submit", formHandler); // instead of "click" so can hit enter to submit also

