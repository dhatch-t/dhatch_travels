const serviceDetails = {
  holiday: {
    title: "Holiday Package",
    description:
      "Details about holiday packages, including destinations, deals, and offers.",
    icon: "assets/files/holiday.png",
    link: "services.html#holiday-package",
    text: "Learn More",
  },
  flight: {
    title: "Air Ticket Booking",
    description: "Information about booking flights and air tickets.",
    icon: "assets/files/flight.png",
    link: "services.html#air-ticket-booking",
    text: "view More",
  },
  hotel: {
    title: "Hotel Booking",
    description: "Details on booking hotels, resorts, and accommodations.",
    icon: "assets/files/resort.png",
    link: "services.html#hotel-booking",
    text: "Learn More",
  },
  visa: {
    title: "Visa",
    description: "Assistance with obtaining visas for various destinations.",
    icon: "assets/files/passport.png",
    link: "services.html#visa",
    text: "Learn More",
  },
  insurance: {
    title: "Travel Insurance",
    description: "Information on travel insurance coverage for your trip.",
    icon: "assets/files/insurance.png",
    link: "services.html#travel-insurance",
    text: "Learn More",
  },
  cab: {
    title: "Cab Services",
    description:
      "Details on cab services available for airport transfers and city rides.",
    icon: "assets/files/taxi.png",
    link: "services.html#cab-services",
    text: "Learn More",
  },
};

document.querySelectorAll(".service-card").forEach((card) => {
  card.addEventListener("click", function (event) {
    const serviceType = this.getAttribute("data-service");
    const modal = document.getElementById("service-modal");
    const modalContent = document.querySelector(".modal-content");
    const modalTitle = document.getElementById("modal-title");
    const modalDescription = document.getElementById("modal-description");
    const modalIcon = document.getElementById("modal-icon");
    const serviceLink = document.getElementById("service-link");

    modal.style.display = "flex";

    // Prevent page scroll when modal is open
    document.body.style.overflow = "hidden";

    // Set modal content
    modalTitle.textContent = serviceDetails[serviceType].title;
    modalDescription.textContent = serviceDetails[serviceType].description;
    modalIcon.innerHTML = `<img src="${serviceDetails[serviceType].icon}" alt="${serviceDetails[serviceType].title}" style="width: 80px; height: 80px; margin-bottom: 10px;">`;

    serviceLink.setAttribute("href", serviceDetails[serviceType].link);
    serviceLink.textContent = serviceDetails[serviceType].text;

    // Store the service type on the modal content for reverse animation
    modalContent.setAttribute("data-service", serviceType);

    // Get the clicked card's position and dimensions
    const cardRect = this.getBoundingClientRect();
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;

    // Apply initial position to modal content (where the clicked card is)
    modalContent.style.width = `${cardRect.width}px`;
    modalContent.style.height = `${cardRect.height}px`;
    modalContent.style.left = `${cardRect.left}px`;
    modalContent.style.top = `${cardRect.top}px`;
    modal.style.display = "flex";

    // Trigger the animation after a brief delay
    // setTimeout(() => {
    //     const finalWidth = 300; // Set the final width of the modal
    //     const finalHeight = 300; // Set the final height of the modal
    //     const windowWidth = window.innerWidth; // Get the viewport width
    //     const windowHeight = window.innerHeight; // Get the viewport height
    //     const finalX = (windowWidth - finalWidth) / 2;
    //     const finalY = (windowHeight - finalHeight) / 2;
    //     modalContent.style.transition = 'all 0.4s ease';

    //     modalContent.style.width = `${finalWidth}px`;
    //     modalContent.style.height = `${finalHeight}px`;
    //     modalContent.style.left = `${finalX}px`;
    //     modalContent.style.top = `${finalY}px`;
    // }, 10);

    // updated for small screen

    setTimeout(() => {
      const windowWidth = window.innerWidth;
      const windowHeight = window.innerHeight;

      let finalWidth, finalHeight;

      // Adjust modal size based on screen width
      if (windowWidth <= 768) {
        finalWidth = windowWidth * 0.8; // 80% width for medium screens
        finalHeight = "auto"; // Let the height adjust automatically
      } else if (windowWidth <= 480) {
        finalWidth = windowWidth * 0.9; // 90% width for smaller screens
        finalHeight = "auto"; // Let the height adjust automatically
      } else {
        finalWidth = 200; // Default for larger screens
        finalHeight = 250;
      }

      const finalX = (windowWidth - finalWidth) / 2;
      const finalY = (windowHeight - finalHeight) / 2;

      modalContent.style.transition = "all 0.4s ease";

      // Set the final dimensions and position
      modalContent.style.width = `${finalWidth}px`;
      modalContent.style.height =
        finalHeight !== "auto" ? `${finalHeight}px` : "auto";
      modalContent.style.left = `${finalX}px`;
      modalContent.style.top = `${finalY}px`;
    }, 10);
  });
});

// Function to close the modal with reverse animation
function closeModal() {
  const modal = document.getElementById("service-modal");
  const modalContent = document.querySelector(".modal-content");

  // Get the service type to find the corresponding card
  const serviceType = modalContent.getAttribute("data-service");
  const originalCard = document.querySelector(
    `.service-card[data-service="${serviceType}"]`
  );

  if (!originalCard) {
    modal.style.display = "none"; // In case there's no card, just hide the modal
    return;
  }

  // Get the original card's position and dimensions
  const cardRect = originalCard.getBoundingClientRect();

  // Apply reverse animation (shrink modal back to original position)
  modalContent.style.transition = "all 0.3s ease";
  modalContent.style.width = `${cardRect.width}px`;
  modalContent.style.height = `${cardRect.height}px`;
  modalContent.style.left = `${cardRect.left}px`;
  modalContent.style.top = `${cardRect.top}px`;

  // Wait for the animation to finish before hiding the modal
  setTimeout(() => {
    modal.style.display = "none";
    modalContent.style.transition = "none"; // Reset transition after hiding
  }, 200); // Match the duration of the animation (0.4s)
}

// Listen for clicks on the close button
document.querySelector(".close-btn").addEventListener("click", function () {
  closeModal();
  document.body.style.overflow = ""; // Restore page scroll
});

// Listen for clicks outside the modal content
window.addEventListener("click", function (event) {
  const modal = document.getElementById("service-modal");
  if (event.target === modal) {
    closeModal();
    document.body.style.overflow = ""; // Restore page scroll
  }
});

// Listen for the ESC key to close the modal
window.addEventListener("keydown", function (event) {
  if (event.key === "Escape" || event.key === "Esc") {
    // For older browsers 'Esc' might be used
    closeModal();
    document.body.style.overflow = ""; // Restore page scroll
  }
});
