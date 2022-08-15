const movieList = [
    {
        "name": "wolsdfsdfsdfsdfdsff",
        "year": "2020",
        "rating": "3"
    },
    {
        "name": "Cars",
        "year": "2015",
        "rating": "4"
    },
    {
        "name": "jhon",
        "year": "2013",
        "rating": "1"
    },
    {
        "name": "army",
        "year": "2000",
        "rating": "2"
    }
];

const btns = document.querySelectorAll('button');

class Movies {
    constructor(parent, name, year, rating){
        this.parent = document.querySelector(parent);
        this.name = name;
        this.year = year;
        this.rating = rating;
    }

    render() {
        const element = document.createElement('tr');
        element.innerHTML = `
        <td id="item">${this.name}</td>
        <td id="item">${this.year}</td>
        <td id="item">${this.rating}</td>
        `;
        this.parent.append(element);
    }

    resetRaiting(){
        document.querySelectorAll('td').forEach((item) => item.remove());
        document.querySelectorAll('tr').forEach((item) => item.remove());
    }
}

function createList() {
    movieList.forEach(({name, year, rating}) => {
        new Movies('table', name, year, rating).render();
    }); 
}

function deleteList() {
    movieList.forEach(({name, year, rating}) => {
        new Movies('table', name, year, rating).resetRaiting();
    }); 
}

function sortByField(field) {
    return (a, b) => a[field][0].toUpperCase() > b[field][0].toUpperCase() ? 1 : -1;
  }

function sortMovie(id) {
    movieList.sort(sortByField(id));
    for(let i = 1; i < movieList.length; i++){
        deleteList();
        createList();
    }
}

btns.forEach((btn) => {
    btn.addEventListener('click', () => {
        console.log(btn.getAttribute('id'));
        if(btn.getAttribute('id') === 'name'){
            sortMovie('name');        
        } else if(btn.getAttribute('id') === 'year'){
            sortMovie('year');
        } else {
            sortMovie('rating');
        }
        
    });
});

createList();



// users.sort(byField('name'));
// users.forEach(user => alert(user.name));

