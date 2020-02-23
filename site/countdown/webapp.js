
const STATE_FIRST = "firsttime"
const STATE_COUNT = "countdown"
const DAYS_IN_MONTH = [
  31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
]

var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    state: STATE_FIRST,
    inputs: {
      birthday: '1990-01-20',
      byear: '1990',
      bmonth: '1',
      bdate: '20',
      user: ''
    },
    workings: {
      birthdayKey: '',
      count: 0
    },
    birthday: '',
    user: ''
  },
  created: function () {
    var vm = this;
    
    // Vanilla JS way to achieve URL params without vue router
    function getParameterByName(name) {
      return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||"";
     }
    vm.user = getParameterByName('u');
    vm.workings.birthdayKey = `bday-${vm.user}`
    
    // Check the local storage first
    let birthday = localStorage.getItem(vm.workings.birthdayKey);
    if (birthday) {
      vm.birthday = birthday;
      vm.state = STATE_COUNT;
      vm.doCalculations();
    } else {
      vm.state = STATE_FIRST;
    }

    // Then check the server for the user's birthday
    if (vm.user) {
      axios.get(`/api/${vm.user}`)
      .then(function(response) {
        vm.birthday = response.data.birthday;
        console.log("Updated from server", vm.birthday);
        localStorage.setItem(vm.workings.birthdayKey, vm.birthday);
        vm.state = STATE_COUNT;
        vm.doCalculations();
      })
      .catch(function(error) {
        vm.state = STATE_FIRST
      })
    }
    
    vm.doCalculations();
    setInterval(vm.doCalculations, 1000);
  },
  methods: {
    highlight: function(event) {
      console.log(event.target.select())
    },
    inputValidate: function(event) {
      if (this.inputs.byear.length > 4) {
        this.inputs.byear = this.inputs.byear.substring(0,4)
      }
      if (this.inputs.bmonth.length > 2) {
        this.inputs.bmonth = this.inputs.bmonth.substring(0,2)
      }
      if (this.inputs.bdate.length > 2) {
        this.inputs.bdate = this.inputs.bdate.substring(0,2)
      }
      this.inputs.birthday = `${this.inputs.byear}-${this.inputs.bmonth}-${this.inputs.bdate}`
    },
    dateValidate: function(event) {
      let year = parseInt(this.inputs.byear)
      if ( year < 1800 ) this.inputs.byear = 1800
      if ( year > 2100 ) this.inputs.byear = 2100

      let month = parseInt(this.inputs.bmonth)
      if ( month < 1 ) this.inputs.bmonth = 1
      if ( month > 12 ) this.inputs.bmonth = 12

      let date = parseInt(this.inputs.bdate)
      let max = DAYS_IN_MONTH[month-1]
      if ( month == 2 && year % 4 == 0 && (year % 100 != 0 || year % 400 == 0) ) {
        max = 29
      }
      if ( date < 1 ) this.inputs.bdate = 1
      if ( date > max ) this.inputs.bdate = max

      this.inputs.birthday = `${year}-${month}-${date}`
    },
    setUser: function(event) {
      var vm = this;
      event.preventDefault();
      window.location = `?u=${vm.inputs.user}`
    },
    savePermalink: function(event) {
      var vm = this;
      event.preventDefault();
      axios.post(`/api/${vm.inputs.user}`, {
        birthday: vm.birthday
      })
      .then(function(response) {
        if (response.data.userid === vm.inputs.user) {
          window.location = `?u=${vm.inputs.user}`
        } else {
          alert("Something went wrong with generating your link");
        }
      })
      .catch(function(error) {
        if (error.response.status == 400 && error.response.data.error === "User exists") {
          alert("Username has been taken, please try another");
        }
      })
    },
    setBirthday: function(event) {
      var vm = this;
      event.preventDefault();
      vm.birthday = vm.inputs.birthday;
      localStorage.setItem(vm.workings.birthdayKey, vm.birthday);
      vm.state = STATE_COUNT;
      vm.doCalculations();
    },
    clickBack: function(event) {
      var vm = this;
      event.preventDefault();
      if (confirm("Are you sure you want to reset your birthday?\n(This will not reset the link)")) {
        localStorage.removeItem(vm.workings.birthdayKey);
        localStorage.removeItem('bday-');
        window.location.href = "/"
      }
      vm.birthday = '';
      vm.state = STATE_FIRST;
    },
    doCalculations: function() {
      var vm = this;
      if (vm.state === STATE_COUNT && vm.birthday !== '') {
        let bday = new Date(`${vm.birthday} GMT+0000`);
        let now = new Date().toString();
        let utcifiedString = `${now.substr(0, now.indexOf("GMT"))} GMT+0000`;

        let secondsLeft = (2524608000000 - ( new Date(utcifiedString).getTime() - bday.getTime() )) / 1000;
        vm.workings.count = parseInt(secondsLeft);
      }
    }
  }
})
