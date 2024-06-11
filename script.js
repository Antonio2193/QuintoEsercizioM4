let allUsers = [];

//funzione per caricare i dati
document.addEventListener("DOMContentLoaded", function () {
    console.log("DOM loaded");
    fetch("https://jsonplaceholder.typicode.com/users")
        .then(res => res.json())
        .then(data => {
            displayUsers(data);
            allUsers = data;
        })
        .catch(error => {
            console.error('Error fetching users:', error);
        });
})


//funzione per creare la tabella
function displayUsers(users) {
    let usersContainer = document.getElementById("users");
    usersContainer.innerHTML = "";

    //creao la tabella
    let userTable = document.createElement("table");
    userTable.classList.add("table", "table-striped", "mt-4");

    //creao l'intestazione della tabella
    let tableHead = document.createElement("thead");
    let tableHeadRow = document.createElement("tr");
    let headers = ["ID", "Name", "Username", "Email", "Address", "Phone", "Website", "Company", "City", "Zipcode"];
    //ciclo per creare le colonne
    headers.forEach(header => {
        let th = document.createElement("th");
        th.textContent = header;
        tableHeadRow.appendChild(th);
    })
    //appendo la riga all'intestazione
    tableHead.appendChild(tableHeadRow);
    //appendo la tabella all'intestazione
    userTable.appendChild(tableHead);

    let tbody = document.createElement("tbody");
    //ciclo per creare le righe
    users.forEach(user => {
        let row = document.createElement("tr");
        let cellsData = [
            user.id, 
            user.name, 
            user.username, 
            user.email, 
            user.address.street, 
            user.phone, 
            user.website, 
            user.company.name, 
            user.address.city, 
            user.address.zipcode
        ];
        //ciclo per creare le celle
        cellsData.forEach(cellData => {
            let td = document.createElement("td");
            td.textContent = cellData;
            row.appendChild(td);
        });
        //appendo la riga alla tabella
        tbody.appendChild(row);
    });
    //appendo la tabella al container
    userTable.appendChild(tbody);
    usersContainer.appendChild(userTable);
};

//funzione per filtrare la ricerca
function filtraSearch() {
    let valoreSearch = document.getElementById("search").value.toLowerCase();
    let option = document.getElementById("scegli").value.toLowerCase();
    //ciclo per filtrare la ricerca
    let filteredUsers = allUsers.filter(user => {
        let searchField = "";
        if (option === "name") {
            searchField = user.name.toLowerCase();
        } else if (option === "username") {
            searchField = user.username.toLowerCase();
        } else if (option === "email") {
            searchField = user.email.toLowerCase();
        }
        return searchField.includes(valoreSearch);
    });
    //passo i dati filtrati alla funzione per creare la tabella
    displayUsers(filteredUsers);
}
