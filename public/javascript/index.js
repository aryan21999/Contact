// axios.get('/contact', {
//     headers: {
//         Authorization: ('Bearer', localStorage.getItem("token"))
//     },
// })
// .then(function (response) {
//     console.log(response);
//     console.log(response.data)
// })
// .catch(function (error) {
//     if (error.response) 
//       console.log(localStorage.token)
//       console.log(error.response.data);
//       console.log(error.response.status);
//       console.log(error.response.headers);
//   });


function addContact() {
    const name = document.getElementById("name").value
    const phone = document.getElementById("phone").value
    const email = document.getElementById("email").value
   axios.post("/contact", {
        name: "Aryan21",
        phone: "9078563412",
        email: "test5@test.com"
   },{
    headers: {
        Authorization: ('Bearer', localStorage.getItem("token"))
    }})
    .then(function (response) {
        console.log(response)
        console.log(response.data)
        location.reload()
    })  
    .catch(function (error) {
        console.log(error);
    });
}