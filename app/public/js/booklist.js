const BookList = {
    data() {
      return {
        books: [],
        bookForm: {},
        selectedBook: null //initially null
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

        postBook(evt) { // evt - object 
            console.log ("Test:", this.selectedBook);
          if (this.selectedBook) { // if it's not null/info exists, call posteditbook, if the info doesn't exist, then its a new entry
              this.postEditBook(evt);
          } else {
              this.postNewBook(evt);
          }
        },

        postEditBook(evt) {
            this.bookForm.id = this.selectedBook.id;
            // this.offerForm.studentId = this.selectedStudent.id;        
            
            console.log("Editing!", this.bookForm);
            alert("Editing!");
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
        
        postDeleteBook(o) {  //???????why is it o here but it's book in html? 
            if ( !confirm("Are you sure you want to delete the book " + o.title + "?") ) {
                return;
            }  
            
            console.log("Delete!", o);
    
            fetch('api/book/delete.php', {
                method:'POST',
                body: JSON.stringify(o),
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