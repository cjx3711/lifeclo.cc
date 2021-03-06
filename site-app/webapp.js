
const STATE_FIRST = "firsttime"
const STATE_COUNT = "countdown"
const DAYS_IN_MONTH = [
  31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31
]

Vue.component('segment', {
  props: ['number'],
  template: `
    <span class="seven-seg">
      <img v-if="number=='0'" src="/assets/images/ss-0.svg"/>
      <img v-if="number=='1'" src="/assets/images/ss-1.svg"/>
      <img v-if="number=='2'" src="/assets/images/ss-2.svg"/>
      <img v-if="number=='3'" src="/assets/images/ss-3.svg"/>
      <img v-if="number=='4'" src="/assets/images/ss-4.svg"/>
      <img v-if="number=='5'" src="/assets/images/ss-5.svg"/>
      <img v-if="number=='6'" src="/assets/images/ss-6.svg"/>
      <img v-if="number=='7'" src="/assets/images/ss-7.svg"/>
      <img v-if="number=='8'" src="/assets/images/ss-8.svg"/>
      <img v-if="number=='9'" src="/assets/images/ss-9.svg"/>
    </span>
  `
})

var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    state: STATE_FIRST,
    inputs: {
      byear: new Date().getFullYear() - 30,
      bmonth: new Date().getMonth() + 1,
      bdate: new Date().getDate(),
      user: ''
    },
    workings: {
      birthdayKey: '',
      count: 0,
      digits: []
    },
    birthday: '',
    user: '',
    broken: false,
    features: {
      sevenseg: true
    }
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
    },
    
    dateValidate: function(event) {
      let year = parseInt(this.inputs.byear)
      if ( year < 1900 ) this.inputs.byear = 1900
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
    },
    setUser: function(event) {
      var vm = this;
      event.preventDefault();
      window.location = `?u=${vm.inputs.user}`
    },
    savePermalink: function(event) {
      var vm = this;
      event.preventDefault();
      let user = vm.inputs.user.trim();
      if (!/^[A-Za-z0-9\.\-_~]+$/.test(user)) {
        alert("Invalid userid.\nMust be < 64 alphanumeric and .-_~ characters.");
        return;
      }
      axios.post(`/api/${user}`, {
        birthday: vm.birthday
      })
      .then(function(response) {
        if (response.data.userid === user) {
          window.location = `?u=${user}`;
        } else {
          alert("Something went wrong with generating your link");
        }
      })
      .catch(function(error) {
        if (error.response.status) {
          if (error.response.data.error === "User exists") {
            if (confirm("Username has been taken, go to link?")) {
              window.location = `?u=${user}`;
            }
          } else {
            alert("Server error: " + error.response.data.error);
          }
        }
      })
    },
    setBirthday: function(event) {
      var vm = this;
      event.preventDefault();
      vm.birthday = `${this.inputs.byear}-${this.inputs.bmonth}-${this.inputs.bdate}`;
      localStorage.setItem(vm.workings.birthdayKey, vm.birthday);

      if(vm.user) {
        vm.inputs.user = vm.user;
        vm.savePermalink(event);
        // This will refresh the page and bring the user to the countdown state
      } else {
        vm.state = STATE_COUNT;
        vm.doCalculations();
      }
    },
    clickBack: function(event) {
      var vm = this;
      event.preventDefault();
      if (confirm("Go back to home page?\nYou will need to enter your birthday or username again.")) {
        localStorage.removeItem(vm.workings.birthdayKey);
        localStorage.removeItem('bday-');
        vm.birthday = '';
        vm.state = STATE_FIRST;
        window.location.href = "/"
      }
    },
    doCalculations: function() {
      var vm = this;
      if (vm.state === STATE_COUNT && vm.birthday !== '') {
        let bday = new Date(vm.birthday);
        let now = new Date().toString();
        let utcifiedString = `${now.substr(0, now.indexOf("GMT"))} GMT+0000`;

        let secondsLeft = (2524608000000 - ( new Date(utcifiedString).getTime() - bday.getTime() )) / 1000;
        if (!secondsLeft) {
          vm.broken = true;
        } else {
          if (secondsLeft < 0) {
            secondsLeft = 0;
          }
          vm.workings.count = parseInt(secondsLeft);
          vm.workings.digits.length = 0;
          let digitWorking = vm.workings.count;
          for (let i = 0; i < 10; i++) {
            let digit = digitWorking % 10;
            vm.workings.digits.push(digit);
            digitWorking = parseInt(digitWorking / 10);
          }
          vm.workings.digits.reverse();
          vm.broken = false;
        }
      }
    }
  }
})
