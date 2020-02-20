
const STATE_FIRST = "firsttime"
const STATE_COUNT = "countdown"

var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!',
    state: STATE_FIRST,
    inputs: {
      birthday: '1990-01-20',
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
    let birthday = localStorage.getItem(vm.workings.birthdayKey);
    if (birthday) {
      vm.birthday = birthday;
      vm.state = STATE_COUNT;
    } else {
      vm.state = STATE_FIRST;
    }

    vm.doCalculations();
    setInterval(vm.doCalculations, 1000);
  },
  methods: {
    setUser: function(event) {
      var vm = this;
      window.location = `/countdown/?u=${vm.inputs.user}`
    },
    savePermalink: function(event) {
      var vm = this;
      axios.post(`/api/${vm.inputs.user}`, {
        birthday: vm.birthday
      })
      .then(function(response) {
        if (response.data.userid === vm.inputs.user) {
          window.location = `/countdown/?u=${vm.inputs.user}`
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
      vm.birthday = vm.inputs.birthday;
      localStorage.setItem(vm.workings.birthdayKey, vm.birthday);
      vm.state = STATE_COUNT;
      vm.doCalculations();
    },
    clickBack: function(event) {
      var vm = this;
      if (confirm("Are you sure you want to reset your birthday? (This will not reset the link)")) {
        localStorage.removeItem(vm.workings.birthdayKey);
        window.location.href = "/countdown"
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






// datepickerDefault = new MtrDatepicker({
//   target: "datepicker",
//   timestamp: new Date().getTime()
// });

// datepickerDefault.onChange('date', function() {
// });


// $("#set-birthday").click((e) => {
//   e.preventDefault();
//   birthday = datepickerDefault.format('Y-M-D');
//   localStorage.setItem(birthdayKey, birthday);
//   setState("countdown");
//   console.log("Setting birthday to", birthday)
// })

// $("#reset-birthday").click((e) => {
//   e.preventDefault();
//   if (confirm("Are you sure you want to clear your birthday?")) {
//     localStorage.removeItem(birthdayKey);
//     setState("firsttime");
//     window.location.href = "/countdown"
//   }
// })

// $("#get").click((e) => {
//   e.preventDefault();

//   let username = $("#get-username").val();
//   window.location = `/countdown/?u=${username}`
// })
// $("#save").click((e) => {
//   e.preventDefault();

//   let username = $("#username").val();
//   $.ajax({
//     method: "POST",
//     url: `/api/${username}`,
//     data: { birthday: birthday }
//   })
//   .done((msg) => {
//     if (msg.userid === username) {
//       window.location = `/countdown/?u=${username}`
//     }
//   })
//   .fail((e) => {
//     if (e.status == 400 && e.responseJSON.error === "User exists") {
//       alert("Username has been taken, please try another");
//     }
//   })
// })

// function setState(state) {
//   $(".states").hide();
//   $(`#${state}`).show();
// }

// function getParameterByName(name) {
//  return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||"";
// }
// var user = getParameterByName('u');
// let birthdayKey = `bday-${user}`
// let birthday = localStorage.getItem(birthdayKey);

// if (user) {
//   $("span.username").text(", " + user);

//   $.ajax({
//     method: "GET",
//     url: `/api/${user}`
//   })
//   .done((msg) => {
//     birthday = msg.birthday;
//     localStorage.setItem(birthdayKey, birthday);
//     setState("countdown");
//   })
//   .fail((e) => {
//     setState("firsttime");
//   })
//   .always(() => {
//     $("#app").removeAttr("style");
//   })
// } else {
//   setState("firsttime");
//   $("#app").removeAttr("style");
// }


// const updateClock = () => {
//   let bday = new Date(`${birthday} GMT+0000`);
//   let now = new Date().toString();
//   let utcifiedString = `${now.substr(0, now.indexOf("GMT"))} GMT+0000`;

//   let secondsLeft = (2524608000000 - ( new Date(utcifiedString).getTime() - bday.getTime() )) / 1000;
//   secondsLeft = parseInt(secondsLeft)
//   $("#counter").text(secondsLeft);
//   if (user) {
//     $(".permalink").hide();
//   }
// }

// updateClock();

// setInterval(updateClock, 1000);