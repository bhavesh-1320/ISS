import { LightningElement, api, track } from 'lwc';

export default class Favorites extends LightningElement {
    @api favorites = [];
    
    @track selectedFavorite;
    @track seeAllLabel = 'See all favorites';
    @track displayFavorites = [];

    async connectedCallback() {
        this.displayFavorites = await this.favorites.filter((f, i) => i < 3);
    }

    renderedCallback() {
        console.log(this.favorites);
    }

    handelSelectedItem(event) {
        const id = event.target.dataset.id;
        this.selectedFavorite = this.favorites.find(favorite => favorite.id === id);
        console.log(`${this.selectedFavorite.id} ${this.selectedFavorite.name}`);

        event.preventDefault();
        const selectEvent = new CustomEvent('selection', {
            detail: {
                id: this.selectedFavorite.id,
                name: this.selectedFavorite.name
            }
        });
        this.dispatchEvent(selectEvent);
    }

    handelAllFavoritesSee(event) {
        event.preventDefault();
        this.seeAllLabel = this.seeAllLabel === 'See all favorites' && this.favorites.length > 0 ? 'Hide' : 'See all favorites';
        
        this.displayFavorites = [];
        this.displayFavorites = this.seeAllLabel === 'Hide' ? this.favorites : this.favorites.filter((f, i) => i < 3);
    }
    @api
    addItem() {
        if(this.seeAllLabel === 'Hide') {
            this.displayFavorites = this.favorites;
        } else {
            this.displayFavorites = this.favorites.filter((f, i) => i < 3);
        }
    }
    @api
    removeItem(name) {
        // console.log(name);
        // let dublicate = JSON.parce(JSON.stringify(this.favorites));
        // const index = dublicate.findIndex(item => item.name === name);
        // if (index !== -1) {
        //     dublicate.splice(index, 1); 
        //     console.log('dublicate',dublicate);
        //     this.favorites = dublicate;
        //     this.displayFavorites = this.favorites;
        // }
        
        
    }
}