axios.get('/contact', {
    headers: {
        Authorization: ('Bearer', localStorage.getItem("token"))
    },
})

function addContact() {
    const name = document.getElementById("name").value
    const phone = document.getElementById("phone").value
    const email = document.getElementById("email").value
   axios.post("/contact", {
        name: name,
        phone: phone,
        email: email
   },{
    headers: {
        Authorization : ('Bearer', localStorage.getItem("token"))
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