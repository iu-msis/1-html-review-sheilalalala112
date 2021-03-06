// create an application, id links this file to html-mounting 
const SomeApp = {
    data() {
      return {
        // variable, students and offers from php
        students: [],
        selectedStudent: null, // for selecting a particular student
        offers: [],
        offerForm:{}, //two way bind, adds and if someone changes the data -- vmodel
        selectedOffer: null
      }
    },
    computed: {}, //for calculation 
    methods: { //created these methods 
        prettyData(d) {
            return dayjs(d)
            .format('D MMM YYYY')
        },
        prettyDollar(n) {
            const d = new Intl.NumberFormat("en-US").format(n);
            return "$ " + d;
        },

        //s for looping through all students, once it gets to this student, shows the offer 
        selectStudent(s) {
            console.log("Clicked", s);
            if (s == this.selectedStudent) {
                return;
            }
            this.selectedStudent = s;
            this.offers = [];
            this.fetchOfferData(this.selectedStudent);
        },

        fetchStudentData() {
            fetch('/api/student/')
            .then( response => response.json() ) //either get a response or ?? ---> promise 
            .then( (responseJson) => {
                console.log(responseJson); //inspect-console
                this.students = responseJson; 
            })
            .catch( (err) => {
                console.error(err);
            })
        },

        fetchOfferData(s) {
            console.log("Fetching offer data for ", s);
            fetch('/api/offer/?student=' + s.id)
            .then( response => response.json() )
            .then( (responseJson) => {
                console.log(responseJson);
                this.offers = responseJson;
            })
            .catch( (err) => {
                console.error(err);
            })
            .catch( (error) => {
                console.error(error);
            });
        },
        
        postOffer(evt) {
            console.log ("Test:", this.selectedOffer);
          if (this.selectedOffer) {
              this.postEditOffer(evt);
          } else {
              this.postNewOffer(evt);
          }
        },

        postEditOffer(evt) {
            this.offerForm.id = this.selectedOffer.id;
            this.offerForm.studentId = this.selectedStudent.id;        
            
            console.log("Editing!", this.offerForm);
    
            fetch('api/offer/update.php', {
                method:'POST',
                body: JSON.stringify(this.offerForm),
                headers: {
                  "Content-Type": "application/json; charset=utf-8"
                }
              })
              .then( response => response.json() )
              .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.offers = json;
                
                // reset the form
                this.handleResetEdit();
              });
          },

        postNewOffer(evt) { //event handler for form submission, event object is the default 
            //select the student id and add another offer into this student
            this.offerForm.studentId = this.selectedStudent.id; //now we can insert a new row in the table       
            console.log("Posting:", this.offerForm);
            alert("Posting!");

            fetch('api/offer/create.php', {
                method:'POST',
                body: JSON.stringify(this.offerForm),
                headers: {
                "Content-Type": "application/json; charset=utf-8"
                }
            })
            .then( response => response.json() )
            .then( json => {
                console.log("Returned from post:", json);
                // TODO: test a result was returned!
                this.offers = json;
                
                // reset the form
                this.offerForm = {};
            });
        },

        postDeleteOffer(o) {  //what is o?
            if ( !confirm("Are you sure you want to delete the offer from " + o.companyName + "?") ) {
                return;
            }  
            
            console.log("Delete!", o);
    
            fetch('api/offer/delete.php', {
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
                this.offers = json;
                
                // reset the form
                this.handleResetEdit();
              });
          },
        handleEditOffer(offer) {
            this.selectedOffer = offer;
            this.offerForm = Object.assign({}, this.selectedOffer);
        },
        handleResetEdit() { 
            this.selectedOffer = null;
            this.offerForm = {};
        }
        // .catch // to enforce form validation 

    },

    created() {
        this.fetchStudentData();
    }
  
  }
  
  Vue.createApp(SomeApp).mount('#offerApp');