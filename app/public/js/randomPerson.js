
const RandomPerson = {
    data() {
      return {
          // objects
        "person": {},
        }
    },

    computed: {
        prettyBirthday() {
            return dayjs(this.person.dob.date)
            .format('DD/MM/YYYY');
        }
    },

    methods: {
        fetchUserData() {
            fetch('https://randomuser.me/api/')
            .then(response => response.json())
            .then((parsedJson) => {
                console.log(parsedJson);
                this.person = parsedJson.results[0]
            })
            .catch( err => {
                console.error(err)
            })
        }
    },

    created() {
        this.fetchUserData();
    }
}
  
Vue.createApp(RandomPerson).mount('#personalinfo');