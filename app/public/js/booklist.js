const BookList = {
    data() {
      return {
        books: []
      }
    },

    computed: {},
    methods: {
        
        fetchBookData() {
            fetch('/api/book/')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.books = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },
    },

    created() {
        this.fetchBookData();
    }
  
  }
  
  Vue.createApp(BookList).mount('#booklist');