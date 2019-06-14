class FetchAllUsersPanel {
    async showAllUsersPanel() {
        const editUserTBody = document.querySelector('#editUserTBody');
        const response = await fetch('/users', {
            method: 'get',
        });

        const data = await response.json();
        data.forEach((el, index) => {
            const tr = document.createElement('tr');
            const th = document.createElement('th');
            th.scope = 'row';
            th.textContent = `${index + 1}.`;

            editUserTBody.appendChild(tr);
            tr.appendChild(th);

            for(let i = 0; i < 6; i++ ) {
                const td = document.createElement('td');
                switch(i) {
                    case 0:
                        td.textContent = el._id;
                        break;
                    case 1:
                        td.textContent = el.userName;
                        break;
                    case 2:
                        td.textContent = el.email;
                        break;
                    case 3:
                        td.textContent = el.firstName;
                        break;
                    case 4:
                        td.textContent = el.lastName;
                        break;
                    case 5:
                        td.textContent = el.age;
                        break;
                }
                tr.appendChild(td);
            }
        });
    }
}

const fetchAllUsersPanel = new FetchAllUsersPanel();
