
const RandomPerson = {
    data() {
      return {
          // objects
        "person": {},

        }
    },
    created() {
        
        //getting json data from 
        fetch('https://randomuser.me/api/')
        .then(response => response.json())
        .then((parsedJson) => {
           
            this.person = parsedJson.results[0]
           
        })
        .catch( err => {
            console.error(err)
        })

        
    }
  }
  
Vue.createApp(RandomPerson).mount('#personalinfo');
