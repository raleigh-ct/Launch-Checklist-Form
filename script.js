window.onload = () => {
   // Step 1) Prevent actual form submission/page reload
   document.getElementById("launchForm").addEventListener("submit", function(event) {
   event.preventDefault();

   // Step 2) Define variable values for form validation purposes
   let pilot = String(document.querySelector("input[name=pilotName]").value);
   let coPilot = String(document.querySelector("input[name=copilotName]").value);
   let mass = Number(document.querySelector("input[name=cargoMass]").value);
   let fuel = Number(document.querySelector("input[name=fuelLevel]").value);

   // Step 3) Validate pilot names and fuel/cargo numbers
   if (pilot === "" || coPilot === "") {
      window.alert("Pilot and Co Pilot Names are required");
   } else if (pilot%1 == 0 || coPilot%1 == 0) {
      window.alert("Pilot and Co Pilot Names cannot be numbers");
   } else if (isNaN(mass) || isNaN(fuel)) {
      window.alert("Fuel Level and Cargo Mass should be numbers");
   } else if (mass === 0 || fuel === 0 ) {
      window.alert("Fuel Level and Cargo Mass are required");
   } else if (mass > 10000 && fuel < 10000) {
      // Step 4) Validate fuel/mass thresholds and update faultyItems innerHTML if failure
      document.getElementById("launchStatus").innerHTML = "Shuttle NOT Ready for Launch";
      document.getElementById("launchStatus").style.color = "red";
      document.getElementById("faultyItems").style.visibility = "visible";
      document.getElementById("faultyItems").innerHTML = `
      <ol>
                    <li id="pilotStatus">Pilot ${pilot} Ready</li>
                    <li id="copilotStatus">Co-pilot ${coPilot} Ready</li>
                    <li id="fuelStatus">Fuel level too low for launch</li>
                    <li id="cargoStatus">Cargo mass too high for launch</li>
                </ol>
      `
   } else if (mass > 10000) {
      document.getElementById("launchStatus").innerHTML = "Shuttle NOT Ready for Launch";
      document.getElementById("launchStatus").style.color = "red";
      document.getElementById("faultyItems").style.visibility = "visible";
      document.getElementById("faultyItems").innerHTML = `
      <ol>
                    <li id="pilotStatus">Pilot ${pilot} Ready</li>
                    <li id="copilotStatus">Co-pilot ${coPilot} Ready</li>
                    <li id="fuelStatus">Fuel level high enough for launch</li>
                    <li id="cargoStatus">Cargo mass too high for launch</li>
                </ol>
      `
   } else if (fuel < 10000) {
      document.getElementById("launchStatus").innerHTML = "Shuttle NOT Ready for Launch";
      document.getElementById("launchStatus").style.color = "red";
      document.getElementById("faultyItems").style.visibility = "visible";
      document.getElementById("faultyItems").innerHTML = `
      <ol>
                    <li id="pilotStatus">Pilot ${pilot} Ready</li>
                    <li id="copilotStatus">Co-pilot ${coPilot} Ready</li>
                    <li id="fuelStatus">Fuel level too low for launch</li>
                    <li id="cargoStatus">Cargo mass low enough for launch</li>
                </ol>
      `
   } else {
      // Step 6) If all validations pass, update CSS/innerHTML to indicate success
      document.getElementById("launchStatus").innerHTML = "Shuttle READY for Launch";
      document.getElementById("launchStatus").style.color = "green";
      document.getElementById("faultyItems").style.visibility = "visible";
      document.getElementById("faultyItems").innerHTML = `
      <ol>
                    <li id="pilotStatus">Pilot ${pilot} Ready</li>
                    <li id="copilotStatus">Co-pilot ${coPilot} Ready</li>
                    <li id="fuelStatus">Fuel level high enough for launch</li>
                    <li id="cargoStatus">Cargo mass low enough for launch</li>
                </ol>
      `
   }
})

fetch("https://handlers.education.launchcode.org/static/planets.json").then(function (response) {
   response.json().then(function (json) {
       const missionTargetDiv = document.getElementById("missionTarget");
       let i = Math.floor(Math.random() * json.length);
         document.getElementById("missionTarget").innerHTML = `
           <h2>Mission Destination</h2>
               <ol>
                  <li>Name: ${json[i].name} </li>
                     <li>Diameter: ${json[i].diameter} </li>
                     <li>Star: ${json[i].star} </li>
                     <li>Distance from Earth: ${json[i].distance} </li>
                     <li>Number of Moons: ${json[i].moons} </li>
               </ol>
               <img src="${json[i].image}">
            `;
         })
})
};





