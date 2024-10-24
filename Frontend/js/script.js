let points = 0;
let level = 1;
const levelPoints = [100, 200, 300, 400, 500]; // Points required for each level
let pointsRequired = levelPoints[level - 1]; // Points needed to reach next level
let rewards = [];

// Function to complete a task and earn points
function completeTask(pointsEarned) {
  points += pointsEarned;

  // Check if user reached the required points for the next level
  if (points >= pointsRequired) {
    levelUp();
  }

  updateUI();
}

// Function to level up the user
function levelUp() {
  points -= pointsRequired; // Deduct points required for current level
  level += 1; // Increase level
  rewards.push(`Reached Level ${level}`); // Add reward

  // Update the points required for the next level
  if (level <= levelPoints.length) {
    pointsRequired = levelPoints[level - 1];
  } else {
    pointsRequired = pointsRequired + 100; // Increase the requirement for further levels
  }

  // Display the reward
  updateRewards();
}

// Function to update the UI (progress bar, points, etc.)
function updateUI() {
  // Update points display
  document.getElementById("points").innerText = points;
  document.getElementById("level").innerText = level;
  document.getElementById("pointsRequired").innerText = pointsRequired;

  // Update progress bar
  const progressPercent = (points / pointsRequired) * 100;
  document.getElementById("progress").style.width = progressPercent + "%";
}

// Function to display rewards
function updateRewards() {
  const rewardsList = document.getElementById("rewards-list");
  rewardsList.innerHTML = ""; // Clear the existing list

  rewards.forEach((reward) => {
    const li = document.createElement("li");
    li.innerText = reward;
    rewardsList.appendChild(li);
  });
}

let toggleBtn = document.getElementById("toggle-btn");
let body = document.body;
let darkMode = localStorage.getItem("dark-mode");

const enableDarkMode = () => {
  toggleBtn.classList.replace("fa-sun", "fa-moon");
  body.classList.add("dark");
  localStorage.setItem("dark-mode", "enabled");
};

const disableDarkMode = () => {
  toggleBtn.classList.replace("fa-moon", "fa-sun");
  body.classList.remove("dark");
  localStorage.setItem("dark-mode", "disabled");
};

if (darkMode === "enabled") {
  enableDarkMode();
}

toggleBtn.onclick = (e) => {
  darkMode = localStorage.getItem("dark-mode");
  if (darkMode === "disabled") {
    enableDarkMode();
  } else {
    disableDarkMode();
  }
};

let profile = document.querySelector(".header .flex .profile");

document.querySelector("#user-btn").onclick = () => {
  profile.classList.toggle("active");
  search.classList.remove("active");
};

let search = document.querySelector(".header .flex .search-form");

document.querySelector("#search-btn").onclick = () => {
  search.classList.toggle("active");
  profile.classList.remove("active");
};

let sideBar = document.querySelector(".side-bar");

document.querySelector("#menu-btn").onclick = () => {
  sideBar.classList.toggle("active");
  body.classList.toggle("active");
};

document.querySelector("#close-btn").onclick = () => {
  sideBar.classList.remove("active");
  body.classList.remove("active");
};

window.onscroll = () => {
  profile.classList.remove("active");
  search.classList.remove("active");

  if (window.innerWidth < 1200) {
    sideBar.classList.remove("active");
    body.classList.remove("active");
  }
};

// Select necessary DOM elements
const checkinButton = document.getElementById("checkin-button");
const message = document.getElementById("message");
const streakDisplay = document.getElementById("streak");
const checkinLog = document.getElementById("checkin-log");

// Get data from localStorage or initialize variables
let streak = parseInt(localStorage.getItem("streak")) || 0;
let lastCheckinDate = localStorage.getItem("lastCheckinDate") || null;
let checkinDates = JSON.parse(localStorage.getItem("checkinDates")) || [];

// Display initial streak and log
streakDisplay.textContent = streak;
renderCheckinLog();

// Function to get today's date in YYYY-MM-DD format
function getTodayDate() {
  const today = new Date();
  return today.toISOString().split("T")[0]; // "YYYY-MM-DD"
}

// Check if user has already checked in today
const today = getTodayDate();
if (lastCheckinDate === today) {
  disableCheckinButton("You have already checked in today!");
}

// Handle check-in button click
checkinButton.addEventListener("click", () => {
  const currentDate = getTodayDate();

  if (lastCheckinDate && isConsecutiveDay(lastCheckinDate, currentDate)) {
    streak++; // Increase streak if consecutive
  } else {
    streak = 1; // Reset streak if not consecutive
  }

  // Update localStorage with new data
  localStorage.setItem("streak", streak);
  localStorage.setItem("lastCheckinDate", currentDate);
  checkinDates.push(currentDate);
  localStorage.setItem("checkinDates", JSON.stringify(checkinDates));

  // Update UI
  streakDisplay.textContent = streak;
  renderCheckinLog();
  disableCheckinButton("You have checked in today!");
});

// Disable button and show message
function disableCheckinButton(msg) {
  checkinButton.disabled = true;
  message.textContent = msg;
}

// Check if two dates are consecutive
function isConsecutiveDay(prevDate, currentDate) {
  const prev = new Date(prevDate);
  const curr = new Date(currentDate);
  return curr - prev === 86400000; // Difference of 1 day in milliseconds
}

// Render the check-in log in the UI
function renderCheckinLog() {
  checkinLog.innerHTML = ""; // Clear the log

  checkinDates.forEach((date) => {
    const listItem = document.createElement("li");
    listItem.textContent = `Checked in on: ${date}`;
    checkinLog.appendChild(listItem);
  });
}

// leaderBoard
var tabs = document.querySelectorAll(".lboard_tabs ul li");
// var today = document.querySelector(".today");
var month = document.querySelector(".month");
var year = document.querySelector(".year");
var items = document.querySelectorAll(".lboard_item");

tabs.forEach(function (tab) {
  tab.addEventListener("click", function () {
    var currenttab = tab.getAttribute("data-li");

    tabs.forEach(function (tab) {
      tab.classList.remove("active");
    });

    tab.classList.add("active");

    items.forEach(function (item) {
      item.style.display = "none";
    });

    if (currenttab == "today") {
      today.style.display = "block";
    } else if (currenttab == "month") {
      month.style.display = "block";
    } else {
      year.style.display = "block";
    }
  });
});
