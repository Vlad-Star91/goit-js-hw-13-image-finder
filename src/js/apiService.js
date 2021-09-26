const MY_KEY = '23477910-25b98db95ade589aa6935604b';
const BASE_URL = 'https://pixabay.com/api/?';

export default class ApiService {
    constructor() {
        this.search = '';
        this.page = '';
        this.per_page = '12';
    }
    
    async searchImages() {
        const url = `${BASE_URL}image_type=photo&orientation=horizontal&q=${this.search}&page=${this.page}&per_page=${this.per_page}&key=${MY_KEY}`
        this.incrementPage();
        return (await (await fetch(url)).json()).hits;
    }
   
incrementPage() {
    this.page += 1;
}
resetPage() {
    this.page = 1;
}
    
get query() {
    return this.search;
}
set query(newQuery) {
    this.search = newQuery;
} 
}