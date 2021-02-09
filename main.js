const apiURL = 'https://pokeapi.co/api/v2/';
const app = new Vue({
    el: '#main',
    data: {
        page: 1,
        limit: 18,
        pokemons: [],
        detailedPokemons: [],
        loading: false,
        showModal: false
    },
    watch: {
        limit: 'getPokemons',
        offset: 'getPokemons',
        pokemons: ['getDetails'],
    },
    methods: {
        getPokemons: async function () {
            try {
                this.loading = true;
                const response = await axios.get(apiURL + 'pokemon?offset=' + this.offset + '&limit=' + this.limit);
                this.pokemons = response.data;
            } catch (e) {
                console.log(e);
            }
        },
        getDetails: async function () {
            try {
                this.detailedPokemons = [];
                for (const pokemon of this.pokemons.results) {
                    const response = await axios.get(pokemon.url);
                    response.data.name = pokemon.name;
                    this.detailedPokemons.push(response.data);
                }
                this.loading = false;
            } catch (e) {
                console.log(e);
            }
        },
        previous: function () {
            if (this.page > 0) {
                --this.page;
            }
        },
        next: function () {
            ++this.page;
        },
        selectPokemon: function (pokemon) {
            this.pokemon = pokemon;
        }
    },
    created: async function () {
        await this.getPokemons();
    },
    computed: {
        offset: function () {
            if (this.page <= 0) {
                return 0;
            } else {
                return this.limit * (this.page - 1);
            }
        }
    }
})
