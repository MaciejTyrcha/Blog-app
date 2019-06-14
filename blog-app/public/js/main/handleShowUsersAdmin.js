class HandleShowUsersAdmin {
    constructor() {
        this.wholeContent = document.querySelector('#wholeContent');
    }

    createShowUsers() {
        const container = document.createElement('div');
        const table = document.createElement('table');
        const thead = document.createElement('thead');
        const tr = document.createElement('tr');
        const tbody = document.createElement('tbody');
        container.id='editUserContent';
        container.classList.add('table-responsive');
        table.classList.add('table', 'table-striped');
        tbody.id='editUserTBody';

        ['', 'Id', 'User name', 'Email', 'First Name', 'Last name', 'Age'].forEach(el => {
            const th = document.createElement('th');
            th.scope = 'col';
            th.appendChild(document.createTextNode(el));
            //MOŻe byc problem z thisem!
            tr.appendChild(th);
        });

        thead.appendChild(tr);
        table.appendChild(thead);
        table.appendChild(tbody);
        container.appendChild(table);
        this.wholeContent.appendChild(container);

        fetchAllUsersPanel.showAllUsersPanel();
    }
}

const handleShowUsersAmin = new HandleShowUsersAdmin();
