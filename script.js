// // Load existing rooms from localStorage
// let rooms = JSON.parse(getItem("rooms")) || [];

// // If form exists (add-room page)
// if (document.getElementById("roomForm")) {

//     document.getElementById("roomForm").addEventListener("submit", function(e) {
//         e.preventDefault();

//         let room = {
//             owner: document.getElementById("ownerName").value,
//             phone: document.getElementById("phone").value,
//             rent: document.getElementById("rent").value,
//             type: document.getElementById("roomType").value,
//             House: document.getElementById("house-no").value,
//             city: document.getElementById("city").value,
//             state: document.getElementById("state").value,
//             description: document.getElementById("description").value
//         };

//         rooms.push(room);
//         setItem("rooms", JSON.stringify(rooms));

//         alert("Room Added Successfully!");
//         window.location.href = "see-rooms.html";
//     });
// }


// // If room list container exists (see-rooms page)
// if (document.getElementById("roomList")) {
//     displayRooms(rooms);
// }

// function displayRooms(roomArray) {

//     let container = document.getElementById("roomList");
//     container.innerHTML = "";

//     if (roomArray.length === 0) {
//         container.innerHTML = "<h3>No Rooms Available</h3>";
//         return;
//     }

//     roomArray.forEach(room => {
//         container.innerHTML += `
//             <div class="room-card">
//                 <h3>${room.type}</h3>
//                 <p><strong>Rent:</strong> ₹${room.rent}</p>
//                 <p><strong>Owner:</strong> ${room.owner}</p>
//                 <p><strong>House Number/Building Number:</strong> ${room.House}</p>
//                 <p><strong>Landmark:</strong> ${room.landmark}</p>
//                 <p><strong>Colony/District:</strong> ${room.city}</p>
//                 <p><strong>City/State:</strong> ${room.state}</p>

//                 <p>${room.description}</p>
//                 <a href="tel:${room.phone}">
//                     <button>Call Owner</button>
//                 </a>
//             </div>
//         `;
//     });
// }
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// ADD ROOM
window.addRoom = async function(title, rent, owner) {
  await addDoc(collection(db, "rooms"), {
    title: title,
    rent: rent,
    owner: owner
  });
  alert("Room Added!");
};

// LOAD ROOMS
window.loadRooms = async function() {
  const roomContainer = document.getElementById("rooms");
  if (!roomContainer) return;

  roomContainer.innerHTML = "";

  const querySnapshot = await getDocs(collection(db, "rooms"));
  querySnapshot.forEach((docSnap) => {
    const room = docSnap.data();

    roomContainer.innerHTML += `
      <div class="card">
        <h3>${room.title}</h3>
        <p>Rent: ₹${room.rent}</p>
        <p>Owner: ${room.owner}</p>
        <button onclick="deleteRoom('${docSnap.id}')">Delete</button>
      </div>
    `;
  });
};

// DELETE
window.deleteRoom = async function(id) {
  await deleteDoc(doc(db, "rooms", id));
  loadRooms();
};

loadRooms();
