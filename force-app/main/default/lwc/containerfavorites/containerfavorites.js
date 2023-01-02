import { LightningElement, track, api } from 'lwc';

export default class Containerfavorites extends LightningElement {
    @api toFavorites = [
        // {
        //     id: '1',
        //     name: 'Agile Learning Spaces on Creating Agile Learning Spaces on'
        // },
        // {
        //     id: '2',
        //     name: 'Creating Agile Learning Spaces on Creating Agile Learning Spaces on'
        // },
        // {
        //     id: '3',
        //     name: 'Creating Agile Learning Spaces on'
        // },
        // {
        //     id: '4',
        //     name: 'Agile Learning Spaces on Creating Agile Learning Spaces on'
        // },
        // {
        //     id: '5',
        //     name: 'Creating Agile Learning Spaces on Creating Agile Learning Spaces on'
        // }
    ];
    connectedCallback() {
        console.log('Favourites:', JSON.stringify(this.toFavorites));
    }

    selectedFavoriteHandler(event) {
        const selectedFavorite = event.detail;
        console.log(`${selectedFavorite.id} ${selectedFavorite.name}`);
    }
    @api
    addFavorite() {
        console.log('favorite');
        this.template.querySelector('[data-id="favorite"]').addItem();
    }
    @api
    removeFromFavorite(name) {
        console.log('removeFromFavorite');
        this.template.querySelector('[data-id="favorite"]').removeItem(name)
    }
}