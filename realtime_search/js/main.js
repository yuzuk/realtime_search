var app = new Vue({
    el: '#app',
    data: {
        title: 'Qiitaからリアルタイム検索',
        searchWord: '',
        items: null,
        message: '',
        loading: true,
    },
    watch: {
        searchWord: function (value) {
            this.message = 'Waiting for you stop typing';
            this.debouncedGetResult();
        }
    },
    created: function () {
        this.searchWord = 'javascript';
        this.debouncedGetResult = _.debounce(this.getResult, 1000);
    },
    methods: {
        getResult: function () {
            if (this.searchWord === '') {
                this.items = null;
                this.message = '';
                return;
            }
            this.message = 'Loading...';
            var vm = this;
            var params = { prage: 1, per_page: 20, query: this.searchWord };
            axios.get('https://qiita.com/api/v2/items', { params })
                .then(function (response) {
                    vm.items = response.data;
                })
                .catch(function (error) {
                    vm.message = 'Error!';
                })
                .finally(function () {
                    console.log('finally');
                    vm.message = '';
                    vm.loading = false;
                })
        }
    }
})