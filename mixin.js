Vue.mixin({
    filters: {
        formatId: function (id) {
            while (id.toString().length < 3) {
                id = '0' + id;
            }
            return `#${id}`;
        },
        capitalize: function (word) {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }
    },
    methods: {
        formatURL: function (id) {
            while (id.toString().length < 3) {
                id = '0' + id;
            }
            return `https://assets.pokemon.com/assets/cms2/img/pokedex/full/${id}.png`;
        },
    }
});
