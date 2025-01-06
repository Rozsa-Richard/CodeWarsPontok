const apiUrl = "https://www.codewars.com/api/v1/users/";
    const userDataContainer = document.getElementById("user-data");
    const toggleThemeButton = document.getElementById("toggle-theme");
    let isDarkMode = localStorage.getItem("theme") === "dark";

    document.body.className = isDarkMode ? "dark-mode" : "light-mode";

    document.getElementById("fetch-data").addEventListener("click", async () => {
      const username = document.getElementById("username").value.trim();
      if (!username) {
        alert("Please enter a username");
        return;
      }

      try {
        const response = await fetch(apiUrl + username);
        if (!response.ok) {
          throw new Error("User not found");
        }
        const data = await response.json();

        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
          <h2>${data.username}</h2>
          <p><strong>Name:</strong> ${data.name || "N/A"}</p>
          <p><strong>Clan:</strong> ${data.clan || "N/A"}</p>
          <p><strong>Languages:</strong> ${Object.keys(data.ranks.languages).join(", ")}</p>
          <p><strong>JavaScript Rank:</strong> ${data.ranks.languages.javascript ? data.ranks.languages.javascript.rank : "N/A"}</p>
          <p><strong>Overall Rank:</strong> ${data.ranks.overall.rank}</p>
          <p><strong>Honor:</strong> ${data.honor}</p>

        `;

        userDataContainer.appendChild(card);
      } catch (error) {
        alert(error.message);
      }
    });

    document.getElementById("clear-data").addEventListener("click", () => {
      userDataContainer.innerHTML = "";
    });

    toggleThemeButton.addEventListener("click", () => {
      isDarkMode = !isDarkMode;
      document.body.className = isDarkMode ? "dark-mode" : "light-mode";
      localStorage.setItem("theme", isDarkMode ? "dark" : "light");
    });