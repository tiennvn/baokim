const initpXDropdown = () => {
  const dropdownList = document.querySelectorAll(".dropdown");
  window.addEventListener("click", () => {
    dropdownList.forEach((item) => {
      item.classList.remove("active-dropdown");
    });
  });
  dropdownList.forEach((item) => {
    const dropdownBtn = item.querySelector(".dropdown-btn");
    dropdownBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      dropdownList.forEach((item) => {
        item.classList.remove("active-dropdown");
      });
      item.classList.toggle("active-dropdown");
    });
    
  });
};
initpXDropdown();
