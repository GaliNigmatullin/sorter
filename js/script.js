
(async () => {
    
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
            <td id="item">${this.name[0].toUpperCase() + this.name.slice(1)}</td>
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
    
    
    const getData = async (url) => {
        let data;
        await fetch(url)
            .then((res) => res.json())
            .then((res) => (data = res));

        return data;
    };

    let movieList;

    await getData("http://localhost:3000/movies")
    .then(data => {
        data.forEach(({name, year, rating}) => {
            new Movies('table', name, year, rating).render();
            movieList = data;
        });
    });

    const btns = document.querySelectorAll('button');

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

    let flag = 0; // флаг сортировки

    function sortByField(field) {
        if(flag === 0){
            flag = 1;
            return (a, b) => a[field] > b[field] ? 1 : -1;
        } else {
            flag = 0;
            return (a, b) => a[field] < b[field] ? 1 : -1;
        }
        
    }

    function sortMovie(id) {
        movieList.sort(sortByField(id));
        for(let i = 1; i < movieList.length; i++){
            deleteList();
            createList();
        }
    }


//     let arr = [5, 2, 1, -10, 8];

// arr.sort((a, b) => b - a);

// alert( arr );

    btns.forEach((btn) => {
        btn.addEventListener('click', () => {
            if(btn.getAttribute('id') === 'name'){
                console.log(btn);
                sortMovie('name');        
            } else if(btn.getAttribute('id') === 'year'){
                sortMovie('year');
            } else {
                sortMovie('rating');
            }            
        });
    });
    
        
})();
