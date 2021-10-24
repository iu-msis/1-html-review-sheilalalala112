const BookList = {
    data() {
      return {
        books: [],
        bookForm: {},
        selectedBook: null
      }
    },

    computed: {},
    methods: {
        
        fetchBookData() {
            fetch('/api/book/index.php')
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.books = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
        },

        postBook(evt) { // what does this do?? 
            console.log ("Test:", this.selectedBook);
          if (this.selectedBook) {
              this.postEditBook(evt);
          } else {
              this.postNewBook(evt);
          }
        },

        postEditBook(evt) {
            this.offerForm.id = this.selectedBook.id;
            // this.offerForm.studentId = this.selectedStudent.id;        
            
            console.log("Editing!", this.bookForm);
    
            fetch('api/book/update.php', {
                method:'POST',
                body: JSON.stringify(this.bookForm),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.books = json;
                
                // reset the form
                this.handleResetEdit();
              });
        },

        postNewBook(evt) { //event handler for form submission, event object is the default 
        console.log("Posting:", this.bookForm);
        alert("Posting!");

            fetch('api/book/create.php', {
                method:'POST',
                body: JSON.stringify(this.bookForm),
                headers: {
                "Content-Type": "application/json; charset=utf-8"
                }
            })
            .then( response => response.json() )
            .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.books = json;
                
                // reset the form
                this.bookForm = {};
            });
        },

        handleEditBook(book) {
            this.selectedBook = book;
            this.bookForm = Object.assign({}, this.selectedBook);
        },
        handleResetEdit() { 
            this.selectedBook = null;
            this.bookForm = {};
        }

    },

    created() {
        this.fetchBookData();
    }
  
  }
  
  Vue.createApp(BookList).mount('#booklist');