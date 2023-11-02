document.addEventListener("DOMContentLoaded", event => {

    const app = firebase.app();
    const auth = firebase.auth();
    const db = firebase.firestore();

    const boba1 = db.collection('boba').doc('black sugar boba');
    const boba2 = db.collection('boba').doc('lemon grass tea');
    const boba3 = db.collection('boba').doc('lychee jasmine tea');
    const boba4 = db.collection('boba').doc('mango strawberry tea');
    const boba5 = db.collection('boba').doc('matcha boba milk');

    const loginbtn = document.getElementById("myBtn")

    boba1.get()
        .then(doc => {
            const data = doc.data();
            boba1_rating = data.rating;
            var star = document.getElementById("star1");
            rounded(boba1_rating, star);        
        })
    boba2.get()
        .then(doc => {
            const data = doc.data();
            boba2_rating = data.rating;
            var star = document.getElementById("star2");
            rounded(boba2_rating, star); 
        })
    boba3.get()
        .then(doc => {
            const data = doc.data();
            boba3_rating = data.rating;
            var star = document.getElementById("star3");
            rounded(boba3_rating, star); 
        })
    boba4.get()
    .then(doc => {
            const data = doc.data();
            boba4_rating = data.rating;
            var star = document.getElementById("star4");
            rounded(boba4_rating, star); 
    })
    boba5.get()
        .then(doc => {
            const data = doc.data();
            boba5_rating = data.rating;
            var star = document.getElementById("star5");
            rounded(boba5_rating, star); 
    })
    

    auth.onAuthStateChanged(user => {
        if(user){
            // Logged In
            loginbtn.innerHTML = user.email;

            const rating = document.querySelector('#rating1')
            rating.addEventListener('submit', (e) => {
                e.preventDefault();
        
                const user_rating = rating['rating1'].value;
                boba1_rating.push(Number(user_rating));
                boba1.update({rating: boba1_rating});
            })
        
            const rating2 = document.querySelector('#rating2')
            rating2.addEventListener('submit', (e) => {
                e.preventDefault();
        
                const user_rating = rating2['rating2'].value;
                boba2_rating.push(Number(user_rating));
                boba2.update({rating: boba2_rating});
            })
        
            const rating3 = document.querySelector('#rating3')
            rating3.addEventListener('submit', (e) => {
                e.preventDefault();
        
                const user_rating = rating3['rating3'].value;
                boba3_rating.push(Number(user_rating));
                boba3.update({rating: boba3_rating});
            })
        
            const rating4 = document.querySelector('#rating4')
            rating4.addEventListener('submit', (e) => {
                e.preventDefault();
        
                const user_rating = rating4['rating4'].value;
                boba4_rating.push(Number(user_rating));
                boba4.update({rating: boba4_rating});
            })
        
            const rating5 = document.querySelector('#rating5')
            rating5.addEventListener('submit', (e) => {
                e.preventDefault();
        
                const user_rating = rating5['rating5'].value;
                boba5_rating.push(Number(user_rating));
                boba5.update({rating: boba5_rating});
            })

            // Sign out modal
            $(document).ready(function(){
                $("#myBtn").click(function(){
                $("#myModal3").modal();
                });
            });

            const signOut = document.getElementById("signOut");
            signOut.onclick = () => auth.signOut();

            // Contact Us 
            const contact = document.querySelector('#contact-us')
            contact.addEventListener('submit', (e) => {
                e.preventDefault();
                
                const dbcontact = db.collection('contact us').doc('messages');
                const email = contact['email'].value;
                const message = contact['message'].value;
                dbcontact.update({messages: email + ': ' + message});
                contact.reset();
            })

        } else {

            // Login Modal
            $(document).ready(function(){
                $("#myBtn").click(function(){
                $("#myModal").modal();
                });
            });

            // Register Account Modal
            $(document).ready(function(){
                $("#sign-up").click(function(){
                    $('#myModal').modal('hide');
                    setTimeout(function() {
                        $("#myModal2").modal();
                    }, 500);
                });
            });

            // Not Logged In
            const signupForm = document.querySelector('#register-account')
            signupForm.addEventListener('submit', (e) => {
                e.preventDefault();
        
                // Get user info
                const email = signupForm['email-register'].value;
                const password = signupForm['password-register'].value;
        
                // Sign up the user
                firebase.auth().createUserWithEmailAndPassword(email, password).then(cred => {
                    console.log(cred.user)
                    $('#myModal2').modal('hide');
                })
            })
        
            const loginForm = document.querySelector('#login-account')
            loginForm.addEventListener('submit', (e) => {
                e.preventDefault();
        
                const email = loginForm['email-login'].value;
                const password = loginForm['password-login'].value;
                firebase.auth().signInWithEmailAndPassword(email, password)
                        .then(result => {
                            const user = result.user;
                            loginbtn.innerHTML = user.email;
                            $('#myModal').modal('hide');
                        })
                        .catch(console.log)
            })
        }
        
    });

    // Update ratings

});

function rounded(rating, star){
    let sum = 0;
    rating.forEach(num =>{
        sum += num;
    })
    average = sum / rating.length;
    let rounded = Math.round(average*2)/2;
    decimal = rounded - Math.floor(rounded);
    rounded = Math.trunc(rounded);
    if (decimal > 0){
        icon = document.createElement("i");
        icon.className = "fa-solid fa-star-half";
        star.prepend(icon);
    }
    for(let i = 0; i < rounded; i++){
        icon = document.createElement("i");
        icon.className = "fa-solid fa-star";
        star.prepend(icon);
    }
}


