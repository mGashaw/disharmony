let currentName;

function loginClient() {
    window.location.href="comms.html";
}

const onLogin = () => {
    let nameInput = document.getElementById("name").value;
    let passcodeInput = document.getElementById("passcode").value;
    const loginRef = firebase.database().ref('profile');
    loginRef.on('value', (snapshot) => {
        const data = snapshot.val()
        if (data[nameInput] != null) {
            console.log(data[nameInput])
            if (data[nameInput] == passcodeInput) {
                currentName = nameInput;
                // LINK TO SERVER!
                loginClient();
            } else {
                alert("Passcode incorrect!")
            }
        } else {
            alert("Account not found!")
        }
    })
}

const onSignUp = () => {
    let nameInput = document.getElementById("name").value;
    let passcodeInput = document.getElementById("passcode").value;
    const loginRef = firebase.database().ref('profile');
    let payload = {};
    loginRef.get().then((snapshot) => {
        const data = snapshot.val()
        console.log(data)
        if (data[nameInput] != null) {alert("Account name taken!");} else {
            payload[nameInput] = passcodeInput
            firebase.database().ref('profile').child(nameInput).set(passcodeInput);
            loginClient();
        }
    })
    
}

let user = "";

const setUser = u => {
  user = u;
}

document.querySelector("#input").addEventListener("keyup", function(event) {
  event.preventDefault();
  if (event.keyCode === 13) {
    document.getElementById("#submit").click();
  }
});

const messages = [];

const sendMessage = () => {
  const messageText = document.querySelector("#input").value;

  const payload = {
    user: currentName,
    avatar: "https://bulma.io/images/placeholders/96x96.png",
    date: new Date().getTime(),
    message: messageText
  };

  console.log(JSON.stringify(payload));
  messages.push(payload);
  console.log(messages);
};

const loadMessages = () => {
  let messageHTML = "";
  messages.forEach(message => {
    let card = `
<div class="card">
          <div class="card-content">
            <div class="media">
              <div class="media-left">
                <figure class="image is-48x48">
                  <img
                    src=${message.avatar}
                  />
                </figure>
              </div>
              <div class="media-content">
                <p class="subtitle is-6"><b>${message.user}</b></p>
                <div class="content">
                  ${message.message}
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
                `;
    messageHTML = messageHTML += card;
  });
  document.querySelector("#messages").innerHTML =
    messageHTML;
  console.log("Messages loaded");
};

