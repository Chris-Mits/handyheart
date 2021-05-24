// CUSTOM MADE CALENDAR & EFFECTS
const offset = 69;
const borderWidth = 3;
const angles = []; //in  rad
for (let i = 0; i <= 2; i += 0.25) {
  angles.push(Math.PI * i);
}
let nearBy = [];
let activeBtn = document.querySelector(".win-btn-active");

// Check if activeBtn exists in page
if (activeBtn) {
  let lastClicked = null;

  document.querySelectorAll(".win-btn").forEach((btn) => {
    btn.onclick = (e) => {
      
      // Clear effects from last clicked date and set lastClicked to current item
      if (lastClicked) {
        lastClicked.classList.remove("win-btn-selected");
      }
      lastClicked = e.currentTarget;

      activeBtn.classList.toggle(
        "win-btn-active-unselected",
        e.currentTarget.id !== activeBtn.id
      );
      e.currentTarget.classList.add("win-btn-selected");
    };
  });

  function clearNearBy() {
    nearBy.splice(0).forEach((e) => (e.style.borderImage = null));
  }

  const body = document.querySelector(".win-grid");

  body.addEventListener("mousemove", (e) => {
    let x = e.clientX; //x position of cursor.
    let y = e.clientY; //y position of cursor

    clearNearBy();

    nearBy = angles.reduce((acc, rad, index, arr) => {
      const offsets = [offset * 0.35, offset * 1.105];

      const elements = offsets.reduce((elementAccumulator, o, i, offsetArray) => {
        if (index % 2 === 0 && i === 0) return elementAccumulator;
        const cx = Math.floor(x + Math.cos(rad) * o);
        const cy = Math.floor(y + Math.sin(rad) * o);
        const element = document.elementFromPoint(cx, cy);
        // console.log("element at", x, y, cx, cy, offsets, (rad * 180) / Math.PI);
        if (
          element &&
          element.classList.contains("win-btn") &&
          !element.classList.contains("win-btn-active") &&
          !element.classList.contains("win-btn-selected") &&
          elementAccumulator.findIndex((ae) => ae.id === element.id) < 0
        ) {
          const brect = element.getBoundingClientRect();
          const bx = x - brect.left; //x position within the element.
          const by = y - brect.top; //y position within the element.
          const gr = Math.floor(offset * 1.7);
          if (!element.style.borderImage)
            element.style.borderImage = `radial-gradient(${gr}px ${gr}px at ${bx}px ${by}px ,rgba(166,32,44,0.3),rgba(166,32,44,0.1),transparent ) 9 / ${borderWidth}px / 0px stretch `;
          // console.log("element at", offsets, (rad * 180) / Math.PI, element);

          return [...elementAccumulator, element];
        }
        return elementAccumulator;
      }, []);

      return acc.concat(elements);
    }, []);
  });

  body.onmouseleave = (e) => {
    clearNearBy();
  };
}
// AUTO TEXT DONATION EFFECT
const textEl = document.getElementById('autotext');
const text = 'Make a Donation!';
let idx = 1;
let speed = 200;

// Check if textEl exists in page
if(textEl) {
  writeText();
  function writeText() {
    textEl.innerHTML = text.slice(0, idx);
    idx++;
    if(idx > text.length) {
      idx = 1;
    }
    setTimeout(writeText, speed);
  }
}

// FAQ COLLAPSING EFFECT
const toggles = document.querySelectorAll('.faq-toggle');

if(toggles) {
  toggles.forEach(toggle => {
    toggle.addEventListener('click', () => {
      toggle.parentNode.classList.toggle('active');
    })
  })
}


// BACK TO TOP FUNCTIONALITY
function backToTop() {
	document.documentElement.scrollTo({
		top: 0,
		behavior: 'smooth'
	})
};


// MAP API
// Custom Map Init
function GetMap() {
  const map = new Microsoft.Maps.Map('#myMap', {
    credentials: 'AuIhr1eZgYLxIQCrWINMaUEE-JfDZ91euBnb89C128jhl3rv4Z1R0yXYveWhAoFW',
    mapTypeId: Microsoft.Maps.MapTypeId.road,
    center: new Microsoft.Maps.Location(37.968209238625306, 23.778688476065714),
    zoom: 13
  });
  
  // Get ekpa Location Location in the Map (set to center)
  const ekpaLocation = map.getCenter();
  
  // Get HandyHeart Location in the Map
  const handyHeartLocation = new Microsoft.Maps.Location(37.979261516821445, 23.776483663643326);
  
  // Create Custom ekpaPin Marker
  const ekpaPin = new Microsoft.Maps.Pushpin(ekpaLocation, {
    title: 'Εθνικό και Καποδιστριακό Πανεπιστήμιο Αθηνών',
    // subTitle: 'Πανεπιστήμιο',
    description: 'Πανεπιστήμιο',
    icon: './img/mapicons/universepin.svg'
  });
  
  // Create Custom HandyHeartPin Marker
  const handyHeartPin = new Microsoft.Maps.Pushpin(handyHeartLocation, {
    title: 'HandyHeart NGO',
    // subTitle: 'Φιλανθρωπική ΜΚΟ',
    description: 'Φιλανθρωπική ΜΚΟ',
    icon: './img/mapicons/pin.svg'
  });
  
  // Create an ekpaBox at the center of the map but don't show it.
  ekpaBox = new Microsoft.Maps.Infobox(map.getCenter(), {
    visible: false,
    // maxHeight: 4000,
    // maxWidth: 500
  });
  
  // Create a handyHeartBox at the center of the map but don't show it.
  handyHeartBox = new Microsoft.Maps.Infobox(Microsoft.Maps.Location(37.979261516821445, 23.776483663643326), {
    visible: false
  });
  
  // Store some metadata with the ekpaPin.
  ekpaPin.metadata = {
    title: 'Εθνικό και Καποδιστριακό Πανεπιστήμιο Αθηνών',
    description: 'Πανεπιστήμιο',
    actions: {
      label: 'https://www.uoa.gr/',
      eventHandler: function () {
        window.open("https://www.uoa.gr/");
      }
    }
  };
  
  // Store some metadata with the handyHeartPin.
  handyHeartPin.metadata = {
    title: 'HandyHeart ΑΕ & ΣΙΑ',
    description: 'Φιλανθρωπική ΜΚΟ'
  };
  
  // Assign ekpaPin to the Map
  map.entities.push(ekpaPin);
  
  // Assign handyHeartPin to the Map
  map.entities.push(handyHeartPin);
  
  // Assign the ekpaBox to a map instance.
  ekpaBox.setMap(map);
  
  // Assign the handyHeartBox to a map instance.
  handyHeartBox.setMap(map);
  
  // Add a click event handler to the ekpaPin.
  Microsoft.Maps.Events.addHandler(ekpaPin, 'click', ekpaPinClicked);

  // Add a click event handler to the handyHeartPin.
  Microsoft.Maps.Events.addHandler(handyHeartPin, 'click', handyHeartPinClicked);
}

function ekpaPinClicked(e) {
//Make sure the ekpaBox has metadata to display.
if (e.target.metadata) {
    //Set the ekpaBox options with the metadata of the ekpaPin.
    ekpaBox.setOptions({
        location: e.target.getLocation(),
        title: e.target.metadata.title,
        description: e.target.metadata.description,
        actions:e.target.metadata.actions,
        visible: true
    });
  }
}

function handyHeartPinClicked(e) {
//Make sure the handyHeartBox has metadata to display.
if (e.target.metadata) {
    //Set the handyHeartBox options with the metadata of the handyHeartPin.
    handyHeartBox.setOptions({
        location: e.target.getLocation(),
        title: e.target.metadata.title,
        description: e.target.metadata.description,
        visible: true
    });
  }
}